# Credentials & Security Setup

Complete guide to configuring database and back office credentials for your CV website.

---

## Prerequisites

**Before starting:**
- Have a Vercel account (free)
- Basic understanding of environment variables
- Text editor to edit `.env.local`

**New to the project?**
→ Start with **[Getting Started](./GETTING_STARTED.md)** first

---

## Overview

This application uses three types of credentials:

1. **Database Credentials** - For PostgreSQL database connection (managed by Vercel)
2. **Admin Credentials** - For back office login (set by you)
3. **JWT Secrets** - For secure authentication tokens (set by you)

---

## 📊 Database Credentials (Vercel Postgres)

### Development Setup

When using Vercel Postgres locally:

1. **Create Vercel Postgres Database**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to **Storage** → **Create Database**
   - Select **Postgres**
   - Name it: `alequintanarpaint-db`

2. **Get Connection String**:
   Vercel provides the complete connection string:
   ```env
   POSTGRES_URL=postgres://username:password@host:5432/database
   ```

3. **Add to `.env.local`**:
   ```env
   POSTGRES_URL=postgres://default:abc123xyz@ep-cool-name-123.us-east-1.postgres.vercel-storage.com:5432/verceldb
   ```

### Production Setup

**Automatic Setup** (Recommended):
1. In Vercel Dashboard, go to your project
2. Navigate to **Storage** tab
3. Click **Connect Store**
4. Select your Postgres database
5. ✅ All credentials auto-populate as environment variables

**Manual Setup**:
If you need to manually configure:

```env
# In Vercel Dashboard → Settings → Environment Variables

POSTGRES_URL=postgres://...
POSTGRES_PRISMA_URL=postgres://...
POSTGRES_URL_NON_POOLING=postgres://...
POSTGRES_USER=default
POSTGRES_HOST=ep-xxx.postgres.vercel-storage.com
POSTGRES_PASSWORD=your-database-password
POSTGRES_DATABASE=verceldb
```

### ⚠️ Important Notes

- **Never commit** database credentials to git
- **Connection strings** contain the password - treat as secrets
- Vercel manages database users and passwords automatically
- You **cannot** change database username/password (managed by Vercel)

---

## 👤 Admin Back Office Credentials

### How to Set Admin Credentials

Admin credentials are configured via environment variables.

#### Development (`.env.local`)

1. **Open `.env.local`**:
   ```bash
   nano .env.local
   # or: code .env.local
   ```

2. **Set credentials**:
   ```env
   ADMIN_USERNAME=your-admin-username
   ADMIN_PASSWORD=your-secure-password
   ```

3. **Initialize database**:
   ```bash
   # Start dev server
   bun run dev

   # Visit initialization endpoint
   open http://localhost:3000/api/init-db
   ```

4. **Login**:
   - Go to: http://localhost:3000/luz
   - Use your credentials to login

#### Production (Vercel)

1. **Open Vercel Dashboard**:
   - Go to your project
   - Navigate to **Settings** → **Environment Variables**

2. **Add admin credentials**:
   ```
   Variable Name: ADMIN_USERNAME
   Value: your-production-admin
   Environment: Production, Preview, Development

   Variable Name: ADMIN_PASSWORD
   Value: your-secure-production-password
   Environment: Production, Preview, Development
   ```

3. **Deploy** (triggers new deployment with new env vars)

4. **Initialize production database**:
   ```bash
   curl https://your-domain.vercel.app/api/init-db
   ```

5. **Login to back office**:
   - Go to: https://your-domain.vercel.app/luz
   - Use your production credentials

### Changing Admin Credentials

#### Method 1: Re-initialize Database

1. **Update environment variables** (`.env.local` or Vercel Dashboard)
2. **Re-run initialization**:
   ```bash
   # Development
   curl http://localhost:3000/api/init-db

   # Production
   curl https://your-domain.vercel.app/api/init-db
   ```

This recreates the admin user with new credentials.

#### Method 2: Direct Database Update

**⚠️ Advanced users only**

Using Vercel Postgres dashboard:

```sql
-- Connect to your database via Vercel Dashboard → Storage → Postgres

-- Update username
UPDATE users SET username = 'new-username' WHERE username = 'old-username';

-- Update password (must be bcrypt hashed)
UPDATE users SET password = '$2b$12$...' WHERE username = 'your-username';
```

