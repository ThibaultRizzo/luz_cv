# Developer Guide - Alelunapaint CV Website

## Overview

A professional CV website with a full-featured CMS back office. Built with Next.js 15, TypeScript, Vercel Postgres, and Drizzle ORM.

**Tech Stack:**
- Frontend: Next.js 15 (TypeScript, Tailwind CSS v4, Framer Motion)
- Database: Vercel Postgres (PostgreSQL)
- ORM: Drizzle ORM
- Authentication: JWT with bcrypt
- Deployment: Vercel

---

## Quick Start

### Prerequisites
- Node.js 18+ or Bun runtime
- Git

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd alelunapaint
bun install  # or npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
```env
# Required for production
POSTGRES_URL=<your-vercel-postgres-url>

# JWT Secrets (change these!)
JWT_SECRET=your-super-secure-jwt-secret-key-2024
REFRESH_TOKEN_SECRET=your-super-secure-refresh-token-secret-2024

# Admin Credentials
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. **Initialize the database:**
```bash
# Visit this URL in your browser after starting the dev server
http://localhost:3000/api/init-db
```

4. **Start development server:**
```bash
bun run dev  # or npm run dev
```

---

## Project Structure

```
alelunapaint/
├── src/
│   ├── app/
│   │   ├── (home)/              # Public CV website
│   │   │   ├── layout.tsx       # Home layout with LoadingScreen
│   │   │   └── page.tsx         # Main CV page
│   │   ├── nadia/               # Admin routes
│   │   │   ├── page.tsx         # Login page
│   │   │   └── backoffice/      # CMS back office
│   │   │       └── page.tsx     # Full CMS interface
│   │   ├── api/                 # API routes
│   │   │   ├── auth/            # Authentication endpoints
│   │   │   ├── content/         # Content CRUD
│   │   │   ├── upload/          # File upload
│   │   │   └── init-db/         # DB initialization
│   │   ├── layout.tsx           # Root layout
│   │   ├── robots.ts            # SEO robots
│   │   └── sitemap.ts           # SEO sitemap
│   ├── components/              # React components
│   │   ├── About.tsx
│   │   ├── Achievements.tsx
│   │   ├── Contact.tsx
│   │   ├── EmojiPicker.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── LoadingScreen.tsx    # Premium loading animation
│   │   ├── Nav.tsx
│   │   ├── Skills.tsx
│   │   └── StructuredData.tsx   # SEO schema
│   └── lib/
│       ├── api.ts               # API client with token management
│       ├── TextContentContext.tsx  # Content context provider
│       └── db/
│           ├── connection.ts    # Postgres connection & init
│           └── schema.ts        # Drizzle schema definitions
├── migrations/                  # SQL migration files
├── scripts/                     # Utility scripts
├── public/                      # Static assets
└── docs/                        # Documentation
```

---

## Architecture

### Database Schema

**Tables:**
1. **users** - Admin user accounts
2. **content** - All CV content (single active row)
3. **content_backups** - Automatic backup before each update

**Content Sections:**
- Hero (title, subtitle, description, image, stats, CTA)
- Loading Screen (first name, last name, tagline)
- About (bio, approach, impact metrics, quote)
- Experience (jobs, achievements, highlights)
- Skills (categories, skill levels, certifications, tools)
- Achievements (metrics and milestones)
- Contact (form, email, social, availability)

### Authentication Flow

1. User logs in at `/nadia` → JWT token issued
2. Token stored in localStorage
3. API requests include `Authorization: Bearer <token>`
4. Token auto-refresh on 401 response
5. Logout clears tokens

### Content Management

**Single Active Content Model:**
- Only one active content row exists (`isActive: true`)
- Updates modify this row and create a backup
- Version number increments on each update
- Backups allow content restoration

---

## Key Features

### 1. Loading Screen
- Premium animation with shimmer effects
- Editable via back office
- Smooth fade-out transition

### 2. CMS Back Office (`/nadia/backoffice`)
- Live preview of all sections
- Inline editing for all content fields
- Image upload with preview
- Emoji picker for icons
- Auto-save functionality
- Content backup/restore

### 3. Responsive Design
- Mobile-first approach
- Glassmorphism effects
- Smooth scroll animations
- Section-based navigation

### 4. SEO Optimization
- Dynamic sitemap (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)
- Structured data (JSON-LD)
- Meta tags and Open Graph

---

## API Endpoints

### Authentication
```
POST   /api/auth/login          # Login (returns JWT)
GET    /api/auth/me             # Get current user
```

### Content
```
GET    /api/content             # Get active content
PUT    /api/content             # Update content (admin only)
GET    /api/content/init        # Get content for initialization
```

### Database
```
POST   /api/init-db             # Initialize database & admin user
```

### Upload
```
POST   /api/upload              # Upload files (admin only)
```

---

## Development Workflow

### Running the App

```bash
# Development
bun run dev

# Production build
bun run build
bun run start

# Linting
bun run lint
```

### Database Management

**Initialize database:**
```bash
# Visit in browser after starting dev server
http://localhost:3000/api/init-db
```

**Run migrations:**
```bash
# Set POSTGRES_URL in .env.local first
bun scripts/runMigration.mjs
```

**Schema changes:**
1. Edit `src/lib/db/schema.ts`
2. Update `src/lib/db/connection.ts` (initializeDatabase function)
3. Create migration SQL in `migrations/`
4. Run migration script

### Adding New Content Fields

**Example: Add a new hero field**

1. **Update schema** (`src/lib/db/schema.ts`):
```typescript
export const content = pgTable('content', {
  // ... existing fields
  heroNewField: text('hero_new_field'),
});
```

2. **Update database init** (`src/lib/db/connection.ts`):
```sql
hero_new_field TEXT,
```

3. **Update context** (`src/lib/TextContentContext.tsx`):
```typescript
interface TextContent {
  // ... existing fields
  heroNewField: string;
}

