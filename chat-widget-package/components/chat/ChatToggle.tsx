'use client';

interface ChatToggleProps {
  onClick: () => void;
  isOpen: boolean;
  unreadCount?: number;
}

export default function ChatToggle({ onClick, isOpen, unreadCount = 0 }: ChatToggleProps) {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9998] flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      {/* Live Chat Label Bubble */}
      <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-blue-200 relative animate-pulse">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          <span className="text-sm font-semibold text-blue-600 whitespace-nowrap">Live Chat</span>
        </div>
        {/* Speech bubble tail */}
        <div className="absolute bottom-0 right-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white transform translate-y-full"></div>
      </div>

      {/* Chat Button with Animation */}
      <button
        onClick={onClick}
        className="chat-button-animate w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group relative"
        aria-label="Open chat"
      >
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}

