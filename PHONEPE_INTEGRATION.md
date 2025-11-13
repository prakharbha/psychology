# PhonePe Payment Gateway Integration

## Setup Status

✅ **PhonePe SDK**: Installed and integrated
✅ **Environment Variables**: Credentials have been added to `.env.local` (not committed to git)
✅ **API Routes**: Created payment initiation, webhook, and status check endpoints (fully implemented)
✅ **Payment Pages**: Created success and failure callback pages
✅ **Checkout Integration**: Updated checkout page with PhonePe payment option

## Environment Variables

Your PhonePe credentials should be stored in `.env.local` (this file is git-ignored):

```
PHONEPE_CLIENT_ID=your_client_id_here
PHONEPE_CLIENT_SECRET=your_client_secret_here
PHONEPE_CLIENT_VERSION=1
PHONEPE_MERCHANT_ID= (add when available)
PHONEPE_ENVIRONMENT=UAT
```

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

## Next Steps

### 1. ✅ PhonePe SDK - COMPLETED

The PhonePe SDK has been installed and fully integrated:
```bash
npm i https://phonepe.mycloudrepo.io/public/repositories/phonepe-pg-sdk-node/releases/v2/phonepe-pg-sdk-node.tgz
```

All implementation files have been updated with actual SDK code:
- ✅ `lib/phonepe.ts` - SDK initialization implemented
- ✅ `app/api/phonepe/initiate/route.ts` - Payment initiation implemented
- ✅ `app/api/phonepe/webhook/route.ts` - Webhook validation implemented
- ✅ `app/api/phonepe/status/route.ts` - Order status check implemented

### 2. Get Merchant ID (Optional)

Add your Merchant ID to `.env.local`:
```
PHONEPE_MERCHANT_ID=your_merchant_id_here
```

### 3. Update Redirect URLs

Update the redirect URLs in `.env.local` with your production domain:
```
PHONEPE_REDIRECT_URL_SUCCESS=https://yourdomain.com/payment/success
PHONEPE_REDIRECT_URL_FAILURE=https://yourdomain.com/payment/failure
PHONEPE_WEBHOOK_URL=https://yourdomain.com/api/phonepe/webhook
```

### 4. Configure Webhook in PhonePe Dashboard (Test & Production)

**Yes, you can configure webhooks in test/UAT mode!** This is recommended for testing the complete payment flow.

#### For Test/UAT Mode:
1. Log in to PhonePe Business Dashboard
2. **Toggle "Test Mode" to ON** (to see UAT/Sandbox settings)
3. Go to Developer Settings / Webhook Configuration
4. Configure webhook URL: `https://yourdomain.com/api/phonepe/webhook`
   - For local testing, you can use a service like [ngrok](https://ngrok.com/) to expose your local server
   - Example: `https://your-ngrok-url.ngrok.io/api/phonepe/webhook`
5. Set up webhook authentication (username/password if required)
   - If separate credentials are needed, add them to `.env.local` as `PHONEPE_WEBHOOK_USERNAME` and `PHONEPE_WEBHOOK_PASSWORD`

#### For Production Mode:
1. **Toggle "Test Mode" to OFF** (to see Production settings)
2. Follow the same steps as above with your production domain

### 5. Optional: Configure Webhook Credentials

If PhonePe requires separate webhook username/password (different from Client ID/Secret), add them to `.env.local`:

```
PHONEPE_WEBHOOK_USERNAME=your_webhook_username
PHONEPE_WEBHOOK_PASSWORD=your_webhook_password
```

If not set, the system will use `PHONEPE_CLIENT_ID` and `PHONEPE_CLIENT_SECRET` as fallback.

## Testing

1. Use UAT/Sandbox environment for testing
2. Test with PhonePe Test App (Android: `com.phonepe.simulator`)
3. Use test VPAs:
   - Success: `success@ybl`
   - Failure: `failed@ybl`
   - Pending: `pending@ybl`

## Files Created

- `lib/phonepe.ts` - PhonePe service utilities
- `app/api/phonepe/initiate/route.ts` - Payment initiation API
- `app/api/phonepe/webhook/route.ts` - Webhook handler
- `app/api/phonepe/status/route.ts` - Order status check API
- `app/payment/success/page.tsx` - Payment success page
- `app/payment/failure/page.tsx` - Payment failure page
- `.env.local` - Environment variables (not in git)
- `.env.example` - Example environment file template

## Security Notes

- ✅ Credentials are stored in `.env.local` (already in `.gitignore`)
- ✅ Never commit `.env.local` to git
- ✅ Use environment variables in Vercel for production
- ✅ Webhook validation is implemented to verify callbacks

## Reference

- [PhonePe Node.js SDK Documentation](https://developer.phonepe.com/payment-gateway/backend-sdk/nodejs-be-sdk/introduction)
- [PhonePe Integration Steps](https://developer.phonepe.com/payment-gateway/backend-sdk/nodejs-be-sdk/integration-steps)

