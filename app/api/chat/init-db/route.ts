import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/chat/db';

export async function GET(request: NextRequest) {
  try {
    console.log('Initializing chat database...');
    const success = await initializeDatabase();
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Database initialized successfully',
        tables: ['chat_customers', 'chat_messages', 'chat_sessions'],
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to initialize database' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in init-db:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