const defaultTextContent: TextContent = {
  // ... existing fields
  heroNewField: "Default value",
};
```

4. **Update back office** (`src/app/nadia/backoffice/page.tsx`):
Add input field in the Hero section editor

5. **Create migration** (`migrations/add-hero-new-field.sql`):
```sql
ALTER TABLE content ADD COLUMN IF NOT EXISTS hero_new_field TEXT;
UPDATE content SET hero_new_field = 'Default value' WHERE hero_new_field IS NULL;
```

---

## Deployment (Vercel)

### Setup

1. **Create Vercel Postgres database:**
   - Go to Vercel dashboard → Storage → Create Database
   - Select Postgres
   - Copy connection strings

2. **Set environment variables in Vercel:**
```env
POSTGRES_URL=<from-vercel-postgres>
POSTGRES_PRISMA_URL=<from-vercel-postgres>
POSTGRES_URL_NON_POOLING=<from-vercel-postgres>
POSTGRES_USER=<from-vercel-postgres>
POSTGRES_HOST=<from-vercel-postgres>
POSTGRES_PASSWORD=<from-vercel-postgres>
POSTGRES_DATABASE=<from-vercel-postgres>

JWT_SECRET=<generate-secure-secret>
REFRESH_TOKEN_SECRET=<generate-secure-secret>
JWT_EXPIRE=24h
REFRESH_TOKEN_EXPIRE=7d

ADMIN_USERNAME=<your-admin-username>
ADMIN_PASSWORD=<your-secure-password>

NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

NODE_ENV=production
BCRYPT_ROUNDS=12
```

3. **Deploy:**
```bash
# Via Vercel CLI
vercel --prod

# Or connect GitHub repo in Vercel dashboard
```

4. **Initialize production database:**
Visit: `https://your-domain.vercel.app/api/init-db`

### Post-Deployment

- Test login at `/nadia`
- Verify content loads on homepage
- Test back office content editing
- Check image uploads work
- Verify SEO (sitemap, robots.txt)

---

## Customization

### Styling & Branding

**Brand colors** (`tailwind.config.js`):
```javascript
colors: {
  brand: {
    cream: '#F8F6F3',
    deep: '#2C3539',
    gold: '#D4AF37',
  }
}
```

**Fonts** (`src/app/layout.tsx`):
- Playfair Display (default header)
- Cormorant Garamond (alternative)
- Bodoni Moda (alternative)

### Content Defaults

Edit `src/lib/TextContentContext.tsx` to change default values shown before database content loads.

### Loading Screen Animation

Customize in `src/components/LoadingScreen.tsx`:
- Animation duration
- Shimmer effect colors
- Fade-out timing

---

## Troubleshooting

### Database Connection Issues

**Error: "Cannot connect to database"**
```bash
# Check POSTGRES_URL is set correctly
echo $POSTGRES_URL

# Verify database exists
# Use Vercel dashboard or psql to connect
```

### Authentication Issues

**Error: "JWT malformed"**
- Clear browser localStorage
- Re-login
- Verify JWT_SECRET matches between sessions

### Build Errors

**Error: "Module not found"**
```bash
# Clean install
rm -rf node_modules .next
bun install
bun run build
```

### Migration Issues

**Error: "Column already exists"**
- Migrations use `IF NOT EXISTS` - safe to re-run
- Check if migration already applied manually

---

## Performance Tips

1. **Optimize images:**
   - Use Next.js Image component
   - Compress images before upload
   - WebP format recommended

2. **Reduce bundle size:**
   - Check bundle with `bun run build`
   - Use dynamic imports for heavy components

3. **Database optimization:**
   - Content is cached in context
   - Only one active row (fast queries)
   - Backups don't affect performance

---

## Security Best Practices

1. **Never commit secrets:**
   - Use `.env.local` (gitignored)
   - Rotate JWT secrets regularly

2. **Strong passwords:**
   - Change default admin credentials
   - Use 12+ character passwords
   - Enable 2FA if available

3. **Rate limiting:**
   - Consider adding rate limiting middleware
   - Protect upload endpoints

4. **HTTPS only:**
   - Vercel provides automatic HTTPS
   - Force secure cookies in production

---

## Testing

### Manual Testing Checklist

- [ ] Login/logout works
- [ ] All sections editable in back office
- [ ] Live preview updates correctly
- [ ] Image upload and display
- [ ] Content save/restore
- [ ] Mobile responsive
- [ ] Loading screen displays
- [ ] SEO tags present

### API Testing

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'

# Get content
curl http://localhost:3000/api/content

# Update content (use token from login)
curl -X PUT http://localhost:3000/api/content \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"heroTitle":"New Title"}'
```

---

## Maintenance

### Regular Tasks

1. **Backup content:**
   - Automatic on each update
   - Consider external backups for production

2. **Monitor errors:**
   - Check Vercel logs
   - Set up error tracking (Sentry)

3. **Update dependencies:**
```bash
bun update
# Test thoroughly after updates
```

4. **Security patches:**
   - Monitor GitHub security alerts
   - Update Next.js regularly

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## Support

For issues or questions:
1. Check this documentation
2. Review code comments
3. Check Vercel logs
4. Consult Next.js/Drizzle docs

**Project Status:** Production-ready ✅

**Last Updated:** 2025-10-05
