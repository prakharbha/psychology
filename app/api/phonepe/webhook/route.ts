import { NextRequest, NextResponse } from 'next/server';
import { initializePhonePeClient } from '@/lib/phonepe';
import { PhonePeException } from 'pg-sdk-node';

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
      // PhonePe webhook events: pg.order.completed, pg.order.failed
      // PhonePe states: PENDING, FAILED, COMPLETED (for orders)
      // Webhook may also use PAYMENT_SUCCESS, PAYMENT_ERROR for callbacks
      const stateUpper = state?.toUpperCase();
      const callbackTypeLower = String(callbackType || '').toLowerCase();
      
      // Handle payment success - check callback type (pg.order.completed) and state (COMPLETED, SUCCESS)
      const isCompleted = 
        callbackTypeLower === 'pg.order.completed' ||
        stateUpper === 'COMPLETED' || 
        stateUpper === 'PAYMENT_SUCCESS' || 
        stateUpper === 'SUCCESS';
      
      if (isCompleted) {
        // TODO: Update order status in database
        // TODO: Send confirmation email
        // TODO: Trigger fulfillment process
        
        // Send Telegram notification for successful payment with order details
        try {
          const { sendTelegramStatusNotification } = await import('@/lib/telegram-notifications');
          await sendTelegramStatusNotification({
            orderId: merchantOrderId,
            status: 'COMPLETED',
            amount: amount,
            phonepeOrderId: callbackResponse.payload.orderId,
          }).catch(err => console.error('[Telegram] Notification failed:', err));
        } catch (telegramError) {
          console.error('[Telegram] Failed to send notification:', telegramError);
        }
      }
      
      // Handle payment failure - check callback type (pg.order.failed) and state (FAILED, ERROR)
      const isFailed = 
        callbackTypeLower === 'pg.order.failed' ||
        stateUpper === 'FAILED' || 
        stateUpper === 'PAYMENT_ERROR' || 
        stateUpper === 'ERROR';
      
      if (isFailed) {
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
          }).catch(err => console.error('[Telegram] Notification failed:', err));
        } catch (telegramError) {
          console.error('[Telegram] Failed to send notification:', telegramError);
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
          }).catch(err => console.error('[Telegram] Notification failed:', err));
        } catch (telegramError) {
          console.error('[Telegram] Failed to send notification:', telegramError);
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
      
      if (error instanceof PhonePeException) {
        console.error('PhonePe Exception Details:', {
          httpStatus: error.httpStatus,
          errorCode: error.errorCode,
          message: error.message,
          data: error.data,
        });
        
        return NextResponse.json(
          { 
            error: error.message || 'Invalid callback signature',
            errorCode: error.errorCode,
            httpStatus: error.httpStatus,
            data: error.data,
          },
          { status: error.httpStatus || 401 }
        );
      }
      
      return NextResponse.json(
        { error: 'Invalid callback signature', details: error.message },
        { status: 401 }
      );
    }

  } catch (error: any) {
    console.error('Error processing PhonePe webhook:', error);
    
    if (error instanceof PhonePeException) {
      console.error('PhonePe Exception Details:', {
        httpStatus: error.httpStatus,
        errorCode: error.errorCode,
        message: error.message,
        data: error.data,
      });
      
      return NextResponse.json(
        { 
          error: error.message || 'Failed to process webhook',
          errorCode: error.errorCode,
          httpStatus: error.httpStatus,
          data: error.data,
          success: false 
        },
        { status: error.httpStatus || 500 }
      );
    }
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to process webhook',
        success: false 
      },
      { status: 500 }
    );
  }
}

