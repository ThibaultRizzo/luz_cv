# Alelunapaint CV Website with CMS Back Office

A professional CV website with a comprehensive Content Management System (CMS) back office built with Node.js, Express, MongoDB, and Next.js.

## 🏗️ Architecture

### Frontend (Next.js 15)
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Port**: 3000
- **Location**: Root directory

### Backend (Node.js + Express)
- **Runtime**: Bun (optimized performance)
- **Framework**: Express.js with security middleware
- **Port**: 5000
- **Location**: `/backend` directory

### Database
- **Development**: MongoDB 7 (Docker container)
- **Production**: Requires MongoDB Atlas or similar cloud service

## 🔐 Authentication & Security

### Admin Credentials
- **Username**: `mia`
- **Password**: `himiko`

### Database Credentials
- **MongoDB Admin User**: `admin`
- **MongoDB Admin Password**: `password123`
- **Database Name**: `alelunapaint`
- **Test Database**: `alelunapaint_test`

### JWT Configuration
- **JWT Secret**: `alelunapaint-super-secure-jwt-secret-key-2024-development`
- **Access Token Expiry**: 24 hours
- **Refresh Token Secret**: `alelunapaint-super-secure-refresh-token-secret-2024`
- **Refresh Token Expiry**: 7 days

## 🚀 Quick Start

### Prerequisites
- Bun runtime installed
- Docker and Docker Compose

### Development Setup

1. **Start MongoDB with Docker**:
   ```bash
   cd backend
   docker-compose up -d
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   bun install
   ```

3. **Initialize Database**:
   ```bash
   cd backend
   bun run init-db
   ```

4. **Start Backend Server**:
   ```bash
   cd backend
   bun run dev
   ```
   Backend will be available at: http://localhost:5000

5. **Install Frontend Dependencies**:
   ```bash
   bun install
   ```

6. **Start Frontend Server**:
   ```bash
   bun run dev
   ```
   Frontend will be available at: http://localhost:3000

### Access Points
- **Main Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/nadia
- **Back Office**: http://localhost:3000/nadia/backoffice (after login)
- **API Base**: http://localhost:5000/api

## 📁 Project Structure

```
alelunapaint/
├── backend/                    # Node.js backend
│   ├── src/
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Authentication & validation
│   │   ├── utils/             # Helper functions
│   │   ├── scripts/           # Database initialization
│   │   └── server.js          # Main server file
│   ├── docker-compose.yml     # MongoDB container
│   └── package.json
├── src/                       # Next.js frontend
│   ├── app/
│   │   └── nadia/            # Admin routes
│   ├── components/            # React components
│   └── lib/                  # API client & utilities
├── .env.local                # Frontend environment
└── package.json
```

## 🎯 Features

### Content Management System
- **Hero Section**: Title, subtitle, description
- **About Section**: Personal information, quotes
- **Experience Management**: Roles, achievements, highlights
- **Skills Management**: Categories, skill levels, tools
- **Contact Information**: Professional details
- **Version Control**: Automatic content versioning
- **Backup System**: Automatic backups before updates

### Security Features
- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet security headers
- Request validation
- Admin-only access control

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `PUT /api/auth/change-password` - Change password

#### Content Management
- `GET /api/content` - Retrieve all content
- `PUT /api/content` - Update content (admin only)
- `GET /api/content/backups` - List content backups
- `POST /api/content/restore/:backupId` - Restore from backup

## 🔧 Environment Configuration

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://admin:password123@localhost:27017/alelunapaint?authSource=admin
MONGODB_TEST_URI=mongodb://admin:password123@localhost:27017/alelunapaint_test?authSource=admin

# Authentication
JWT_SECRET=alelunapaint-super-secure-jwt-secret-key-2024-development
JWT_EXPIRE=24h
REFRESH_TOKEN_SECRET=alelunapaint-super-secure-refresh-token-secret-2024
REFRESH_TOKEN_EXPIRE=7d

# Admin
ADMIN_USERNAME=mia
ADMIN_PASSWORD=himiko

# Security
BCRYPT_ROUNDS=12

# CORS
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🚀 Production Deployment

### ⚠️ Important: Vercel Deployment Considerations

The current development setup uses Docker MongoDB, which **will NOT work on Vercel**. For production deployment on Vercel, you need:

#### Required Changes for Vercel:

1. **Database Migration**:
   - Replace Docker MongoDB with **MongoDB Atlas** (recommended)
   - Or use **Vercel Postgres** with schema migration
   - Update `MONGODB_URI` to point to cloud database

2. **Environment Variables**:
   - Move all `.env` values to Vercel dashboard
   - Use production-grade secrets (change JWT secrets, admin password)

3. **Build Configuration**:
   ```json
   // vercel.json
   {
     "functions": {
       "backend/src/server.js": {
         "runtime": "nodejs18.x"
       }
     },
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "/backend/src/server.js"
       }
     ]
   }
   ```

4. **Production Environment Variables** (Vercel Dashboard):
   ```env
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/alelunapaint
   JWT_SECRET=<strong-production-secret>
   REFRESH_TOKEN_SECRET=<strong-production-refresh-secret>
   ADMIN_USERNAME=<secure-admin-username>
   ADMIN_PASSWORD=<secure-admin-password>
   NODE_ENV=production
   FRONTEND_URL=https://your-domain.vercel.app
   ```

#### Recommended Production Setup:

1. **Create MongoDB Atlas account** (free tier available)
2. **Set up production database** with proper user credentials
3. **Configure Vercel environment variables**
4. **Update CORS origins** for production domain
5. **Test deployment** with staging environment first

### Alternative: Railway/Render Deployment
If you prefer platforms that support Docker:
- **Railway**: Supports Docker containers natively
- **Render**: Good Docker support with managed databases
- Both support the current Docker setup with minimal changes

## 🔍 Development Workflow

### Running Tests
```bash
cd backend
bun test
```

### Database Management
```bash
# Reset database
cd backend
bun run init-db

# Check MongoDB logs
docker logs backend-mongodb-1

# Access MongoDB shell
docker exec -it backend-mongodb-1 mongosh -u admin -p password123
```

### API Testing
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"mia","password":"himiko"}'

# Get content
curl http://localhost:5000/api/content

# Update content (requires token)
curl -X PUT http://localhost:5000/api/content \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"heroTitle":"New Title"}'
```

## 📊 System Status

✅ **Fully Functional Development Environment**
- MongoDB Docker container running
- Backend API server operational
- Frontend Next.js application running
- Authentication system working
- Content management fully operational
- All CRUD operations tested and verified

⚠️ **Production Deployment**: Requires database migration for Vercel

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

2. **Port Already in Use**:
   ```bash
   lsof -ti:5000 | xargs kill -9  # Kill backend
   lsof -ti:3000 | xargs kill -9  # Kill frontend
   ```

3. **JWT Token Invalid**:
   - Clear browser localStorage
   - Re-login through admin interface

4. **Database Not Initialized**:
   ```bash
   cd backend
   bun run init-db
   ```

## 🤝 Support

For technical support or deployment assistance, ensure all environment variables are properly configured and all services are running on their designated ports.

---

**Note**: This system is designed for development with Docker and requires database migration for production deployment on serverless platforms like Vercel.