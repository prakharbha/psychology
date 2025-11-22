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

    // Check if customer exists in database
    let currentCustomer: Customer | null = customerId ? await getCustomer(customerId) : null;
    let isFirstMessage = !currentCustomer; // First message if customer doesn't exist

    // If this is the first message, create customer
    if (!currentCustomer) {
      if (!customer) {
        return NextResponse.json(
          { error: 'Customer details are required for first message' },
          { status: 400 }
        );
      }

      // Validate customer data
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

      // Get client info
      const clientInfo = getClientInfo(request);
      const pageUrl = customer.pageUrl || request.headers.get('referer') || 'Unknown';

      // Use provided customerId if valid, otherwise generate new one
      // This ensures consistency between frontend and backend
      const finalCustomerId = customerId && customerId.startsWith('customer_') 
        ? customerId 
        : generateCustomerId();

      // Create customer
      currentCustomer = {
        id: finalCustomerId,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        pageUrl,
        ...clientInfo,
        createdAt: new Date(),
      };

      // Save customer to database
      await saveCustomer(currentCustomer);
      console.log('Created new customer in database:', finalCustomerId);
    } else {
      console.log('Using existing customer from database:', currentCustomer.id);
    }

    // Create message
    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      customerId: currentCustomer.id,
      text: message.trim(),
      sender: 'customer',
      timestamp: new Date(),
    };

    // Save message to database
    await saveMessage(newMessage);
    
    // Update session activity
    await createOrUpdateSession(currentCustomer.id);

    // Send to Telegram
    let telegramError: string | null = null;
    try {
      const telegramMessageId = await sendMessageToTelegram({
        customerId: currentCustomer.id,
        customer: currentCustomer,
        message: newMessage.text,
        messageId: newMessage.id,
        isFirstMessage, // Pass flag to show full details only on first message
      });

      if (telegramMessageId) {
        newMessage.telegramMessageId = telegramMessageId;
        // Update message in database with Telegram message ID
        await saveMessage({ ...newMessage, telegramMessageId });
        console.log(`Message sent to Telegram successfully. Message ID: ${telegramMessageId}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown Telegram error';
      console.error('Error sending message to Telegram:', error);
      telegramError = errorMessage;
      // Don't fail the request if Telegram fails - message is stored in session
      // But log it for debugging
    }

    return NextResponse.json({
      success: true,
      customerId: currentCustomer.id,
      message: newMessage,
      telegramError: telegramError || undefined, // Include error if Telegram failed
    });
  } catch (error) {
    console.error('Error in send message API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

