# Vercel Auto-Deployment Setup via Dashboard

## Connect GitHub Repository to Vercel

Since you're using a different account, follow these steps through the Vercel web dashboard:

### Step 1: Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Make sure you're logged in with the **correct account** (the one that should deploy this project)
3. Click **"Add New Project"** or **"Import Project"**

### Step 2: Import from GitHub

1. If you haven't connected GitHub to Vercel:
   - Click **"Connect Git Repository"**
   - Select **GitHub**
   - Authorize Vercel to access your GitHub account
   - Grant access to the repository (or all repositories)

2. Find and select the repository: **`prakharbha/psychology`**

### Step 3: Configure Project Settings

1. **Project Name**: `psychology` (or keep default)
2. **Framework Preset**: Next.js (should auto-detect)
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `.next` (default)
6. **Install Command**: `npm install` (default)

### Step 4: Add Environment Variables

**Before deploying**, add all environment variables:

1. Click **"Environment Variables"** section
2. Add each variable for **Production**, **Preview**, and **Development**:

```
PHONEPE_CLIENT_ID=M232KBRZNKLFB_2511132047
PHONEPE_CLIENT_SECRET=OGU5ZTEzOTEtZjFkMi00NGY5LWI4ZmEtMGYzMjRlYTUxOThh
PHONEPE_CLIENT_VERSION=1
PHONEPE_ENVIRONMENT=UAT
PHONEPE_REDIRECT_URL_SUCCESS=https://www.prakharpsychologicaltest.com/order-status
PHONEPE_REDIRECT_URL_FAILURE=https://www.prakharpsychologicaltest.com/order-status
PHONEPE_WEBHOOK_URL=https://www.prakharpsychologicaltest.com/api/phonepe/webhook
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_telegram_chat_id_here
```

3. Select which environments each variable applies to (Production, Preview, Development)

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete
3. Your site will be live at the provided Vercel URL

### Step 6: Configure Custom Domain (if needed)

1. Go to **Settings** → **Domains**
2. Add your custom domain: `www.prakharpsychologicaltest.com`
3. Follow DNS configuration instructions

## Enable Auto-Deployment

After the initial deployment:

1. Go to **Settings** → **Git**
2. Verify that:
   - **Production Branch**: `main` (or `master`)
   - **Auto-deploy**: Enabled
   - **Git Repository**: `prakharbha/psychology`

3. If auto-deploy is not enabled:
   - Toggle **"Automatic deployments from Git"** to ON
   - Select **"Production Branch"** as `main`

## Verify Auto-Deployment

1. Make a small change to your code
2. Commit and push to GitHub:
   ```bash
   git commit -m "Test auto-deployment"
   git push
   ```
3. Check Vercel Dashboard → **Deployments** tab
4. You should see a new deployment automatically triggered

## Troubleshooting

### If deployments are not automatic:

1. **Check Git Integration**:
   - Go to **Settings** → **Git**
   - Ensure the repository is properly connected
   - Check that the correct branch (`main`) is selected

2. **Check Vercel GitHub App Permissions**:
   - Go to GitHub → **Settings** → **Applications** → **Authorized OAuth Apps**
   - Find **Vercel** and ensure it has access to your repository

3. **Reconnect Repository**:
   - In Vercel Dashboard → **Settings** → **Git**
   - Click **"Disconnect"** and then **"Connect Git Repository"** again
   - Re-select `prakharbha/psychology`

4. **Check Branch Protection**:
   - Ensure the `main` branch is not protected in a way that blocks Vercel

## Manual Deployment (if needed)

If auto-deployment still doesn't work, you can manually trigger deployments:

1. Go to **Deployments** tab in Vercel Dashboard
2. Click **"Redeploy"** on the latest deployment
3. Or use the **"Deploy"** button to trigger a new deployment

