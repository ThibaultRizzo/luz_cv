# Documentation

Complete documentation for the Alelunapaint CV Website project.

---

## 📚 Documentation Index

### For Developers

1. **[Quick Start Guide](./QUICK_START.md)** - Get started in 5 minutes
   - Installation steps
   - Local development setup
   - Vercel deployment
   - First steps after setup

2. **[Developer Guide](./DEVELOPER_GUIDE.md)** - Comprehensive technical documentation
   - Project architecture
   - Database schema
   - Adding new features
   - Customization guide
   - Testing & deployment
   - Troubleshooting

3. **[API Reference](./API_REFERENCE.md)** - Complete API documentation
   - All endpoints with examples
   - Authentication flow
   - Data models
   - Error handling
   - Testing guide

---

## 📖 Quick Links

### Getting Started
- [Installation](./QUICK_START.md#local-development-setup)
- [Environment Setup](./QUICK_START.md#2-configure-environment)
- [Database Init](./QUICK_START.md#4-initialize-database)
- [Deploy to Vercel](./QUICK_START.md#vercel-deployment)

### Development
- [Project Structure](./DEVELOPER_GUIDE.md#project-structure)
- [Adding Content Fields](./DEVELOPER_GUIDE.md#adding-new-content-fields)
- [Database Management](./DEVELOPER_GUIDE.md#database-management)
- [Customization](./DEVELOPER_GUIDE.md#customization)

### API
- [Authentication](./API_REFERENCE.md#authentication)
- [Content Endpoints](./API_REFERENCE.md#content-management)
- [Data Models](./API_REFERENCE.md#data-models)
- [Testing Examples](./API_REFERENCE.md#testing-the-api)

---

## 🚀 Quick Start

```bash
# Clone and install
git clone <repo-url>
cd alelunapaint
bun install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Start dev server
bun run dev

# Initialize database (visit in browser)
http://localhost:3000/api/init-db

# Login to back office
http://localhost:3000/nadia
```

---

## 🏗️ Project Overview

### What is This?

A professional CV/portfolio website with a full-featured CMS back office. Built for luxury retail professionals but easily customizable for any industry.

### Key Features

✅ **Content Management System**
- Edit all content via intuitive back office
- Live preview of changes
- Automatic content versioning
- Backup & restore functionality

✅ **Modern Tech Stack**
- Next.js 15 (React, TypeScript)
- Vercel Postgres (PostgreSQL)
- Drizzle ORM
- Tailwind CSS v4
- Framer Motion animations

✅ **Professional Design**
- Premium loading screen
- Glassmorphism effects
- Smooth scroll animations
- Fully responsive
- SEO optimized

✅ **Security**
- JWT authentication
- Bcrypt password hashing
- Admin-only access control
- Secure API endpoints

---

## 📁 Documentation Files

| File | Description |
|------|-------------|
| **QUICK_START.md** | 5-minute setup guide |
| **DEVELOPER_GUIDE.md** | Complete technical docs |
| **API_REFERENCE.md** | API endpoints & examples |
| **README.md** | This file (documentation index) |

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Forms:** React Hook Form
- **Icons:** Emoji Picker React

### Backend
- **Runtime:** Node.js / Bun
- **Database:** Vercel Postgres (PostgreSQL)
- **ORM:** Drizzle ORM
- **Auth:** JWT (jsonwebtoken)
- **Password:** bcrypt

### Deployment
- **Platform:** Vercel
- **Database:** Vercel Postgres
- **CI/CD:** Automatic via Vercel
- **Domain:** Custom domain support

---

## 🎯 Use Cases

### Who is This For?

1. **Product Owners** - Showcase your portfolio
2. **Designers** - Display your work
3. **Developers** - Present your projects
4. **Consultants** - Professional presence
5. **Agencies** - Client portfolios

### What Can You Do?

- Create professional CV website
- Manage content without coding
- Upload images and documents
- Track content changes
- Backup and restore content
- Deploy globally on Vercel

---

## 📊 Project Stats

- **Lines of Code:** ~10,000
- **Components:** 15+
- **API Endpoints:** 6
- **Database Tables:** 3
- **Dependencies:** 15 core packages

---

## 🔐 Security

- JWT tokens with 24h expiry
- Bcrypt password hashing (12 rounds)
- Admin-only authentication
- Secure environment variables
- HTTPS enforced (Vercel)
- SQL injection protection (Drizzle ORM)
- XSS protection (React escaping)

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome)

---

## 📱 Responsive Design

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+
- **Large Desktop:** 1440px+

---

## 🔄 Content Sections

1. **Loading Screen** - Premium animated intro
2. **Hero** - Name, title, description, stats
3. **About** - Bio, approach, impact metrics
4. **Experience** - Work history, achievements
5. **Skills** - Expertise, tools, certifications
6. **Achievements** - Key metrics & milestones
7. **Contact** - Form, email, social links

All sections fully editable via back office.

---

## 📈 Performance

- **Lighthouse Score:** 90+
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Build Time:** ~30s
- **Bundle Size:** Optimized with Next.js

---

## 🧪 Testing

### Manual Testing
- Login/logout flow
- Content editing
- Image uploads
- Backup/restore
- Mobile responsiveness

### Recommended Testing Tools
- Lighthouse (performance)
- WAVE (accessibility)
- Chrome DevTools (debugging)

---

## 🚢 Deployment Checklist

- [ ] Setup Vercel Postgres database
- [ ] Configure environment variables
- [ ] Deploy to Vercel
- [ ] Initialize production database
- [ ] Test login functionality
- [ ] Update content via back office
- [ ] Upload production images
- [ ] Test on mobile devices
- [ ] Verify SEO tags
- [ ] Check performance score
- [ ] Configure custom domain (optional)

---

## 🤝 Contributing

This is a portfolio project, but you can:
1. Fork the repository
2. Customize for your needs
3. Report issues (if any)
4. Suggest improvements

---

## 📄 License

Private project - All rights reserved.

---

## 🆘 Getting Help

### Common Issues

**Database connection fails**
- Check `POSTGRES_URL` in `.env.local`
- Verify Vercel Postgres is active
- See [Troubleshooting](./QUICK_START.md#troubleshooting)

**Login not working**
- Initialize database: `/api/init-db`
- Check admin credentials
- Clear browser localStorage

**Build fails**
- Run `bun run build` locally
- Check for TypeScript errors
- Verify all env vars are set

### Resources

- [Quick Start Guide](./QUICK_START.md#troubleshooting)
- [Developer Guide](./DEVELOPER_GUIDE.md#troubleshooting)
- Check code comments
- Review Vercel logs

---

## 📞 Support

For technical questions:
1. Check this documentation
2. Review code comments
3. Consult Next.js/Drizzle docs
4. Check Vercel documentation

---

## 🎓 Learning Resources

- [Next.js Learn](https://nextjs.org/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Vercel Postgres Guide](https://vercel.com/docs/storage/vercel-postgres)

---

## 🗺️ Roadmap

### Completed ✅
- Core CV website
- CMS back office
- Authentication system
- Content management
- Image uploads
- Backup system
- Loading screen
- SEO optimization

### Future Enhancements
- Multi-user support
- Role-based permissions
- Advanced analytics
- Email notifications
- Blog section (optional)
- Multi-language support
- Dark mode toggle

---

## 📋 Changelog

### v1.0.0 (2025-10-05)
- Initial release
- Complete CMS functionality
- Production-ready deployment
- Full documentation

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Framer Motion](https://www.framer.com/motion/)

---

**Project Status:** Production Ready ✅
**Version:** 1.0.0
**Last Updated:** 2025-10-05

---

## 📖 Next Steps

1. **New to the project?** → Start with [Quick Start Guide](./QUICK_START.md)
2. **Want to develop?** → Read [Developer Guide](./DEVELOPER_GUIDE.md)
3. **Need API docs?** → Check [API Reference](./API_REFERENCE.md)
4. **Ready to deploy?** → Follow [Vercel Deployment](./QUICK_START.md#vercel-deployment)

Happy coding! 🚀
