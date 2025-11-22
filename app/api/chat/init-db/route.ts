import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/chat/db';

export async function GET(request: NextRequest) {
  try {
    console.log('🔧 Initializing chat database...');
    console.log('Environment check:', {
      hasChatPostgresUrl: !!process.env.CHAT__POSTGRES_URL,
      hasPostgresUrl: !!process.env.POSTGRES_URL,
    });
    
    const success = await initializeDatabase();
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Database initialized successfully',
        tables: ['chat_customers', 'chat_messages', 'chat_sessions'],
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to initialize database - check Vercel logs for details' },
        { status: 500 }
      );
    }
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

