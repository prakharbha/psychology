# Live Chat Widget for Next.js

A complete live chat widget that connects website visitors to Telegram, allowing admins to reply from Telegram while customers chat on the website.

## Features

- ✅ Modern, elegant chat widget UI
- ✅ Real-time messaging via polling
- ✅ Telegram integration for admin replies
- ✅ Customer data collection (name, email, phone)
- ✅ Automatic client info capture (IP, browser, device, location)
- ✅ Browser notifications and sound alerts
- ✅ Mobile-responsive design
- ✅ Persistent storage using PostgreSQL
- ✅ Multiple admin support (comma-separated Telegram chat IDs)

## Prerequisites

- Next.js 14+ (App Router)
- Node.js 18+
- PostgreSQL database (Vercel Postgres recommended)
- Telegram Bot Token
- Telegram Chat ID(s)

## Installation

### 1. Copy Files

Copy all files from this package to your Next.js project, maintaining the folder structure:

```
your-nextjs-project/
├── types/
│   └── chat.ts
├── components/
│   └── chat/
│       ├── ChatWidget.tsx
│       ├── ChatToggle.tsx
│       ├── CustomerDetailsModal.tsx
│       └── MessageBubble.tsx
├── lib/
│   └── chat/
│       ├── db.ts
│       ├── telegram.ts
│       └── utils.ts
└── app/
    └── api/
        ├── chat/
        │   ├── send/route.ts
        │   ├── messages/route.ts
        │   ├── customer-details/route.ts
        │   ├── init-db/route.ts
        │   └── setup-webhook/route.ts
        └── telegram/
            └── webhook/route.ts
```

### 2. Install Dependencies

Add these dependencies to your `package.json`:

```json
{
  "dependencies": {
    "pg": "^8.16.3"
  },
  "devDependencies": {
    "@types/pg": "^8.15.6"
  }
}
```

Then run:
```bash
npm install
```

### 3. Environment Variables

Add these to your `.env.local` file:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
# For multiple admins, use comma-separated IDs:
# TELEGRAM_CHAT_ID=123456789,987654321

# Database Configuration (Vercel Postgres direct connection string)
CHAT__POSTGRES_URL=postgresql://user:password@host:port/database?sslmode=require
```

### 4. Add CSS Styles

Add these styles to your `app/globals.css`:

```css
/* Chat toggle animations */
@keyframes chatBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes chatPulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% {
    box-shadow: 0 0 0 15px rgba(59, 130, 246, 0);
  }
}

.chat-button-animate {
  animation: chatBounce 2s ease-in-out infinite, chatPulse 2s ease-in-out infinite;
}
```

### 5. Add ChatWidget to Layout

In your `app/layout.tsx`, import and add the ChatWidget component:

```tsx
import ChatWidget from '@/components/chat/ChatWidget';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
```

### 6. Initialize Database

After deployment, visit this URL to initialize the database tables:

```
https://your-domain.com/api/chat/init-db
```

Or run it programmatically:

```bash
curl https://your-domain.com/api/chat/init-db
```

### 7. Setup Telegram Webhook

After deployment, visit this URL to configure the Telegram webhook:

```
https://your-domain.com/api/chat/setup-webhook
```

Or run it programmatically:

```bash
curl https://your-domain.com/api/chat/setup-webhook
```

## Configuration

### Customize Chat Widget

Edit `components/chat/ChatWidget.tsx` to customize:

```tsx
const CONFIG = {
  position: 'right' as 'left' | 'right',  // Widget position
  autoPop: false,                          // Auto-open chat
  supportName: 'Laxmi',                    // Support agent name
  supportAvatar: 'https://...',            // Support avatar URL
  welcomeMessage: "Hi! I'm not a bot...",  // Welcome message
};
```

### Customize Chat Toggle

Edit `components/chat/ChatToggle.tsx` to change the toggle button appearance.

## How It Works

1. **Customer sends message**: Customer fills in details (name, email, phone) and sends a message
2. **Message stored**: Message is saved to PostgreSQL database
3. **Telegram notification**: Message is sent to configured Telegram chat(s) with customer details
4. **Admin replies**: Admin replies to the message in Telegram
5. **Webhook receives**: Telegram webhook receives the reply
6. **Message delivered**: Reply is saved to database and delivered to customer via polling

## API Endpoints

- `POST /api/chat/send` - Send customer message
- `GET /api/chat/messages?customerId=xxx` - Get messages for a customer
- `GET /api/chat/customer-details` - Get client info (IP, browser, etc.)
- `GET /api/chat/init-db` - Initialize database tables
- `GET /api/chat/setup-webhook` - Setup Telegram webhook
- `POST /api/telegram/webhook` - Receive Telegram updates

## Database Schema

The system creates three tables:

- `chat_customers` - Customer information
- `chat_messages` - All messages (customer and admin)
- `chat_sessions` - Active chat sessions

## Troubleshooting

### Messages not appearing

1. Check database connection: Visit `/api/chat/init-db`
2. Check Telegram webhook: Visit `/api/chat/setup-webhook`
3. Check browser console for errors
4. Verify environment variables are set correctly

### Telegram webhook not working

1. Ensure your site is accessible via HTTPS (required by Telegram)
2. Run `/api/chat/setup-webhook` after deployment
3. Check Telegram bot token is correct
4. Verify webhook URL in Telegram: `https://api.telegram.org/bot<TOKEN>/getWebhookInfo`

### Database connection errors

1. Verify `CHAT__POSTGRES_URL` is a direct connection string (not pooled)
2. Check database credentials
3. Ensure SSL is enabled for production databases

## Support

For issues or questions, check the code comments in each file or review the implementation details.

## License

This code is provided as-is for integration into your Next.js project.

