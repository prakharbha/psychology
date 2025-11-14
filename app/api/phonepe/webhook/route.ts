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
      const merchantOrderId = callbackResponse.payload.merchantOrderId || callbackResponse.payload.orderId;
      const state = callbackResponse.payload.state;
      const callbackType = callbackResponse.type;
      const amount = callbackResponse.payload.amount;

      // Log callback for debugging
      console.log('PhonePe webhook validated:', {
        merchantOrderId,
        orderId: callbackResponse.payload.orderId,
        state,
        callbackType,
        amount,
      });

      // Process the callback based on callback type and state
      // PhonePe states: PENDING, FAILED, COMPLETED (for orders)
      // Webhook may also use PAYMENT_SUCCESS, PAYMENT_ERROR for callbacks
      const stateUpper = state?.toUpperCase();
      
      // Handle payment success - check for both COMPLETED (order status) and PAYMENT_SUCCESS (webhook callback)
      if (stateUpper === 'COMPLETED' || stateUpper === 'PAYMENT_SUCCESS' || stateUpper === 'SUCCESS') {
        // TODO: Update order status in database
        // TODO: Send confirmation email
        // TODO: Trigger fulfillment process
        
        // Send Telegram notification for successful payment
        try {
          // Import and call notification API directly
          const { sendTelegramStatusNotification } = await import('@/lib/telegram-notifications');
          await sendTelegramStatusNotification({
            orderId: merchantOrderId,
            status: 'COMPLETED',
            amount: amount,
            phonepeOrderId: callbackResponse.payload.orderId,
          }).catch(err => console.error('Telegram notification failed:', err));
        } catch (telegramError) {
          console.error('Failed to send Telegram notification:', telegramError);
        }
      }
      
      // Handle payment failure - check for both FAILED (order status) and PAYMENT_ERROR (webhook callback)
      if (stateUpper === 'FAILED' || stateUpper === 'PAYMENT_ERROR' || stateUpper === 'ERROR') {
        // TODO: Update order status in database
        // TODO: Send failure notification
        
        // Send Telegram notification for failed payment
        try {
          const { sendTelegramStatusNotification } = await import('@/lib/telegram-notifications');
          await sendTelegramStatusNotification({
            orderId: merchantOrderId,
            status: 'FAILED',
            amount: amount,
            phonepeOrderId: callbackResponse.payload.orderId,
          }).catch(err => console.error('Telegram notification failed:', err));
        } catch (telegramError) {
          console.error('Failed to send Telegram notification:', telegramError);
        }
      }
      
      // Handle pending payment status
      if (stateUpper === 'PENDING' || stateUpper === 'PAYMENT_PENDING') {
        // Send Telegram notification for pending payment
        try {
          const { sendTelegramStatusNotification } = await import('@/lib/telegram-notifications');
          await sendTelegramStatusNotification({
            orderId: merchantOrderId,
            status: 'PENDING',
            amount: amount,
            phonepeOrderId: callbackResponse.payload.orderId,
          }).catch(err => console.error('Telegram notification failed:', err));
        } catch (telegramError) {
          console.error('Failed to send Telegram notification:', telegramError);
        }
      }

      return NextResponse.json({ 
        success: true,
        message: 'Webhook processed successfully',
        merchantOrderId,
        orderId: callbackResponse.payload.orderId,
        state,
        callbackType,
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