**Note**: Passwords must be bcrypt hashed. Use Method 1 instead for simplicity.

---

## 🔑 JWT Secrets

JWT secrets are used to sign authentication tokens.

### Generate Secure Secrets

**Linux/Mac**:
```bash
openssl rand -base64 32
# Example output: k8JHn2mP9xQw4RtY7vLa1bNc3dEf5gHi
```

**Windows (PowerShell)**:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Online Generator**:
- Visit: https://generate-secret.now.sh/32
- Copy generated secret

### Set JWT Secrets

#### Development (`.env.local`)

```env
JWT_SECRET=your-32-character-secret-key-here
REFRESH_TOKEN_SECRET=different-32-character-secret-here
JWT_EXPIRE=24h
REFRESH_TOKEN_EXPIRE=7d
```

#### Production (Vercel)

In Vercel Dashboard → Settings → Environment Variables:

```
Variable: JWT_SECRET
Value: production-jwt-secret-32-chars
Environment: Production, Preview, Development

Variable: REFRESH_TOKEN_SECRET
Value: production-refresh-secret-32-chars
Environment: Production, Preview, Development

Variable: JWT_EXPIRE
Value: 24h
Environment: Production, Preview, Development

Variable: REFRESH_TOKEN_EXPIRE
Value: 7d
Environment: Production, Preview, Development
```

### ⚠️ Security Best Practices

- ✅ **Use different secrets** for development and production
- ✅ **Generate random secrets** - Don't use predictable values
- ✅ **32+ characters** minimum length
- ✅ **Never commit** secrets to git
- ✅ **Rotate secrets** periodically (every 90 days)
- ❌ **Never share** secrets in chat, email, or documentation

---

## 🔒 Complete Environment Variables Setup

### Development `.env.local`

Create this file in project root:

```env
# Database (from Vercel Postgres)
POSTGRES_URL=postgres://default:password@host.vercel-storage.com:5432/verceldb

# Admin Credentials (change these!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=MySecurePassword123!

# JWT Secrets (generate with: openssl rand -base64 32)
JWT_SECRET=generate-a-random-32-character-secret-key
REFRESH_TOKEN_SECRET=generate-a-different-32-character-secret
JWT_EXPIRE=24h
REFRESH_TOKEN_EXPIRE=7d

# Security
BCRYPT_ROUNDS=12
NODE_ENV=development

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production (Vercel Environment Variables)

Set these in Vercel Dashboard:

| Variable | Example Value | Notes |
|----------|---------------|-------|
| `POSTGRES_URL` | Auto-filled | Connect Vercel Postgres |
| `POSTGRES_PRISMA_URL` | Auto-filled | Connect Vercel Postgres |
| `ADMIN_USERNAME` | `admin_prod` | Your choice |
| `ADMIN_PASSWORD` | `SecurePass2024!` | Strong password |
| `JWT_SECRET` | `k8JHn2mP9xQw...` | 32+ chars random |
| `REFRESH_TOKEN_SECRET` | `7vLa1bNc3dEf...` | Different from JWT |
| `JWT_EXPIRE` | `24h` | Token expiry |
| `REFRESH_TOKEN_EXPIRE` | `7d` | Refresh expiry |
| `BCRYPT_ROUNDS` | `12` | Password hashing |
| `NODE_ENV` | `production` | Environment |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Your domain |

---

## 🚀 Step-by-Step First-Time Setup

### 1. Create Vercel Postgres Database

```bash
# Login to Vercel
vercel login

# Create database via dashboard
# Vercel Dashboard → Storage → Create Database → Postgres
```

### 2. Configure Local Environment

```bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local
nano .env.local
```

Add your credentials:
```env
POSTGRES_URL=<from-vercel-dashboard>
ADMIN_USERNAME=admin
ADMIN_PASSWORD=MyDevPassword123
JWT_SECRET=dev-secret-32-characters-long-abc123
REFRESH_TOKEN_SECRET=dev-refresh-secret-32-chars-xyz789
```

### 3. Start Development Server

```bash
# Install dependencies
bun install

