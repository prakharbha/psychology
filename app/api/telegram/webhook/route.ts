import { NextRequest, NextResponse } from 'next/server';
import { TelegramWebhookUpdate } from '@/types/chat';
import { addMessage, getSession } from '@/lib/chat/session';
import { broadcastToCustomer } from '@/lib/chat/sse';
import { Message } from '@/types/chat';

export async function POST(request: NextRequest) {
  try {
    const update: TelegramWebhookUpdate = await request.json();
    console.log('=== TELEGRAM WEBHOOK RECEIVED ===');
    console.log('Update type:', update.callback_query ? 'callback_query' : update.message ? 'message' : 'unknown');
    console.log('Full update:', JSON.stringify(update, null, 2));

    // Handle callback query (button clicks)
    if (update.callback_query) {
      const callbackData = update.callback_query.data;
      const message = update.callback_query.message;
      
      // Handle reply button click
      if (callbackData?.startsWith('reply_') && message?.text) {
        // Extract customerId from the message text (same as regular reply)
        const originalText = message.text;
        
        // Try multiple formats to extract customer ID
        let customerIdMatch = originalText.match(/Customer ID:.*?`([^`]+)`/);
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/Customer ID:\s*([^\n]+)/);
        }
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/\*Customer ID:\*\s*([^\n*]+)/);
        }
        
        if (customerIdMatch && customerIdMatch[1]) {
          const customerId = customerIdMatch[1].trim();
          const session = getSession(customerId);
          
          console.log('Reply button clicked:', {
            customerId,
            hasSession: !!session,
            messageId: message.message_id,
          });
          
          // Answer callback query to remove loading state
          const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
          if (TELEGRAM_BOT_TOKEN) {
            let responseText = 'Reply to this message to respond to the customer.';
            let showAlert = false;
            
            if (!session) {
              // Check if session expired recently
              const { getAllSessions } = await import('@/lib/chat/session');
              const allSessions = getAllSessions();
              responseText = allSessions.length > 0 
                ? `Session expired. Active sessions: ${allSessions.length}. Reply to the message to try anyway.`
                : 'Session expired or customer disconnected. Reply to the message to try anyway.';
              showAlert = false; // Don't block, let them try
            }
            
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: update.callback_query.id,
                text: responseText,
                show_alert: showAlert,
              }),
            });
          }
        } else {
          console.warn('Could not extract customerId from button message:', {
            originalText: originalText.substring(0, 200),
          });
          
          // Answer with error
          const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
          if (TELEGRAM_BOT_TOKEN) {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: update.callback_query.id,
                text: 'Could not identify customer. Please reply to the message directly.',
                show_alert: true,
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
        const originalText = replyToMessage.text;
        
        // Try multiple formats to extract customer ID
        let customerIdMatch = originalText.match(/Customer ID:.*?`([^`]+)`/);
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/Customer ID:\s*([^\n]+)/);
        }
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/\*Customer ID:\*\s*([^\n*]+)/);
        }
        
        if (customerIdMatch && customerIdMatch[1] && message.text) {
          let customerId = customerIdMatch[1].trim();
          
          console.log('Processing admin reply:', {
            extractedCustomerId: customerId,
            messageText: message.text.substring(0, 50),
          });
          
          // Create admin message (works with or without session)
          const adminMessage: Message = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            customerId,
            text: message.text,
            sender: 'admin',
            timestamp: new Date(),
            telegramMessageId: message.message_id,
          };

          // Try to add to session if it exists
          const session = getSession(customerId);
          if (session) {
            addMessage(customerId, adminMessage);
            console.log('Message added to session:', customerId);
          } else {
            console.log('No session found, but will still broadcast:', customerId);
          }

          // Always try to broadcast via SSE (customer might still be connected)
          const { broadcastToCustomer } = await import('@/lib/chat/sse');
          broadcastToCustomer(customerId, {
            type: 'new_message',
            message: adminMessage,
          });

          console.log('Admin reply broadcasted to customerId:', customerId);
          return NextResponse.json({ ok: true, delivered: !!session });
        } else {
          console.warn('Could not extract customerId from message:', {
            originalText: originalText.substring(0, 200),
          });
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

