# Testing Guide

Quick reference for running E2E tests on the Nadia Luna CV website.

---

## Prerequisites

**Before testing:**
✅ **Complete**: [Getting Started](./GETTING_STARTED.md) - Local setup
✅ **Have**: Node.js 18+ installed
✅ **Have**: `.env.local` configured with admin credentials
✅ **Done**: Database initialized (`http://localhost:3000/api/init-db`)

---

## 🚀 Quick Start

### 2. Run Tests

```bash
# Run all tests (headless)
npm run test:e2e

# Run with UI (recommended for first time)
npm run test:e2e:ui

# Run with browser visible
npm run test:e2e:headed
```

## 📊 Test Suite

### Coverage

✅ **19+ test cases** covering:
- Authentication (6 tests)
- Content Management (8 tests)
- File Upload (5 tests)

### Test Files

```
e2e/
├── auth.spec.ts                 # Login, logout, session
├── content-management.spec.ts   # CMS operations
└── file-upload.spec.ts         # Image uploads
```

## 🎯 Common Commands

```bash
# Run specific test file
npx playwright test auth.spec.ts

# Run specific test by name
npx playwright test -g "should login successfully"

# Debug a test
npm run test:e2e:debug

# View last test report
npm run test:e2e:report

# Run on specific browser
npm run test:e2e:chromium
npm run test:e2e:mobile
```

## 🔧 Environment Setup

Your `.env.local` must include:
```env
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password
POSTGRES_URL=your-postgres-url
```

## 📖 Detailed Documentation

See [e2e/README.md](./e2e/README.md) for:
- Complete test documentation
- Writing new tests
- Debugging guide
- CI/CD integration
- Best practices

## ✅ Pre-commit Checklist

Before committing code:
```bash
# 1. Run linter
npm run lint

# 2. Run E2E tests
npm run test:e2e

# 3. Check test report
npm run test:e2e:report
```

## 🐛 Troubleshooting

### Tests fail with "Cannot connect"
```bash
# Ensure dev server is running
npm run dev

# In another terminal, run tests
npm run test:e2e
```

### Database errors
```bash
# Reinitialize database
curl http://localhost:3000/api/init-db
```

### Port 3000 already in use
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

## 📈 Test Results

All tests passing: ✅

Last run: 2025-10-07
Total tests: 19+
Success rate: 100%

---

**Navigation**: [← Getting Started](./GETTING_STARTED.md) | [Documentation Index](./README.md) | [Developer Guide →](./DEVELOPER_GUIDE.md)

**Related Guides**:
- [Getting Started](./GETTING_STARTED.md) - Local setup
- [Developer Guide](./DEVELOPER_GUIDE.md) - Architecture & development
- [Vercel Deployment](./VERCEL_DEPLOYMENT.md) - Production deployment
