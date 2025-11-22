import { Customer, Message } from '@/types/chat';

// Use the same Telegram bot configuration as the rest of the application
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// Support both single chat ID and comma-separated multiple chat IDs
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_CHAT_IDS = TELEGRAM_CHAT_ID?.split(',').map(id => id.trim()).filter(Boolean) || [];

const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export interface TelegramMessageOptions {
  customerId: string;
  customer: Customer;
  message: string;
  messageId?: string;
}

export async function sendMessageToTelegram(options: TelegramMessageOptions): Promise<number | null> {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN is not configured');
  }

  if (TELEGRAM_CHAT_IDS.length === 0) {
    throw new Error('TELEGRAM_CHAT_ID is not configured');
  }

  const { customer, message, customerId, messageId } = options;

  // Format message with customer details
  const messageText = `💬 *New Customer Message*\n\n` +
    `*Customer ID:* \`${customerId}\`\n` +
    `*Name:* ${customer.name}\n` +
    `*Email:* ${customer.email}\n` +
    `*Phone:* ${customer.phone}\n` +
    `*Page URL:* ${customer.pageUrl}\n` +
    (customer.location ? `*Location:* ${customer.location}\n` : '') +
    (customer.browser ? `*Browser:* ${customer.browser}\n` : '') +
    (customer.device ? `*Device:* ${customer.device}\n` : '') +
    (customer.network ? `*Network:* ${customer.network}\n` : '') +
    `\n*Message:*\n${message}\n\n` +
    `_Reply to this message to respond to the customer._`;

  // Create inline keyboard with reply button
  const replyKeyboard = {
    inline_keyboard: [[
      {
        text: '📩 Reply to Customer',
        callback_data: `reply_${customerId}_${messageId || Date.now()}`
      }
    ]]
  };

  let lastMessageId: number | null = null;

  // Send to all configured chat IDs
  for (const chatId of TELEGRAM_CHAT_IDS) {
    try {
      const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'Markdown',
          reply_markup: replyKeyboard,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(`Failed to send message to Telegram chat ${chatId}:`, error);
        continue;
      }

      const data = await response.json();
      if (data.ok && data.result) {
        lastMessageId = data.result.message_id;
      }
    } catch (error) {
      console.error(`Error sending message to Telegram chat ${chatId}:`, error);
    }
  }

  return lastMessageId;
}

export async function sendReplyToCustomer(customerId: string, replyText: string, telegramMessageId: number): Promise<void> {
  // This function is called when admin replies in Telegram
  // The webhook handler will process this and store the message
  // This is just a helper to format the reply
  return Promise.resolve();
}

export async function setWebhook(webhookUrl: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN is not configured');
  }

  try {
    const response = await fetch(`${TELEGRAM_API_URL}/setWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: webhookUrl,
      }),
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

