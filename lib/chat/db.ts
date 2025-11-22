import { Pool } from 'pg';
import { Customer, Message, ChatSession } from '@/types/chat';

// CHAT__POSTGRES_URL is a direct connection string
// Use pg Pool for better connection management
const pool = new Pool({
  connectionString: process.env.CHAT__POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Prisma.io connections
  },
  max: 1, // Single connection for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Helper for template literal SQL (compatible with @vercel/postgres sql template tag)
export const sql = (strings: TemplateStringsArray, ...values: any[]) => {
  let queryText = strings[0];
  const params: any[] = [];
  
  for (let i = 0; i < values.length; i++) {
    queryText += `$${i + 1}`;
    params.push(values[i]);
    queryText += strings[i + 1];
  }
  
  return pool.query(queryText, params);
};

// Initialize database tables
export async function initializeDatabase() {
  try {
    console.log('Creating chat_customers table...');
    // Create customers table (Postgres syntax, not MySQL)
    await sql`
      CREATE TABLE IF NOT EXISTS chat_customers (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        page_url TEXT,
        ip_address VARCHAR(50),
        location VARCHAR(255),
        browser VARCHAR(100),
        device VARCHAR(100),
        network VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log('Creating index on email...');
    await sql`CREATE INDEX IF NOT EXISTS idx_email ON chat_customers(email)`;

    console.log('Creating chat_messages table...');
    // Create messages table
    await sql`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id VARCHAR(255) PRIMARY KEY,
        customer_id VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        sender VARCHAR(20) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        telegram_message_id INTEGER,
        FOREIGN KEY (customer_id) REFERENCES chat_customers(id) ON DELETE CASCADE
      )
    `;
    
    console.log('Creating indexes on chat_messages...');
    await sql`CREATE INDEX IF NOT EXISTS idx_customer_id ON chat_messages(customer_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_timestamp ON chat_messages(timestamp)`;

    console.log('Creating chat_sessions table...');
    // Create sessions table (for tracking active sessions)
    await sql`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        customer_id VARCHAR(255) PRIMARY KEY,
        is_active BOOLEAN DEFAULT TRUE,
        last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES chat_customers(id) ON DELETE CASCADE
      )
    `;
    
    console.log('Creating index on last_activity...');
    await sql`CREATE INDEX IF NOT EXISTS idx_last_activity ON chat_sessions(last_activity)`;

    console.log('✅ Database tables initialized successfully');
    return true;
  } catch (error: any) {
    console.error('❌ Error initializing database:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
    });
    throw error; // Re-throw to get full error in API response
  }
}

// Create or update customer
export async function saveCustomer(customer: Customer): Promise<boolean> {
  try {
    await sql`
      INSERT INTO chat_customers (
        id, name, email, phone, page_url, ip_address, location, browser, device, network, created_at
      ) VALUES (
        ${customer.id}, ${customer.name}, ${customer.email}, ${customer.phone},
        ${customer.pageUrl || null}, ${customer.ipAddress || null}, ${customer.location || null},
        ${customer.browser || null}, ${customer.device || null}, ${customer.network || null},
        ${customer.createdAt.toISOString()}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        page_url = EXCLUDED.page_url
    `;
    return true;
  } catch (error) {
    console.error('Error saving customer:', error);
    return false;
  }
}

// Get customer by ID or email
export async function getCustomer(idOrEmail: string): Promise<Customer | null> {
  try {
    const result = await sql`
      SELECT * FROM chat_customers
      WHERE id = ${idOrEmail} OR email = ${idOrEmail}
      LIMIT 1
    `;
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      pageUrl: row.page_url,
      ipAddress: row.ip_address,
      location: row.location,
      browser: row.browser,
      device: row.device,
      network: row.network,
      createdAt: new Date(row.created_at),
    };
  } catch (error) {
    console.error('Error getting customer:', error);
    return null;
  }
}

// Get all customers by email (for handling duplicates)
export async function getAllCustomersByEmail(email: string): Promise<Customer[]> {
  try {
    const result = await sql`
      SELECT * FROM chat_customers
      WHERE email = ${email}
      ORDER BY created_at DESC
    `;
    
    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      pageUrl: row.page_url,
      ipAddress: row.ip_address,
      location: row.location,
      browser: row.browser,
      device: row.device,
      network: row.network,
      createdAt: new Date(row.created_at),
    }));
  } catch (error) {
    console.error('Error getting customers by email:', error);
    return [];
  }
}

// Save message (with conflict handling to prevent duplicates)
export async function saveMessage(message: Message): Promise<boolean> {
  try {
    await sql`
      INSERT INTO chat_messages (
        id, customer_id, text, sender, timestamp, telegram_message_id
      ) VALUES (
        ${message.id}, ${message.customerId}, ${message.text}, ${message.sender},
        ${message.timestamp.toISOString()}, ${message.telegramMessageId || null}
      )
      ON CONFLICT (id) DO UPDATE SET
        text = EXCLUDED.text,
        telegram_message_id = COALESCE(EXCLUDED.telegram_message_id, chat_messages.telegram_message_id)
    `;
    return true;
  } catch (error: any) {
    // If it's a duplicate key error, that's okay - message already exists
    if (error.code === '23505') {
      console.log('Message already exists, skipping:', message.id);
      return true;
    }
    console.error('Error saving message:', error);
    return false;
  }
}

// Get messages for a customer
export async function getMessages(customerId: string): Promise<Message[]> {
  try {
    const result = await sql`
      SELECT * FROM chat_messages
      WHERE customer_id = ${customerId}
      ORDER BY timestamp ASC
    `;
    
    return result.rows.map(row => ({
      id: row.id,
      customerId: row.customer_id,
      text: row.text,
      sender: row.sender as 'customer' | 'admin',
      timestamp: new Date(row.timestamp),
      telegramMessageId: row.telegram_message_id,
    }));
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
}

// Create or update session
export async function createOrUpdateSession(customerId: string): Promise<boolean> {
  try {
    await sql`
      INSERT INTO chat_sessions (customer_id, is_active, last_activity)
      VALUES (${customerId}, TRUE, CURRENT_TIMESTAMP)
      ON CONFLICT (customer_id) DO UPDATE SET
        is_active = TRUE,
        last_activity = CURRENT_TIMESTAMP
    `;
    return true;
  } catch (error) {
    console.error('Error creating/updating session:', error);
    return false;
  }
}

// Get active sessions
export async function getActiveSessions(): Promise<ChatSession[]> {
  try {
    const result = await sql`
      SELECT 
        s.customer_id,
        s.is_active,
        s.last_activity,
        c.*
      FROM chat_sessions s
      JOIN chat_customers c ON s.customer_id = c.id
      WHERE s.is_active = TRUE
        AND s.last_activity > NOW() - INTERVAL '24 hours'
      ORDER BY s.last_activity DESC
    `;
    
    const sessions: ChatSession[] = [];
    
    for (const row of result.rows) {
      const customer: Customer = {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        pageUrl: row.page_url,
        ipAddress: row.ip_address,
        location: row.location,
        browser: row.browser,
        device: row.device,
        network: row.network,
        createdAt: new Date(row.created_at),
      };
      
      const messages = await getMessages(row.customer_id);
      
      sessions.push({
        customerId: row.customer_id,
        customer,
        messages,
        isActive: row.is_active,
        lastActivity: new Date(row.last_activity),
      });
    }
    
    return sessions;
  } catch (error) {
    console.error('Error getting active sessions:', error);
    return [];
  }
}

// Cleanup old sessions (older than 24 hours)
export async function cleanupOldSessions(): Promise<number> {
  try {
    const result = await sql`
      UPDATE chat_sessions
      SET is_active = FALSE
      WHERE last_activity < NOW() - INTERVAL '24 hours'
        AND is_active = TRUE
    `;
    return result.rowCount || 0;
  } catch (error) {
    console.error('Error cleaning up sessions:', error);
    return 0;
  }
}

