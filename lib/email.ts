/**
 * Email Service using Resend
 * Handles sending emails to customers and admins
 * 
 * Environment variable required:
 * - RESEND_API_KEY: Your Resend API key
 */

import { Resend } from 'resend';

const ADMIN_EMAIL = 'prakharpsychology@gmail.com';

// Initialize Resend client
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured in environment variables');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export interface OrderEmailData {
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
  status: 'COMPLETED' | 'FAILED' | 'PENDING';
  shippingAddress?: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  phonepeOrderId?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface CatalogDownloadData {
  name: string;
  mobile: string;
}

/**
 * Send order confirmation email to customer
 * Returns false if customer email is not available (non-blocking)
 */
export async function sendOrderConfirmationEmail(data: OrderEmailData): Promise<boolean> {
  try {
    // Skip if customer email is not available
    if (!data.customerEmail) {
      console.log('Skipping customer email - email not available for order:', data.orderId);
      return false;
    }

    const resend = getResendClient();
    
    const itemsList = data.items && data.items.length > 0
      ? data.items
          .map(item => `• ${item.productName} (Pack of ${item.packSize}) × ${item.quantity} - ₹${item.price.toLocaleString('en-IN')}`)
          .join('\n')
      : 'No items listed';

    const shippingAddressText = data.shippingAddress
      ? `${data.shippingAddress.address}\n${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.pincode}`
      : 'Not provided';

    const emailSubject = data.status === 'COMPLETED' 
      ? `Order Confirmed - Order #${data.orderId}`
      : data.status === 'FAILED'
      ? `Payment Failed - Order #${data.orderId}`
      : `Order Pending - Order #${data.orderId}`;

    const emailContent = data.status === 'COMPLETED'
      ? `
        <h2>Order Confirmed!</h2>
        <p>Dear ${data.customerName},</p>
        <p>Thank you for your order! Your payment has been successfully processed.</p>
        
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> ${data.orderId}</p>
        <p><strong>Total Amount:</strong> ₹${data.total.toLocaleString('en-IN')}</p>
        
        <h3>Items Ordered</h3>
        <pre style="white-space: pre-wrap;">${itemsList}</pre>
        
        <h3>Shipping Address</h3>
        <pre style="white-space: pre-wrap;">${shippingAddressText}</pre>
        
        <p>We will process your order and ship it to you soon. You will receive another email with tracking information once your order is shipped.</p>
        
        <p>If you have any questions, please contact us at ${ADMIN_EMAIL}</p>
        
        <p>Best regards,<br>Prakhar Psychological Testing and Research Centre</p>
      `
      : data.status === 'FAILED'
      ? `
        <h2>Payment Failed</h2>
        <p>Dear ${data.customerName},</p>
        <p>We're sorry, but your payment for order #${data.orderId} could not be processed.</p>
        
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> ${data.orderId}</p>
        <p><strong>Total Amount:</strong> ₹${data.total.toLocaleString('en-IN')}</p>
        
        <p>Please try placing your order again. If you continue to experience issues, please contact us at ${ADMIN_EMAIL}</p>
        
        <p>Best regards,<br>Prakhar Psychological Testing and Research Centre</p>
      `
      : `
        <h2>Order Pending</h2>
        <p>Dear ${data.customerName},</p>
        <p>Your order #${data.orderId} has been received and your payment is being processed.</p>
        
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> ${data.orderId}</p>
        <p><strong>Total Amount:</strong> ₹${data.total.toLocaleString('en-IN')}</p>
        
        <p>We will notify you once your payment is confirmed.</p>
        
        <p>Best regards,<br>Prakhar Psychological Testing and Research Centre</p>
      `;

    await resend.emails.send({
      from: 'Prakhar Psychological Testing <onboarding@resend.dev>',
      to: data.customerEmail,
      replyTo: ADMIN_EMAIL,
      subject: emailSubject,
      html: emailContent,
    });

    console.log('Order confirmation email sent to:', data.customerEmail);
    return true;
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return false;
  }
}

