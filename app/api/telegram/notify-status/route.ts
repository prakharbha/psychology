import { NextRequest, NextResponse } from 'next/server';

/**
 * Send Telegram notification for order status updates
 * POST /api/telegram/notify-status
 * Body: { orderId, status, amount, phonepeOrderId? }
 */
export async function POST(request: NextRequest) {
  try {
    const { 
      orderId, 
      status, 
      amount, 
      phonepeOrderId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items
    } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Order ID and status are required' },
        { status: 400 }
      );
    }

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

    const statusUpper = status.toUpperCase();
    let emoji = '📦';
    let statusText = 'Status Update';
    
    if (statusUpper === 'COMPLETED') {
      emoji = '✅';
      statusText = 'Payment Successful';
    } else if (statusUpper === 'FAILED') {
      emoji = '❌';
      statusText = 'Payment Failed';
    } else if (statusUpper === 'PENDING') {
      emoji = '⏳';
      statusText = 'Payment Pending';
    }

    const amountText = amount ? `\n💰 *Amount:* ₹${(amount / 100).toLocaleString('en-IN')}` : '';
    const phonepeText = phonepeOrderId ? `\n📱 *PhonePe Order ID:* ${phonepeOrderId}` : '';
    
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
    if (shippingAddress) {
      addressDetails = '\n\n📍 *Shipping Address:*';
      if (shippingAddress.address) addressDetails += `\n${shippingAddress.address}`;
      if (shippingAddress.city) addressDetails += `\n${shippingAddress.city}`;
      if (shippingAddress.state) addressDetails += `, ${shippingAddress.state}`;
      if (shippingAddress.pincode) addressDetails += ` - ${shippingAddress.pincode}`;
    }
    
    // Order items
    let itemsDetails = '';
    if (items && items.length > 0) {
      itemsDetails = '\n\n📋 *Order Items:*';
      items.forEach((item: any) => {
        const packSizeText = item.packSize === 100 ? '100 copies' : '500 copies';
        itemsDetails += `\n• ${item.productName} (${packSizeText}) × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}`;
      });
    }

    const message = `${emoji} *${statusText}*\n\n` +
      `📦 *Order ID:* ${orderId}${amountText}${phonepeText}` +
      `${customerDetails}${addressDetails}${itemsDetails}`;

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
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

    console.log('Telegram status notification sent successfully:', {
      messageId: data.result?.message_id,
      chatId: data.result?.chat?.id,
      orderId,
      status,
    });

    return NextResponse.json({ success: true, messageId: data.result.message_id });
  } catch (error) {
    console.error('Error sending Telegram status notification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

