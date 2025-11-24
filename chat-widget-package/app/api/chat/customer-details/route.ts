import { NextRequest, NextResponse } from 'next/server';
import { getClientInfo } from '@/lib/chat/utils';

export async function GET(request: NextRequest) {
  try {
    const clientInfo = getClientInfo(request);
    return NextResponse.json({
      success: true,
      data: clientInfo,
    });
  } catch (error) {
    console.error('Error in customer details API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

