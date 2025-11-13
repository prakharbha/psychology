# PhonePe Webhook Guide

## What is a Webhook?

A webhook is a way for PhonePe to automatically notify your server when a payment status changes. Instead of you constantly checking payment status, PhonePe sends updates to your webhook URL when:
- Payment is successful
- Payment fails
- Payment is pending
- Refund is initiated
- Other payment events occur

## Your Webhook URL

**Production URL:**
```
https://www.prakharpsychologicaltest.com/api/phonepe/webhook
```

**Local Testing (using ngrok):**
```
https://your-ngrok-url.ngrok.io/api/phonepe/webhook
```

## How to Configure Webhook in PhonePe Dashboard

### Step 1: Log in to PhonePe Business Dashboard
1. Go to [PhonePe Business Dashboard](https://business.phonepe.com/)
2. Log in with your credentials

### Step 2: Configure Webhook URL

**For UAT/Test Mode:**
1. **Toggle "Test Mode" to ON**
2. Go to **Settings** → **Developer Settings** → **Webhook Configuration**
3. Enter webhook URL: `https://www.prakharpsychologicaltest.com/api/phonepe/webhook`
4. Save the configuration

**For Production Mode:**
1. **Toggle "Test Mode" to OFF**
2. Go to **Settings** → **Developer Settings** → **Webhook Configuration**
3. Enter webhook URL: `https://www.prakharpsychologicaltest.com/api/phonepe/webhook`
4. Save the configuration

### Step 3: Configure Webhook Authentication (if required)

If PhonePe requires separate webhook credentials:
1. Set up username and password in PhonePe Dashboard
2. Add to Vercel environment variables:
   ```
   PHONEPE_WEBHOOK_USERNAME=your_webhook_username
   PHONEPE_WEBHOOK_PASSWORD=your_webhook_password
   ```

If not set, the system uses `PHONEPE_CLIENT_ID` and `PHONEPE_CLIENT_SECRET` as fallback.

## How the Webhook Works

### 1. Payment Flow
```
Customer → Checkout → PhonePe Payment → Payment Complete
                                    ↓
                            PhonePe sends webhook
                                    ↓
                    Your server receives callback
                                    ↓
                    Validates signature & processes
```

### 2. Webhook Processing Steps

1. **PhonePe sends POST request** to your webhook URL
2. **Your server validates** the callback signature
3. **Extract payment data**:
   - Order ID (merchantOrderId)
   - Payment state (SUCCESS, FAILED, PENDING)
   - Amount
   - Payment details
4. **Process the callback**:
   - Update order status in database
   - Send notifications
   - Handle business logic

### 3. Current Implementation

The webhook at `/api/phonepe/webhook`:
- ✅ Validates callback signature
- ✅ Extracts payment information
- ✅ Logs payment status
- ⚠️ TODO: Process payment updates (send notifications, update database)

## Webhook Events

PhonePe sends webhooks for different events:

### Payment Events
- **PAYMENT_SUCCESS**: Payment completed successfully
- **PAYMENT_ERROR**: Payment failed
- **PAYMENT_PENDING**: Payment is pending

### Refund Events
- **REFUND_SUCCESS**: Refund completed
- **REFUND_ERROR**: Refund failed

## Testing the Webhook

### Method 1: Test with Real Payment
1. Make a test payment using test VPA (`success@ybl` or `failed@ybl`)
2. Check Vercel Function Logs for webhook calls
3. Verify webhook receives the callback

### Method 2: Check Vercel Logs
1. Go to Vercel Dashboard → Your Project → Functions
2. Click on `/api/phonepe/webhook`
3. View logs to see webhook calls

### Method 3: Use PhonePe Test Tools
- PhonePe may provide webhook testing tools in dashboard
- Check Developer Settings for webhook testing options

## Environment Variables

Make sure these are set in Vercel:

```
PHONEPE_WEBHOOK_URL=https://www.prakharpsychologicaltest.com/api/phonepe/webhook
PHONEPE_WEBHOOK_USERNAME=your_username (optional)
PHONEPE_WEBHOOK_PASSWORD=your_password (optional)
```

If webhook username/password not set, uses:
- `PHONEPE_CLIENT_ID` as username
- `PHONEPE_CLIENT_SECRET` as password

## Webhook Security

✅ **Signature Validation**: All webhooks are validated using PhonePe SDK
✅ **Authorization Header**: Required for all webhook calls
✅ **HTTPS Only**: Webhook URL must use HTTPS in production

## Troubleshooting

### Webhook Not Receiving Calls
1. **Check URL**: Ensure webhook URL is correctly configured in PhonePe Dashboard
2. **Check HTTPS**: Webhook must be accessible via HTTPS
3. **Check Vercel Logs**: Look for errors in function logs
4. **Test Connectivity**: Use tools like webhook.site to test if URL is reachable

### Webhook Validation Failing
1. **Check Credentials**: Verify webhook username/password are correct
2. **Check Environment**: Ensure using correct environment (UAT vs Production)
3. **Check Logs**: Look for validation error messages

### Webhook Receiving but Not Processing
1. Check Vercel function logs for errors
2. Verify webhook handler code is deployed
3. Check if webhook is returning 200 OK status

## Next Steps

The webhook is currently set up to:
- ✅ Receive and validate callbacks
- ✅ Extract payment information
- ✅ Log payment status

**To enhance it, you can:**
- Send Telegram notifications on payment success/failure
- Update order status in database
- Send email confirmations
- Trigger fulfillment processes

