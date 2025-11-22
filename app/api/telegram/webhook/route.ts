import { NextRequest, NextResponse } from 'next/server';
import { TelegramWebhookUpdate } from '@/types/chat';
import { broadcastToCustomer } from '@/lib/chat/sse';
import { Message } from '@/types/chat';
import { getCustomer, getAllCustomersByEmail, saveMessage, getActiveSessions } from '@/lib/chat/db';

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
        // Handle both Markdown italic format (_Customer ID: xxx_) and plain text
        // Customer ID format: customer_TIMESTAMP_RANDOM or customerTIMESTAMPRANDOM
        let customerIdMatch = originalText.match(/Customer ID:\s*([^\n_*]+)/);
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/\*Customer ID:\*\s*([^\n*]+)/);
        }
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/Customer ID:.*?`([^`]+)`/);
        }
        if (!customerIdMatch) {
          // Try italic format: _Customer ID: xxx_
          customerIdMatch = originalText.match(/_Customer ID:\s*([^_\n]+)_/);
        }
        
        const email = emailMatch ? emailMatch[1].trim() : null;
        let customerId = customerIdMatch ? customerIdMatch[1].trim() : null;
        
        // Normalize customerId: if it's missing underscores, try to add them
        // Format: customer_TIMESTAMP_RANDOM
        if (customerId && customerId.startsWith('customer') && !customerId.includes('_')) {
          // Try to reconstruct: customer_TIMESTAMP_RANDOM
          // Pattern: customer + 13 digits (timestamp) + random string
          const normalized = customerId.match(/^customer(\d{13})(\w+)$/);
          if (normalized) {
            customerId = `customer_${normalized[1]}_${normalized[2]}`;
            console.log('Normalized customerId:', customerId);
          }
        }
        
        console.log('Extracted identifiers:', { email, customerId, originalTextPreview: originalText.substring(0, 200) });
        
        if ((email || customerId) && message.text) {
          console.log('Processing admin reply:', {
            email,
            customerId,
            messageText: message.text.substring(0, 50),
          });
          
          console.log('🔍 Searching for customer. Email:', email, 'CustomerId:', customerId);
          
          // Get customer from database to get the correct customerId
          let finalCustomerId = customerId;
          let dbCustomer = null;
          
          // Import SSE functions to check active connections
          const { getSSEConnectionInfo } = await import('@/lib/chat/sse');
          const activeSSEConnections = getSSEConnectionInfo();
          const activeSSEIds = activeSSEConnections.map(c => c.customerId);
          console.log('🔍 Active SSE connections:', activeSSEIds);
          
          // Strategy: Prioritize customerId with active SSE connection
          if (email) {
            // Get all customers with this email (might be duplicates)
            const allCustomersWithEmail = await getAllCustomersByEmail(email);
            console.log(`Found ${allCustomersWithEmail.length} customer(s) with email ${email}`);
            
            // Check which customer has an active SSE connection
            let customerIdWithSSE: string | null = null;
            for (const customer of allCustomersWithEmail) {
              if (activeSSEIds.includes(customer.id)) {
                customerIdWithSSE = customer.id;
                dbCustomer = customer;
                console.log('✅ Found customer with active SSE connection:', customerIdWithSSE);
                break;
              }
            }
            
            if (customerIdWithSSE) {
              // Use the customerId that has active SSE
              finalCustomerId = customerIdWithSSE;
              console.log('✅ Using customerId with active SSE:', finalCustomerId);
            } else if (allCustomersWithEmail.length > 0) {
              // No SSE connection found, use the most recent customer
              dbCustomer = allCustomersWithEmail[0];
              finalCustomerId = dbCustomer.id;
              console.log('⚠️ No active SSE connection, using most recent customer:', finalCustomerId);
              console.log('⚠️ Available SSE connections:', activeSSEIds);
            } else {
              console.log('⚠️ No customers found in database for email:', email);
              // Last resort: check if any active SSE connection might belong to this email
              // (by checking if customerId matches the pattern)
              if (customerId && activeSSEIds.includes(customerId)) {
                finalCustomerId = customerId;
                console.log('⚠️ Using extracted customerId with active SSE:', customerId);
              } else if (customerId) {
                finalCustomerId = customerId;
                console.log('⚠️ Using extracted customerId as fallback:', customerId);
              }
            }
          } else if (customerId) {
            // No email, try customerId
            dbCustomer = await getCustomer(customerId);
            if (dbCustomer) {
              finalCustomerId = dbCustomer.id;
              console.log('✅ Found customer in database by customerId:', dbCustomer.id);
            } else {
              // Check if this customerId has active SSE
              if (activeSSEIds.includes(customerId)) {
                finalCustomerId = customerId;
                console.log('✅ Using customerId with active SSE (not in DB):', customerId);
              } else {
                finalCustomerId = customerId;
                console.log('⚠️ Using customerId from message (no SSE, not in DB):', customerId);
              }
            }
          }
          
          if (!finalCustomerId) {
            console.error('❌ Cannot determine customerId for broadcast');
            return NextResponse.json({
              ok: false,
              error: 'Could not determine customerId',
              email,
              customerId,
            }, { status: 400 });
          }
          
          // We'll try to broadcast to the customerId from database
          const { broadcastToCustomer } = await import('@/lib/chat/sse');
          
          // Create admin message
          const adminMessage: Message = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            customerId: finalCustomerId,
            text: message.text,
            sender: 'admin',
            timestamp: new Date(),
            telegramMessageId: message.message_id,
          };

          console.log('📡 Broadcasting message to customerId:', finalCustomerId);
          console.log('📋 Message details:', {
            messageId: adminMessage.id,
            text: adminMessage.text.substring(0, 50),
            customerId: adminMessage.customerId,
          });
          
          // Broadcast to the customerId from database
          broadcastToCustomer(finalCustomerId, {
            type: 'new_message',
            message: adminMessage,
          });
          
          console.log('✅ Broadcast function called for customerId:', finalCustomerId);
          
          // Save message to database
          try {
            await saveMessage(adminMessage);
            console.log('✅ Message saved to database');
            
            const allSessions = await getActiveSessions();
            console.log('📊 Total active sessions in database:', allSessions.length);
          } catch (error) {
            console.error('Error saving message to database:', error);
          }

          console.log(`✅ Admin reply processed. CustomerId: ${finalCustomerId}`);
          return NextResponse.json({ 
            ok: true, 
            email, 
            customerId: finalCustomerId,
            messageId: adminMessage.id,
            note: 'Message saved to database and broadcasted via SSE'
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

