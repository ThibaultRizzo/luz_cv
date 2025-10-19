# Vercel Blob Storage Setup

This guide explains how to set up Vercel Blob Storage for handling file uploads in your portfolio.

## What is Vercel Blob?

Vercel Blob is a serverless file storage solution that works seamlessly with Next.js applications deployed on Vercel. It's required because Vercel's filesystem is read-only in serverless functions.

## Features

- ✅ Automatic CDN distribution
- ✅ No size limits (pay per GB)
- ✅ Fast uploads and downloads
- ✅ Public URLs for assets
- ✅ Seamless integration with Next.js

## Setup Instructions

### 1. Create a Vercel Blob Store

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Storage** tab
4. Click **Create Database**
5. Choose **Blob** from the storage options
6. Click **Create** and follow the prompts
7. Once created, Vercel will automatically add the `BLOB_READ_WRITE_TOKEN` to your environment variables

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Link your project
vercel link

# Create a Blob store
vercel blob create
```

### 2. Environment Variable

The upload system requires the following environment variable:

```env
BLOB_READ_WRITE_TOKEN=your_token_here
```

**For production (Vercel):**
- This is automatically added when you create a Blob store via the dashboard
- Check: Project Settings → Environment Variables

**For local development:**
- Add to your `.env.local` file:
  ```env
  BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXXXXXXXXXX
  ```
- Get your token from: [Vercel Dashboard → Your Project → Storage → Blob → Settings]

### 3. Verify Setup

1. Restart your development server:
   ```bash
   bun run dev
   ```

2. Try uploading a file through the backoffice:
   - Go to `http://localhost:3000/luz/backoffice`
   - Navigate to Hero section
   - Click "Upload Image"
   - Select an image

3. If successful, you'll see the image preview and the URL will be from Vercel Blob:
   ```
   https://[your-blob-id].public.blob.vercel-storage.com/[filename]
   ```

## Usage in the Application

The upload system automatically handles:
- **Hero images** - Profile photos
- **Project images** - Project showcase images
- **Experience icons** - Custom icons for experience cards
- **Skill icons** - Custom icons for skill items
- **CV/Resume PDFs** - Downloadable CV files

All uploaded files are:
- ✅ Automatically optimized
- ✅ Served via CDN
- ✅ Publicly accessible
- ✅ Persistent across deployments

## Pricing

Vercel Blob pricing (as of 2024):
- **Hobby Plan**: $0.50/GB storage + $0.20/GB bandwidth
- **Pro Plan**: Included 100GB bandwidth/month
- **Enterprise**: Custom pricing

For a portfolio site, you'll likely use < 1GB, costing around $1-2/month.

[Check latest pricing](https://vercel.com/docs/storage/vercel-blob/usage-and-pricing)

## Migration from Local Uploads

If you have existing files in `/public/uploads/`, you need to:

1. Upload them manually through the backoffice, OR
2. Use the Vercel Blob API to migrate them:

```javascript
import { put } from '@vercel/blob';
import fs from 'fs';

// Example migration script
const file = fs.readFileSync('./public/uploads/hero.jpg');
const blob = await put('hero.jpg', file, { access: 'public' });
console.log('Migrated:', blob.url);
```

## Troubleshooting

### "BLOB_READ_WRITE_TOKEN is not defined"

**Solution**: Add the token to your environment variables (see step 2 above).

### Upload fails with "Unauthorized"

**Solution**: 
1. Check that you're logged in to the backoffice
2. Clear browser cache and re-login
3. Check browser console for JWT token issues

### Files uploaded locally don't appear in production

**Solution**: This is expected! Local and production use separate Blob stores. Re-upload files in production, or set up a shared token (not recommended for security).

### "Rate limit exceeded"

**Solution**: Vercel Blob has rate limits. Wait a few minutes or upgrade your plan.

## Best Practices

1. **Image Optimization**: Use WebP format for better compression
2. **Naming**: The system uses timestamps to avoid filename conflicts
3. **Cleanup**: Old files aren't automatically deleted - manage them via Vercel Dashboard
4. **Security**: Never expose your `BLOB_READ_WRITE_TOKEN` in client-side code
5. **Testing**: Test uploads in local development before deploying

## Alternative Storage Options

If you prefer not to use Vercel Blob, you can integrate:

- **AWS S3** - More control, potentially cheaper at scale
- **Cloudinary** - Image optimization included
- **UploadThing** - Developer-friendly, generous free tier
- **Supabase Storage** - Good if you're using Supabase already

To use an alternative, modify `/src/app/api/upload/route.ts` with your storage provider's SDK.

## Additional Resources

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Vercel Blob SDK Reference](https://vercel.com/docs/storage/vercel-blob/sdk)
- [Vercel Storage Dashboard](https://vercel.com/dashboard)

