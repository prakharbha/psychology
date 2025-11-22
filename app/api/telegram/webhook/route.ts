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
        // Extract email from the message text (primary identifier)
        const originalText = message.text;
        
        // Format 1: "Email: email@example.com" or "*Email:* email@example.com"
        let emailMatch = originalText.match(/\*Email:\*\s*([^\n]+)/);
        if (!emailMatch) {
          emailMatch = originalText.match(/Email:\s*([^\n]+)/);
        }
        // Format 2: "Name (email@example.com)" - for subsequent messages
        if (!emailMatch) {
          emailMatch = originalText.match(/\(([^)]+@[^)]+)\)/);
        }
        
        const email = emailMatch ? emailMatch[1].trim() : null;
        
        if (email) {
          // Check if customer is still connected
          const { getAllSessions } = await import('@/lib/chat/session');
          const allSessions = getAllSessions();
          const session = allSessions.find(s => s.customer.email === email);
          
          console.log('Reply button clicked:', {
            email,
            hasSession: !!session,
            activeSessions: allSessions.length,
          });
          
          // Answer callback query
          const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
          if (TELEGRAM_BOT_TOKEN) {
            const responseText = session 
              ? `Reply to this message to respond to ${email}`
              : `Customer may be offline. Reply anyway to send when they reconnect.`;
            
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: update.callback_query.id,
                text: responseText,
                show_alert: false,
              }),
            });
          }
        } else {
          console.warn('Could not extract email from button message');
          
          const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
          if (TELEGRAM_BOT_TOKEN) {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: update.callback_query.id,
                text: 'Please reply to the message directly.',
                show_alert: false,
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
        // Extract email and customer ID from the original message
        const originalText = replyToMessage.text;
        
        // Try to extract email (primary identifier)
        // Format 1: "Email: email@example.com" or "*Email:* email@example.com"
        let emailMatch = originalText.match(/\*Email:\*\s*([^\n]+)/);
        if (!emailMatch) {
          emailMatch = originalText.match(/Email:\s*([^\n]+)/);
        }
        // Format 2: "Name (email@example.com)" - for subsequent messages
        if (!emailMatch) {
          emailMatch = originalText.match(/\(([^)]+@[^)]+)\)/);
        }
        
        // Also try to extract customer ID (fallback)
        let customerIdMatch = originalText.match(/Customer ID:\s*([^\n]+)/);
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/\*Customer ID:\*\s*([^\n*]+)/);
        }
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/Customer ID:.*?`([^`]+)`/);
        }
        
        const email = emailMatch ? emailMatch[1].trim() : null;
        const customerId = customerIdMatch ? customerIdMatch[1].trim() : null;
        
        if ((email || customerId) && message.text) {
          console.log('Processing admin reply:', {
            email,
            customerId,
            messageText: message.text.substring(0, 50),
          });
          
          // Find session by email first (more reliable), then by customerId
          let session = null;
          let finalCustomerId = customerId;
          
          console.log('Searching for session. Email:', email, 'CustomerId:', customerId);
          
          if (email) {
            // Search all sessions for matching email
            const { getAllSessions } = await import('@/lib/chat/session');
            const allSessions = getAllSessions();
            console.log('Total active sessions:', allSessions.length);
            console.log('All session emails:', allSessions.map(s => s.customer.email));
            
            session = allSessions.find(s => s.customer.email === email);
            if (session) {
              finalCustomerId = session.customerId;
              console.log('✅ Found session by email:', email, '-> customerId:', finalCustomerId);
            } else {
              console.log('❌ No session found for email:', email);
            }
          }
          
          // Fallback to customerId if email didn't match
          if (!session && customerId) {
            console.log('Trying fallback: searching by customerId:', customerId);
            session = getSession(customerId);
            if (session) {
              console.log('✅ Found session by customerId');
            } else {
              console.log('❌ No session found by customerId');
            }
          }
          
          // Use the best identifier we have
          const identifier = finalCustomerId || email || 'unknown';
          
          // Create admin message
          const adminMessage: Message = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            customerId: identifier,
            text: message.text,
            sender: 'admin',
            timestamp: new Date(),
            telegramMessageId: message.message_id,
          };

          // Try to add to session if it exists
          if (session) {
            addMessage(session.customerId, adminMessage);
            console.log('Message added to session for email:', email);
          } else {
            console.log('No active session, but will still broadcast to:', identifier);
          }

          // Always try to broadcast via SSE (customer might still be connected)
          const { broadcastToCustomer } = await import('@/lib/chat/sse');
          
          console.log('📡 Broadcasting message to customer...');
          
          // Try broadcasting to both identifiers to maximize delivery chance
          if (finalCustomerId) {
            console.log('Broadcasting to customerId:', finalCustomerId);
            broadcastToCustomer(finalCustomerId, {
              type: 'new_message',
              message: adminMessage,
            });
          }
          if (email && email !== finalCustomerId) {
            console.log('Broadcasting to email:', email);
            broadcastToCustomer(email, {
              type: 'new_message',
              message: adminMessage,
            });
          }

          console.log('✅ Admin reply processed:', { email, customerId: finalCustomerId, hasSession: !!session, messageAdded: !!session });
          return NextResponse.json({ ok: true, delivered: !!session, email, customerId: finalCustomerId });
        } else {
          console.warn('Could not extract email or customerId from message:', {
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

