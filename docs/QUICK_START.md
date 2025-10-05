# Quick Start Guide

Get the Alelunapaint CV website running in 5 minutes.

---

## Prerequisites

- **Node.js 18+** or **Bun** runtime
- **Git**
- **Vercel account** (for production deployment)

---

## Local Development Setup

### 1. Clone & Install

```bash
git clone <repository-url>
cd alelunapaint
bun install  # or: npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Vercel Postgres (get from Vercel dashboard)
POSTGRES_URL=your-postgres-url

# JWT Secrets (generate secure random strings)
JWT_SECRET=your-secure-jwt-secret-change-this
REFRESH_TOKEN_SECRET=your-secure-refresh-token-secret-change-this

# Admin Login
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Generate secure secrets:**
```bash
# Linux/Mac
openssl rand -base64 32

# Or use online generator
```

> **💡 Need detailed help?** See [Credentials Setup Guide](../CREDENTIALS_SETUP.md) for complete instructions on setting up database and admin credentials.

### 3. Start Development Server

```bash
bun run dev  # or: npm run dev
```

Visit: **http://localhost:3000**

### 4. Initialize Database

Open in browser:
```
http://localhost:3000/api/init-db
```

You should see:
```json
{
  "success": true,
  "message": "Database initialized successfully"
}
```

### 5. Login to Back Office

1. Go to: **http://localhost:3000/nadia**
2. Enter your admin credentials
3. Access back office: **http://localhost:3000/nadia/backoffice**

---

## Project URLs

| Page | URL | Description |
|------|-----|-------------|
| **Homepage** | `/` | Public CV website |
| **Admin Login** | `/nadia` | Login page |
| **Back Office** | `/nadia/backoffice` | CMS dashboard |
| **API Init** | `/api/init-db` | Initialize database |
| **API Content** | `/api/content` | Get content (public) |

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

## First Steps After Setup

### 1. Update Content

1. Login at `/nadia`
2. Go to back office
3. Edit each section:
   - Hero: Your name, title, description
   - About: Your bio, achievements
   - Experience: Your work history
   - Skills: Your expertise
   - Contact: Your contact info

### 2. Upload Images

1. In back office, go to Hero section
2. Click "Upload Image" button
3. Select your profile photo
4. Image will automatically update

### 3. Customize Branding

Edit colors in `tailwind.config.js`:
```javascript
colors: {
  brand: {
    cream: '#F8F6F3',  // Background color
    deep: '#2C3539',   // Text color
    gold: '#D4AF37',   // Accent color
  }
}
```

### 4. Update SEO

Edit `src/app/layout.tsx`:
```typescript
export const metadata = {
  title: "Your Name - Product Owner",
  description: "Your professional description",
  // ... other meta tags
}
```

---

## Common Tasks

### Run Development Server
```bash
bun run dev
```

### Build for Production
```bash
bun run build
bun run start
```

### Lint Code
```bash
bun run lint
```

### Reset Database
```bash
# Visit in browser
http://localhost:3000/api/init-db
```

### Check Logs (Vercel)
```bash
vercel logs
```

---

## Troubleshooting

### "Database connection failed"

**Check:** Is `POSTGRES_URL` set correctly?
```bash
# Print environment variable
echo $POSTGRES_URL
```

**Fix:**
1. Verify connection string in `.env.local`
2. Ensure Vercel Postgres database is running
3. Check firewall/network restrictions

### "Cannot login"

**Check:**
1. Did you initialize the database?
2. Are credentials correct?
3. Check browser console for errors

**Fix:**
```bash
# Re-initialize database
curl -X POST http://localhost:3000/api/init-db

# Clear browser storage
# Open DevTools → Application → Clear Storage
```

### "401 Unauthorized"

**Fix:**
1. Clear browser localStorage
2. Login again
3. Check JWT_SECRET is consistent

### Build fails on Vercel

**Common causes:**
- Missing environment variables
- TypeScript errors
- Missing dependencies

**Fix:**
```bash
# Test build locally first
bun run build

# Check Vercel logs
vercel logs
```

---

## Development Tips

### Auto-save Changes

Content in back office auto-saves when you click "Save Changes".

### Live Preview

The back office shows live preview of all sections as you edit.

### Backup System

Every content update creates an automatic backup. You can restore from backups in the back office.

### Image Uploads

Supported formats: JPG, PNG, GIF, WebP (max 5MB)

---

## Next Steps

- Read [Developer Guide](./DEVELOPER_GUIDE.md) for detailed documentation
- Check [API Reference](./API_REFERENCE.md) for API details
- Customize components in `src/components/`
- Add your own sections or features

---

## Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Drizzle ORM:** https://orm.drizzle.team
- **Tailwind CSS:** https://tailwindcss.com

---

## Support

**Issues?** Check the troubleshooting section above or review code comments.

**Ready to launch?** Follow the Vercel deployment steps above.

---

**Setup Time:** ~5 minutes
**Difficulty:** Beginner-friendly
**Status:** Production-ready ✅

**Last Updated:** 2025-10-05
