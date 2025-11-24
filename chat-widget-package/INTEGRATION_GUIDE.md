# Integration Guide

## Step-by-Step Integration

### Step 1: Copy Files

Copy all files from this package to your Next.js project:

```bash
# From the package directory
cp -r types/ your-project/types/
cp -r components/ your-project/components/
cp -r lib/ your-project/lib/
cp -r app/api/ your-project/app/api/
```

### Step 2: Install Dependencies

```bash
npm install pg @types/pg
```

### Step 3: Add Environment Variables

Create or update `.env.local`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
CHAT__POSTGRES_URL=postgresql://...
```

### Step 4: Add CSS

Add chat animations to `app/globals.css` (see README.md for CSS code).

### Step 5: Add to Layout

In `app/layout.tsx`:

```tsx
import ChatWidget from '@/components/chat/ChatWidget';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
```

### Step 6: Initialize Database

After deployment, visit:
```
https://your-domain.com/api/chat/init-db
```

### Step 7: Setup Webhook

After deployment, visit:
```
https://your-domain.com/api/chat/setup-webhook
```

## File Structure

```
your-project/
├── types/
│   └── chat.ts                    # TypeScript types
├── components/
│   └── chat/
│       ├── ChatWidget.tsx         # Main chat widget
│       ├── ChatToggle.tsx         # Toggle button
│       ├── CustomerDetailsModal.tsx # Customer form
│       └── MessageBubble.tsx     # Message display
├── lib/
│   └── chat/
│       ├── db.ts                 # Database operations
│       ├── telegram.ts           # Telegram API
│       └── utils.ts              # Utilities
└── app/
    └── api/
        ├── chat/
        │   ├── send/route.ts     # Send message
        │   ├── messages/route.ts # Get messages
        │   ├── customer-details/route.ts # Client info
        │   ├── init-db/route.ts  # Initialize DB
        │   └── setup-webhook/route.ts # Setup webhook
        └── telegram/
            └── webhook/route.ts   # Telegram webhook
```

## Required Changes

### 1. `app/layout.tsx`

Add this import and component:

```tsx
import ChatWidget from '@/components/chat/ChatWidget';

// Inside your RootLayout component, add:
<ChatWidget />
```

### 2. `app/globals.css`

Add the chat animation styles (see README.md).

### 3. `package.json`

Add dependencies:

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

### 4. `.env.local`

Add environment variables (see README.md).

## Testing

1. Start your development server: `npm run dev`
2. Open your website
3. Click the chat toggle button
4. Fill in customer details
5. Send a test message
6. Check Telegram for the message
7. Reply from Telegram
8. Check website for the reply

## Customization

### Change Support Name/Avatar

Edit `components/chat/ChatWidget.tsx`:

```tsx
const CONFIG = {
  supportName: 'Your Name',
  supportAvatar: 'https://your-avatar-url.com/image.png',
  welcomeMessage: 'Your welcome message',
};
```

### Change Widget Position

Edit `components/chat/ChatWidget.tsx`:

```tsx
const CONFIG = {
  position: 'left' as 'left' | 'right', // Change to 'left'
};
```

### Change Polling Interval

Edit `components/chat/ChatWidget.tsx`:

```tsx
// In the useEffect hook, change 3000 to your desired interval (in milliseconds)
const pollInterval = setInterval(pollMessages, 3000); // 3 seconds
```

## Production Checklist

- [ ] Environment variables set in production
- [ ] Database initialized (`/api/chat/init-db`)
- [ ] Telegram webhook configured (`/api/chat/setup-webhook`)
- [ ] HTTPS enabled (required for Telegram webhook)
- [ ] Database connection string is direct (not pooled)
- [ ] Test sending and receiving messages
- [ ] Test on mobile devices
- [ ] Verify notifications work

