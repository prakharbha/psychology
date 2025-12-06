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
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send customer email
    const customerEmailSent = await sendOrderConfirmationEmail(data);
    
    // Send admin email
    const adminEmailSent = await sendAdminOrderEmail(data);

    return NextResponse.json({
      success: true,
      customerEmailSent,
      adminEmailSent,
    });

  } catch (error: any) {
    return NextResponse.json(
      { 
        error: error.message || 'Failed to send emails',
        success: false 
      },
      { status: 500 }
    );
  }
}

