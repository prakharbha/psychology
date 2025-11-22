# Live Chat with Telegram Integration - Setup Guide

This guide will help you set up the live chat functionality that connects your website visitors to Telegram.

## Overview

The chat widget allows customers to chat on your website while admins reply from Telegram. All messages are stored in Telegram - no database required. The application only uses in-memory/session storage for active conversations.

## Features

- ✅ Modern, elegant chat widget (appears on right side by default)
- ✅ Auto-pop after 5 seconds (configurable)
- ✅ Customer details collection on first message
- ✅ Real-time message delivery via Telegram webhooks
- ✅ Browser notifications and sound alerts
- ✅ Support for multiple simultaneous conversations
- ✅ No database required - all messages stored in Telegram

## Prerequisites

1. A Telegram account
2. A Telegram bot (created via @BotFather)
3. Your Next.js application deployed with HTTPS (required for webhooks)

## Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow the instructions to name your bot
4. Copy the **bot token** (looks like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

## Step 2: Get Your Chat ID

1. Search for `@userinfobot` on Telegram
2. Start a conversation with it
3. It will reply with your chat ID (a number like `123456789`)

**For multiple admins:** Get the chat ID for each admin. You'll need to add all chat IDs to the environment variable (comma-separated).

## Step 3: Configure Environment Variables

**Note:** The chat widget uses the same Telegram bot configuration as the rest of your website. If you already have `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` configured, you don't need to add anything new!

If not already configured, add these to your `.env.local` file (or your hosting platform's environment variables):

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

**For multiple admins (optional):**
```env
TELEGRAM_CHAT_ID=123456789,987654321,456789123
```

The chat widget will automatically use the same bot token and chat ID(s) that are already configured for your order notifications.

## Step 4: Set Up Telegram Webhook

After deploying your application, you need to configure Telegram to send updates to your webhook endpoint.

### Option A: Using cURL (Recommended)

Replace `YOUR_BOT_TOKEN` and `YOUR_DOMAIN` with your actual values:

```bash
curl -X POST "https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=https://YOUR_DOMAIN.com/api/telegram/webhook"
```

### Option B: Using Browser

Visit this URL (replace with your values):
```
https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=https://YOUR_DOMAIN.com/api/telegram/webhook
```

### Option C: Using Telegram Bot API

You can also use the `setWebhook` method programmatically. The webhook endpoint is:
```
https://YOUR_DOMAIN.com/api/telegram/webhook
```

**Important:** 
- The webhook URL **must** use HTTPS (Telegram requirement)
- Make sure your domain is accessible publicly
- The webhook endpoint accepts both GET and POST requests

### Verify Webhook

To check if your webhook is set correctly:

```bash
curl "https://api.telegram.org/botYOUR_BOT_TOKEN/getWebhookInfo"
```

You should see your webhook URL in the response.

## Step 5: Deploy Your Application

1. Make sure all environment variables are set in your hosting platform
2. Deploy your Next.js application
3. Ensure HTTPS is enabled (required for Telegram webhooks)
4. Set up the webhook using Step 4

## Step 6: Test the Chat

1. Visit your website
2. The chat widget should auto-pop after 5 seconds (or click the chat button)
3. Fill in your details (name, email, phone)
4. Send a test message
5. Check your Telegram - you should receive the message with customer details
6. Reply to the message in Telegram
7. The reply should appear in the chat widget on your website

## How It Works

### Customer Sends Message
1. Customer fills in details (first time only)
2. Customer types and sends a message
3. Message is sent to your API (`/api/chat/send`)
4. API stores message in session and sends to Telegram
5. You receive the message in Telegram with customer details

### Admin Replies
1. Admin replies to the message in Telegram (or clicks "Reply to Customer" button)
2. Telegram sends webhook update to `/api/telegram/webhook`
3. Webhook extracts customer ID and message text
4. Message is stored in session
5. Message is pushed to customer via Server-Sent Events (SSE)
6. Customer sees the reply in real-time with sound and browser notification

## Configuration

All configuration is hardcoded in `components/chat/ChatWidget.tsx`. You can modify:

- `position`: 'left' or 'right' (default: 'right')
- `autoPop`: true/false (default: true)
- `autoPopDelay`: milliseconds (default: 5000)
- `supportName`: Support agent name (default: 'Support')
- `supportAvatar`: URL to avatar image (default: '/images/logo.webp')
- `welcomeMessage`: Welcome message text

## Troubleshooting

### Webhook Not Receiving Updates

1. Verify webhook is set: `curl "https://api.telegram.org/botYOUR_BOT_TOKEN/getWebhookInfo"`
2. Check that your domain uses HTTPS
3. Verify the webhook URL is publicly accessible
4. Check server logs for webhook errors

### Messages Not Appearing in Telegram

1. Verify `TELEGRAM_BOT_TOKEN` is correct
2. Verify `TELEGRAM_CHAT_ID` is correct
3. Check that the bot is not blocked
4. Check server logs for API errors

### Customer Not Receiving Replies

1. Verify webhook is set up correctly
2. Check that admin is replying to the correct message in Telegram
3. Check browser console for SSE connection errors
4. Verify customer ID matches between Telegram message and session

### Browser Notifications Not Working

1. Check browser notification permissions
2. Some browsers require user interaction before showing notifications
3. Check browser console for permission errors

## Security Considerations

- The webhook endpoint is publicly accessible - consider adding secret token verification
- Customer data is sent to Telegram - ensure compliance with privacy regulations
- Session data is stored in-memory and cleared after 30 minutes of inactivity
- All messages are stored in Telegram (not in your application)

## Support

For issues or questions:
1. Check server logs for errors
2. Verify environment variables are set correctly
3. Test webhook connectivity
4. Check browser console for client-side errors

## Files Added

The following files were added to your project:

```
/app/api/chat/
  - send/route.ts
  - messages/route.ts
  - stream/route.ts
  - customer-details/route.ts
/app/api/telegram/
  - webhook/route.ts
/components/chat/
  - ChatWidget.tsx
  - ChatToggle.tsx
  - CustomerDetailsModal.tsx
  - MessageBubble.tsx
/lib/chat/
  - session.ts
  - telegram.ts
  - sse.ts
  - utils.ts
/types/
  - chat.ts
```

## Next Steps

1. Customize the chat widget appearance (modify `ChatWidget.tsx`)
2. Add more features (typing indicators, file uploads, etc.)
3. Implement webhook secret verification for security
4. Add analytics or logging as needed

