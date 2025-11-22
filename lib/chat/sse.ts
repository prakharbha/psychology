// Server-Sent Events (SSE) for real-time message delivery
// This allows pushing admin replies to customers in real-time

// Store active SSE connections
const sseConnections = new Map<string, ReadableStreamDefaultController[]>();

export function addSSEConnection(customerId: string, controller: ReadableStreamDefaultController): void {
  if (!sseConnections.has(customerId)) {
    sseConnections.set(customerId, []);
  }
  sseConnections.get(customerId)!.push(controller);
  console.log('SSE connection added:', {
    customerId,
    totalConnections: sseConnections.get(customerId)!.length,
    allCustomerIds: Array.from(sseConnections.keys()),
  });
}

export function removeSSEConnection(customerId: string, controller: ReadableStreamDefaultController): void {
  const connections = sseConnections.get(customerId);
  if (connections) {
    const index = connections.indexOf(controller);
    if (index > -1) {
      connections.splice(index, 1);
    }
    if (connections.length === 0) {
      sseConnections.delete(customerId);
    }
  }
}

export function broadcastToCustomer(customerId: string, data: any): void {
  const connections = sseConnections.get(customerId);
  console.log('Broadcasting to customer:', {
    customerId,
    hasConnections: !!connections,
    connectionCount: connections?.length || 0,
    allCustomerIds: Array.from(sseConnections.keys()),
  });
  
  if (connections && connections.length > 0) {
    const message = `data: ${JSON.stringify(data)}\n\n`;
    const encoder = new TextEncoder();
    connections.forEach((controller, index) => {
      try {
        controller.enqueue(encoder.encode(message));
        console.log(`Successfully sent SSE message to connection ${index} for customer ${customerId}`);
      } catch (error) {
        console.error(`Error sending SSE message to connection ${index}:`, error);
      }
    });
  } else {
    console.warn(`No active SSE connections found for customerId: ${customerId}`);
  }
}

export function createSSEStream(customerId: string): ReadableStream {
  let keepAliveInterval: NodeJS.Timeout | null = null;
  let currentController: ReadableStreamDefaultController | null = null;

  return new ReadableStream({
    start(controller) {
      currentController = controller;
      // Send initial connection message
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`));

      // Add connection
      addSSEConnection(customerId, controller);

      // Send keepalive every 30 seconds
      keepAliveInterval = setInterval(() => {
        try {
          if (controller) {
            controller.enqueue(encoder.encode(`: keepalive\n\n`));
          }
        } catch (error) {
          if (keepAliveInterval) {
            clearInterval(keepAliveInterval);
          }
        }
      }, 30000);
    },
    cancel() {
      if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
      }
      if (currentController) {
        removeSSEConnection(customerId, currentController);
      }
    },
  });
}