# Start server
bun run dev
```

### 4. Initialize Database

Visit: http://localhost:3000/api/init-db

Expected response:
```json
{
  "success": true,
  "message": "Database initialized successfully"
}
```

### 5. Login to Back Office

1. Go to: http://localhost:3000/luz
2. Enter your admin credentials
3. Access back office

---

## 🔄 Common Tasks

### Change Admin Password

**Quick Method**:
1. Update `ADMIN_PASSWORD` in `.env.local` (or Vercel env vars)
2. Run: `curl http://localhost:3000/api/init-db`
3. Use new password to login

### Reset Admin Access

If you forgot your password:

1. **Update environment variable**:
   ```env
   ADMIN_PASSWORD=NewPassword123!
   ```

2. **Re-initialize database**:
   ```bash
   curl http://localhost:3000/api/init-db
   ```

3. **Login with new password**

### Rotate JWT Secrets

**When to rotate**:
- Every 90 days (best practice)
- After a security incident
- When team members leave

**How to rotate**:
1. Generate new secrets: `openssl rand -base64 32`
2. Update environment variables
3. Redeploy application
4. All users will need to re-login

---

## 🆘 Troubleshooting

### "Invalid credentials" error

**Causes**:
- Wrong username/password
- Database not initialized
- Environment variables not set

**Fix**:
```bash
# 1. Check environment variables
cat .env.local | grep ADMIN

# 2. Re-initialize database
curl http://localhost:3000/api/init-db

# 3. Try logging in again
```

### "Database connection failed"

**Causes**:
- Invalid `POSTGRES_URL`
- Database not created
- Network/firewall issue

**Fix**:
```bash
# 1. Verify POSTGRES_URL is set
echo $POSTGRES_URL

# 2. Check Vercel dashboard - is database running?
# 3. Try recreating the database connection
```

### "JWT token invalid"

**Causes**:
- `JWT_SECRET` changed
- Token expired
- Browser cache issue

**Fix**:
1. Clear browser localStorage
2. Login again
3. Check `JWT_SECRET` is consistent

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Changed default admin username
- [ ] Set strong admin password (16+ characters)
- [ ] Generated random JWT secrets (32+ characters)
- [ ] Different secrets for dev and production
- [ ] No credentials committed to git
- [ ] `.env.local` in `.gitignore`
- [ ] All Vercel env vars set to "Production"
- [ ] Database initialization completed
- [ ] Tested login with production credentials
- [ ] Set up 2FA on Vercel account (recommended)

---

## 📝 Password Requirements

### Recommended Password Strength

**Admin Password**:
- Minimum: 12 characters
- Recommended: 16+ characters
- Include: uppercase, lowercase, numbers, symbols
- Example: `MySecureP@ssw0rd2024!`

**JWT Secrets**:
- Minimum: 32 characters
- Recommended: 64+ characters
- Completely random (use generator)
- Example: `k8JHn2mP9xQw4RtY7vLa1bNc3dEf5gHi6jK7lM8nO9pQ`

### Password Generators

- CLI: `openssl rand -base64 32`
- Online: https://1password.com/password-generator/
- Node.js: `crypto.randomBytes(32).toString('base64')`

---

## 📚 Additional Resources

- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Password Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

## 🎯 Quick Reference

### Environment Variables File Locations

| Environment | File Location | How to Edit |
|-------------|---------------|-------------|
| Development | `.env.local` (root directory) | Text editor |
| Production | Vercel Dashboard | Settings → Env Vars |
| Preview | Vercel Dashboard | Settings → Env Vars |

### Default Values

| Variable | Development Default | Production Recommended |
|----------|-------------------|----------------------|
| `ADMIN_USERNAME` | admin | Choose unique name |
| `ADMIN_PASSWORD` | (set by you) | 16+ char password |
| `JWT_EXPIRE` | 24h | 24h or 12h |
| `REFRESH_TOKEN_EXPIRE` | 7d | 7d or 30d |
| `BCRYPT_ROUNDS` | 12 | 12 |

---

**Status**: Complete guide ✅
**Last Updated**: 2025-10-07
**Security Level**: Production-ready 🔒

---

**Navigation**: [← Main README](../README.md) | [Documentation Index](./README.md) | [Vercel Deployment →](./VERCEL_DEPLOYMENT.md)

**Related Guides**:
- [Getting Started](./GETTING_STARTED.md) - Local setup
- [Contact Form Setup](./CONTACT_FORM_SETUP.md) - Email configuration
- [Vercel Deployment](./VERCEL_DEPLOYMENT.md) - Production deployment
