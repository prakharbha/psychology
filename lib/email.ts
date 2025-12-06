/**
 * Email Service using Resend
 * Handles sending emails to customers and admins
 * 
 * Environment variable required:
 * - RESEND: Your Resend API key
 */

import { Resend } from 'resend';

const ADMIN_EMAIL = 'prakharpsychology@gmail.com';

// Initialize Resend client
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND;
    if (!apiKey) {
      throw new Error('RESEND is not configured in environment variables');
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

    // Generate items HTML table
    const itemsTable = data.items && data.items.length > 0
      ? data.items.map(item => `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; text-align: left; color: #374151;">${item.productName}</td>
            <td style="padding: 12px; text-align: center; color: #6b7280;">Pack of ${item.packSize}</td>
            <td style="padding: 12px; text-align: center; color: #6b7280;">${item.quantity}</td>
            <td style="padding: 12px; text-align: right; color: #111827; font-weight: 600;">₹${item.price.toLocaleString('en-IN')}</td>
          </tr>
        `).join('')
      : '<tr><td colspan="4" style="padding: 12px; text-align: center; color: #6b7280;">No items listed</td></tr>';

    const statusConfig = data.status === 'COMPLETED'
      ? {
          icon: '✓',
          title: 'Order Confirmed!',
          color: '#10b981',
          bgColor: '#d1fae5',
          message: 'Thank you for your order! Your payment has been successfully processed.',
          additionalInfo: 'We will process your order and ship it to you soon. You will receive another email with tracking information once your order is shipped.'
        }
      : data.status === 'FAILED'
      ? {
          icon: '✗',
          title: 'Payment Failed',
          color: '#ef4444',
          bgColor: '#fee2e2',
          message: 'We\'re sorry, but your payment for this order could not be processed.',
          additionalInfo: 'Please try placing your order again. If you continue to experience issues, please contact us.'
        }
      : {
          icon: '⏳',
          title: 'Order Pending',
          color: '#f59e0b',
          bgColor: '#fef3c7',
          message: 'Your order has been received and your payment is being processed.',
          additionalInfo: 'We will notify you once your payment is confirmed.'
        };

    const emailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${emailSubject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6; padding: 20px 0;">
          <tr>
            <td align="center">
              <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 32px 24px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Prakhar Psychological Testing</h1>
                    <p style="margin: 8px 0 0 0; color: #e0e7ff; font-size: 14px;">Research Centre</p>
                  </td>
                </tr>
                
                <!-- Status Banner -->
                <tr>
                  <td style="padding: 32px 24px; text-align: center; background-color: ${statusConfig.bgColor};">
                    <div style="display: inline-block; width: 64px; height: 64px; border-radius: 50%; background-color: ${statusConfig.color}; color: #ffffff; font-size: 32px; line-height: 64px; margin-bottom: 16px;">
                      ${statusConfig.icon}
                    </div>
                    <h2 style="margin: 0 0 8px 0; color: ${statusConfig.color}; font-size: 28px; font-weight: 700;">${statusConfig.title}</h2>
                    <p style="margin: 0; color: #374151; font-size: 16px;">${statusConfig.message}</p>
                  </td>
                </tr>
                
                <!-- Greeting -->
                <tr>
                  <td style="padding: 24px 24px 0 24px;">
                    <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6;">Dear ${data.customerName},</p>
                  </td>
                </tr>
                
                <!-- Order Details Card -->
                <tr>
                  <td style="padding: 24px;">
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
                      <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600;">Order Details</h3>
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order ID:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px; font-weight: 600;">#${data.orderId}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Total Amount:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 18px; font-weight: 700;">₹${data.total.toLocaleString('en-IN')}</td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
                
                <!-- Items Table -->
                <tr>
                  <td style="padding: 0 24px 24px 24px;">
                    <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600;">Items Ordered</h3>
                    <div style="overflow-x: auto;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                        <thead>
                          <tr style="background-color: #f9fafb; border-bottom: 2px solid #e5e7eb;">
                            <th style="padding: 12px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Product</th>
                            <th style="padding: 12px; text-align: center; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Pack Size</th>
                            <th style="padding: 12px; text-align: center; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Qty</th>
                            <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${itemsTable}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
                
                <!-- Shipping Address -->
                ${data.shippingAddress ? `
                <tr>
                  <td style="padding: 0 24px 24px 24px;">
                    <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600;">Shipping Address</h3>
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
                      <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">${shippingAddressText}</p>
                    </div>
                  </td>
                </tr>
                ` : ''}
                
                <!-- Additional Info -->
                <tr>
                  <td style="padding: 0 24px 24px 24px;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">${statusConfig.additionalInfo}</p>
                  </td>
                </tr>
                
                <!-- Contact Info -->
                <tr>
                  <td style="padding: 0 24px 24px 24px;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">If you have any questions, please contact us at <a href="mailto:${ADMIN_EMAIL}" style="color: #3b82f6; text-decoration: none;">${ADMIN_EMAIL}</a></p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Prakhar Psychological Testing and Research Centre</p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">Thank you for your business!</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: 'Prakhar Psychological Testing <onboarding@resend.dev>',
      to: data.customerEmail,
      replyTo: ADMIN_EMAIL,
      subject: emailSubject,
      html: emailContent,
    });

    if (result.error) {
      return false;
    }

    return true;
  } catch (error: any) {
    return false;
  }
}

