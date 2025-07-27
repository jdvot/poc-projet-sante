#!/bin/bash

# Local environment startup script
set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display messages
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Variables
ENVIRONMENT=${1:-local}
SERVICES=${2:-app}

# Function to check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed"
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed"
    fi
    
    # Check if we are in the correct directory
    if [ ! -f "package.json" ]; then
        error "package.json file does not exist. Make sure you are in the project directory."
    fi
    
    log "Prerequisites checked successfully"
}

# Function to setup environment
setup_environment() {
    log "Setting up environment..."
    
    # Create .env.local file if it doesn't exist
    if [ ! -f ".env.local" ]; then
        info "Creating .env.local file..."
        ./scripts/setup-env.sh local
    fi
    
    log "Environment configured"
}

# Function to start services
start_services() {
    log "Starting services..."
    
    case $SERVICES in
        "app")
            info "Starting application only..."
            docker-compose -f docker-compose.local.yml up -d app
            ;;
        "full")
            info "Starting all services..."
            docker-compose -f docker-compose.local.yml up -d
            ;;
        "database")
            info "Starting with database..."
            docker-compose -f docker-compose.local.yml --profile database up -d
            ;;
        "n8n")
            info "Starting with n8n..."
            docker-compose -f docker-compose.local.yml --profile n8n up -d
            ;;
        "all")
            info "Starting all services with profiles..."
            docker-compose -f docker-compose.local.yml --profile database --profile cache --profile n8n up -d
            ;;
        *)
            error "Unknown service: $SERVICES"
            ;;
    esac
    
    log "Services started"
}

# Function to check status
check_status() {
    log "Checking service status..."
    
    # Wait for application to be ready
    info "Waiting for application to start..."
    for i in {1..30}; do
        if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
            log "Application ready!"
            break
        fi
        
        if [ $i -eq 30 ]; then
            warn "Application is not ready after 30 seconds"
        else
            info "Waiting... ($i/30)"
            sleep 1
        fi
    done
    
    # Display URLs
    echo ""
    log "Available services:"
    echo "  🌐 Application: http://localhost:3000"
    echo "  📊 Health Check: http://localhost:3000/api/health"
    echo "  📈 Metrics: http://localhost:3000/api/metrics"
    
    if [ "$SERVICES" = "database" ] || [ "$SERVICES" = "all" ]; then
        echo "  🗄️  PostgreSQL: localhost:5432"
    fi
    
    if [ "$SERVICES" = "n8n" ] || [ "$SERVICES" = "all" ]; then
        echo "  🔗 n8n: http://localhost:5678 (admin/admin123)"
    fi
    
    if [ "$SERVICES" = "all" ]; then
        echo "  🔴 Redis: localhost:6379"
    fi
    
    echo ""
}

# Function to display help
show_help() {
    echo "Usage: $0 [ENVIRONMENT] [SERVICES]"
    echo ""
    echo "Environments:"
    echo "  local       - Local environment (default)"
    echo ""
    echo "Services:"
    echo "  app         - Application only (default)"
    echo "  full        - All basic services"
    echo "  database    - With PostgreSQL database"
    echo "  n8n         - With n8n for webhooks"
    echo "  all         - All services (app, db, redis, n8n)"
    echo ""
    echo "Examples:"
    echo "  $0                    # Application only"
    echo "  $0 local app          # Application only"
    echo "  $0 local database     # With database"
    echo "  $0 local n8n          # With n8n"
    echo "  $0 local all          # All services"
}

# Main function
main() {
    # Display help if requested
    if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
        show_help
        exit 0
    fi
    
    log "Starting local environment: $ENVIRONMENT, services: $SERVICES"
    
    check_prerequisites
    setup_environment
    start_services
    check_status
    
    log "Local environment ready!"
    info "Use 'docker-compose -f docker-compose.local.yml logs -f' to view logs"
    info "Use 'docker-compose -f docker-compose.local.yml down' to stop"
}

# Error handling
trap 'error "Startup interrupted"' INT TERM

# Execution
main "$@" 