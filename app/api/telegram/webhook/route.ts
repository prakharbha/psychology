import { NextRequest, NextResponse } from 'next/server';
import { TelegramWebhookUpdate } from '@/types/chat';
import { broadcastToCustomer } from '@/lib/chat/sse';
import { Message } from '@/types/chat';
import { getCustomer, saveMessage, getActiveSessions } from '@/lib/chat/db';

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
          // Check if customer exists in database
          const customer = await getCustomer(email);
          const allSessions = await getActiveSessions();
          
          console.log('Reply button clicked:', {
            email,
            hasCustomer: !!customer,
            activeSessions: allSessions.length,
          });
          
          // Answer callback query
          const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
          if (TELEGRAM_BOT_TOKEN) {
            const responseText = customer 
              ? `Reply to this message to respond to ${email}`
              : `Customer not found. Reply anyway to attempt delivery.`;
            
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

      console.log('📬 Received message from Telegram:', {
        hasReplyTo: !!replyToMessage,
        messageText: message.text?.substring(0, 50),
        replyToText: replyToMessage?.text?.substring(0, 50),
      });

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
          
          console.log('🔍 Searching for customer. Email:', email, 'CustomerId:', customerId);
          
          // We'll try to broadcast to multiple possible identifiers
          // Since Vercel is stateless, sessions might not exist, but SSE connections might still be active
          const { broadcastToCustomer } = await import('@/lib/chat/sse');
          
          // Create admin message (use email as primary identifier)
          const adminMessage: Message = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            customerId: customerId || email || 'unknown',
            text: message.text,
            sender: 'admin',
            timestamp: new Date(),
            telegramMessageId: message.message_id,
          };

          console.log('📡 Broadcasting message to customer...');
          
          let broadcastAttempts = 0;
          
          // Try broadcasting to customerId if available
          if (customerId) {
            console.log('Broadcasting to customerId:', customerId);
            broadcastToCustomer(customerId, {
              type: 'new_message',
              message: adminMessage,
            });
            broadcastAttempts++;
          }
          
          // Try broadcasting to email (different from customerId)
          if (email && email !== customerId) {
            console.log('Broadcasting to email:', email);
            broadcastToCustomer(email, {
              type: 'new_message',
              message: adminMessage,
            });
            broadcastAttempts++;
          }
          
          // Save message to database
          try {
            await saveMessage(adminMessage);
            console.log('✅ Message saved to database');
            
            const allSessions = await getActiveSessions();
            console.log('📊 Total active sessions in database:', allSessions.length);
          } catch (error) {
            console.error('Error saving message to database:', error);
          }

          console.log(`✅ Admin reply processed. Broadcast attempts: ${broadcastAttempts}`);
          return NextResponse.json({ 
            ok: true, 
            broadcastAttempts,
            email, 
            customerId,
            note: 'Message broadcasted via SSE. Session storage is stateless on Vercel.'
          });
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

