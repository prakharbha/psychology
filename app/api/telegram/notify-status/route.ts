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
    const chatIdEnv = process.env.TELEGRAM_CHAT_ID;
    // Support both single chat ID and comma-separated multiple chat IDs
    const chatIds = chatIdEnv?.split(',').map(id => id.trim()).filter(Boolean) || [];

    if (!botToken || chatIds.length === 0) {
      const missingVars = [];
      if (!botToken) missingVars.push('TELEGRAM_BOT_TOKEN');
      if (chatIds.length === 0) missingVars.push('TELEGRAM_CHAT_ID');
      
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
    
    // Send to all chat IDs
    const errors: string[] = [];
    const results: Array<{ chatId: string; messageId?: number }> = [];
    let successCount = 0;

    for (const chatId of chatIds) {
      try {
        const response = await fetch(telegramApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
          errors.push(`Chat ${chatId}: ${data.description || 'Unknown error'}`);
          console.error(`[Telegram] Failed to send to chat ${chatId}:`, {
            status: response.status,
            statusText: response.statusText,
            errorCode: data.error_code,
            description: data.description,
          });
        } else {
          successCount++;
          results.push({
            chatId,
            messageId: data.result?.message_id,
          });
          console.log(`[Telegram] Status notification sent successfully to chat ${chatId}:`, {
            messageId: data.result?.message_id,
            orderId,
            status,
          });
        }
      } catch (error) {
        errors.push(`Chat ${chatId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        console.error(`[Telegram] Error sending to chat ${chatId}:`, error);
      }
    }

    // Return success if at least one message was sent
    if (successCount > 0) {
      return NextResponse.json({ 
        success: true, 
        sentTo: successCount,
        total: chatIds.length,
        results,
        ...(errors.length > 0 && { errors }),
      });
    } else {
      return NextResponse.json(
        { 
          error: 'Failed to send Telegram message to any chat', 
          details: errors.join('; '),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error sending Telegram status notification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

