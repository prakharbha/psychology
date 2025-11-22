import { NextRequest, NextResponse } from 'next/server';
import { TelegramWebhookUpdate } from '@/types/chat';
import { addMessage, getSession } from '@/lib/chat/session';
import { broadcastToCustomer } from '@/lib/chat/sse';
import { Message } from '@/types/chat';

export async function POST(request: NextRequest) {
  try {
    const update: TelegramWebhookUpdate = await request.json();

    // Handle callback query (button clicks)
    if (update.callback_query) {
      const callbackData = update.callback_query.data;
      
      // Handle reply button click
      if (callbackData?.startsWith('reply_')) {
        const parts = callbackData.split('_');
        if (parts.length >= 3) {
          const customerId = parts[1];
          
          // Answer callback query to remove loading state
          const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
          if (TELEGRAM_BOT_TOKEN) {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: update.callback_query.id,
                text: 'Type your reply below',
              }),
            });
          }
        }
      }
    }

    // Handle message (admin reply)
    if (update.message && update.message.text) {
      const message = update.message;
      const replyToMessage = message.reply_to_message;

      // Check if this is a reply to a customer message
      if (replyToMessage && replyToMessage.text) {
        // Extract customer ID from the original message
        // The original message format includes customer ID
        const originalText = replyToMessage.text;
        const customerIdMatch = originalText.match(/Customer ID:.*?`([^`]+)`/);
        
        if (customerIdMatch && customerIdMatch[1]) {
          const customerId = customerIdMatch[1];
          const session = getSession(customerId);

          if (session) {
            // Create admin message
            const adminMessage: Message = {
              id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              customerId,
              text: message.text,
              sender: 'admin',
              timestamp: new Date(),
              telegramMessageId: message.message_id,
            };

            // Add message to session
            addMessage(customerId, adminMessage);

            // Broadcast to customer via SSE
            broadcastToCustomer(customerId, {
              type: 'new_message',
              message: adminMessage,
            });

            return NextResponse.json({ ok: true });
          }
        }
      }
    }

    // Return OK for any update we don't handle
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error in Telegram webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Telegram also sends GET requests to verify webhook
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}

