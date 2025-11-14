import { NextRequest, NextResponse } from 'next/server';

/**
 * Telegram Bot API endpoint for abandoned cart notifications
 * Sends notifications when a cart is abandoned (items in cart for 30+ minutes)
 * 
 * Environment variables required:
 * - TELEGRAM_BOT_TOKEN: Your bot token from BotFather
 * - TELEGRAM_CHAT_ID: Chat ID where notifications will be sent
 */
export async function POST(request: NextRequest) {
  try {
    const { items, total, itemCount } = await request.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      const missingVars = [];
      if (!botToken) missingVars.push('TELEGRAM_BOT_TOKEN');
      if (!chatId) missingVars.push('TELEGRAM_CHAT_ID');
      
      console.error('[Telegram] Bot not configured. Missing:', missingVars.join(', '));
      return NextResponse.json(
        { 
          error: 'Telegram bot not configured', 
          details: `Missing environment variables: ${missingVars.join(', ')}. Please set these in Vercel environment variables.` 
        },
        { status: 500 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart items are required' },
        { status: 400 }
      );
    }

    // Format cart items for message
    const itemsList = items.map((item: any) => {
      const packSizeText = item.packSize === 100 ? '100 copies' : '500 copies';
      return `• ${item.productName} (${packSizeText}) × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}`;
    }).join('\n');

    const message = `🛒 *Abandoned Cart Alert*\n\n` +
      `A customer has items in their cart but hasn't completed checkout.\n\n` +
      `*Items:* (${itemCount} total)\n${itemsList}\n\n` +
      `💰 *Total Value:* ₹${total.toLocaleString('en-IN')}\n\n` +
      `⏰ Cart has been inactive for 30+ minutes.`;

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
      console.error('[Telegram] Telegram API error:', {
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

    console.log('[Telegram] Abandoned cart notification sent successfully:', {
      messageId: data.result?.message_id,
      chatId: data.result?.chat?.id,
      itemCount,
      total,
    });

    return NextResponse.json({ success: true, messageId: data.result.message_id });
  } catch (error) {
    console.error('[Telegram] Error sending abandoned cart notification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

