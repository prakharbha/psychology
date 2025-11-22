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
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: update.callback_query.id,
                text: session ? 'Type your reply below' : 'Customer session not found',
                show_alert: !session,
              }),
            });
          }
          
          // If session exists, we can optionally send a prompt message
          // The actual reply will come through the regular message handler
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
        // The original message format includes customer ID in multiple formats:
        // Markdown: `*Customer ID:* \`customer_xxx\``
        // Plain text: `Customer ID: customer_xxx`
        const originalText = replyToMessage.text;
        
        // Try Markdown format first
        let customerIdMatch = originalText.match(/Customer ID:.*?`([^`]+)`/);
        
        // If not found, try plain text format
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/Customer ID:\s*([^\n]+)/);
        }
        
        // Also try without backticks (plain text after colon)
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/\*Customer ID:\*\s*([^\n*]+)/);
        }
        
        if (customerIdMatch && customerIdMatch[1] && message.text) {
          let customerId = customerIdMatch[1].trim();
          
          // Try to find session with exact match first
          let session = getSession(customerId);
          
          // If not found, try to find by partial match (in case of formatting issues)
          if (!session) {
            // Get all sessions and try to match
            const { getAllSessions } = await import('@/lib/chat/session');
            const allSessions = getAllSessions();
            const matchingSession = allSessions.find(s => 
              s.customerId === customerId || 
              s.customerId.includes(customerId) ||
              customerId.includes(s.customerId)
            );
            if (matchingSession) {
              customerId = matchingSession.customerId;
              session = matchingSession;
            }
          }

          console.log('Processing admin reply:', {
            extractedCustomerId: customerIdMatch[1].trim(),
            finalCustomerId: customerId,
            hasSession: !!session,
            messageText: message.text.substring(0, 50),
            originalTextPreview: originalText.substring(0, 100),
          });
          
          // Import SSE functions to check connections
          const { broadcastToCustomer } = await import('@/lib/chat/sse');

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
            console.log('Message added to session:', customerId);

            // Broadcast to customer via SSE
            broadcastToCustomer(customerId, {
              type: 'new_message',
              message: adminMessage,
            });

            console.log('Admin reply processed and broadcasted:', customerId);
            return NextResponse.json({ ok: true });
          } else {
            console.warn('No session found for customerId:', {
              extracted: customerIdMatch[1].trim(),
              final: customerId,
            });
          }
        } else {
          console.warn('Could not extract customerId from message:', {
            originalText: originalText.substring(0, 200),
            hasText: !!message.text,
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

