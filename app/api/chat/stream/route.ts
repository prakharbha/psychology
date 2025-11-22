import { NextRequest } from 'next/server';
import { createSSEStream } from '@/lib/chat/sse';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const customerId = searchParams.get('customerId');

    console.log('SSE stream requested for customerId:', customerId);

    if (!customerId) {
      return new Response('customerId is required', { status: 400 });
    }

    const stream = createSSEStream(customerId);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no', // Disable nginx buffering
      },
    });
  } catch (error) {
    console.error('Error in SSE stream API:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

