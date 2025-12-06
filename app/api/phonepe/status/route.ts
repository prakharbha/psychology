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
    // According to PhonePe docs: PhonePeException has code, message, httpStatusCode, and data
    if (error instanceof PhonePeException) {
      const errorDetails: any = {
        message: error.message,
        name: error.name,
      };
      
      // Access PhonePeException properties as per documentation
      if ('code' in error) errorDetails.code = (error as any).code;
      if ('httpStatusCode' in error) errorDetails.httpStatusCode = (error as any).httpStatusCode;
      if ('data' in error) errorDetails.data = (error as any).data;
      
      console.error('PhonePe Exception Details:', errorDetails);
      
      return NextResponse.json(
        { 
          error: error.message || 'Failed to check order status',
          code: errorDetails.code,
          httpStatusCode: errorDetails.httpStatusCode,
          data: errorDetails.data,
          success: false 
        },
        { status: errorDetails.httpStatusCode || 500 }
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

