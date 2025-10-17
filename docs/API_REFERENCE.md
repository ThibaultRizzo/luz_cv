# API Reference

Complete API documentation for the Alequintanarpaint CV Website.

**Base URL:** `/api`

---

## Authentication

### POST `/api/auth/login`

Authenticate user and receive JWT tokens.

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "role": "admin",
      "lastLogin": "2025-10-05T12:00:00Z"
    },
    "accessToken": "jwt-token",
    "refreshToken": "jwt-refresh-token",
    "expiresIn": "24h"
  }
}
```

**Error Responses:**
- `400` - Invalid credentials
- `429` - Too many requests

**Example:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

---

### GET `/api/auth/me`

Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "role": "admin",
      "lastLogin": "2025-10-05T12:00:00Z"
    }
  }
}
```

**Error Responses:**
- `401` - Unauthorized (invalid/expired token)

**Example:**
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer your-jwt-token"
```

---

## Content Management

### GET `/api/content`

Retrieve active website content.

**Public endpoint** - No authentication required.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "heroTitle": "Ready to create",
    "heroSubtitle": "something extraordinary?",
    "heroDescription": "Transforming luxury retail...",
    "heroBadge": "Product Owner • Luxury Retail Expert",
    "heroImage": "/luz.png",
    "heroStats": [
      { "metric": "10+", "label": "Years Experience" }
    ],
    "heroCtaText": "Let's Craft Excellence Together",
    "heroScrollText": "Scroll",
    "headerFont": "playfair",
    "loadingScreenFirstName": "LUZ",
    "loadingScreenLastName": "QUINTANAR",
    "loadingScreenTagline": "Product Owner • Luxury Retail",
    "aboutTitle": "Turning vision into",
    "aboutTitleSuffix": "reality",
    "aboutDescription": "Experienced product leader...",
    "aboutMainText": "I am a visionary Product Owner...",
    "aboutSecondaryText": "My expertise lies in...",
    "aboutQuote": "Excellence isn't a destination...",
    "aboutQuoteAuthor": "— Luz Quintanar",
    "aboutApproachTitle": "My Approach",
    "aboutApproachItems": [
      {
        "title": "Customer-First Philosophy",
        "description": "Every decision starts..."
      }
    ],
    "aboutImpactTitle": "Impact at a Glance",
    "aboutImpactMetrics": [
      { "metric": "€50M+", "label": "Revenue Generated" }
    ],
    "experiences": [
      {
        "role": "Senior Product Owner",
        "company": "Maison Lumière",
        "period": "2018 - Present",
        "location": "Paris, France",
        "achievements": ["..."],
        "highlight": "Transformed traditional luxury..."
      }
    ],
    "skillCategories": [
      {
        "category": "Product Leadership",
        "icon": "🎯",
        "skills": [
          { "name": "Product Strategy", "level": 95 }
        ]
      }
    ],
    "certifications": ["CSPO", "..."],
    "tools": ["Jira", "Figma", "..."],
    "achievements": [
      {
        "metric": "+40%",
        "description": "Increase in Online Sales",
        "icon": "📈"
      }
    ],
    "contactEmail": "luz.quintanar@example.com",
    "contactLinkedin": "linkedin.com/in/luzquintanar",
    "contactPhone": "+33 6 12 34 56 78",
    "version": 1,
    "isActive": true,
    "createdAt": "2025-10-05T12:00:00Z",
    "updatedAt": "2025-10-05T12:00:00Z"
  }
}
```

**Example:**
```bash
curl http://localhost:3000/api/content
```

---

### PUT `/api/content`

Update website content (creates backup automatically).

**Authentication required:** Admin only

**Headers:**
```
Authorization: Bearer <access-token>
Content-Type: application/json
```

**Request:**
```json
{
  "heroTitle": "New title",
  "heroSubtitle": "New subtitle",
  "aboutMainText": "Updated bio...",
  "experiences": [
    {
      "role": "New Role",
      "company": "New Company",
      "period": "2020 - Present",
      "location": "Location",
      "achievements": ["Achievement 1", "Achievement 2"],
      "highlight": "Key highlight"
    }
  ]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Content updated successfully",
  "data": {
    "id": "uuid",
    "version": 2,
    // ... full updated content
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `400` - Invalid data format
- `500` - Server error

**Example:**
```bash
curl -X PUT http://localhost:3000/api/content \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "heroTitle": "New Title",
    "heroSubtitle": "New Subtitle"
  }'
