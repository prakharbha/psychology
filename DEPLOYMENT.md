# Deployment Guide

## GitHub Repository

✅ **Repository Created**: https://github.com/prakharbha/psychology

## Environment Variables Setup

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following environment variables:

```
PHONEPE_CLIENT_ID=M232KBRZNKLFB_2511132047
PHONEPE_CLIENT_SECRET=OGU5ZTEzOTEtZjFkMi00NGY5LWI4ZmEtMGYzMjRlYTUxOThh
PHONEPE_CLIENT_VERSION=1
PHONEPE_ENVIRONMENT=UAT
PHONEPE_REDIRECT_URL_SUCCESS=https://yourdomain.com/payment/success
PHONEPE_REDIRECT_URL_FAILURE=https://yourdomain.com/payment/failure
PHONEPE_WEBHOOK_URL=https://yourdomain.com/api/phonepe/webhook
```

4. Set these for **Production**, **Preview**, and **Development** environments as needed

### For Local Development:

Create a `.env.local` file in the root directory (already in `.gitignore`):

```bash
PHONEPE_CLIENT_ID=your_client_id_here
PHONEPE_CLIENT_SECRET=your_client_secret_here
PHONEPE_CLIENT_VERSION=1
PHONEPE_ENVIRONMENT=UAT
PHONEPE_REDIRECT_URL_SUCCESS=http://localhost:3000/payment/success
PHONEPE_REDIRECT_URL_FAILURE=http://localhost:3000/payment/failure
PHONEPE_WEBHOOK_URL=http://localhost:3000/api/phonepe/webhook
```

## Security Notes

✅ **No credentials committed to git** - All `.env*` files are in `.gitignore`
✅ **Documentation uses placeholders** - No real credentials in documentation
✅ **Environment variables** - All sensitive data stored in environment variables

## Connecting Vercel to GitHub

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New Project**
3. Import the GitHub repository: `prakharbha/psychology`
4. Vercel will auto-detect Next.js settings
5. Add environment variables (see above)
6. Deploy!

## Auto-Deployment

Once connected, Vercel will automatically deploy:
- **Production**: On push to `main` branch
- **Preview**: On pull requests

## Testing

After deployment:
1. Test the checkout flow with PhonePe payment
2. Configure webhook URL in PhonePe Dashboard (use your Vercel domain)
3. Test payment success/failure flows

