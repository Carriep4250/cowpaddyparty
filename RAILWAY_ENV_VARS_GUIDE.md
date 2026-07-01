# Where to Add Environment Variables in Railway

## Step 1: Get Your Database URL

Before adding variables, you need your database connection string:

```
Dashboard
├── Your Project
│   ├─── mysql (your MySQL database service)
│   │   └─── Click here → "Connect" tab → copy "MYSQL_URL"
```

1. Click on your **MySQL database** service
2. Click the **"Connect"** tab at the top
3. Copy the value next to **"MYSQL_URL"** (looks like `mysql://user:pass@host:port/db`)
4. This is your `DATABASE_URL`

---

## Step 2: Add Variables to Your Main Service

```
Dashboard
├── Your Project
│   ├─── web service (your app - main deployment)
│   │   └─── Click "Variables" tab → Click "New Variable"
```

1. Click on your **main web service** (the app deployment, NOT the database)
2. Click the **"Variables"** tab at the top of the page
3. Click **"New Variable"** button
4. Add each variable one by one (see list below)

---

## Step 3: All Variables to Add

Click "New Variable" for each of these:

```
Variable Name:           Value:
┌────────────────────┐  ┌───────────────────────────────────────┐
│  DATABASE_URL        │  mysql://... (from Step 1)          │
├────────────────────┤  ├────────────────────────────────────────┤
│  SMTP_HOST           │  smtp.gmail.com                      │
├────────────────────┤  ├────────────────────────────────────────┤
│  SMTP_USER           │  support@cowpaddyparty.com           │
├────────────────────┤  ├────────────────────────────────────────┤
│  SMTP_PASS           │  YOUR_GMAIL_APP_PASSWORD             │
├────────────────────┤  ├────────────────────────────────────────┤
│  SMTP_PORT           │  587                                 │
├────────────────────┤  ├────────────────────────────────────────┤
│  SMTP_SECURE         │  false                               │
├────────────────────┤  ├────────────────────────────────────────┤
│  APP_ID              │  19f162ca-29c2-8cc0-8000-0000d6a9d│
├────────────────────┤  ├────────────────────────────────────────┤
│  APP_SECRET          │  (from .env file)                   │
├────────────────────┤  ├────────────────────────────────────────┤
│  VITE_APP_ID         │  (same as APP_ID)                    │
└────────────────────┘  └────────────────────────────────────────┘
```

---

## Step 4: Get Your Gmail App Password

**This is NOT your regular Gmail password!** You need a special "App Password":

1. Go to **https://myaccount.google.com/apppasswords**
2. Sign in with the Gmail account you want to send emails FROM
   - This should be the email you want ticket notifications sent to
   - If you don't have `support@cowpaddyparty.com` as a Gmail, use any Gmail account for now
3. Click **"Select app"** → choose **"Mail"**
4. Click **"Select device"** → choose **"Other (Custom name)"**
5. Type: **"Cow Paddy Party"**
6. Click **"Generate"**
7. Google shows you a 16-character password like: `abcd efgh ijkl mnop`
8. **Copy it immediately** — you can't see it again!
9. Paste that into Railway as your `SMTP_PASS` value

---

## Step 5: Redeploy

After adding all variables:

1. Railway will automatically detect the changes
2. It will **rebuild and redeploy** your app automatically
3. Click the **"Deploy"** link at the top to see progress
4. When it says "Success" — your site is live!

---

## Quick Check: Is It Working?

After deployment, test by visiting:
```
https://YOUR-RAILWAY-URL.com/api/trpc/ping
```
If you see `{"ok":true}` — the backend is running!

Then test the frontend by visiting:
```
https://YOUR-RAILWAY-URL.com/
```
