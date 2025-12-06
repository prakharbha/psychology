import { NextRequest, NextResponse } from 'next/server';
import { sendAdminCatalogEmail, type CatalogDownloadData } from '@/lib/email';

/**
 * Send admin email for catalog download request
 * 
 * POST /api/email/send-catalog-email
 * Body: CatalogDownloadData
 */
export async function POST(request: NextRequest) {
  try {
    const data: CatalogDownloadData = await request.json();

    // Validate required fields
    if (!data.name || !data.mobile) {
      return NextResponse.json(
        { error: 'Missing required fields: name and mobile are required' },
        { status: 400 }
      );
    }

    console.log('Attempting to send catalog email for:', data.name, data.mobile);
    const emailSent = await sendAdminCatalogEmail(data);

    if (!emailSent) {
      console.warn('Email sending returned false for catalog download:', data);
    }

    return NextResponse.json({
      success: true,
      emailSent,
    });

  } catch (error: any) {
    console.error('Error sending catalog email:', error);
    console.error('Error stack:', error?.stack);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to send email',
        success: false,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

