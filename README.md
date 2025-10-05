# Nadia Luna - Professional CV Website with CMS

A modern, production-ready CV website with a powerful Content Management System (CMS) back office built with Next.js 15, TypeScript, Vercel Postgres, and Drizzle ORM.

## 🎯 Features

### Content Management System
- **Full-featured Back Office** at `/nadia/backoffice`
- **Real-time Preview** of all sections as you edit
- **Hero Section**: Title, subtitle, description, stats, CTA buttons
- **About Section**: Bio, approach items, impact metrics, quotes
- **Experience Management**: Add/edit/remove positions with achievements
- **Skills Management**: Categories, proficiency levels, soft skills, certifications
- **Contact Section**: Professional details, social links, availability
- **Image Upload**: Profile photos and CV/resume upload
- **Loading Screen**: Customizable name and tagline

### Technical Features
- 🔐 **JWT Authentication** with refresh tokens
- 📝 **Version Control** - Automatic content versioning
- 💾 **Auto Backups** - Restore previous versions anytime
- 🎨 **Live Preview** - See changes in real-time
- 🚀 **Serverless** - Deploys to Vercel with zero configuration
- 🗄️ **PostgreSQL** - Reliable, scalable data persistence
- 🔒 **Secure** - Password hashing, token-based auth, protected routes
- ⚡ **Fast** - Optimized performance with Next.js 15

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: Vercel Postgres (PostgreSQL)
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Authentication**: JWT with bcrypt
- **Deployment**: Vercel (serverless)

### Project Structure
```
alelunapaint/
├── src/
│   ├── app/
│   │   ├── api/              # API routes (serverless functions)
│   │   │   ├── auth/         # Login, logout, token refresh
│   │   │   ├── content/      # Content CRUD operations
│   │   │   ├── upload/       # Image/file uploads
│   │   │   └── init-db/      # Database initialization
│   │   ├── nadia/            # Admin routes
│   │   │   ├── page.tsx      # Login page
│   │   │   └── backoffice/   # CMS dashboard
│   │   └── layout.tsx        # Root layout with SEO
│   ├── components/           # React components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   └── lib/
│       ├── db/
│       │   ├── connection.ts # Database client
│       │   └── schema.ts     # Drizzle schema
│       ├── api.ts            # API client functions
│       └── TextContentContext.tsx  # Global content state
├── public/                   # Static assets
├── migrations/               # SQL migration scripts
└── scripts/                  # Utility scripts
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** or **Bun** runtime
- **Git**
- **Vercel account** (for database and deployment)

### Local Development

1. **Clone repository**:
   ```bash
   git clone <repository-url>
   cd alelunapaint
   ```

2. **Install dependencies**:
   ```bash
   bun install
   # or: npm install
   ```

3. **Set up environment**:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your values:
   ```env
   # Vercel Postgres connection string
   POSTGRES_URL=your-postgres-url

   # JWT Secrets (generate with: openssl rand -base64 32)
   JWT_SECRET=your-secure-jwt-secret
   REFRESH_TOKEN_SECRET=your-secure-refresh-secret

   # Admin credentials
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-password

   # Site URL
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   **Need help?** See [Credentials Setup Guide](./CREDENTIALS_SETUP.md) for detailed instructions.

4. **Start development server**:
   ```bash
   bun run dev
   # or: npm run dev
   ```

5. **Initialize database**:
   Open in browser: `http://localhost:3000/api/init-db`

6. **Access the site**:
   - **Homepage**: http://localhost:3000
   - **Admin Login**: http://localhost:3000/nadia
   - **Back Office**: http://localhost:3000/nadia/backoffice (after login)

## 📦 Deployment to Vercel

### 1. Create Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** → **Create Database**
3. Select **Postgres**
4. Name it `alelunapaint-db`
5. Copy all connection strings

### 2. Deploy Application

**Option A: GitHub (Recommended)**
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables (see step 3)
4. Deploy automatically

**Option B: Vercel CLI**
```bash
npm i -g vercel
vercel
vercel --prod
```

### 3. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```env
# Database (auto-filled when you connect Vercel Postgres)
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# Authentication (CHANGE THESE!)
JWT_SECRET=your-production-jwt-secret
REFRESH_TOKEN_SECRET=your-production-refresh-secret
JWT_EXPIRE=24h
REFRESH_TOKEN_EXPIRE=7d

# Admin Credentials (CHANGE THESE!)
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password

