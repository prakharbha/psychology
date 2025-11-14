/**
 * Telegram notification utilities for server-side use
 * Directly calls Telegram API without going through HTTP fetch
 */

export interface StatusNotificationData {
  orderId: string;
  status: string;
  amount?: number;
  phonepeOrderId?: string;
}

/**
 * Send Telegram status notification directly (server-side)
 * This is used in API routes where we can directly call Telegram API
 */
export async function sendTelegramStatusNotification(data: StatusNotificationData): Promise<boolean> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      const missingVars = [];
      if (!botToken) missingVars.push('TELEGRAM_BOT_TOKEN');
      if (!chatId) missingVars.push('TELEGRAM_CHAT_ID');
      
      console.error('[Telegram] Bot not configured. Missing:', missingVars.join(', '));
      return false;
    }

    const statusUpper = data.status.toUpperCase();
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

    const amountText = data.amount ? `\n💰 *Amount:* ₹${(data.amount / 100).toLocaleString('en-IN')}` : '';
    const phonepeText = data.phonepeOrderId ? `\n📱 *PhonePe Order ID:* ${data.phonepeOrderId}` : '';

    const message = `${emoji} *${statusText}*\n\n` +
      `📦 *Order ID:* ${data.orderId}${amountText}${phonepeText}\n` +
      `\nOrder status has been updated.`;

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData.ok) {
      console.error('Telegram API error:', {
        status: response.status,
        statusText: response.statusText,
        errorCode: responseData.error_code,
        description: responseData.description,
        parameters: responseData.parameters,
      });
      return false;
    }

    console.log('[Telegram] Status notification sent successfully:', {
      messageId: responseData.result?.message_id,
      chatId: responseData.result?.chat?.id,
      orderId: data.orderId,
      status: data.status,
    });

    return true;
  } catch (error) {
    console.error('[Telegram] Error sending status notification:', error);
    return false;
  }
}

