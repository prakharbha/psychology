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
          error: error.message || 'Failed to check order status',
          errorCode: errorDetails.errorCode,
          httpStatus: errorDetails.httpStatus,
          data: errorDetails.data,
          success: false 
        },
        { status: errorDetails.httpStatus || 500 }
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

