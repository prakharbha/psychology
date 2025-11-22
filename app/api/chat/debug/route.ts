import { NextRequest, NextResponse } from 'next/server';
import { getActiveSessions } from '@/lib/chat/db';

export async function GET(request: NextRequest) {
  try {
    const sessions = await getActiveSessions();
    
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
      note: 'Data from Vercel Postgres database',
    });
  } catch (error: any) {
    console.error('Error in debug API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

