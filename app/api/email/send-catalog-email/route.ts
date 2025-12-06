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

    const emailSent = await sendAdminCatalogEmail(data);

    return NextResponse.json({
      success: true,
      emailSent,
    });

  } catch (error: any) {
    console.error('Error sending catalog email:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to send email',
        success: false 
      },
      { status: 500 }
    );
  }
}

