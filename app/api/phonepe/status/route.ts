import { NextRequest, NextResponse } from 'next/server';
import { initializePhonePeClient } from '@/lib/phonepe';
import { PhonePeException } from 'pg-sdk-node';

/**
 * PhonePe Order Status Check API
 * Checks the current status of a payment order
 * 
 * GET /api/phonepe/status?orderId=<merchantOrderId>
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Initialize PhonePe SDK client
    const phonepeClient = initializePhonePeClient();

    // Check order status
    const orderStatus = await phonepeClient.getOrderStatus(orderId);

    return NextResponse.json({
      success: true,
      orderId: orderId,
      state: orderStatus.state,
      amount: orderStatus.amount,
      paymentDetails: orderStatus.paymentDetails,
    });

  } catch (error: any) {
    console.error('Error checking PhonePe order status:', error);
    
    // Handle PhonePeException specifically
    if (error instanceof PhonePeException) {
      console.error('PhonePe Exception Details:', {
        httpStatus: error.httpStatus,
        errorCode: error.errorCode,
        message: error.message,
        data: error.data,
      });
      
      return NextResponse.json(
        { 
          error: error.message || 'Failed to check order status',
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
        error: error.message || 'Failed to check order status',
        success: false 
      },
      { status: 500 }
    );
  }
}

