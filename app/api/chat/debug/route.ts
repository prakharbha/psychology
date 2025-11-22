import { NextRequest, NextResponse } from 'next/server';
import { getAllSessions } from '@/lib/chat/session';

export async function GET(request: NextRequest) {
  try {
    const sessions = getAllSessions();
    
    return NextResponse.json({
      totalSessions: sessions.length,
      sessions: sessions.map(s => ({
        customerId: s.customerId,
        email: s.customer.email,
        name: s.customer.name,
        messageCount: s.messages.length,
        lastActivity: s.lastActivity,
        isActive: s.isActive,
      })),
    });
  } catch (error) {
    console.error('Error in debug API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

