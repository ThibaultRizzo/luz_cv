# Customization Guide

Complete guide to customizing your CV website to match your brand and preferences.

---

## Prerequisites

**Before customizing:**
✅ Complete [Getting Started](./GETTING_STARTED.md) - Local setup working
✅ Basic understanding of Next.js file structure
✅ Text editor for code changes

---

## Table of Contents

1. [Change Admin Route Name](#change-admin-route-name) - Change `/nadia` to `/yourname`
2. [Change Admin Credentials](#change-admin-credentials) - Update username/password
3. [Change Site Colors](#change-site-colors) - Brand colors and theme
4. [Change Site Content](#change-site-content) - SEO, titles, metadata
5. [Change Fonts](#change-fonts) - Typography customization

---

## Change Admin Route Name

By default, the admin panel is at `/nadia/backoffice`. Here's how to change it to `/yourname/backoffice`.

### Why Change This?

- **Personalization**: Use your own name or brand
- **Security**: Obscure the admin URL from default
- **Branding**: Match your personal preferences

### Step-by-Step Instructions

#### 1. Rename the Folder

```bash
# Navigate to your project
cd alelunapaint

# Rename the nadia folder to your preferred name
mv src/app/nadia src/app/john

# Replace "john" with your desired route name (lowercase, no spaces)
```

**Example**: For route `/admin/backoffice`, rename to `src/app/admin`

#### 2. Update Hardcoded References

You need to update 2 files that reference the old route:

**File 1: `src/app/[yourname]/page.tsx`**

Find line ~35:
```typescript
// OLD
window.location.href = '/nadia/backoffice';

// NEW
window.location.href = '/john/backoffice';  // Replace with your route name
```

**File 2: `src/lib/api.ts`**

Find line ~103:
```typescript
// OLD
window.location.href = '/nadia';

// NEW
window.location.href = '/john';  // Replace with your route name
```

#### 3. Update Documentation References (Optional)

Update references in your documentation:

```bash
# Search for documentation files mentioning the old route
grep -r "nadia" README.md docs/*.md

# Update URLs in documentation to match your new route
```

Common places to update:
- `README.md` - References to admin login
- `docs/GETTING_STARTED.md` - Login instructions
- `docs/VERCEL_DEPLOYMENT.md` - Testing steps

#### 4. Clear Cache and Test

```bash
# Stop the dev server (Ctrl+C)

# Clear Next.js cache
rm -rf .next

# Restart dev server
bun run dev

# Test your new route
# Visit: http://localhost:3000/yourname (login page)
# After login: http://localhost:3000/yourname/backoffice
```

### Verification Checklist

- [ ] Folder renamed: `src/app/[yourname]/`
- [ ] Login page updated: `src/app/[yourname]/page.tsx` line 35
- [ ] API redirect updated: `src/lib/api.ts` line 103
- [ ] Documentation updated (optional)
- [ ] Cache cleared: `.next` folder deleted
- [ ] Login page loads at `/yourname`
- [ ] After login, redirects to `/yourname/backoffice`
- [ ] Back office loads successfully

### Common Issues

**Issue**: "404 Not Found" at new route
**Solution**: Make sure you restarted the dev server and cleared `.next` folder

**Issue**: Redirects to old `/nadia` route
**Solution**: Check you updated both files (page.tsx and api.ts)

**Issue**: Compilation errors
**Solution**: Make sure folder name uses only lowercase letters, numbers, and hyphens (no spaces or special characters)

---

## Change Admin Credentials

### Quick Method (Environment Variables)

Admin credentials are configured via environment variables - **no code changes needed!**

#### Local Development

1. **Open `.env.local`**:
   ```bash
   nano .env.local
   # or: code .env.local
   ```

2. **Update credentials**:
   ```env
   # Change these to whatever you want
   ADMIN_USERNAME=john_smith
   ADMIN_PASSWORD=MySecurePassword123!
   ```

3. **Re-initialize database**:
   ```bash
   # This creates a new admin user with your new credentials
   curl http://localhost:3000/api/init-db
   ```

4. **Test login**:
   - Visit: `http://localhost:3000/nadia` (or your custom route)
   - Login with your new credentials

#### Production (Vercel)

1. **Open Vercel Dashboard**:
   - Go to your project → Settings → Environment Variables

2. **Update variables**:
   - Find `ADMIN_USERNAME` and update the value
   - Find `ADMIN_PASSWORD` and update the value

3. **Redeploy**:
   ```bash
   # Trigger a new deployment to apply changes
   vercel --prod
   # or push to GitHub if using continuous deployment
   ```

4. **Re-initialize production database**:
   ```bash
   curl https://your-domain.vercel.app/api/init-db
   ```

5. **Test login**:
   - Visit: `https://your-domain.vercel.app/nadia`
   - Login with new credentials

### Password Recommendations

**Minimum requirements**:
- At least 12 characters
- Mix of uppercase, lowercase, numbers, and symbols
- Not easily guessable

**Good examples**:
- `MyWebsite2024!SecurePass`
- `J0hn$Portfolio#2024`
- `ProductOwner!CV@2024`

**Bad examples** (don't use):
- `password123`
- `admin`
- `myname`

### Security Best Practices

✅ **DO**:
- Use different credentials for development and production
- Use a password manager to generate strong passwords
- Change credentials periodically (every 90 days)
- Never commit credentials to git (they're in `.env.local` which is gitignored)

❌ **DON'T**:
- Use the same password for multiple services
- Share credentials in chat or email
- Use personal information in passwords
- Write credentials in documentation

---

## Change Site Colors

### Brand Colors (Tailwind CSS v4)

**Note**: This project uses **Tailwind CSS v4**, which configures colors differently than v3.

Colors are defined in `src/app/globals.css` using CSS variables:

```css
/* src/app/globals.css */
@theme {
  /* CHANGE THESE HEX VALUES */
  --color-brand-gold: #C7A17A;   /* Accent color (buttons, highlights) */
  --color-brand-deep: #0B132B;   /* Primary text color */
  --color-brand-cream: #FAF7F2;  /* Background color */
}
```

### How to Choose Colors

1. **Find your brand colors**:
   - Use [Coolors.co](https://coolors.co/) to generate palettes
   - Extract colors from your logo
   - Use your company brand guidelines

2. **Update colors in `src/app/globals.css`**:

   Find the `@theme` block (around line 63) and update:
   ```css
   @theme {
     --color-brand-gold: #FF6B6B;   /* Your accent color */
     --color-brand-deep: #1A1A1A;   /* Your text color */
     --color-brand-cream: #FFFFFF;  /* Your background color */
   }
   ```

3. **Save and view changes**:
   - Changes apply automatically (no restart needed)
   - Refresh your browser to see updates

### Color Usage Guide

**Where colors are used**:
- `brand-cream` - Backgrounds, cards, sections
- `brand-deep` - Headings, body text, navbar
- `brand-gold` - Buttons, links, highlights, hover states

**In code**: Colors are referenced as `bg-brand-cream`, `text-brand-deep`, `border-brand-gold`, etc.

### Current Color Values

Default colors for reference:
- **Gold (Accent)**: `#C7A17A` - Warm beige/tan
- **Deep (Text)**: `#0B132B` - Dark navy blue
- **Cream (Background)**: `#FAF7F2` - Off-white/cream

---

## Change Site Content

### Update SEO Metadata

Edit `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "John Smith - Product Owner",  // CHANGE THIS
  description: "Experienced product owner specializing in luxury retail...",  // CHANGE THIS
  keywords: "product owner, luxury retail, portfolio",  // CHANGE THIS

  openGraph: {
    title: "John Smith - Product Owner",  // CHANGE THIS
    description: "Professional CV and portfolio",  // CHANGE THIS
    url: "https://yourwebsite.com",  // CHANGE THIS
    siteName: "John Smith Portfolio",  // CHANGE THIS
  },

  twitter: {
    card: "summary_large_image",
    title: "John Smith - Product Owner",  // CHANGE THIS
    description: "Professional CV and portfolio",  // CHANGE THIS
  }
};
```

### Update Site URL

**Development** (`.env.local`):
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Production** (Vercel Environment Variables):
```env
NEXT_PUBLIC_SITE_URL=https://yourwebsite.com
```

### Update Loading Screen

The loading screen text is **editable via the back office**:

1. Login to `/nadia/backoffice`
2. Go to "Loading Screen" section
3. Edit:
   - First Name
   - Last Name
   - Tagline
4. Click "Save Changes"

---

## Change Fonts

### Current Fonts

The site uses 4 Google Fonts configured in `src/app/layout.tsx`:

```typescript
import { Inter, Playfair_Display, Cormorant_Garamond, Bodoni_Moda } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
});

const bodoni = Bodoni_Moda({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-bodoni',
});
```

Font mapping (configured in `src/app/globals.css`):
```css
@theme {
  --font-family-sans: var(--font-inter), ...;      /* Body text */
  --font-family-serif: var(--font-playfair), ...;  /* Headings */
  --font-family-display: var(--font-cormorant)...; /* Decorative */
  --font-family-bodoni: var(--font-bodoni), ...;   /* Alternative */
}
```

### Change to Different Fonts

**Example: Replace Inter with Montserrat for body text**

1. **Choose fonts** from [Google Fonts](https://fonts.google.com/)

2. **Update imports** in `src/app/layout.tsx`:
   ```typescript
   // Change the import
   import { Montserrat, Playfair_Display, Cormorant_Garamond, Bodoni_Moda } from 'next/font/google';

   // Update the font configuration
   const montserrat = Montserrat({
     subsets: ['latin'],
     variable: '--font-inter',  // Keep same variable name
   });
   ```

3. **Update the className** (line ~100 in layout.tsx):
   ```typescript
   // Find this line and update the variable names
   <body className={`${montserrat.variable} ${playfair.variable} ${cormorant.variable} ${bodoni.variable} ...`}>
   ```

4. **No need to change globals.css** - The font mapping will use your new font automatically

5. **Restart dev server** to see changes:
   ```bash
   # Stop (Ctrl+C) and restart
   bun run dev
   ```

### Font Usage

- `font-sans` (Inter) - Body text, paragraphs, UI elements
- `font-serif` (Playfair) - Headings, hero titles
- `font-display` (Cormorant) - Decorative text
- `font-bodoni` (Bodoni) - Alternative serif

---

## Advanced Customizations

### Add New Sections

See [Developer Guide - Adding Content Fields](./DEVELOPER_GUIDE.md#adding-new-content-fields)

### Modify Components

Edit components in `src/components/`:
- `Hero.tsx` - Landing section
- `About.tsx` - About section
- `Experience.tsx` - Work history
- `Skills.tsx` - Skills showcase
- `Contact.tsx` - Contact form

### Change Layout

Edit `src/app/(home)/page.tsx` to reorder or remove sections.

---

## Testing Your Customizations

### Local Testing

```bash
# Run dev server
bun run dev

# Test all pages
# - Homepage: http://localhost:3000
# - Login: http://localhost:3000/[yourroute]
# - Back office: http://localhost:3000/[yourroute]/backoffice

# Run linter
bun run lint

# Test build
bun run build
```

### Before Deploying

- [ ] All customizations tested locally
- [ ] No console errors
- [ ] Login works with new credentials
- [ ] Back office loads successfully
- [ ] Colors look good on all pages
- [ ] Fonts render correctly
- [ ] SEO metadata updated
- [ ] Build succeeds (`bun run build`)

---

## Rollback Changes

If something breaks:

### Rollback Code Changes

```bash
# Undo uncommitted changes
git checkout .

# Undo last commit
git reset --soft HEAD~1
```

### Rollback Credentials

1. Update `.env.local` with old values
2. Run `curl http://localhost:3000/api/init-db`
3. Login with old credentials

### Rollback Route Name

1. Rename folder back: `mv src/app/john src/app/nadia`
2. Revert code changes in `page.tsx` and `api.ts`
3. Clear cache: `rm -rf .next`
4. Restart: `bun run dev`

---

## Quick Reference

### Files to Edit

| Customization | File(s) to Edit | Restart Needed? |
|---------------|----------------|-----------------|
| Admin route name | Folder name, `page.tsx`, `api.ts` | Yes |
| Admin credentials | `.env.local` or Vercel env vars | No (re-init DB) |
| Site colors | `src/app/globals.css` | No |
| Fonts | `src/app/layout.tsx` | Yes |
| SEO metadata | `src/app/layout.tsx` | Yes |
| Content | Back office UI | No |

### Common Commands

```bash
# Restart dev server
# Ctrl+C, then: bun run dev

# Clear cache
rm -rf .next

# Re-initialize database
curl http://localhost:3000/api/init-db

# Test build
bun run build

# Check for errors
bun run lint
```

---

## Getting Help

**Stuck with customization?**
- Review [Developer Guide](./DEVELOPER_GUIDE.md)
- Check code comments in source files
- Verify changes in git: `git diff`

**Documentation**:
- [Getting Started](./GETTING_STARTED.md) - Setup
- [Developer Guide](./DEVELOPER_GUIDE.md) - Architecture
- [Vercel Deployment](./VERCEL_DEPLOYMENT.md) - Production

---

**Last Updated**: 2025-10-07
**Difficulty**: Beginner to Intermediate

---

**Navigation**: [← Developer Guide](./DEVELOPER_GUIDE.md) | [Documentation Index](./README.md) | [Getting Started →](./GETTING_STARTED.md)
