import { NextRequest, NextResponse } from 'next/server';
import { setWebhook, getWebhookInfo } from '@/lib/chat/telegram';

export async function POST(request: NextRequest) {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({
        error: 'TELEGRAM_BOT_TOKEN not configured',
        success: false,
      }, { status: 500 });
    }

    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const webhookUrl = `${protocol}://${host}/api/telegram/webhook`;

    const success = await setWebhook(webhookUrl);
    const success = await setWebhook(webhookUrl);

    if (success) {
      // Get updated webhook info
      const webhookInfo = await getWebhookInfo();
      
      return NextResponse.json({
        success: true,
        message: 'Webhook configured successfully',
        webhookUrl,
        webhookInfo,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to set webhook',
        webhookUrl,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error setting up webhook:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// Also allow GET for easy browser access
export async function GET(request: NextRequest) {
  return POST(request);
}

