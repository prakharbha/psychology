import { NextRequest, NextResponse } from 'next/server';

/**
 * Telegram Bot API endpoint for abandoned checkout notifications
 * Sends notifications when a user fills checkout form but doesn't complete payment
 * 
 * Environment variables required:
 * - TELEGRAM_BOT_TOKEN: Your bot token from BotFather
 * - TELEGRAM_CHAT_ID: Chat ID where notifications will be sent
 */
export async function POST(request: NextRequest) {
  try {
    const { customerName, customerEmail, customerPhone, shippingAddress, items, total } = await request.json();

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

    // Customer details
    let customerDetails = '';
    if (customerName || customerEmail || customerPhone) {
      customerDetails = '\n\n👤 *Customer Details:*';
      if (customerName) customerDetails += `\n• Name: ${customerName}`;
      if (customerEmail) customerDetails += `\n• Email: ${customerEmail}`;
      if (customerPhone) customerDetails += `\n• Phone: ${customerPhone}`;
    }
    
    // Shipping address
    let addressDetails = '';
    if (shippingAddress && (shippingAddress.address || shippingAddress.city || shippingAddress.state || shippingAddress.pincode)) {
      addressDetails = '\n\n📍 *Shipping Address:*';
      if (shippingAddress.address) addressDetails += `\n${shippingAddress.address}`;
      const cityStatePincode = [shippingAddress.city, shippingAddress.state, shippingAddress.pincode].filter(Boolean).join(', ');
      if (cityStatePincode) addressDetails += `\n${cityStatePincode}`;
    }

    const itemCount = items.reduce((count: number, item: any) => count + item.quantity, 0);

    const message = `⚠️ *Abandoned Checkout Alert*\n\n` +
      `A customer started checkout but hasn't completed payment.` +
      `${customerDetails}${addressDetails}\n\n` +
      `📋 *Cart Items:* (${itemCount} total)\n${itemsList}\n\n` +
      `💰 *Total Value:* ₹${total.toLocaleString('en-IN')}\n\n` +
      `⏰ Checkout form has been inactive for 5+ minutes.\n\n` +
      `💡 *Follow up:* Contact customer to assist with completing the order.`;

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

    console.log('[Telegram] Abandoned checkout notification sent successfully:', {
      messageId: data.result?.message_id,
      chatId: data.result?.chat?.id,
      customerEmail,
      total,
    });

    return NextResponse.json({ success: true, messageId: data.result.message_id });
  } catch (error) {
    console.error('[Telegram] Error sending abandoned checkout notification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