```

---

### GET `/api/content/init`

Get content for initialization (used by TextContentContext).

**Public endpoint** - No authentication required.

**Response:** Same as GET `/api/content`

**Use case:** Frontend context initialization on page load.

---

## Database Initialization

### POST `/api/init-db`

Initialize database tables and create default admin user.

**Public endpoint** - One-time setup only.

**Response (200):**
```json
{
  "success": true,
  "message": "Database initialized successfully",
  "data": {
    "adminUsername": "mia",
    "tablesCreated": true,
    "userCreated": true,
    "contentCreated": true
  }
}
```

**Notes:**
- Safe to call multiple times (idempotent)
- Creates tables if they don't exist
- Creates admin user if not exists
- Creates default content if not exists
- Uses credentials from environment variables

**Example:**
```bash
curl -X POST http://localhost:3000/api/init-db
```

---

## File Upload

### POST `/api/upload`

Upload files (images, PDFs, etc.).

**Authentication required:** Admin only

**Headers:**
```
Authorization: Bearer <access-token>
Content-Type: multipart/form-data
```

**Request:**
```
Form data with file field named "file"
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "url": "/uploads/filename.jpg"
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `400` - No file provided or invalid file
- `413` - File too large
- `500` - Server error

**File Restrictions:**
- Max size: 5MB
- Allowed types: images (jpg, png, gif, webp), PDFs

**Example (using form data):**
```bash
curl -X POST http://localhost:3000/api/upload \
  -H "Authorization: Bearer your-jwt-token" \
  -F "file=@/path/to/image.jpg"
```

---

## Data Models

