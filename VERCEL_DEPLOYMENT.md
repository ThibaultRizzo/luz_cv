# Vercel Deployment Guide

Complete guide to deploying your CV website with CMS to Vercel with Vercel Postgres.

## 🎯 Overview

This application is built with:
- **Next.js 15** - React framework with App Router
- **Vercel Postgres** - Managed PostgreSQL database
- **Drizzle ORM** - Type-safe database operations
- **TypeScript** - Type safety throughout
- **Serverless Functions** - Auto-scaling API routes

## 🚀 Deployment Steps

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended)
3. Verify your email

### Step 2: Create Vercel Postgres Database

1. **Navigate to Storage**:
   - Login to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **Storage** in the top navigation
   - Click **Create Database**

2. **Select Postgres**:
   - Choose **Postgres** from the options
   - Name it: `alelunapaint-db` (or your preferred name)
   - Select region closest to your users
   - Click **Create**

3. **Get Connection Details**:
   Vercel automatically provides these environment variables:
   ```env
   POSTGRES_URL=postgres://...
   POSTGRES_PRISMA_URL=postgres://...
   POSTGRES_URL_NON_POOLING=postgres://...
   POSTGRES_USER=...
   POSTGRES_HOST=...
   POSTGRES_PASSWORD=...
   POSTGRES_DATABASE=...
   ```

### Step 3: Deploy Application

#### Option A: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Import Repository**:
   - Go to Vercel Dashboard
   - Click **Add New** → **Project**
   - Select your GitHub repository
   - Click **Import**

3. **Configure Project**:
   - Framework: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Connect Database**:
   - In project settings, go to **Storage**
   - Click **Connect Store**
   - Select your Postgres database
   - Environment variables will auto-populate

5. **Deploy**:
   - Click **Deploy**
   - Wait for build to complete (~2-3 minutes)

#### Option B: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   # Deploy to preview
   vercel

   # Deploy to production
   vercel --prod
   ```

### Step 4: Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

#### Required Variables

```env
# Database (auto-filled when you connect Vercel Postgres)
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# Authentication - CHANGE THESE!
JWT_SECRET=your-production-jwt-secret
REFRESH_TOKEN_SECRET=your-production-refresh-secret
JWT_EXPIRE=24h
REFRESH_TOKEN_EXPIRE=7d

# Admin Credentials - CHANGE THESE!
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password

# Security
BCRYPT_ROUNDS=12
NODE_ENV=production

# Site URL (auto-filled by Vercel)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

#### Generate Secure Secrets

```bash
# Linux/Mac
openssl rand -base64 32

# Or use online generator
# https://generate-secret.now.sh/32
```

**Important**:
- Set environment variables for **Production**, **Preview**, and **Development**
- Use strong, unique secrets for production
- Never commit secrets to git

### Step 5: Initialize Database

After deployment completes:

1. **Visit initialization endpoint**:
   ```
   https://your-domain.vercel.app/api/init-db
   ```

2. **Verify success**:
   You should see:
   ```json
   {
     "success": true,
     "message": "Database initialized successfully",
     "tables": ["users", "content", "content_backups"]
   }
   ```

### Step 6: Test Your Deployment

1. **Visit homepage**:
   ```
   https://your-domain.vercel.app
   ```

2. **Test admin login**:
   ```
   https://your-domain.vercel.app/nadia
   ```

3. **Access back office**:
   ```
   https://your-domain.vercel.app/nadia/backoffice
   ```

4. **Make a content change**:
   - Login to back office
   - Edit any section
   - Click "Save Changes"
   - Verify changes appear on homepage

## 🔧 Custom Domain Setup

### Add Custom Domain

1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Click **Add Domain**
   - Enter your domain: `www.yourdomain.com`

2. **Configure DNS**:
   Vercel provides DNS records to add:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Update Environment Variable**:
   ```env
   NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
   ```

4. **Redeploy**:
   - Trigger new deployment
   - Or: `vercel --prod`

## 📊 Vercel Analytics (Optional)

### Enable Analytics

1. **In Vercel Dashboard**:
   - Go to Project → Analytics
   - Click **Enable Analytics**

2. **View Metrics**:
   - Pageviews
   - Unique visitors
   - Top pages
   - Device breakdown

## 🔒 Security Best Practices

### Production Checklist

- [ ] **Change default credentials**
  - Set strong admin username
  - Set strong admin password (16+ characters)

- [ ] **Generate strong secrets**
  - JWT_SECRET (32+ characters)
  - REFRESH_TOKEN_SECRET (32+ characters)

- [ ] **Environment variables**
  - All secrets in Vercel env vars
  - Never commit .env files to git
  - Use different secrets for dev/prod

- [ ] **Database security**
  - Vercel Postgres has built-in security
  - Connection pooling enabled
  - SSL connections enforced

