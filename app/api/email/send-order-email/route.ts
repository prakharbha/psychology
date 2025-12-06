import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail, sendAdminOrderEmail, type OrderEmailData } from '@/lib/email';

/**
 * Send order emails (customer confirmation + admin notification)
 * 
 * POST /api/email/send-order-email
 * Body: OrderEmailData
 */
export async function POST(request: NextRequest) {
  try {
    const data: OrderEmailData = await request.json();

    // Validate required fields
    if (!data.orderId || !data.customerEmail || !data.customerName || !data.items || !data.total) {
      console.error('Missing required fields for order email:', {
        hasOrderId: !!data.orderId,
        hasCustomerEmail: !!data.customerEmail,
        hasCustomerName: !!data.customerName,
        hasItems: !!data.items,
        hasTotal: !!data.total,
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Sending order emails for order:', data.orderId, 'to customer:', data.customerEmail);

    // Send customer email
    const customerEmailSent = await sendOrderConfirmationEmail(data);
    if (!customerEmailSent) {
      console.error('Failed to send customer email for order:', data.orderId);
    }
    
    // Send admin email
    const adminEmailSent = await sendAdminOrderEmail(data);
    if (!adminEmailSent) {
      console.error('Failed to send admin email for order:', data.orderId);
    }

    return NextResponse.json({
      success: true,
      customerEmailSent,
      adminEmailSent,
    });

  } catch (error: any) {
    console.error('Error sending order emails:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to send emails',
        success: false 
      },
      { status: 500 }
    );
  }
}

