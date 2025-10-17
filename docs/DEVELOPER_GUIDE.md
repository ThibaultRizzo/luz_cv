# Developer Guide

Complete technical documentation for the Alequintanarpaint CV Website.

---

## Overview

A professional CV website with a full-featured CMS back office. Built with Next.js 15, TypeScript, Vercel Postgres, and Drizzle ORM.

**Tech Stack:**
- Frontend: Next.js 15 (TypeScript, Tailwind CSS v4, Framer Motion)
- Database: Vercel Postgres (PostgreSQL)
- ORM: Drizzle ORM
- Authentication: JWT with bcrypt
- Deployment: Vercel

---

## Prerequisites

Before diving into development:

✅ **Complete first**: [Getting Started](./GETTING_STARTED.md) - Local setup
✅ **Recommended**: Basic knowledge of Next.js, React, and TypeScript

---

## Project Structure

```
alequintanarpaint/
├── src/
│   ├── app/
│   │   ├── (home)/              # Public CV website
│   │   │   ├── layout.tsx       # Home layout with LoadingScreen
│   │   │   └── page.tsx         # Main CV page
│   │   ├── luz/               # Admin routes
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
- Contact (working form with Resend, email, social, availability)

### Authentication Flow

1. User logs in at `/luz` → JWT token issued
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

### 2. CMS Back Office (`/luz/backoffice`)
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

4. **Update back office** (`src/app/luz/backoffice/page.tsx`):
Add input field in the Hero section editor

5. **Create migration** (`migrations/add-hero-new-field.sql`):
```sql
ALTER TABLE content ADD COLUMN IF NOT EXISTS hero_new_field TEXT;
UPDATE content SET hero_new_field = 'Default value' WHERE hero_new_field IS NULL;
```

---

## Deployment

For production deployment instructions, see:
→ **[Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md)** - Complete production deployment guide

---

## Customization

**Want to customize your site?** See the comprehensive **[Customization Guide](./CUSTOMIZATION.md)** for:

- 🎨 **Change Admin Route** - Change `/luz` to `/yourname`
- 🔐 **Change Credentials** - Update username/password
- 🌈 **Change Colors** - Brand colors and theme
- ✏️ **Change Fonts** - Typography customization
- 📝 **Change Content** - SEO, titles, metadata

### Quick Customizations

**Brand colors** (`tailwind.config.js`):
```javascript
colors: {
  brand: {
    cream: '#F8F6F3',  // Background
    deep: '#2C3539',   // Text
    gold: '#D4AF37',   // Accent
  }
}
```

**Admin credentials** (`.env.local`):
```env
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-password
```

**Full guide**: [Customization Guide](./CUSTOMIZATION.md)

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

**Last Updated:** 2025-10-07

---

**Navigation**: [← Getting Started](./GETTING_STARTED.md) | [Documentation Index](./README.md) | [API Reference →](./API_REFERENCE.md)

**Related Guides**:
- [Getting Started](./GETTING_STARTED.md) - Local setup
- [Vercel Deployment](./VERCEL_DEPLOYMENT.md) - Production deployment
- [API Reference](./API_REFERENCE.md) - API documentation
- [Testing Guide](./TESTING.md) - E2E testing
