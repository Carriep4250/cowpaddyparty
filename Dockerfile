# Cow Paddy Party - Deployment Guide

## Easiest Option: Railway (Recommended - Free Tier)

Railway is the simplest way to deploy this app. It handles the database, server, and frontend automatically.

### Step 1: Create a Railway Account
1. Go to https://railway.app
2. Sign up with your GitHub account
3. You get $5/month free credit (more than enough for this site)

### Step 2: Create a MySQL Database
1. In Railway dashboard, click "New" → "Database" → "Add MySQL"
2. Wait a few seconds for it to provision
3. Click on the MySQL service → "Connect" tab
4. Copy the "MYSQL_URL" or "DATABASE_URL" value

### Step 3: Create a New Project
1. Click "New" → "Project"
2. Choose "Deploy from GitHub repo" (if you uploaded the code to GitHub)
   OR choose "Empty Project" and deploy manually

### Option A: Deploy from GitHub (Easiest)
1. Push this code to a GitHub repository
2. In Railway, click "New" → "Project" → "Deploy from GitHub repo"
3. Select your repo
4. Railway will auto-detect the Dockerfile and build it

### Option B: Deploy Manually
1. Click "New" → "Project" → "Empty Project"
2. Click "New" → "Service" → "Empty Service"
3. In the service settings, set the build to use the Dockerfile
4. Upload your code or connect your repo

### Step 4: Set Environment Variables
1. Go to your project/service settings
2. Click "Variables" tab
3. Add these variables:

| Variable | Value | Where to Get It |
|----------|-------|----------------|
| `DATABASE_URL` | `mysql://...` | From your Railway MySQL service "Connect" tab |
| `SMTP_HOST` | Your email SMTP | e.g., `smtp.gmail.com` for Gmail |
| `SMTP_USER` | Your email address | e.g., `support@cowpaddyparty.com` |
| `SMTP_PASS` | App password | See "Email Setup" below |
| `SMTP_PORT` | `587` | Standard port |
| `SMTP_SECURE` | `false` | Use `true` only for port 465 |
| `APP_ID` | From .env file | Already in your .env |
| `APP_SECRET` | From .env file | Already in your .env |
| `VITE_APP_ID` | Same as APP_ID | Same value as APP_ID |

### Step 5: Deploy!
1. Railway will automatically build and deploy
2. Click on your service → "Settings" → "Public Networking"
3. Generate a domain (e.g., `cowpaddy-production.up.railway.app`)
4. Your site is live!

### Step 6: Set Up Your Domain (Optional)
1. In Railway, go to Settings → Public Networking
2. Click "Custom Domain"
3. Enter `cowpaddyparty.com`
4. Follow Railway's DNS instructions to point your GoDaddy domain

---

## Alternative: Render (Free Tier)

1. Go to https://render.com and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Set:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Add environment variables (same as Railway table above)
6. Click "Create Web Service"
7. Render gives you a free `.onrender.com` URL
8. You can add a custom domain in Settings

---

## Email Setup (Required for Ticket Notifications)

### Gmail (Easiest)
1. Go to https://myaccount.google.com/apppasswords
2. Sign in with the Gmail account you want to send from
3. Select app: "Mail" → Device: "Other" → Name: "Cow Paddy Party"
4. Copy the 16-character app password
5. Use that as your `SMTP_PASS`
6. Set `SMTP_USER` to your Gmail address

### Other Providers
- **Outlook/Hotmail:** SMTP host: `smtp.office365.com`, port: `587`
- **Yahoo:** SMTP host: `smtp.mail.yahoo.com`, port: `587`
- **Zoho:** SMTP host: `smtp.zoho.com`, port: `587`

---

## Admin Dashboard

After deployment, access your admin panel at:
```
https://YOUR_DOMAIN.com/admin
```

**Password:** `bama2024`

You can change this password in: `api/routers/ticket.ts` (search for `bama2024`)

---

## Files Included

| File | Purpose |
|------|---------|
| `Dockerfile` | Container config for Railway/Render |
| `railway.toml` | Railway-specific config |
| `.env` | Environment variables (update before deploy) |
| `dist/boot.js` | Built server |
| `dist/public/` | Built frontend |

---

## Need Help?

- **Railway docs:** https://docs.railway.app
- **Render docs:** https://render.com/docs
- **Email issues:** Check your spam folder first!
