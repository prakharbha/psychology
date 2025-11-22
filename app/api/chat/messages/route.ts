import { NextRequest, NextResponse } from 'next/server';
import { getMessages } from '@/lib/chat/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const customerId = searchParams.get('customerId');

    if (!customerId) {
      return NextResponse.json(
        { error: 'customerId is required' },
        { status: 400 }
      );
    }

    const messages = await getMessages(customerId);

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error('Error in get messages API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

