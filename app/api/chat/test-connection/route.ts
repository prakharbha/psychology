import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET(request: NextRequest) {
  const pool = new Pool({
    connectionString: process.env.CHAT__POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    max: 1,
    connectionTimeoutMillis: 10000,
  });

  try {
    console.log('Testing database connection...');
    console.log('Has CHAT__POSTGRES_URL:', !!process.env.CHAT__POSTGRES_URL);
    
    if (!process.env.CHAT__POSTGRES_URL) {
      return NextResponse.json({
        success: false,
        error: 'CHAT__POSTGRES_URL environment variable not set',
      }, { status: 500 });
    }

    // Test connection with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000);
    });

    const queryPromise = pool.query('SELECT NOW() as current_time');
    
    const result = await Promise.race([queryPromise, timeoutPromise]) as any;
    
    await pool.end();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      currentTime: result.rows[0]?.current_time,
      connectionString: process.env.CHAT__POSTGRES_URL?.substring(0, 30) + '...',
    });
  } catch (error: any) {
    console.error('❌ Connection test failed:', error);
    await pool.end().catch(() => {});
    return NextResponse.json({
      success: false,
      error: error.message || 'Connection failed',
      code: error.code,
    }, { status: 500 });
  }
}

