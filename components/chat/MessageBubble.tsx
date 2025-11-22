'use client';

import { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isCustomer = message.sender === 'customer';

  return (
    <div className={`flex ${isCustomer ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
          isCustomer
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
            : 'bg-white text-slate-800 shadow-sm border border-slate-200'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        <p
          className={`text-xs mt-1 ${
            isCustomer ? 'text-blue-100' : 'text-slate-500'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}

