# Luz Quintanar - Professional CV Website with CMS

A modern, production-ready CV website with a powerful Content Management System (CMS) built with Next.js 15, TypeScript, Vercel Postgres, and Drizzle ORM.

[![Production Ready](https://img.shields.io/badge/status-production%20ready-brightgreen)]() [![Next.js 15](https://img.shields.io/badge/Next.js-15-black)]() [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)]()

---

## 🚀 Quick Start

**New to this project? Start here:**

1. **[Getting Started Guide](./docs/GETTING_STARTED.md)** ← **Start here for local setup (10 minutes)**
2. **[Local Development Setup](./LOCAL_DEVELOPMENT.md)** - Optional: Set up local database with Docker
3. **[Vercel Deployment](./VERCEL_DEPLOYMENT.md)** - Deploy to production
4. **[Documentation Index](./docs/README.md)** - All guides and references

**Estimated time to first run**: 10 minutes
**Want local development?** Add 5 minutes for Docker setup

---

## ✨ Features

### Content Management System
- **Full-featured Back Office** at `/luz/backoffice`
- **Real-time Preview** of all sections as you edit
- **Hero Section**: Title, subtitle, description, stats, CTA buttons
- **About Section**: Bio, approach items, impact metrics, quotes
- **Experience Management**: Add/edit/remove positions with achievements
- **Skills Management**: Categories, proficiency levels, soft skills, certifications
- **Contact Section**: Professional details, social links, availability
- **Contact Form**: Working email form with Resend integration, spam protection
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

---

## 🏗️ Tech Stack

**Frontend**: Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion
**Backend**: Vercel Postgres (PostgreSQL), Drizzle ORM
**Authentication**: JWT with bcrypt
**Email**: Resend (optional)
**Deployment**: Vercel (serverless)

---

## 📖 Documentation

### Getting Started
- **[Getting Started](./docs/GETTING_STARTED.md)** - **Start here!** 10-minute local setup
- **[Credentials Setup](./docs/CREDENTIALS_SETUP.md)** - Database & admin credentials
- **[Contact Form Setup](./docs/CONTACT_FORM_SETUP.md)** - Resend email service (optional)

### Deployment
- **[Vercel Deployment](./docs/VERCEL_DEPLOYMENT.md)** - Complete production deployment guide
- **[Vercel Blob Setup](./VERCEL_BLOB_SETUP.md)** - File upload storage configuration

### Development
- **[Local Development Setup](./LOCAL_DEVELOPMENT.md)** - Set up local database with Docker
- **[Developer Guide](./docs/DEVELOPER_GUIDE.md)** - Architecture & development
- **[Customization Guide](./docs/CUSTOMIZATION.md)** - Change admin route, colors, fonts
- **[API Reference](./docs/API_REFERENCE.md)** - API endpoints documentation
- **[Testing Guide](./docs/TESTING.md)** - E2E testing with Playwright

### Reference
- **[Documentation Index](./docs/README.md)** - Full documentation map
- **[Code Audit Report](./docs/CODE_AUDIT_REPORT.md)** - Security & quality audit

---

## 🎯 Project Structure

```
alequintanarpaint/
├── src/
│   ├── app/
│   │   ├── api/              # API routes (serverless functions)
│   │   ├── luz/            # Admin routes & back office
│   │   └── layout.tsx        # Root layout with SEO
│   ├── components/           # React components
│   └── lib/
│       ├── db/               # Database schema & connection
│       └── api.ts            # API client functions
├── docs/                     # Documentation
├── public/                   # Static assets
└── migrations/               # SQL migration scripts
```

---

## 🎨 Key Features Showcase

### Content Management
Edit everything through an intuitive back office interface:
- Hero section with stats and CTAs
- About section with impact metrics
- Experience timeline with achievements
- Skills with proficiency levels
- Contact form with real email integration
- Image uploads for profile photos

### Security
- JWT authentication with refresh tokens (24h/7d expiry)
- Bcrypt password hashing (12 rounds)
- Protected API routes
- Environment-based secrets
- SQL injection protection via Drizzle ORM

### Performance
- Lighthouse score: 95+ (Performance, Accessibility, Best Practices, SEO)
- Vercel Edge Network for global CDN
- Serverless functions with auto-scaling
- Optimized PostgreSQL queries with connection pooling

---

## 🔐 Default Credentials

⚠️ **Configure these via environment variables:**

- **Username**: Set via `ADMIN_USERNAME` env var
- **Password**: Set via `ADMIN_PASSWORD` env var

See [Credentials Setup Guide](./CREDENTIALS_SETUP.md) for details.

---

## 🆘 Common Issues

### Want to develop locally without touching production?
→ See **[Local Development Setup](./LOCAL_DEVELOPMENT.md)** - Docker-based local database
→ Run `bun run db:start` to start local PostgreSQL

### Database connection failed
→ Check `POSTGRES_URL` in `.env.local`
→ See [Getting Started](./docs/GETTING_STARTED.md#troubleshooting)

### Cannot login
→ Visit `/api/init-db` to initialize database
→ Check credentials in `.env.local`

### Build fails
→ Run `bun run build` locally to test
→ Verify all environment variables are set

**More help**: See [Getting Started Guide](./docs/GETTING_STARTED.md#troubleshooting)

---

## 🚢 Deployment to Vercel

**Quick deployment** (requires Vercel account):

1. Create Vercel Postgres database
2. Connect your GitHub repository to Vercel
3. Configure environment variables
4. Deploy automatically

**Full guide**: [Vercel Deployment Documentation](./docs/VERCEL_DEPLOYMENT.md)

---

## 🤝 Contributing

This is a portfolio project. Feel free to:
- Fork the repository for your own use
- Report issues or suggest improvements
- Customize for your needs

---

## 📝 License

Private project - All rights reserved

---

## 🌟 What's Included

✅ Full-featured CMS back office
✅ JWT authentication system
✅ Content versioning & backups
✅ Image upload functionality
✅ Working contact form (Resend)
✅ Responsive design
✅ SEO optimization
✅ Production-ready deployment
✅ Comprehensive documentation
✅ E2E test suite

---

## 📊 Project Status

**Status**: Production Ready ✅
**Version**: 1.0.0
**Last Updated**: 2025-10-07

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Postgres Guide](https://vercel.com/docs/storage/vercel-postgres)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Ready to start?** → **[Getting Started Guide](./docs/GETTING_STARTED.md)**

**Need help?** → **[Documentation Index](./docs/README.md)**

**Want to deploy?** → **[Vercel Deployment Guide](./docs/VERCEL_DEPLOYMENT.md)**

---

Built with ❤️ using Next.js 15, TypeScript, and Vercel Postgres
