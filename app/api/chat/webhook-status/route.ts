import { NextResponse } from 'next/server';
import { getWebhookInfo } from '@/lib/chat/telegram';

export async function GET() {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    
    if (!TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({
        error: 'TELEGRAM_BOT_TOKEN not configured',
        configured: false,
      });
    }

    if (!TELEGRAM_CHAT_ID) {
      return NextResponse.json({
        error: 'TELEGRAM_CHAT_ID not configured',
        configured: false,
      });
    }

    // Get webhook info
    const webhookInfo = await getWebhookInfo();
    
    return NextResponse.json({
      configured: true,
      botToken: `${TELEGRAM_BOT_TOKEN.substring(0, 10)}...`,
      chatId: TELEGRAM_CHAT_ID,
      webhookInfo,
      expectedWebhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/api/telegram/webhook`,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      configured: false,
    }, { status: 500 });
  }
}

