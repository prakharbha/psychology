# Quick Start Guide

## 📦 Package Contents

This package contains everything needed to add live chat functionality to your Next.js project.

## 🚀 Quick Setup (5 Steps)

### 1. Copy Files
Copy all folders (`types/`, `components/`, `lib/`, `app/api/`) to your Next.js project root.

### 2. Install Dependencies
```bash
npm install pg @types/pg
```

### 3. Add Environment Variables
Create/update `.env.local`:
```env
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
CHAT__POSTGRES_URL=your_postgres_url
```

### 4. Add CSS
Copy styles from `CSS_STYLES.txt` to `app/globals.css`

### 5. Add to Layout
Add `<ChatWidget />` to `app/layout.tsx` (see `LAYOUT_CHANGES.txt`)

## 📋 After Deployment

1. Initialize database: Visit `https://your-domain.com/api/chat/init-db`
2. Setup webhook: Visit `https://your-domain.com/api/chat/setup-webhook`

## 📁 File Structure

```
chat-widget-package/
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
├── app/
│   └── api/
│       ├── chat/
│       │   ├── send/route.ts
│       │   ├── messages/route.ts
│       │   ├── customer-details/route.ts
│       │   ├── init-db/route.ts
│       │   └── setup-webhook/route.ts
│       └── telegram/
│           └── webhook/route.ts
├── README.md (Full documentation)
├── INTEGRATION_GUIDE.md (Step-by-step guide)
├── CSS_STYLES.txt (CSS to add)
├── LAYOUT_CHANGES.txt (Layout changes)
├── ENV_VARIABLES.txt (Environment variables)
└── PACKAGE_JSON_DEPENDENCIES.txt (Dependencies)
```

## ✅ Checklist

- [ ] Files copied to project
- [ ] Dependencies installed
- [ ] Environment variables set
- [ ] CSS added to globals.css
- [ ] ChatWidget added to layout.tsx
- [ ] Database initialized (after deployment)
- [ ] Telegram webhook configured (after deployment)
- [ ] Tested sending/receiving messages

## 🆘 Need Help?

See `README.md` for detailed documentation and troubleshooting.

