import { ChatSession, Customer, Message } from '@/types/chat';

// In-memory storage for active chat sessions
// This is cleared when the server restarts or session expires
const sessions = new Map<string, ChatSession>();

// Cleanup inactive sessions after 30 minutes
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// Cleanup interval - runs every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [customerId, session] of sessions.entries()) {
    if (now - session.lastActivity.getTime() > SESSION_TIMEOUT) {
      sessions.delete(customerId);
    }
  }
}, 5 * 60 * 1000);

export function createSession(customer: Customer): ChatSession {
  const session: ChatSession = {
    customerId: customer.id,
    customer,
    messages: [],
    isActive: true,
    lastActivity: new Date(),
  };
  sessions.set(customer.id, session);
  return session;
}

export function getSession(customerId: string): ChatSession | undefined {
  const session = sessions.get(customerId);
  if (session) {
    session.lastActivity = new Date();
  }
  return session;
}

export function addMessage(customerId: string, message: Message): void {
  const session = sessions.get(customerId);
  if (session) {
    session.messages.push(message);
    session.lastActivity = new Date();
  }
}

export function getMessages(customerId: string): Message[] {
  const session = sessions.get(customerId);
  return session?.messages || [];
}

export function updateSessionActivity(customerId: string): void {
  const session = sessions.get(customerId);
  if (session) {
    session.lastActivity = new Date();
  }
}

export function deleteSession(customerId: string): void {
  sessions.delete(customerId);
}

export function getAllSessions(): ChatSession[] {
  return Array.from(sessions.values());
}

