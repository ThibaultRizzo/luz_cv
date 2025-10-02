# Vercel Deployment Guide - MongoDB Atlas Integration

## 🚀 Quick Migration to Vercel with MongoDB Atlas

This guide shows how to deploy your existing Node.js back office to Vercel with minimal code changes.

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account (no credit card required)
3. Create new cluster (select free M0 tier)
4. **Important**: Choose region closest to your users

## Step 2: Set Up Database Access

1. **Create Database User**:
   - Username: `alelunapaint-admin`
   - Password: Generate strong password (save it!)
   - Roles: Read and write to any database

2. **Configure Network Access**:
   - Add IP: `0.0.0.0/0` (allows access from anywhere - Vercel needs this)
   - Or use Vercel's IP ranges for better security

3. **Get Connection String**:
   ```
   mongodb+srv://alelunapaint-admin:<password>@cluster0.xxxxx.mongodb.net/alelunapaint?retryWrites=true&w=majority
   ```

## Step 3: Update Project for Vercel

### Create `vercel.json`
```json
{
  "functions": {
    "backend/src/**/*.js": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/backend/src/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Update `backend/package.json`
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "bun --watch src/server.js",
    "init-db": "node src/scripts/initDatabase.js",
    "vercel-build": "echo 'Build complete'"
  }
}
```

### Create `backend/api/index.js` (Vercel entry point)
```javascript
// This file makes the backend work with Vercel Functions
const app = require('../src/server.js');

module.exports = app;
```

## Step 4: Environment Variables for Vercel

In Vercel Dashboard → Settings → Environment Variables:

```env
# Database (MongoDB Atlas)
MONGODB_URI=mongodb+srv://alelunapaint-admin:<password>@cluster0.xxxxx.mongodb.net/alelunapaint?retryWrites=true&w=majority

# Authentication (CHANGE THESE FOR PRODUCTION!)
JWT_SECRET=your-super-secure-production-jwt-secret-key-2024
REFRESH_TOKEN_SECRET=your-super-secure-production-refresh-token-secret-2024
JWT_EXPIRE=24h
REFRESH_TOKEN_EXPIRE=7d

# Admin Credentials (CHANGE THESE!)
ADMIN_USERNAME=your-secure-admin-username
ADMIN_PASSWORD=your-secure-admin-password

# Security
BCRYPT_ROUNDS=12
NODE_ENV=production

# CORS (UPDATE WITH YOUR DOMAIN)
FRONTEND_URL=https://your-domain.vercel.app
ALLOWED_ORIGINS=https://your-domain.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Step 5: Deploy to Vercel

### Option A: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### Option B: GitHub Integration
1. Push to GitHub
2. Connect repository in Vercel dashboard
3. Auto-deploys on every push

## Step 6: Initialize Production Database

After deployment, initialize your database:

```bash
# Using Vercel CLI
vercel env pull .env.production
node backend/src/scripts/initDatabase.js
```

## 🔧 Code Changes Required

### Update `backend/src/server.js`
```javascript
// Add this at the end for Vercel compatibility
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
```

### Update Frontend API URL
Update `.env.local` (for development) and Vercel env (for production):
```env
# Development
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Production (Vercel env var)
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api
```

## 🎯 Testing Production Deployment

1. **Test API endpoints**:
   ```bash
   curl https://your-domain.vercel.app/api/content
   ```

2. **Test admin login**:
   ```bash
   curl -X POST https://your-domain.vercel.app/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"your-admin","password":"your-password"}'
   ```

3. **Test back office**: `https://your-domain.vercel.app/nadia`

## 🚨 Security Checklist for Production

- [ ] Change all default passwords
- [ ] Use strong JWT secrets (32+ characters)
- [ ] Update CORS origins to your domain only
- [ ] Enable MongoDB Atlas IP whitelist (optional)
- [ ] Review rate limiting settings
- [ ] Test admin access from production URL

## 🔄 Development vs Production

### Development (Current)
- Docker MongoDB
- Local environment variables
- `bun run dev`

### Production (Vercel)
- MongoDB Atlas
- Vercel environment variables
- Serverless functions

### Hybrid Workflow
```bash
# Development
docker-compose up -d  # Local MongoDB
bun run dev          # Backend + Frontend

# Production
vercel --prod        # Deploy to Vercel with Atlas
```

## 📊 Cost Considerations

- **MongoDB Atlas**: Free M0 tier (512MB storage)
- **Vercel**: Free tier includes serverless functions
- **Total monthly cost**: $0 for small-medium traffic

## 🆘 Troubleshooting

### Common Issues:

1. **Function timeout**: Increase timeout in `vercel.json`
2. **Cold starts**: Consider upgrading Vercel plan for faster functions
3. **Database connection**: Ensure Atlas IP whitelist includes `0.0.0.0/0`
4. **CORS errors**: Update `ALLOWED_ORIGINS` with production domain

### Debug Commands:
```bash
# Check Vercel function logs
vercel logs

# Test locally with production env
vercel dev
```

## ✅ Success Criteria

When deployment is successful:
- [ ] Website loads at your Vercel domain
- [ ] Admin login works at `/nadia`
- [ ] Back office loads at `/nadia/backoffice`
- [ ] Content updates persist in MongoDB Atlas
- [ ] API endpoints respond correctly

---

**Result**: Full-featured Node.js back office running on Vercel with managed MongoDB Atlas database! 🎉