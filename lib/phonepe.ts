/**
 * PhonePe Payment Gateway Service
 * Handles PhonePe SDK initialization and payment operations
 * 
 * Environment variables required:
 * - PHONEPE_CLIENT_ID: Your Client ID from PhonePe Business Dashboard
 * - PHONEPE_CLIENT_SECRET: Your Client Secret from PhonePe Business Dashboard
 * - PHONEPE_CLIENT_VERSION: Client Version (usually 1)
 * - PHONEPE_MERCHANT_ID: Your Merchant ID (if required)
 * - PHONEPE_ENVIRONMENT: 'UAT' for test mode, 'PRODUCTION' for live
 */

import { StandardCheckoutClient, Env } from 'pg-sdk-node';

export interface PhonePeConfig {
  clientId: string;
  clientSecret: string;
  clientVersion: number;
  merchantId?: string;
  environment: 'UAT' | 'PRODUCTION';
}

export interface PhonePePaymentRequest {
  merchantOrderId: string;
  amount: number; // Amount in paise (e.g., 10000 = ₹100)
  redirectUrl: string;
  redirectMode?: 'POST' | 'REDIRECT';
  mobileNumber?: string;
  metadata?: Record<string, any>;
}

export interface PhonePePaymentResponse {
  success: boolean;
  checkoutUrl?: string;
  orderId?: string;
  error?: string;
}

/**
 * Get PhonePe configuration from environment variables
 */
export function getPhonePeConfig(): PhonePeConfig {
  const clientId = process.env.PHONEPE_CLIENT_ID;
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  const clientVersion = parseInt(process.env.PHONEPE_CLIENT_VERSION || '1', 10);
  const merchantId = process.env.PHONEPE_MERCHANT_ID;
  const environment = (process.env.PHONEPE_ENVIRONMENT || 'UAT') as 'UAT' | 'PRODUCTION';

  if (!clientId || !clientSecret) {
    throw new Error('PhonePe credentials not configured. Please set PHONEPE_CLIENT_ID and PHONEPE_CLIENT_SECRET in environment variables.');
  }

  return {
    clientId,
    clientSecret,
    clientVersion,
    merchantId,
    environment,
  };
}

/**
 * Initialize PhonePe SDK Client
 * Returns a singleton instance of StandardCheckoutClient
 */
export function initializePhonePeClient(): StandardCheckoutClient {
  const config = getPhonePeConfig();
  
  const environment = config.environment === 'UAT' ? Env.SANDBOX : Env.PRODUCTION;
  
  return StandardCheckoutClient.getInstance(
    config.clientId,
    config.clientSecret,
    config.clientVersion,
    environment
  );
}

/**
 * Convert amount from rupees to paise
 */
export function convertToPaise(amountInRupees: number): number {
  return Math.round(amountInRupees * 100);
}

/**
 * Convert amount from paise to rupees
 */
export function convertToRupees(amountInPaise: number): number {
  return amountInPaise / 100;
}