# Settings
BCRYPT_ROUNDS=12
NODE_ENV=production

# Site URL (update with your domain)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### 4. Initialize Production Database

Visit: `https://your-domain.vercel.app/api/init-db`

### 5. Done! 🎉

Access your site at: `https://your-domain.vercel.app`

## 🔐 Default Credentials

⚠️ **Change these in production!**

- **Username**: Set via `ADMIN_USERNAME` env var
- **Password**: Set via `ADMIN_PASSWORD` env var

## 📖 Documentation

- **[Quick Start Guide](./docs/QUICK_START.md)** - Get started in 5 minutes
- **[Credentials Setup](./CREDENTIALS_SETUP.md)** - Configure database & admin credentials
- **[Vercel Deployment](./VERCEL_DEPLOYMENT.md)** - Complete deployment guide
- **[Developer Guide](./docs/DEVELOPER_GUIDE.md)** - Complete technical documentation
- **[API Reference](./docs/API_REFERENCE.md)** - API endpoint documentation
- **[Vercel Postgres Setup](./VERCEL_POSTGRES_SETUP.md)** - Database migration guide

## 🎨 Customization

### Update Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  brand: {
    cream: '#F8F6F3',  // Background
    deep: '#2C3539',   // Text
    gold: '#D4AF37',   // Accent
  }
}
```

### Update SEO

Edit `src/app/layout.tsx`:
```typescript
export const metadata = {
  title: "Your Name - Product Owner",
  description: "Your professional description",
  // ... other meta tags
}
```

### Update Content

1. Login at `/nadia`
2. Navigate to Back Office
3. Edit each section through the UI
4. Click "Save Changes"
5. Changes persist immediately

## 🔧 Development Commands

```bash
# Development
bun run dev        # Start dev server

# Production
bun run build      # Build for production
bun run start      # Start production server

# Code Quality
bun run lint       # Run ESLint
bun run type-check # Run TypeScript checks

# Database
# Visit: http://localhost:3000/api/init-db
```

## 🗃️ Database Schema

### Tables

1. **users** - Admin user accounts
   - id, username, password (hashed)
   - refresh_tokens, last_login
   - created_at, updated_at

2. **content** - Website content
   - All section fields (hero, about, experience, skills, contact)
   - version, is_active
   - last_modified_by, created_at, updated_at

3. **content_backups** - Version history
   - backup_data (full content snapshot)
   - version, created_by, created_at

## 🔒 Security Features

- ✅ **Password Hashing** - bcrypt with 12 rounds
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Refresh Tokens** - 7-day sessions with refresh capability
- ✅ **Protected Routes** - Admin-only access control
- ✅ **Environment Variables** - Sensitive data in env vars
- ✅ **Type Safety** - TypeScript throughout
- ✅ **SQL Injection Protection** - Drizzle ORM parameterized queries
- ✅ **CORS** - Configured for production domain

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Content
- `GET /api/content` - Get all content (public)
- `PUT /api/content` - Update content (admin only)
- `POST /api/content/init` - Initialize default content

### Uploads
- `POST /api/upload` - Upload images/files (admin only)

### System
- `POST /api/init-db` - Initialize database (run once)

## 🆘 Troubleshooting

### "Database connection failed"
- Verify `POSTGRES_URL` is set correctly
- Ensure Vercel Postgres database is active
- Check Vercel dashboard for database status

### "Cannot login"
- Run `/api/init-db` to create admin user
- Verify credentials match env vars
- Clear browser localStorage and try again

### "401 Unauthorized"
- Clear browser localStorage
- Login again to get new token
- Verify `JWT_SECRET` is consistent

### Build fails on Vercel
- Check environment variables are set
- Review build logs in Vercel dashboard
- Test build locally: `bun run build`

## 💡 Tips

- Content auto-saves when you click "Save Changes"
- Back office shows live preview of all sections
- Every update creates automatic backup
- Supported image formats: JPG, PNG, GIF, WebP (max 5MB)
- All changes persist immediately to database

## 🚀 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Vercel Edge Network**: Global CDN for fast loading
- **Serverless Functions**: Auto-scaling API routes
- **PostgreSQL**: Optimized queries with connection pooling

## 📝 License

Private project - All rights reserved

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review documentation in `/docs`
3. Check Vercel deployment logs

---

**Built with** ❤️ **using Next.js 15, TypeScript, and Vercel Postgres**

**Status**: Production-ready ✅
**Last Updated**: 2025-10-05
