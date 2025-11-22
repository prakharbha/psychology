// Server-Sent Events (SSE) for real-time message delivery
// This allows pushing admin replies to customers in real-time

// Store active SSE connections
const sseConnections = new Map<string, ReadableStreamDefaultController[]>();

export function addSSEConnection(customerId: string, controller: ReadableStreamDefaultController): void {
  if (!sseConnections.has(customerId)) {
    sseConnections.set(customerId, []);
  }
  sseConnections.get(customerId)!.push(controller);
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
  if (connections) {
    const message = `data: ${JSON.stringify(data)}\n\n`;
    const encoder = new TextEncoder();
    connections.forEach(controller => {
      try {
        controller.enqueue(encoder.encode(message));
      } catch (error) {
        console.error('Error sending SSE message:', error);
      }
    });
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

