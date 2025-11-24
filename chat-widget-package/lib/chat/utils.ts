import { Customer } from '@/types/chat';

export function generateCustomerId(): string {
  return `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getClientInfo(request: Request): {
  ipAddress?: string;
  location?: string;
  browser?: string;
  device?: string;
  network?: string;
} {
  const headers = request.headers;
  
  const ipAddress = 
    headers.get('x-forwarded-for')?.split(',')[0] ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') ||
    undefined;

  const userAgent = headers.get('user-agent') || '';

  let browser: string | undefined;
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  else if (userAgent.includes('Opera')) browser = 'Opera';

  let device: string | undefined;
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
    if (/iPad/.test(userAgent)) device = 'Tablet (iPad)';
    else if (/iPhone/.test(userAgent)) device = 'Mobile (iPhone)';
    else if (/Android/.test(userAgent)) device = 'Mobile (Android)';
    else device = 'Mobile';
  } else {
    device = 'Desktop';
  }

  const network = headers.get('x-network-type') || undefined;
  const location = undefined;

  return {
    ipAddress,
    location,
    browser,
    device,
    network,
  };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digitsOnly.length >= 10;
}

