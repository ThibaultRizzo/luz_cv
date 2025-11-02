#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored messages
print_info() {
    echo -e "${GREEN}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

print_error() {
    echo -e "${RED}$1${NC}"
}

# Check if docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "❌ Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Start the database
start_db() {
    print_info "🚀 Starting local PostgreSQL database..."
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        print_info "✅ Database started successfully!"
        print_info "📊 Connection string: postgresql://luz_cv_user:luz_cv_password@localhost:5432/luz_cv_db"
        print_warning "\n⚠️  Make sure to update your .env file with the local database URL"
    else
        print_error "❌ Failed to start database"
        exit 1
    fi
}

# Stop the database
stop_db() {
    print_info "🛑 Stopping local PostgreSQL database..."
    docker-compose down
    
    if [ $? -eq 0 ]; then
        print_info "✅ Database stopped successfully!"
    else
        print_error "❌ Failed to stop database"
        exit 1
    fi
}

# Initialize the database
init_db() {
    print_info "🔧 Initializing database schema..."
    
    # Check if the database is running
    if ! docker-compose ps | grep -q "luz_cv_postgres.*Up"; then
        print_warning "Database is not running. Starting it first..."
        start_db
        sleep 3
    fi
    
    # Run the init-db API endpoint
    print_info "📡 Calling /api/init-db endpoint..."
    response=$(curl -s -X POST http://localhost:3000/api/init-db -w "\n%{http_code}")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" = "200" ]; then
        print_info "✅ Database initialized successfully!"
        print_info "Response: $body"
    else
        print_error "❌ Failed to initialize database (HTTP $http_code)"
        print_error "Response: $body"
        exit 1
    fi
}

# Reset the database (stop, remove volumes, start fresh)
reset_db() {
    print_warning "⚠️  This will DELETE all local database data!"
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "🗑️  Removing database and volumes..."
        docker-compose down -v
        print_info "✅ Database reset complete!"
        print_info "Run './scripts/local-db.sh start' to start fresh"
    else
        print_info "Cancelled."
    fi
}

# Show database logs
logs_db() {
    print_info "📋 Showing database logs (Ctrl+C to exit)..."
    docker-compose logs -f postgres
}

# Show database status
status_db() {
    print_info "📊 Database status:"
    docker-compose ps
}

# Main script
case "$1" in
    start)
        check_docker
        start_db
        ;;
    stop)
        check_docker
        stop_db
        ;;
    init)
        init_db
        ;;
    reset)
        check_docker
        reset_db
        ;;
    logs)
        check_docker
        logs_db
        ;;
    status)
        check_docker
        status_db
        ;;
    *)
        echo "Usage: $0 {start|stop|init|reset|logs|status}"
        echo ""
        echo "Commands:"
        echo "  start   - Start the local PostgreSQL database"
        echo "  stop    - Stop the local PostgreSQL database"
        echo "  init    - Initialize the database schema and admin user"
        echo "  reset   - Reset the database (deletes all data)"
        echo "  logs    - Show database logs"
        echo "  status  - Show database status"
        echo ""
        echo "Example workflow:"
        echo "  1. ./scripts/local-db.sh start"
        echo "  2. Update .env with local database URL"
        echo "  3. bun run dev"
        echo "  4. ./scripts/local-db.sh init"
        exit 1
        ;;
esac

