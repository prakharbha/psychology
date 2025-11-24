import { NextRequest, NextResponse } from 'next/server';
import { sendMessageToTelegram } from '@/lib/chat/telegram';
import { getClientInfo, validateEmail, validatePhone, generateCustomerId } from '@/lib/chat/utils';
import { Customer, Message } from '@/types/chat';
import { saveCustomer, saveMessage, createOrUpdateSession, getCustomer } from '@/lib/chat/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, message, customer } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    let currentCustomer: Customer | null = customerId ? await getCustomer(customerId) : null;
    
    if (!currentCustomer && customer && customer.email) {
      currentCustomer = await getCustomer(customer.email);
    }
    
    let isFirstMessage = !currentCustomer;

    if (!currentCustomer) {
      if (!customer) {
        return NextResponse.json(
          { error: 'Customer details are required for first message' },
          { status: 400 }
        );
      }

      if (!customer.name || !customer.email || !customer.phone) {
        return NextResponse.json(
          { error: 'Name, email, and phone are required' },
          { status: 400 }
        );
      }

      if (!validateEmail(customer.email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }

      if (!validatePhone(customer.phone)) {
        return NextResponse.json(
          { error: 'Invalid phone format' },
          { status: 400 }
        );
      }

      const clientInfo = getClientInfo(request);
      const pageUrl = customer.pageUrl || request.headers.get('referer') || 'Unknown';

      const finalCustomerId = customerId && customerId.startsWith('customer_') 
        ? customerId 
        : generateCustomerId();

      currentCustomer = {
        id: finalCustomerId,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        pageUrl,
        ...clientInfo,
        createdAt: new Date(),
      };

      await saveCustomer(currentCustomer);
    }

    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      customerId: currentCustomer.id,
      text: message.trim(),
      sender: 'customer',
      timestamp: new Date(),
    };

    await saveMessage(newMessage);
    await createOrUpdateSession(currentCustomer.id);

    let telegramError: string | null = null;
    try {
      const telegramMessageId = await sendMessageToTelegram({
        customerId: currentCustomer.id,
        customer: currentCustomer,
        message: newMessage.text,
        messageId: newMessage.id,
        isFirstMessage,
      });

      if (telegramMessageId) {
        newMessage.telegramMessageId = telegramMessageId;
        try {
          const { sql } = await import('@/lib/chat/db');
          await sql`
            UPDATE chat_messages
            SET telegram_message_id = ${telegramMessageId}
            WHERE id = ${newMessage.id}
          `;
        } catch (error) {
          console.error('Error updating message with Telegram ID:', error);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown Telegram error';
      console.error('Error sending message to Telegram:', error);
      telegramError = errorMessage;
    }

    return NextResponse.json({
      success: true,
      customerId: currentCustomer.id,
      message: newMessage,
      telegramError: telegramError || undefined,
    });
  } catch (error) {
    console.error('Error in send message API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

