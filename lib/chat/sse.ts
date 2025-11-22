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
  // Try exact match first
  let connections = sseConnections.get(customerId);
  
  // If not found, try to find by partial match (in case of any ID mismatch)
  if (!connections || connections.length === 0) {
    // Check all connections for partial match
    for (const [storedCustomerId, conns] of sseConnections.entries()) {
      if (storedCustomerId === customerId || 
          storedCustomerId.includes(customerId) || 
          customerId.includes(storedCustomerId)) {
        connections = conns;
        console.log(`Found connection with partial match: ${storedCustomerId} for ${customerId}`);
        break;
      }
    }
  }
  
  console.log('Broadcasting to customer:', {
    customerId,
    hasConnections: !!connections,
    connectionCount: connections?.length || 0,
    allCustomerIds: Array.from(sseConnections.keys()),
  });
  
  if (connections && connections.length > 0) {
    const message = `data: ${JSON.stringify(data)}\n\n`;
    const encoder = new TextEncoder();
    let successCount = 0;
    connections.forEach((controller, index) => {
      try {
        controller.enqueue(encoder.encode(message));
        successCount++;
        console.log(`Successfully sent SSE message to connection ${index} for customer ${customerId}`);
      } catch (error) {
        console.error(`Error sending SSE message to connection ${index}:`, error);
        // Remove dead connection
        removeSSEConnection(customerId, controller);
      }
    });
    console.log(`Broadcast complete: ${successCount}/${connections.length} connections successful`);
  } else {
    console.warn(`No active SSE connections found for customerId: ${customerId}`);
    console.warn('Available customerIds:', Array.from(sseConnections.keys()));
  }
}

export function createSSEStream(customerId: string): ReadableStream {
  let keepAliveInterval: NodeJS.Timeout | null = null;
  let currentController: ReadableStreamDefaultController | null = null;
  const encoder = new TextEncoder();

  return new ReadableStream({
    start(controller) {
      try {
        currentController = controller;
        console.log('SSE stream started for customerId:', customerId);
        
        // Send initial connection message
        const initialMessage = `data: ${JSON.stringify({ type: 'connected' })}\n\n`;
        controller.enqueue(encoder.encode(initialMessage));
        console.log('Sent initial connection message');

        // Add connection
        addSSEConnection(customerId, controller);

        // Send keepalive every 15 seconds (more frequent for better connection stability)
        keepAliveInterval = setInterval(() => {
          try {
            if (controller) {
              controller.enqueue(encoder.encode(`: keepalive\n\n`));
              console.log('Sent keepalive for customerId:', customerId);
            }
          } catch (error) {
            console.error('Error sending keepalive:', error);
            if (keepAliveInterval) {
              clearInterval(keepAliveInterval);
            }
          }
        }, 15000);
      } catch (error) {
        console.error('Error in SSE stream start:', error);
        throw error;
      }
    },
    cancel() {
      console.log('SSE stream cancelled for customerId:', customerId);
      if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
        keepAliveInterval = null;
      }
      if (currentController) {
        removeSSEConnection(customerId, currentController);
        currentController = null;
      }
    },
  });
}

