import { NextRequest, NextResponse } from 'next/server';
import { getSSEConnectionInfo } from '@/lib/chat/sse';
import { getAllSessions } from '@/lib/chat/session';

export async function GET(request: NextRequest) {
  try {
    const sseConnections = getSSEConnectionInfo();
    const sessions = getAllSessions();
    
    return NextResponse.json({
      totalSSEConnections: sseConnections.length,
      totalSessions: sessions.length,
      sseConnections: sseConnections,
      sessions: sessions.map(s => ({
        customerId: s.customerId,
        email: s.customer.email,
        name: s.customer.name,
        messageCount: s.messages.length,
        hasSSEConnection: sseConnections.some(conn => conn.customerId === s.customerId),
      })),
    });
  } catch (error) {
    console.error('Error in SSE status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

