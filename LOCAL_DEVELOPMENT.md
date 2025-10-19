# Local Development Setup

This guide helps you set up a local PostgreSQL database for development, so you don't have to work with production data.

## Prerequisites

- Docker Desktop installed and running
- Bun or Node.js installed

## Quick Start

### 1. Start the Local Database

```bash
./scripts/local-db.sh start
```

This will start a PostgreSQL database in Docker with the following credentials:
- **Host**: localhost:5432
- **Database**: luz_cv_db
- **Username**: luz_cv_user
- **Password**: luz_cv_password

### 2. Configure Environment Variables

Create or update your `.env.local` file:

```bash
# Copy the example file
cp env.local.example .env.local
```

Make sure your `.env.local` contains:

```env
POSTGRES_URL="postgresql://luz_cv_user:luz_cv_password@localhost:5432/luz_cv_db"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Start the Development Server

```bash
bun run dev
# or
npm run dev
```

### 4. Initialize the Database

Open a new terminal and run:

```bash
./scripts/local-db.sh init
```

Or manually visit: http://localhost:3000/api/init-db

This will:
- Create all necessary database tables
- Create an admin user (username: `admin`, password: `admin123`)
- Set up initial content

### 5. Access the Backoffice

Navigate to: http://localhost:3000/luz

Login with:
- **Username**: admin
- **Password**: admin123

## Database Management Commands

### Check Database Status
```bash
./scripts/local-db.sh status
```

### View Database Logs
```bash
./scripts/local-db.sh logs
```

### Stop the Database
```bash
./scripts/local-db.sh stop
```

### Reset Database (Delete All Data)
```bash
./scripts/local-db.sh reset
```

### Restart Fresh
```bash
./scripts/local-db.sh stop
./scripts/local-db.sh start
./scripts/local-db.sh init
```

## Switching Between Local and Production

### Using Local Database
Update `.env.local`:
```env
POSTGRES_URL="postgresql://luz_cv_user:luz_cv_password@localhost:5432/luz_cv_db"
```

### Using Production Database
Update `.env.local`:
```env
POSTGRES_URL="your-production-vercel-postgres-url"
```

⚠️ **Warning**: Always be careful when switching to production database!

## Troubleshooting

### Docker is not running
Make sure Docker Desktop is started before running any commands.

### Port 5432 already in use
If you have another PostgreSQL instance running on port 5432, either:
1. Stop the other instance
2. Or edit `docker-compose.yml` to use a different port (e.g., "5433:5432")

### Database connection fails
1. Check if the database container is running: `docker ps`
2. Check logs: `./scripts/local-db.sh logs`
3. Restart the database: 
   ```bash
   ./scripts/local-db.sh stop
   ./scripts/local-db.sh start
   ```

### Tables not created
Make sure to run the initialization:
```bash
./scripts/local-db.sh init
```

## Database Persistence

Your local database data is stored in a Docker volume named `luz_cv_postgres_data`. This means:
- ✅ Data persists between container restarts
- ✅ Data survives Docker Desktop restarts
- ❌ Data is lost when you run `./scripts/local-db.sh reset`

## Keeping Local and Production in Sync

When you make schema changes locally:
1. Create a migration file in the `migrations/` folder
2. Test it locally: `bun run scripts/runMigration.mjs migrations/your-migration.sql`
3. When deploying to production, run the migration there as well
4. Update both `schema.ts` and `connection.ts` to match

**Important**: The `initializeDatabase()` function in `connection.ts` must match `schema.ts` exactly.

## Direct Database Access

If you need to access the database directly:

```bash
# Using psql
docker exec -it luz_cv_postgres psql -U luz_cv_user -d luz_cv_db

# Using a GUI tool (like TablePlus, DBeaver, pgAdmin)
Host: localhost
Port: 5432
Database: luz_cv_db
Username: luz_cv_user
Password: luz_cv_password
```

## Development Workflow

Recommended workflow for developing features:

1. Start local database: `./scripts/local-db.sh start`
2. Start dev server: `bun run dev`
3. Initialize database: `./scripts/local-db.sh init`
4. Make changes and test locally
5. When done, commit and push your code
6. Vercel will automatically deploy to production with the production database

## Scripts Reference

| Script | Description |
|--------|-------------|
| `./scripts/local-db.sh start` | Start the database |
| `./scripts/local-db.sh stop` | Stop the database |
| `./scripts/local-db.sh init` | Initialize schema and admin user |
| `./scripts/local-db.sh reset` | Delete all data and start fresh |
| `./scripts/local-db.sh logs` | View database logs |
| `./scripts/local-db.sh status` | Check database status |

