# Quick Start Guide

Fast-track guide to get from zero to production in 30 minutes.

---

## Prerequisites

✅ **Complete first**: [Getting Started](./GETTING_STARTED.md) (10-minute local setup)

You should have:
- Local development environment running
- Admin credentials working
- Vercel account (free)

---

## Vercel Deployment

### 1. Create Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Storage** → **Create Database**
3. Select **Postgres**
4. Copy all connection strings

### 2. Deploy to Vercel

**Option A: Via GitHub**
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables (see step 3)
4. Deploy

**Option B: Via CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### 3. Set Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```env
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

JWT_SECRET=
REFRESH_TOKEN_SECRET=
JWT_EXPIRE=24h
REFRESH_TOKEN_EXPIRE=7d

ADMIN_USERNAME=
ADMIN_PASSWORD=

# Contact Form - Resend (Optional)
RESEND_API_KEY=
CONTACT_EMAIL_FROM=
CONTACT_EMAIL_TO=

NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

NODE_ENV=production
BCRYPT_ROUNDS=12
```

### 4. Initialize Production Database

Visit your deployed site:
```
https://your-domain.vercel.app/api/init-db
```

### 5. Done! 🎉

Visit: `https://your-domain.vercel.app`

---

## What's Next?

After deployment:

### 1. Customize Content
- Login to back office: `https://your-domain.vercel.app/luz`
- Update all sections with your information
- Upload your profile photo

### 2. Test Everything
- Verify all sections display correctly
- Test admin login and content editing
- Try contact form (if Resend configured)
- Check mobile responsiveness

### 3. Advanced Setup (Optional)
- Configure custom domain
- Set up Resend email service
- Review security settings
- Enable Vercel Analytics

---

## Common Issues

### "Database connection failed"
→ Check environment variables in Vercel Dashboard
→ See [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md#troubleshooting)

### "Cannot login"
→ Visit `/api/init-db` to initialize database
→ Verify admin credentials in environment variables

### Contact form not working
→ Configure Resend: [Contact Form Setup](./CONTACT_FORM_SETUP.md)

---

## Next Steps

**Learn More**:
- [Developer Guide](./DEVELOPER_GUIDE.md) - Architecture & customization
- [API Reference](./API_REFERENCE.md) - API documentation
- [Testing Guide](./TESTING.md) - E2E testing

**Full Documentation**:
- [Documentation Index](./README.md) - All guides

---

**Total Time**: 30 minutes (10 min setup + 20 min deployment)
**Difficulty**: Beginner-friendly
**Status**: Production-ready ✅

---

**Navigation**: [← Getting Started](./GETTING_STARTED.md) | [Documentation Index](./README.md) | [Developer Guide →](./DEVELOPER_GUIDE.md)

**Last Updated**: 2025-10-07
