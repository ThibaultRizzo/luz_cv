#!/bin/sh
set -e

echo "🚀 Starting development environment..."

# Install dependencies (skip optional deps to avoid bufferutil issues)
echo "📦 Installing dependencies..."
bun install --ignore-scripts

# Wait for postgres to be ready using the healthcheck
echo "⏳ Waiting for PostgreSQL to be ready..."
MAX_TRIES=30
COUNT=0

# Simple approach: just wait for the postgres container healthcheck
# The depends_on with service_healthy already handles this, so add minimal delay
sleep 5

echo "✅ PostgreSQL should be ready!"

# Set environment variables for the init script
export POSTGRES_HOST=postgres
export POSTGRES_PORT=5432

# Initialize database
echo "🔧 Initializing database..."
node scripts/initDatabase.mjs || echo "⚠️  Database initialization failed (might already be initialized)"

echo "🎉 Starting dev server..."

# Execute the main command (passed as arguments)
exec "$@"