- [ ] **Application security**
  - CORS configured for production domain
  - JWT tokens expire after 24h
  - Refresh tokens expire after 7d
  - Passwords hashed with bcrypt (12 rounds)

## 🔄 Continuous Deployment

### Auto-Deploy on Git Push

When using GitHub integration:

1. **Push to main branch**:
   ```bash
   git push origin main
   ```

2. **Vercel auto-deploys**:
   - Runs `npm run build`
   - Runs tests (if configured)
   - Deploys to production

3. **Preview deployments**:
   - Every pull request gets a preview URL
   - Test changes before merging
   - Automatic cleanup after merge

### Manual Deployment

```bash
# Deploy current directory
vercel --prod

# Deploy with environment
vercel --prod --env NODE_ENV=production
```

## 📈 Monitoring & Logs

### View Logs

```bash
# Vercel CLI
vercel logs

# Filter by function
vercel logs --filter="/api/content"

# Follow logs in real-time
vercel logs --follow
```

### View in Dashboard

1. Go to Project → Deployments
2. Click on a deployment
3. View **Function Logs** tab
4. See real-time serverless function execution

### Error Monitoring

Errors are automatically logged:
- Function errors
- Build errors
- Runtime errors

Access via:
- Vercel Dashboard → Project → Logs
- Real-time monitoring in deployment view

## 🧪 Testing Production

### API Endpoints

```bash
# Test content endpoint
curl https://your-domain.vercel.app/api/content

# Test login
curl -X POST https://your-domain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"your-admin","password":"your-password"}'

# Test authenticated endpoint
curl https://your-domain.vercel.app/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Load Testing

```bash
# Install Apache Bench
sudo apt-get install apache2-utils

# Test with 100 requests, 10 concurrent
ab -n 100 -c 10 https://your-domain.vercel.app/
```

## 🆘 Troubleshooting

### Common Issues

#### 1. "Database connection failed"

**Causes**:
- Database not created
- Connection string incorrect
- Environment variables not set

**Fix**:
```bash
# Check Vercel dashboard
# Storage → Postgres → Check status

# Verify env vars are set
vercel env ls

# Redeploy
vercel --prod
```

#### 2. "Build fails"

**Causes**:
- TypeScript errors
- Missing dependencies
- Environment variables missing

**Fix**:
```bash
# Test build locally
npm run build

# Check build logs
vercel logs --filter="build"

# Ensure all env vars are set
```

#### 3. "401 Unauthorized"

**Causes**:
- Token expired
- JWT secret mismatch
- Database not initialized

**Fix**:
```bash
# Initialize database
curl https://your-domain.vercel.app/api/init-db

# Clear localStorage
# Login again
```

#### 4. "Function timeout"

**Causes**:
- Database query too slow
- Function processing too long
- Cold start delay

**Fix**:
- Optimize database queries
- Add indexes to database
- Upgrade Vercel plan for longer timeouts

### Debug Mode

Enable verbose logging:

```env
# Add to Vercel env vars
DEBUG=*
LOG_LEVEL=debug
```

## 💰 Cost & Limits

### Vercel Hobby Plan (Free)

- ✅ Unlimited personal projects
- ✅ Automatic HTTPS
- ✅ Serverless functions
- ✅ 100GB bandwidth/month
- ⚠️ Commercial use: upgrade to Pro

### Vercel Postgres (Free Tier)

- ✅ 256 MB storage
- ✅ 60 hours compute/month
- ✅ Connection pooling
- ⚠️ Need more: upgrade to paid tier

### Upgrade Triggers

Consider upgrading when:
- Site has commercial traffic
- Need >256MB database
- Need >60 hours compute/month
- Need team collaboration
- Need advanced analytics

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Drizzle ORM Docs](https://orm.drizzle.team)

## ✅ Success Checklist

After deployment, verify:

- [ ] Homepage loads at production URL
- [ ] Admin login works (`/nadia`)
- [ ] Back office accessible (`/nadia/backoffice`)
- [ ] Content edits persist
- [ ] Image uploads work
- [ ] All sections display correctly
- [ ] Mobile responsive
- [ ] SEO meta tags correct
- [ ] Favicon displays
- [ ] No console errors

## 🎉 Next Steps

1. **Customize Content**:
   - Login to back office
   - Update all sections
   - Upload profile photo
   - Test all features

2. **Configure Domain**:
   - Add custom domain
   - Configure DNS
   - Enable HTTPS (automatic)

3. **Monitor Performance**:
   - Enable Vercel Analytics
   - Check Lighthouse scores
   - Monitor function logs

4. **Share Your Site**:
   - Add to LinkedIn
   - Update resume
   - Share on social media

---

**Deployment Time**: ~10 minutes
**Difficulty**: Beginner-friendly
**Cost**: Free (Hobby plan)
**Status**: Production-ready ✅

**Last Updated**: 2025-10-05