/**
 * Send admin notification email for new order
 */
export async function sendAdminOrderEmail(data: OrderEmailData): Promise<boolean> {
  try {
    const resend = getResendClient();
    
    const itemsList = data.items && data.items.length > 0
      ? data.items
          .map(item => `• ${item.productName} (Pack of ${item.packSize}) × ${item.quantity} - ₹${item.price.toLocaleString('en-IN')}`)
          .join('\n')
      : 'No items listed';

    const shippingAddressText = data.shippingAddress
      ? `${data.shippingAddress.address}\n${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.pincode}`
      : 'Not provided';
    
    const customerDetails = data.customerName || data.customerEmail || data.customerPhone
      ? `
        <h3>Customer Details</h3>
        ${data.customerName ? `<p><strong>Name:</strong> ${data.customerName}</p>` : ''}
        ${data.customerEmail ? `<p><strong>Email:</strong> ${data.customerEmail}</p>` : ''}
        ${data.customerPhone ? `<p><strong>Phone:</strong> ${data.customerPhone}</p>` : ''}
      `
      : '<p><em>Customer details not available</em></p>';

    const statusBadge = data.status === 'COMPLETED' 
      ? '<span style="background: green; color: white; padding: 4px 8px; border-radius: 4px;">COMPLETED</span>'
      : data.status === 'FAILED'
      ? '<span style="background: red; color: white; padding: 4px 8px; border-radius: 4px;">FAILED</span>'
      : '<span style="background: orange; color: white; padding: 4px 8px; border-radius: 4px;">PENDING</span>';

    await resend.emails.send({
      from: 'Prakhar Website <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `New Order ${data.status === 'COMPLETED' ? 'Completed' : data.status === 'FAILED' ? 'Failed' : 'Pending'} - ${data.orderId}`,
      html: `
        <h2>New Order Notification</h2>
        <p><strong>Status:</strong> ${statusBadge}</p>
        
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> ${data.orderId}</p>
        ${data.phonepeOrderId ? `<p><strong>PhonePe Order ID:</strong> ${data.phonepeOrderId}</p>` : ''}
        <p><strong>Total Amount:</strong> ₹${(data.total || 0).toLocaleString('en-IN')}</p>
        
        ${customerDetails}
        
        <h3>Items Ordered</h3>
        <pre style="white-space: pre-wrap;">${itemsList}</pre>
        
        <h3>Shipping Address</h3>
        <pre style="white-space: pre-wrap;">${shippingAddressText}</pre>
      `,
    });

    console.log('Admin order email sent to:', ADMIN_EMAIL);
    return true;
  } catch (error) {
    console.error('Failed to send admin order email:', error);
    return false;
  }
}

/**
 * Send admin notification email for contact form submission
 */
export async function sendAdminContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    const resend = getResendClient();

    await resend.emails.send({
      from: 'Prakhar Website <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        
        <h3>Contact Details</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        
        <h3>Message</h3>
        <pre style="white-space: pre-wrap;">${data.message}</pre>
      `,
    });

    console.log('Admin contact email sent to:', ADMIN_EMAIL);
    return true;
  } catch (error) {
    console.error('Failed to send admin contact email:', error);
    return false;
  }
}

/**
 * Send admin notification email for catalog download
 */
export async function sendAdminCatalogEmail(data: CatalogDownloadData): Promise<boolean> {
  try {
    const resend = getResendClient();

    await resend.emails.send({
      from: 'Prakhar Website <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `Catalog Download Request from ${data.name}`,
      html: `
        <h2>Catalog Download Request</h2>
        
        <h3>Contact Details</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Mobile:</strong> ${data.mobile}</p>
        <p><strong>Catalog:</strong> 2025 Catalog</p>
      `,
    });

    console.log('Admin catalog email sent to:', ADMIN_EMAIL);
    return true;
  } catch (error) {
    console.error('Failed to send admin catalog email:', error);
    return false;
  }
}

