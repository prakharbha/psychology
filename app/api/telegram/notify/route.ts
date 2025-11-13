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
      return NextResponse.json(
        { error: 'Telegram bot not configured. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in environment variables.' },
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
      console.error('Telegram API error:', data);
      return NextResponse.json(
        { error: 'Failed to send Telegram message', details: data.description },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messageId: data.result.message_id });
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

