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
    const { orderId, amount, customerPhone, redirectUrl } = body;

    // Validate required fields
    if (!orderId || !amount || !redirectUrl) {
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
    const paymentRequest = StandardCheckoutPayRequest.builder()
      .merchantOrderId(orderId)
      .amount(amountInPaise)
      .redirectUrl(redirectUrl)
      .build();

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