/**
 * Send admin notification email for new order
 */
export async function sendAdminOrderEmail(data: OrderEmailData): Promise<boolean> {
  try {
    const resend = getResendClient();
    
    // Generate items HTML table
    const itemsTable = data.items && data.items.length > 0
      ? data.items.map(item => `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; text-align: left; color: #374151;">${item.productName}</td>
            <td style="padding: 12px; text-align: center; color: #6b7280;">Pack of ${item.packSize}</td>
            <td style="padding: 12px; text-align: center; color: #6b7280;">${item.quantity}</td>
            <td style="padding: 12px; text-align: right; color: #111827; font-weight: 600;">₹${item.price.toLocaleString('en-IN')}</td>
          </tr>
        `).join('')
      : '<tr><td colspan="4" style="padding: 12px; text-align: center; color: #6b7280;">No items listed</td></tr>';

    const shippingAddressText = data.shippingAddress
      ? `${data.shippingAddress.address}\n${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.pincode}`
      : 'Not provided';

    const statusConfig = data.status === 'COMPLETED'
      ? {
          icon: '✓',
          color: '#10b981',
          bgColor: '#d1fae5',
          text: 'COMPLETED'
        }
      : data.status === 'FAILED'
      ? {
          icon: '✗',
          color: '#ef4444',
          bgColor: '#fee2e2',
          text: 'FAILED'
        }
      : {
          icon: '⏳',
          color: '#f59e0b',
          bgColor: '#fef3c7',
          text: 'PENDING'
        };

    const emailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order Notification</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6; padding: 20px 0;">
          <tr>
            <td align="center">
              <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 32px 24px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Order Notification</h1>
                    <p style="margin: 8px 0 0 0; color: #e0e7ff; font-size: 14px;">Prakhar Psychological Testing</p>
                  </td>
                </tr>
                
                <!-- Status Banner -->
                <tr>
                  <td style="padding: 32px 24px; text-align: center; background-color: ${statusConfig.bgColor};">
                    <div style="display: inline-block; width: 64px; height: 64px; border-radius: 50%; background-color: ${statusConfig.color}; color: #ffffff; font-size: 32px; line-height: 64px; margin-bottom: 16px;">
                      ${statusConfig.icon}
                    </div>
                    <h2 style="margin: 0 0 8px 0; color: ${statusConfig.color}; font-size: 28px; font-weight: 700;">Order ${statusConfig.text}</h2>
                    <p style="margin: 0; color: #374151; font-size: 16px;">Order #${data.orderId}</p>
                  </td>
                </tr>
                
                <!-- Order Details Card -->
                <tr>
                  <td style="padding: 24px;">
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
                      <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600;">Order Details</h3>
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order ID:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px; font-weight: 600;">#${data.orderId}</td>
                        </tr>
                        ${data.phonepeOrderId ? `
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">PhonePe Order ID:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px; font-weight: 600;">${data.phonepeOrderId}</td>
                        </tr>
                        ` : ''}
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Total Amount:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 18px; font-weight: 700;">₹${(data.total || 0).toLocaleString('en-IN')}</td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
                
                <!-- Customer Details -->
                ${(data.customerName || data.customerEmail || data.customerPhone) ? `
                <tr>
                  <td style="padding: 0 24px 24px 24px;">
                    <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600;">Customer Details</h3>
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        ${data.customerName ? `
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Name:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px; font-weight: 600;">${data.customerName}</td>
                        </tr>
                        ` : ''}
                        ${data.customerEmail ? `
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px;">
                            <a href="mailto:${data.customerEmail}" style="color: #3b82f6; text-decoration: none;">${data.customerEmail}</a>
                          </td>
                        </tr>
                        ` : ''}
                        ${data.customerPhone ? `
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px; font-weight: 600;">${data.customerPhone}</td>
                        </tr>
                        ` : ''}
                      </table>
                    </div>
                  </td>
                </tr>
                ` : ''}
                
                <!-- Items Table -->
                <tr>
                  <td style="padding: 0 24px 24px 24px;">
                    <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600;">Items Ordered</h3>
                    <div style="overflow-x: auto;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                        <thead>
                          <tr style="background-color: #f9fafb; border-bottom: 2px solid #e5e7eb;">
                            <th style="padding: 12px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Product</th>
                            <th style="padding: 12px; text-align: center; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Pack Size</th>
                            <th style="padding: 12px; text-align: center; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Qty</th>
                            <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${itemsTable}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
                
                <!-- Shipping Address -->
                ${data.shippingAddress ? `
                <tr>
                  <td style="padding: 0 24px 24px 24px;">
                    <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600;">Shipping Address</h3>
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
                      <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">${shippingAddressText}</p>
                    </div>
                  </td>
                </tr>
                ` : ''}
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Prakhar Psychological Testing and Research Centre</p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">This is an automated notification email</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: 'Prakhar Website <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `New Order ${data.status === 'COMPLETED' ? 'Completed' : data.status === 'FAILED' ? 'Failed' : 'Pending'} - ${data.orderId}`,
      html: emailContent,
    });

    if (result.error) {
      return false;
    }

    return true;
  } catch (error: any) {
    return false;
  }
}