### User
```typescript
{
  id: string;              // UUID
  username: string;        // Unique
  password: string;        // Bcrypt hashed
  role: string;            // "admin"
  refreshTokens: array;    // JWT refresh tokens
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Content
```typescript
{
  id: string;              // UUID

  // Hero Section
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroDescription: string | null;
  heroBadge: string | null;
  heroImage: string;       // Default: "/luz.png"
  heroStats: Array<{metric: string, label: string}>;
  heroCtaText: string | null;
  heroScrollText: string | null;
  headerFont: string;      // Default: "playfair"

  // Loading Screen
  loadingScreenFirstName: string;  // Default: "LUZ"
  loadingScreenLastName: string;   // Default: "QUINTANAR"
  loadingScreenTagline: string;    // Default: "Product Owner • Luxury Retail"

  // About Section
  aboutTitle: string | null;
  aboutTitleSuffix: string | null;
  aboutDescription: string | null;
  aboutMainText: string | null;
  aboutSecondaryText: string | null;
  aboutQuote: string | null;
  aboutQuoteAuthor: string | null;
  aboutBadge: string | null;
  aboutApproachTitle: string | null;
  aboutApproachItems: Array<{title: string, description: string}>;
  aboutImpactTitle: string | null;
  aboutImpactMetrics: Array<{metric: string, label: string}>;

  // Experience Section
  experienceTitle: string | null;
  experienceSubtitle: string | null;
  experienceBadge: string | null;
  experienceBottomStats: Array<{metric: string, label: string}>;
  experiences: Array<{
    role: string;
    company: string;
    period: string;
    location: string;
    achievements: string[];
    highlight: string;
  }>;

  // Skills Section
  skillsTitle: string | null;
  skillsSubtitle: string | null;
  skillsDescription: string | null;
  skillsBadge: string | null;
  skillsQuote: string | null;
  skillsQuoteAuthor: string | null;
  skillsCertificationsTitle: string | null;
  skillsToolsTitle: string | null;
  skillCategories: Array<{
    category: string;
    icon: string;
    skills: Array<{name: string, level: number}>;
  }>;
  certifications: string[];
  tools: string[];
  softSkills: Array<{skill: string, icon: string}>;

  // Achievements
  achievementsTitle: string | null;
  achievements: Array<{
    metric: string;
    description: string;
    icon: string;
  }>;

  // Contact Section
  contactTitle: string | null;
  contactSubtitle: string | null;
  contactDescription: string | null;
  contactBadge: string | null;
  contactFormTitle: string | null;
  contactFormLabels: {name: string, email: string, company: string, message: string};
  contactFormPlaceholders: {name: string, email: string, company: string, message: string};
  contactSubmitButton: string | null;
  contactSuccessMessage: string | null;
  contactErrorMessage: string | null;
  contactInfoTitle: string | null;
  contactEmail: string | null;
  contactLinkedin: string | null;
  contactPhone: string | null;
  contactAvailabilityTitle: string | null;
  contactAvailabilityStatus: string | null;
  contactAvailabilityDescription: string | null;
  contactAvailabilityItems: string[];
  contactDownloadText: string | null;
  contactCvPath: string;   // Default: "/cv.pdf"
  contactBottomInfo: {
    responseTime: {label: string, value: string};
    location: {label: string, value: string};
    languages: {label: string, value: string};
  };

  // Meta
  version: number;         // Increments on update
  isActive: boolean;       // Only one active content
  lastModifiedBy: string | null;  // User ID
  createdAt: Date;
  updatedAt: Date;
}
```

### Content Backup
```typescript
{
  id: string;              // UUID
  contentId: string;       // Reference to content
  backupData: object;      // Full content snapshot
  version: number;         // Version at backup time
  createdBy: string | null;  // User ID
  createdAt: Date;
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Technical error details (dev mode only)"
}
```

### Common HTTP Status Codes

- `200` - Success
- `400` - Bad Request (invalid data)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

---

## Rate Limiting

Currently not implemented. Consider adding for production:

```typescript
// Recommended limits
- Login: 5 requests per 15 minutes
- Content updates: 60 requests per hour
- File uploads: 20 requests per hour
```

---

## Authentication Details

### JWT Token Structure

**Access Token (24h expiry):**
```json
{
  "userId": "uuid",
  "username": "string",
  "role": "admin",
  "iat": 1234567890,
  "exp": 1234654290
}
```

**Refresh Token (7d expiry):**
```json
{
  "userId": "uuid",
  "type": "refresh",
  "iat": 1234567890,
  "exp": 1235172690
}
```

### Token Storage

Tokens are stored in browser localStorage:
- `accessToken` - Used for API requests
- `refreshToken` - Used for token renewal
- `userInfo` - Cached user data

### Token Refresh Flow

1. Access token expires (401 response)
2. Client automatically sends refresh token
3. Server validates refresh token
4. New access token issued
5. Request retried with new token

**Note:** Refresh endpoint not yet implemented. Current implementation redirects to login on 401.

---

## Content Versioning

Every content update:
1. Creates backup of current version
2. Increments version number
3. Updates content with new data
4. Updates `updatedAt` timestamp

**Backup retention:** Unlimited (consider cleanup policy for production)

---

## Security Considerations

1. **CORS:** Configure allowed origins in production
2. **HTTPS:** Always use HTTPS in production
3. **Secrets:** Rotate JWT secrets regularly
4. **Passwords:** Bcrypt with 12 rounds
5. **Input validation:** Validate all inputs server-side
6. **SQL injection:** Drizzle ORM prevents SQL injection
7. **XSS:** React automatically escapes output

---

## Testing the API

### Using cURL

```bash
# 1. Login
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}' \
  | jq -r '.data.accessToken')

# 2. Get content
curl http://localhost:3000/api/content | jq

# 3. Update content
curl -X PUT http://localhost:3000/api/content \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"heroTitle":"Updated Title"}' | jq

# 4. Upload file
curl -X POST http://localhost:3000/api/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@image.jpg" | jq
```

### Using JavaScript/TypeScript

```typescript
import { authApi, contentApi } from '@/lib/api';

// Login
const response = await authApi.login('admin', 'password');
if (response.success) {
  console.log('Logged in:', response.data.user);
}

// Get content
const content = await contentApi.getContent();
console.log(content.data);

// Update content
const updated = await contentApi.updateContent({
  heroTitle: 'New Title',
  heroSubtitle: 'New Subtitle'
});
console.log('Updated:', updated.data);
```

---

## Changelog

### Version 1.0 (2025-10-05)
- Initial API release
- Basic authentication (login)
- Content CRUD operations
- Database initialization
- File upload

### Planned Features
- Token refresh endpoint
- Content backup listing
- Content restore from backup
- User management
- Activity logs
- Webhook notifications

---

**Last Updated:** 2025-10-05
