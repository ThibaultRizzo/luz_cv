# Getting Started

**Your first 10 minutes with the Alequintanarpaint CV Website**

This guide gets you from zero to a running local development environment. Nothing more, nothing less.

---

## Prerequisites Check ✓

Before starting, ensure you have:

- **Node.js 18+** or **Bun** runtime installed
- **Git** installed
- A **Vercel account** (free) - [Sign up here](https://vercel.com)
- 10 minutes of focused time

---

## Step 1: Clone and Install (2 minutes)

```bash
# Clone the repository
git clone <repository-url>
cd alequintanarpaint

# Install dependencies
bun install
# or: npm install
```

**What this does**: Downloads the project and installs all required packages.

---

## Step 2: Create Vercel Postgres Database (3 minutes)

You need a database for local development:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Storage** → **Create Database**
3. Select **Postgres**
4. Name it: `alequintanarpaint-db`
5. Click **Create**
6. Copy the **POSTGRES_URL** connection string

**It looks like**: `postgres://default:abc123...@ep-cool-name.us-east-1.postgres.vercel-storage.com:5432/verceldb`

---

## Step 3: Configure Environment (2 minutes)

```bash
# Copy the example file
cp .env.example .env.local
```

Open `.env.local` and set these **required** variables:

```env
# Database (paste from Vercel dashboard)
POSTGRES_URL=postgres://default:abc123...

# JWT Secrets (generate two different random strings)
JWT_SECRET=your-local-dev-secret-key-minimum-32-chars
REFRESH_TOKEN_SECRET=your-local-refresh-secret-different-32-chars

# Admin Login (choose your credentials)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=devpassword123

# Site URL (for local development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Generate secure secrets** (optional for local dev, required for production):
```bash
openssl rand -base64 32
```

**Optional - Contact Form** (skip for now, add later if needed):
```env
# RESEND_API_KEY=re_your_key
# CONTACT_EMAIL_FROM=Contact Form <onboarding@resend.dev>
# CONTACT_EMAIL_TO=your-email@example.com
```

---

## Step 4: Start Development Server (1 minute)

```bash
bun run dev
# or: npm run dev
```

**You should see**:
```
▲ Next.js 15.5.4
- Local:        http://localhost:3000
```

**Keep this terminal open!**

---

## Step 5: Initialize Database (2 minutes)

Open your browser and visit:

```
http://localhost:3000/api/init-db
```

**You should see**:
```json
{
  "success": true,
  "message": "Database initialized successfully"
}
```

This creates the database tables and your admin user.

---

## ✅ Verify It Works

1. **Homepage**: http://localhost:3000
   - Should load with default content

2. **Login**: http://localhost:3000/luz
   - Use your `ADMIN_USERNAME` and `ADMIN_PASSWORD`

3. **Back Office**: http://localhost:3000/luz/backoffice
   - Should see the CMS dashboard

**If all three work: Congratulations! 🎉**

---

## Troubleshooting

### "Database connection failed"
- Check `POSTGRES_URL` in `.env.local`
- Verify database is active in Vercel dashboard

### "Cannot login"
- Did you visit `/api/init-db`?
- Check credentials match your `.env.local`
- Clear browser localStorage and try again

### Port 3000 already in use
```bash
lsof -ti:3000 | xargs kill -9
bun run dev
```

### Still stuck?
See [Credentials Setup Guide](./CREDENTIALS_SETUP.md) for detailed troubleshooting.

---

## What's Next?

**You now have a working local environment!** Here's what to do next:

### 1. Customize Your Content
- Login at http://localhost:3000/luz
- Edit sections in the back office
- Upload your profile photo

### 2. Learn the Codebase
→ Read [Developer Guide](./DEVELOPER_GUIDE.md) for architecture and customization

### 3. Deploy to Production
→ Follow [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md) when ready

### 4. Optional Enhancements
- **Contact Form**: [Contact Form Setup](./CONTACT_FORM_SETUP.md)
- **Testing**: [Testing Guide](./TESTING.md)
- **API Reference**: [API Documentation](./API_REFERENCE.md)

---

## Quick Reference

**Start dev server**: `bun run dev`
**Build for production**: `bun run build`
**Run linter**: `bun run lint`
**Reset database**: Visit `http://localhost:3000/api/init-db` again

---

**Estimated completion time**: 10 minutes
**Difficulty**: Beginner-friendly

---

**Navigation**: [← Back to Documentation](./README.md) | [Next: Developer Guide →](./DEVELOPER_GUIDE.md)

**Need Help?** Check [Troubleshooting](#troubleshooting) above or ask in issues.

**Last Updated**: 2025-10-07
