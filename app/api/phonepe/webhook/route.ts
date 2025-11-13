import { NextRequest, NextResponse } from 'next/server';
import { initializePhonePeClient } from '@/lib/phonepe';

/**
 * PhonePe Webhook Handler
 * Receives and validates payment status callbacks from PhonePe
 * 
 * POST /api/phonepe/webhook
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Missing Authorization header' },
        { status: 401 }
      );
    }

    // Get webhook credentials from environment variables
    // These should be configured in PhonePe dashboard
    const webhookUsername = process.env.PHONEPE_WEBHOOK_USERNAME || process.env.PHONEPE_CLIENT_ID;
    const webhookPassword = process.env.PHONEPE_WEBHOOK_PASSWORD || process.env.PHONEPE_CLIENT_SECRET;

    if (!webhookUsername || !webhookPassword) {
      return NextResponse.json(
        { error: 'Webhook credentials not configured' },
        { status: 500 }
      );
    }

    // Initialize PhonePe SDK client
    const phonepeClient = initializePhonePeClient();

    // Validate callback
    // Note: validateCallback throws PhonePeException if invalid
    try {
      const callbackResponse = phonepeClient.validateCallback(
        webhookUsername,
        webhookPassword,
        authHeader,
        body
      );

      // Extract callback data
      const orderId = callbackResponse.payload.orderId;
      const state = callbackResponse.payload.state;
      const eventType = callbackResponse.payload.eventType;

      // Log callback for debugging
      console.log('PhonePe webhook validated:', {
        orderId,
        state,
        eventType,
      });

      // TODO: Process the callback based on event type and state
      // - Update order status in your database
      // - Send notifications
      // - Handle different states (PAYMENT_SUCCESS, PAYMENT_ERROR, etc.)

      return NextResponse.json({ 
        success: true,
        message: 'Webhook processed successfully',
        orderId,
        state,
      });
    } catch (error: any) {
      // PhonePeException is thrown if callback is invalid
      console.error('Invalid PhonePe webhook:', error);
      return NextResponse.json(
        { error: 'Invalid callback signature', details: error.message },
        { status: 401 }
      );
    }

  } catch (error: any) {
    console.error('Error processing PhonePe webhook:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to process webhook',
        success: false 
      },
      { status: 500 }
    );
  }
}

