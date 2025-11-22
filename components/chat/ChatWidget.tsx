'use client';

import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import CustomerDetailsModal from './CustomerDetailsModal';
import ChatToggle from './ChatToggle';
import { Message, Customer } from '@/types/chat';

// Hardcoded configuration
const CONFIG = {
  position: 'right' as 'left' | 'right',
  autoPop: true,
  autoPopDelay: 7000, // 7 seconds
  supportName: 'Support',
  supportAvatar: '/images/logo.webp', // Using existing logo as placeholder
  welcomeMessage: 'Hi, I am Support Agent, how can I help you today?',
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [pendingMessage, setPendingMessage] = useState<string | null>(null); // Store message when modal shows
  const [isLoading, setIsLoading] = useState(false);
  const [pageUrl, setPageUrl] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasShownWelcome = useRef(false);

  // Auto-pop chat widget after 7 seconds
  useEffect(() => {
    if (CONFIG.autoPop && !isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, CONFIG.autoPopDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Get page URL
  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Create notification sound
  useEffect(() => {
    // Create a simple beep sound using Web Audio API
    const createBeep = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    };
    
    // Store beep function
    (audioRef as any).current = createBeep;
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Setup SSE connection for real-time updates
  useEffect(() => {
    if (customerId && isOpen) {
      console.log('Setting up SSE connection for customerId:', customerId);
      const eventSource = new EventSource(`/api/chat/stream?customerId=${encodeURIComponent(customerId)}`);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('SSE connection opened for customerId:', customerId);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received SSE message:', data);
          if (data.type === 'new_message' && data.message) {
            setMessages((prev) => {
              // Check if message already exists to avoid duplicates
              const exists = prev.some(msg => msg.id === data.message.id);
              if (exists) {
                return prev;
              }
              return [...prev, data.message];
            });
            
            // Play sound
            if ((audioRef as any).current) {
              try {
                (audioRef as any).current();
              } catch (e) {
                // Ignore audio errors
              }
            }

            // Show browser notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('New message from Support', {
                body: data.message.text,
                icon: CONFIG.supportAvatar,
              });
            }
          } else if (data.type === 'connected') {
            console.log('SSE connection confirmed for customerId:', customerId);
          }
        } catch (error) {
          console.error('Error parsing SSE message:', error, event.data);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        // Don't close immediately - let it try to reconnect
        // EventSource will automatically try to reconnect
      };

      return () => {
        console.log('Closing SSE connection for customerId:', customerId);
        eventSource.close();
        eventSourceRef.current = null;
      };
    } else {
      // Close connection if customerId or isOpen changes
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    }
  }, [customerId, isOpen]);

  // Poll for new messages as fallback (every 3 seconds when chat is open)
  useEffect(() => {
    if (!customerId || !isOpen) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/chat/messages?customerId=${encodeURIComponent(customerId)}`);
        const data = await response.json();
        if (data.success && data.messages) {
          setMessages((prev) => {
            // Merge messages, avoiding duplicates
            const existingIds = new Set(prev.map(m => m.id));
            const newMessages = data.messages.filter((m: Message) => !existingIds.has(m.id));
            if (newMessages.length > 0) {
              console.log('Found new messages via polling:', newMessages.length);
              // Play sound for new admin messages
              const adminMessages = newMessages.filter((m: Message) => m.sender === 'admin');
              if (adminMessages.length > 0 && (audioRef as any).current) {
                try {
                  (audioRef as any).current();
                } catch (e) {
                  // Ignore audio errors
                }
              }
              return [...prev, ...newMessages];
            }
            return prev;
          });
        }
      } catch (error) {
        console.error('Error polling for messages:', error);
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(pollInterval);
  }, [customerId, isOpen]);

  // Load messages when customer is set
  useEffect(() => {
    if (customerId) {
      loadMessages();
    }
  }, [customerId]);

  // Show welcome message when chat opens
  useEffect(() => {
    if (isOpen && !hasShownWelcome.current) {
      hasShownWelcome.current = true;
    }
  }, [isOpen]);

  const loadMessages = async () => {
    if (!customerId) return;
    try {
      const response = await fetch(`/api/chat/messages?customerId=${customerId}`);
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleCustomerDetailsSubmit = async (details: { name: string; email: string; phone: string }) => {
    setIsDetailsModalOpen(false);
    setIsLoading(true);

    try {
      // Get customer details from API
      const detailsResponse = await fetch('/api/chat/customer-details');
      const detailsData = await detailsResponse.json();

      // Create customer
      const customerData: Customer = {
        id: `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: details.name,
        email: details.email,
        phone: details.phone,
        pageUrl: pageUrl || window.location.href,
        ...detailsData.data,
        createdAt: new Date(),
      };

      setCustomer(customerData);
      setCustomerId(customerData.id);
      hasShownWelcome.current = true;

      // After customer details are submitted, send the pending message if there is one
      const messageToSend = pendingMessage || inputMessage.trim();
      if (messageToSend) {
        setPendingMessage(null);
        setInputMessage('');
        
        // Optimistically add message
        const tempMessage: Message = {
          id: `temp_${Date.now()}`,
          customerId: customerData.id,
          text: messageToSend,
          sender: 'customer',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, tempMessage]);

        // Send the message
        try {
          const response = await fetch('/api/chat/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customerId: customerData.id,
              message: messageToSend,
              customer: {
                name: customerData.name,
                email: customerData.email,
                phone: customerData.phone,
                pageUrl: customerData.pageUrl,
              },
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Network error' }));
            console.error('API error:', errorData);
            setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
            alert(`Failed to send message: ${errorData.error || 'Unknown error'}`);
            return;
          }

          const data = await response.json();
          if (data.success) {
            if (data.customerId && data.customerId !== customerData.id) {
              setCustomerId(data.customerId);
            }
            setMessages((prev) => prev.map((msg) => 
              msg.id === tempMessage.id ? data.message : msg
            ));
          } else {
            setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
            alert(`Failed to send message: ${data.error || 'Unknown error'}`);
          }
        } catch (error) {
          console.error('Error sending message:', error);
          setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
          alert(`Failed to send message: ${error instanceof Error ? error.message : 'Network error'}`);
        }
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // If no customer details, show modal first and store the message
    if (!customerId || !customer) {
      setPendingMessage(inputMessage.trim());
      setIsDetailsModalOpen(true);
      return;
    }

    const messageText = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Optimistically add message
    const tempMessage: Message = {
      id: `temp_${Date.now()}`,
      customerId,
      text: messageText,
      sender: 'customer',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, tempMessage]);

    try {
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId,
          message: messageText,
          // Include customer details for first message (API will check if session exists)
          customer: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            pageUrl: customer.pageUrl,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        console.error('API error:', errorData);
        setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
        alert(`Failed to send message: ${errorData.error || 'Unknown error'}`);
        return;
      }

      const data = await response.json();
      if (data.success) {
        // Update customerId if it changed (first message creates session)
        if (data.customerId && data.customerId !== customerId) {
          setCustomerId(data.customerId);
        }
        // Replace temp message with real one
        setMessages((prev) => prev.map((msg) => 
          msg.id === tempMessage.id ? data.message : msg
        ));
        
        // Show warning if Telegram failed but message was saved
        if (data.telegramError) {
          console.warn('Message saved but Telegram delivery failed:', data.telegramError);
          // Don't show alert to user - message is saved and will be sent when Telegram is available
        }
      } else {
        // Remove temp message on error
        setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
        alert(`Failed to send message: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
      alert(`Failed to send message: ${error instanceof Error ? error.message : 'Network error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMinimize = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ChatToggle onClick={handleToggle} isOpen={isOpen} />
      
      {isOpen && (
        <div
          className={`fixed ${CONFIG.position === 'right' ? 'right-6' : 'left-6'} bottom-6 z-[9999] w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col`}
          style={{ maxHeight: 'calc(100vh - 3rem)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={CONFIG.supportAvatar}
                  alt={CONFIG.supportName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
              </div>
              <div>
                <h3 className="font-semibold">{CONFIG.supportName}</h3>
                <p className="text-xs text-blue-100">Online</p>
              </div>
            </div>
            <button
              onClick={handleMinimize}
              className="text-white hover:text-blue-100 transition-colors"
              aria-label="Minimize chat"
              title="Minimize"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 min-h-0">
            {/* Show welcome message - always show at the top */}
            <div className="mb-4">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-200">
                <p className="text-sm text-slate-700">{CONFIG.welcomeMessage}</p>
              </div>
            </div>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && messages.length > 0 && (
              <div className="flex justify-start mb-4">
                <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-slate-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input - Always visible at bottom */}
          <div className="p-4 border-t border-slate-200 bg-white flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <CustomerDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          // Restore pending message to input if modal is closed without submitting
          if (pendingMessage && !customerId) {
            setInputMessage(pendingMessage);
          }
          if (!customerId) {
            setIsOpen(false);
          }
        }}
        onSubmit={handleCustomerDetailsSubmit}
        pageUrl={pageUrl}
      />
    </>
  );
}

