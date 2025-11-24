import { NextRequest, NextResponse } from 'next/server';
import { TelegramWebhookUpdate } from '@/types/chat';
import { Message } from '@/types/chat';
import { getCustomer, getAllCustomersByEmail, saveMessage, createOrUpdateSession } from '@/lib/chat/db';

export async function POST(request: NextRequest) {
  try {
    const update: TelegramWebhookUpdate = await request.json();

    if (update.callback_query) {
      const callbackData = update.callback_query.data;
      const message = update.callback_query.message;
      
      if (callbackData?.startsWith('reply_') && message?.text) {
        const originalText = message.text;
        
        let emailMatch = originalText.match(/\*Email:\*\s*([^\n]+)/);
        if (!emailMatch) {
          emailMatch = originalText.match(/Email:\s*([^\n]+)/);
        }
        if (!emailMatch) {
          emailMatch = originalText.match(/\(([^)]+@[^)]+)\)/);
        }
        
        const email = emailMatch ? emailMatch[1].trim() : null;
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        
        if (TELEGRAM_BOT_TOKEN) {
          const responseText = email 
            ? `Reply to this message to respond to ${email}`
            : 'Please reply to the message directly.';
          
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
      }
    }

    if (update.message && update.message.text) {
      const message = update.message;
      const replyToMessage = message.reply_to_message;

      if (replyToMessage && replyToMessage.text) {
        const originalText = replyToMessage.text;
        
        let emailMatch = originalText.match(/\*Email:\*\s*([^\n]+)/);
        if (!emailMatch) {
          emailMatch = originalText.match(/Email:\s*([^\n]+)/);
        }
        if (!emailMatch) {
          emailMatch = originalText.match(/\(([^)]+@[^)]+)\)/);
        }
        
        let customerIdMatch = originalText.match(/Customer ID:\s*([^\n_*]+)/);
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/\*Customer ID:\*\s*([^\n*]+)/);
        }
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/Customer ID:.*?`([^`]+)`/);
        }
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/_Customer ID:\s*([^_\n]+)_/);
        }
        
        const email = emailMatch ? emailMatch[1].trim() : null;
        let customerId = customerIdMatch ? customerIdMatch[1].trim() : null;
        
        if (customerId && customerId.startsWith('customer') && !customerId.includes('_')) {
          const normalized = customerId.match(/^customer(\d{13})(\w+)$/);
          if (normalized) {
            customerId = `customer_${normalized[1]}_${normalized[2]}`;
          }
        }
        
        if ((email || customerId) && message.text) {
          let finalCustomerId = customerId;
          
          if (email) {
            const allCustomersWithEmail = await getAllCustomersByEmail(email);
            if (allCustomersWithEmail.length > 0) {
              finalCustomerId = allCustomersWithEmail[0].id;
            } else if (customerId) {
              finalCustomerId = customerId;
            }
          } else if (customerId) {
            const dbCustomer = await getCustomer(customerId);
            if (dbCustomer) {
              finalCustomerId = dbCustomer.id;
            } else {
              finalCustomerId = customerId;
            }
          }
          
          if (!finalCustomerId) {
            return NextResponse.json({
              ok: false,
              error: 'Could not determine customerId',
            }, { status: 400 });
          }
          
          const adminMessage: Message = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            customerId: finalCustomerId,
            text: message.text,
            sender: 'admin',
            timestamp: new Date(),
            telegramMessageId: message.message_id,
          };

          try {
            await saveMessage(adminMessage);
            await createOrUpdateSession(finalCustomerId);
          } catch (error) {
            console.error('Error saving message to database:', error);
            throw error;
          }

          return NextResponse.json({ 
            ok: true, 
            email, 
            customerId: finalCustomerId,
            messageId: adminMessage.id,
          });
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error in Telegram webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}

