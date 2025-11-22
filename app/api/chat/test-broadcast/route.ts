import { NextRequest, NextResponse } from 'next/server';
import { broadcastToCustomer } from '@/lib/chat/sse';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const customerId = searchParams.get('customerId');
    const testMessage = searchParams.get('message') || 'Test message from admin';

    if (!customerId) {
      return NextResponse.json(
        { error: 'customerId parameter required' },
        { status: 400 }
      );
    }

    // Create a test admin message
    const adminMessage = {
      id: `msg_test_${Date.now()}`,
      customerId,
      text: testMessage,
      sender: 'admin',
      timestamp: new Date(),
    };

    // Broadcast it
    console.log('Test broadcast to:', customerId);
    broadcastToCustomer(customerId, {
      type: 'new_message',
      message: adminMessage,
    });

    return NextResponse.json({
      success: true,
      message: 'Broadcast sent',
      customerId,
      adminMessage,
    });
  } catch (error) {
    console.error('Error in test broadcast:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

