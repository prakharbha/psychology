import { Customer } from '@/types/chat';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_CHAT_IDS = TELEGRAM_CHAT_ID?.split(',').map(id => id.trim()).filter(Boolean) || [];

const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export interface TelegramMessageOptions {
  customerId: string;
  customer: Customer;
  message: string;
  messageId?: string;
  isFirstMessage?: boolean;
}

export async function sendMessageToTelegram(options: TelegramMessageOptions): Promise<number | null> {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN is not configured');
  }

  if (TELEGRAM_CHAT_IDS.length === 0) {
    throw new Error('TELEGRAM_CHAT_ID is not configured');
  }

  const { customer, message, customerId, isFirstMessage = false } = options;

  let messageText: string;
  
  if (isFirstMessage) {
    messageText = `💬 *New Customer Message*\n\n` +
      `*Email:* ${customer.email}\n` +
      `*Name:* ${customer.name}\n` +
      `*Phone:* ${customer.phone}\n` +
      `*Page URL:* ${customer.pageUrl}\n` +
      (customer.location ? `*Location:* ${customer.location}\n` : '') +
      (customer.browser ? `*Browser:* ${customer.browser}\n` : '') +
      (customer.device ? `*Device:* ${customer.device}\n` : '') +
      (customer.network ? `*Network:* ${customer.network}\n` : '') +
      `\n*Message:*\n${message}\n\n` +
      `⚠️ *IMPORTANT:* Use Telegram's REPLY feature (swipe right) to respond\\!\n` +
      `_Customer ID: ${customerId}_`;
  } else {
    messageText = `💬 *${customer.name}* (${customer.email})\n\n${message}\n\n` +
      `⚠️ Use REPLY feature to respond to this customer`;
  }

  const callbackData = 'reply_customer';
  
  const replyKeyboard = {
    inline_keyboard: [[
      {
        text: '📩 Reply to Customer',
        callback_data: callbackData
      }
    ]]
  };

  let lastMessageId: number | null = null;
  let hasSuccess = false;
  const errors: string[] = [];

  for (const chatId of TELEGRAM_CHAT_IDS) {
    try {
      let response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'Markdown',
          reply_markup: replyKeyboard,
        }),
      });

      let data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.error_code === 400 && data.description?.includes('parse')) {
          let plainText: string;
          
          if (isFirstMessage) {
            plainText = `💬 New Customer Message\n\n` +
              `Email: ${customer.email}\n` +
              `Name: ${customer.name}\n` +
              `Phone: ${customer.phone}\n` +
              `Page URL: ${customer.pageUrl}\n` +
              (customer.location ? `Location: ${customer.location}\n` : '') +
              (customer.browser ? `Browser: ${customer.browser}\n` : '') +
              (customer.device ? `Device: ${customer.device}\n` : '') +
              (customer.network ? `Network: ${customer.network}\n` : '') +
              `\nMessage:\n${message}\n\n` +
              `Reply to this message to respond to the customer.\n` +
              `Customer ID: ${customerId}`;
          } else {
            plainText = `💬 ${customer.name} (${customer.email})\n\n${message}\n\n` +
              `Reply to this message to respond to the customer.`;
          }

          response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: plainText,
              reply_markup: replyKeyboard,
            }),
          });

          data = await response.json();
        }

        if (!response.ok || !data.ok) {
          const errorMsg = data.description || `HTTP ${response.status}`;
          console.error(`Failed to send message to Telegram chat ${chatId}:`, {
            error: errorMsg,
            errorCode: data.error_code,
            fullResponse: data,
          });
          errors.push(`Chat ${chatId}: ${errorMsg}`);
          continue;
        }
      }

      if (data.result) {
        lastMessageId = data.result.message_id;
        hasSuccess = true;
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error sending message to Telegram chat ${chatId}:`, error);
      errors.push(`Chat ${chatId}: ${errorMsg}`);
    }
  }

  if (!hasSuccess) {
    throw new Error(`Failed to send to all Telegram chats. Errors: ${errors.join('; ')}`);
  }

  return lastMessageId;
}

export async function sendReplyToCustomer(customerId: string, replyText: string, telegramMessageId: number): Promise<void> {
  return Promise.resolve();
}

export async function setWebhook(webhookUrl: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN is not configured');
  }

  try {
    const response = await fetch(`${TELEGRAM_API_URL}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: webhookUrl }),
    });

    const data = await response.json();
    return data.ok === true;
  } catch (error) {
    console.error('Error setting Telegram webhook:', error);
    return false;
  }
}

export async function getWebhookInfo(): Promise<any> {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN is not configured');
  }

  try {
    const response = await fetch(`${TELEGRAM_API_URL}/getWebhookInfo`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting webhook info:', error);
    return null;
  }
}

