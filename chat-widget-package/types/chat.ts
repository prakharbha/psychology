export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  pageUrl: string;
  ipAddress?: string;
  location?: string;
  browser?: string;
  device?: string;
  network?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  customerId: string;
  text: string;
  sender: 'customer' | 'admin';
  timestamp: Date;
  telegramMessageId?: number;
}

export interface ChatSession {
  customerId: string;
  customer: Customer;
  messages: Message[];
  isActive: boolean;
  lastActivity: Date;
}

export interface SendMessageRequest {
  customerId: string;
  message: string;
  customer?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface TelegramWebhookUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username?: string;
    };
    chat: {
      id: number;
      type: string;
    };
    date: number;
    text?: string;
    reply_to_message?: {
      message_id: number;
      text?: string;
    };
  };
  callback_query?: {
    id: string;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
    };
    message?: {
      message_id: number;
      text?: string;
    };
    data?: string;
  };
}

