import { NextRequest, NextResponse } from 'next/server';
import { initializePhonePeClient, convertToPaise } from '@/lib/phonepe';
import { StandardCheckoutPayRequest } from 'pg-sdk-node';

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
    return NextResponse.json(
      { 
        error: error.message || 'Failed to initiate payment',
        success: false 
      },
      { status: 500 }
    );
  }
}

