#!/bin/bash
# This script sets up the Telegram webhook
# Replace YOUR_BOT_TOKEN with your actual bot token

BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-YOUR_BOT_TOKEN}"
WEBHOOK_URL="https://www.prakharpsychologicaltest.com/api/telegram/webhook"

echo "Setting webhook to: $WEBHOOK_URL"
echo "Using bot token: ${BOT_TOKEN:0:10}..."

curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"${WEBHOOK_URL}\"}"

echo ""
echo ""
echo "Checking webhook status..."
curl "https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo"
