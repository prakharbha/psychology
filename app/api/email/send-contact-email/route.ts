import { NextRequest, NextResponse } from 'next/server';
import { sendAdminContactEmail, type ContactFormData } from '@/lib/email';

/**
 * Send admin email for contact form submission
 * 
 * POST /api/email/send-contact-email
 * Body: ContactFormData
 */
export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    const emailSent = await sendAdminContactEmail(data);

    return NextResponse.json({
      success: true,
      emailSent,
    });

  } catch (error: any) {
    return NextResponse.json(
      { 
        error: error.message || 'Failed to send email',
        success: false 
      },
      { status: 500 }
    );
  }
}

