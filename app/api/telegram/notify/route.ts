import { NextRequest, NextResponse } from 'next/server';

/**
 * Telegram Bot API endpoint
 * Sends order notifications to Telegram chat
 * 
 * Environment variables required:
 * - TELEGRAM_BOT_TOKEN: Your bot token from BotFather
 * - TELEGRAM_CHAT_ID: Chat ID where notifications will be sent
 */
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      const missingVars = [];
      if (!botToken) missingVars.push('TELEGRAM_BOT_TOKEN');
      if (!chatId) missingVars.push('TELEGRAM_CHAT_ID');
      
      console.error('Telegram bot not configured. Missing:', missingVars.join(', '));
      return NextResponse.json(
        { 
          error: 'Telegram bot not configured', 
          details: `Missing environment variables: ${missingVars.join(', ')}. Please set these in Vercel environment variables.` 
        },
        { status: 500 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Send message via Telegram Bot API
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error('Telegram API error:', {
        status: response.status,
        statusText: response.statusText,
        errorCode: data.error_code,
        description: data.description,
        parameters: data.parameters,
      });
      return NextResponse.json(
        { 
          error: 'Failed to send Telegram message', 
          details: data.description || 'Unknown error',
          errorCode: data.error_code,
        },
        { status: 500 }
      );
    }

    console.log('[Telegram] Message sent successfully:', {
      messageId: data.result?.message_id,
      chatId: data.result?.chat?.id,
      messagePreview: message.substring(0, 50) + '...',
    });

    return NextResponse.json({ success: true, messageId: data.result.message_id });
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

