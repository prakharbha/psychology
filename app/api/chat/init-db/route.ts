import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/chat/db';

export async function GET(request: NextRequest) {
  try {
    console.log('🔧 Initializing chat database...');
    console.log('Environment check:', {
      hasChatPostgresUrl: !!process.env.CHAT__POSTGRES_URL,
      hasPostgresUrl: !!process.env.POSTGRES_URL,
    });
    
    // Add timeout wrapper
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database initialization timeout after 25 seconds')), 25000);
    });

    const initPromise = initializeDatabase();
    
    await Promise.race([initPromise, timeoutPromise]);
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      tables: ['chat_customers', 'chat_messages', 'chat_sessions'],
    });
  } catch (error: any) {
    console.error('❌ Error in init-db:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Internal server error',
        code: error.code,
        details: 'Check Vercel function logs for full error details'
      },
      { status: 500 }
    );
  }
}

