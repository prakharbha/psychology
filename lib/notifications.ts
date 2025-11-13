// Order notification utilities using Telegram Bot API

export interface OrderNotificationData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    productName: string;
    packSize: number;
    quantity: number;
    price: number;
  }>;
  total: number;
  paymentMethod: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

/**
 * Send order notification to Telegram
 * Requires Telegram bot token and chat ID in environment variables
 */
export async function sendTelegramNotification(data: OrderNotificationData): Promise<boolean> {
  try {
    // Format order details for Telegram message
    const itemsText = data.items
      .map(
        (item) =>
          `• ${item.productName} (Pack of ${item.packSize}) × ${item.quantity} - ₹${item.price.toLocaleString('en-IN')}`
      )
      .join('\n');

    const message = `🛒 *New Order Received*\n\n` +
      `📦 *Order ID:* ${data.orderId}\n\n` +
      `👤 *Customer Details:*\n` +
      `Name: ${data.customerName}\n` +
      `Email: ${data.customerEmail}\n` +
      `Phone: ${data.customerPhone}\n\n` +
      `📋 *Items:*\n${itemsText}\n\n` +
      `💰 *Total: ₹${data.total.toLocaleString('en-IN')}*\n\n` +
      `💳 *Payment Method:* ${data.paymentMethod}\n\n` +
      `📍 *Shipping Address:*\n` +
      `${data.shippingAddress.address}\n` +
      `${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.pincode}`;

    // Call API route to send Telegram message with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await fetch('/api/telegram/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Telegram API error:', errorData);
        return false;
      }

      return true;
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        console.error('Telegram notification timeout');
      } else {
        console.error('Failed to send Telegram notification:', error);
      }
      return false;
    }
  } catch (error) {
    console.error('Failed to prepare Telegram notification:', error);
    return false;
  }
}

/**
 * Generate unique order ID
 */
export function generateOrderId(): string {
  const timestamp = Date.now();
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
  return `ORD-${timestamp}-${randomLetter}`;
}