/**
 * Send admin notification email for contact form submission
 */
export async function sendAdminContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    const resend = getResendClient();

    const emailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6; padding: 20px 0;">
          <tr>
            <td align="center">
              <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 32px 24px; text-align: center;">
                    <div style="display: inline-block; width: 64px; height: 64px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 32px; line-height: 64px; margin-bottom: 16px;">
                      📧
                    </div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Contact Form Submission</h1>
                    <p style="margin: 8px 0 0 0; color: #e0e7ff; font-size: 14px;">Prakhar Psychological Testing</p>
                  </td>
                </tr>
                
                <!-- Contact Details Card -->
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600;">Contact Details</h3>
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Name:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px; font-weight: 600;">${data.name}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px;">
                            <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a>
                          </td>
                        </tr>
                        ${data.phone ? `
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px; font-weight: 600;">
                            <a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none;">${data.phone}</a>
                          </td>
                        </tr>
                        ` : ''}
                      </table>
                    </div>
                  </td>
                </tr>
                
                <!-- Message -->
                <tr>
                  <td style="padding: 0 24px 24px 24px;">
                    <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600;">Message</h3>
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
                      <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">${data.message}</p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Prakhar Psychological Testing and Research Centre</p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">This is an automated notification email</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: 'Prakhar Website <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${data.name}`,
      html: emailContent,
    });

    if (result.error) {
      return false;
    }

    return true;
  } catch (error: any) {
    return false;
  }
}

/**
 * Send admin notification email for catalog download
 */
export async function sendAdminCatalogEmail(data: CatalogDownloadData): Promise<boolean> {
  try {
    const resend = getResendClient();

    const emailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Catalog Download Request</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6; padding: 20px 0;">
          <tr>
            <td align="center">
              <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 32px 24px; text-align: center;">
                    <div style="display: inline-block; width: 64px; height: 64px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 32px; line-height: 64px; margin-bottom: 16px;">
                      📥
                    </div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Catalog Download Request</h1>
                    <p style="margin: 8px 0 0 0; color: #e0e7ff; font-size: 14px;">Prakhar Psychological Testing</p>
                  </td>
                </tr>
                
                <!-- Contact Details Card -->
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600;">Contact Details</h3>
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Name:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px; font-weight: 600;">${data.name}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Mobile:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px; font-weight: 600;">
                            <a href="tel:${data.mobile}" style="color: #3b82f6; text-decoration: none;">${data.mobile}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Catalog:</td>
                          <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px; font-weight: 600;">2025 Catalog</td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Prakhar Psychological Testing and Research Centre</p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">This is an automated notification email</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: 'Prakhar Website <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `Catalog Download Request from ${data.name}`,
      html: emailContent,
    });

    if (result.error) {
      return false;
    }

    return true;
  } catch (error: any) {
    return false;
  }
}

