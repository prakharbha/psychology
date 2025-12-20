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
    const chatIdEnv = process.env.TELEGRAM_CHAT_ID;
    // Support both single chat ID and comma-separated multiple chat IDs
    const chatIds = chatIdEnv?.split(',').map(id => id.trim()).filter(Boolean) || [];

    if (!botToken || chatIds.length === 0) {
      const missingVars = [];
      if (!botToken) missingVars.push('TELEGRAM_BOT_TOKEN');
      if (chatIds.length === 0) missingVars.push('TELEGRAM_CHAT_ID');
      
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
    
    // Send to all chat IDs
    const errors: string[] = [];
    let successCount = 0;

    for (const chatId of chatIds) {
      try {
        const response = await fetch(telegramApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
        });

        const responseData = await response.json();

        if (!response.ok || !responseData.ok) {
          errors.push(`Chat ${chatId}: ${responseData.description || 'Unknown error'}`);
          console.error(`[Telegram] Failed to send to chat ${chatId}:`, {
            status: response.status,
            statusText: response.statusText,
            errorCode: responseData.error_code,
            description: responseData.description,
          });
        } else {
          successCount++;
          console.log(`[Telegram] Status notification sent successfully to chat ${chatId}:`, {
            messageId: responseData.result?.message_id,
            orderId: data.orderId,
            status: data.status,
          });
        }
      } catch (error) {
        errors.push(`Chat ${chatId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        console.error(`[Telegram] Error sending to chat ${chatId}:`, error);
      }
    }

    // Return true if at least one message was sent successfully
    return successCount > 0;
  } catch (error) {
    console.error('[Telegram] Error sending status notification:', error);
    return false;
  }
}

