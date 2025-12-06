import { NextRequest, NextResponse } from 'next/server';
import { initializePhonePeClient, convertToPaise } from '@/lib/phonepe';
import { StandardCheckoutPayRequest, PhonePeException } from 'pg-sdk-node';

/**
 * PhonePe Payment Initiation API
 * Creates a payment request and returns the checkout URL
 * 
 * POST /api/phonepe/initiate
 * Body: { orderId, amount, customerPhone, redirectUrl }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, customerPhone, redirectUrl, failureUrl } = body;

    // Use environment variables if set, otherwise use provided URLs
    const successRedirectUrl = process.env.PHONEPE_REDIRECT_URL_SUCCESS || redirectUrl;
    const failureRedirectUrl = process.env.PHONEPE_REDIRECT_URL_FAILURE || failureUrl || redirectUrl;

    // Validate required fields
    if (!orderId || !amount || !successRedirectUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: orderId, amount, and redirectUrl are required' },
        { status: 400 }
      );
    }

    // Convert amount to paise (PhonePe expects amount in paise)
    const amountInPaise = convertToPaise(amount);

    // Initialize PhonePe SDK client
    const phonepeClient = initializePhonePeClient();

    // Build payment request
    // Note: PhonePe uses a single redirectUrl that handles both success and failure
    // The actual status is checked on the redirect page
    // We use success URL as the redirect, and check status on that page
    const paymentRequest = StandardCheckoutPayRequest.builder()
      .merchantOrderId(orderId)
      .amount(amountInPaise)
      .redirectUrl(successRedirectUrl)
      .build();
    
    // Log redirect URLs for debugging
    console.log('PhonePe payment initiated:', {
      orderId,
      successUrl: successRedirectUrl,
      failureUrl: failureRedirectUrl,
    });

    // Initiate payment
    const response = await phonepeClient.pay(paymentRequest);
    const checkoutUrl = response.redirectUrl;

    if (!checkoutUrl) {
      throw new Error('Payment URL not received from PhonePe');
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: checkoutUrl,
      orderId: orderId,
    });

  } catch (error: any) {
    console.error('Error initiating PhonePe payment:', error);
    
    // Handle PhonePeException specifically to get detailed error information
    if (error instanceof PhonePeException) {
      // PhonePeException extends Error, so we can access standard error properties
      // Additional properties may be available but TypeScript may not recognize them
      const errorDetails: any = {
        message: error.message,
        name: error.name,
      };
      
      // Try to access additional properties if they exist
      if ('errorCode' in error) errorDetails.errorCode = (error as any).errorCode;
      if ('httpStatus' in error) errorDetails.httpStatus = (error as any).httpStatus;
      if ('data' in error) errorDetails.data = (error as any).data;
      
      console.error('PhonePe Exception Details:', errorDetails);
      
      return NextResponse.json(
        { 
          error: error.message || 'Payment initiation failed',
          errorCode: errorDetails.errorCode,
          httpStatus: errorDetails.httpStatus,
          data: errorDetails.data,
          success: false 
        },
        { status: errorDetails.httpStatus || 500 }
      );
    }
    
    // Handle generic errors
    return NextResponse.json(
      { 
        error: error.message || 'Failed to initiate payment',
        success: false 
      },
      { status: 500 }
    );
  }
}

