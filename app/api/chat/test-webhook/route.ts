import { NextRequest, NextResponse } from 'next/server';

// Test endpoint to simulate a Telegram webhook with a reply
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward to the actual webhook
    const webhookUrl = `${request.nextUrl.origin}/api/telegram/webhook`;
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      webhookResponse: data,
      receivedBody: body,
    });
  } catch (error) {
    console.error('Error in test webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to show example payload
export async function GET() {
  const examplePayload = {
    update_id: 123456789,
    message: {
      message_id: 123,
      from: {
        id: 1090774405,
        is_bot: false,
        first_name: "Admin",
      },
      chat: {
        id: 1090774405,
        type: "private",
      },
      date: Math.floor(Date.now() / 1000),
      text: "This is a test reply from admin",
      reply_to_message: {
        message_id: 122,
        from: {
          id: 123456,
          is_bot: true,
          first_name: "Bot",
        },
        chat: {
          id: 1090774405,
          type: "private",
        },
        date: Math.floor(Date.now() / 1000) - 60,
        text: `💬 New Customer Message

Email: testing@testt.com
Name: test
Phone: 0000000000
Page URL: https://www.prakharpsychologicaltest.com/students-stress-scale
Browser: Firefox
Device: Desktop

Message:
test message

⚠️ IMPORTANT: Use Telegram's REPLY feature (swipe right) to respond!
Customer ID: customer_1763830095179_xphoao5y7`,
      },
    },
  };

  return NextResponse.json({
    message: 'Test webhook endpoint',
    usage: 'POST to this endpoint with a Telegram update payload to test the webhook',
    example: examplePayload,
    testUrl: '/api/chat/test-webhook',
  });
}

