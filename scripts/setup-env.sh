#!/bin/bash

# Environment configuration script for Limitless Health
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
ENV_FILE=".env.${ENVIRONMENT}"

# Function to create .env file
create_env_file() {
    log "Creating .env.${ENVIRONMENT} file..."
    
    if [ -f "$ENV_FILE" ]; then
        warn "File $ENV_FILE already exists. Do you want to replace it? (y/N)"
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            info "Configuration cancelled."
            return
        fi
    fi

    # Copy example file
    cp env.example "$ENV_FILE"
    
    # Customize based on environment
    case $ENVIRONMENT in
        "local")
            customize_local_env
            ;;
        "staging")
            customize_staging_env
            ;;
        "production")
            customize_production_env
            ;;
        *)
            error "Unknown environment: $ENVIRONMENT"
            ;;
    esac
    
    log "File $ENV_FILE created successfully!"
}

# Customization for local environment
customize_local_env() {
    info "Configuring for local environment..."
    
    # Replace default values for local
    sed -i.bak 's/NODE_ENV=development/NODE_ENV=development/' "$ENV_FILE"
    sed -i.bak 's/NEXT_PUBLIC_APP_URL=http:\/\/localhost:3000/NEXT_PUBLIC_APP_URL=http:\/\/localhost:3000/' "$ENV_FILE"
    sed -i.bak 's/NEXT_PUBLIC_API_URL=http:\/\/localhost:3000\/api/NEXT_PUBLIC_API_URL=http:\/\/localhost:3000\/api/' "$ENV_FILE"
    sed -i.bak 's/NEXT_PUBLIC_N8N_WEBHOOK_URL=https:\/\/your-n8n-instance.com\/webhook\/chat/NEXT_PUBLIC_N8N_WEBHOOK_URL=http:\/\/localhost:5678\/webhook\/chat/' "$ENV_FILE"
    
    # Enable debug
    sed -i.bak 's/NEXT_PUBLIC_ENABLE_DEBUG=true/NEXT_PUBLIC_ENABLE_DEBUG=true/' "$ENV_FILE"
    
    # Disable analytics in local
    sed -i.bak 's/NEXT_PUBLIC_ENABLE_ANALYTICS=true/NEXT_PUBLIC_ENABLE_ANALYTICS=false/' "$ENV_FILE"
    
    rm -f "${ENV_FILE}.bak"
}

# Customization for staging environment
customize_staging_env() {
    info "Configuring for staging environment..."
    
    # Ask for configuration values
    echo "Firebase configuration for staging:"
    read -p "Firebase API Key: " firebase_api_key
    read -p "Firebase Project ID: " firebase_project_id
    read -p "Firebase Auth Domain: " firebase_auth_domain
    
    # Replace values
    sed -i.bak "s/NODE_ENV=development/NODE_ENV=staging/" "$ENV_FILE"
    sed -i.bak "s/NEXT_PUBLIC_APP_URL=http:\/\/localhost:3000/NEXT_PUBLIC_APP_URL=https:\/\/staging.limitless-health.com/" "$ENV_FILE"
    sed -i.bak "s/NEXT_PUBLIC_API_URL=http:\/\/localhost:3000\/api/NEXT_PUBLIC_API_URL=https:\/\/staging.limitless-health.com\/api/" "$ENV_FILE"
    sed -i.bak "s/your-firebase-api-key/$firebase_api_key/" "$ENV_FILE"
    sed -i.bak "s/your-project-id/$firebase_project_id/" "$ENV_FILE"
    sed -i.bak "s/your-project.firebaseapp.com/$firebase_auth_domain/" "$ENV_FILE"
    
    rm -f "${ENV_FILE}.bak"
}

# Customization for production environment
customize_production_env() {
    info "Configuring for production environment..."
    
    # Ask for configuration values
    echo "Firebase configuration for production:"
    read -p "Firebase API Key: " firebase_api_key
    read -p "Firebase Project ID: " firebase_project_id
    read -p "Firebase Auth Domain: " firebase_auth_domain
    read -p "Sentry DSN: " sentry_dsn
    
    # Replace values
    sed -i.bak "s/NODE_ENV=development/NODE_ENV=production/" "$ENV_FILE"
    sed -i.bak "s/NEXT_PUBLIC_APP_URL=http:\/\/localhost:3000/NEXT_PUBLIC_APP_URL=https:\/\/limitless-health.com/" "$ENV_FILE"
    sed -i.bak "s/NEXT_PUBLIC_API_URL=http:\/\/localhost:3000\/api/NEXT_PUBLIC_API_URL=https:\/\/limitless-health.com\/api/" "$ENV_FILE"
    sed -i.bak "s/your-firebase-api-key/$firebase_api_key/" "$ENV_FILE"
    sed -i.bak "s/your-project-id/$firebase_project_id/" "$ENV_FILE"
    sed -i.bak "s/your-project.firebaseapp.com/$firebase_auth_domain/" "$ENV_FILE"
    sed -i.bak "s/your-sentry-dsn/$sentry_dsn/" "$ENV_FILE"
    
    # Disable debug in production
    sed -i.bak "s/NEXT_PUBLIC_ENABLE_DEBUG=true/NEXT_PUBLIC_ENABLE_DEBUG=false/" "$ENV_FILE"
    
    rm -f "${ENV_FILE}.bak"
}

# Function to check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check if example file exists
    if [ ! -f "env.example" ]; then
        error "env.example file does not exist"
    fi
    
    # Check if we are in the correct directory
    if [ ! -f "package.json" ]; then
        error "package.json file does not exist. Make sure you are in the project directory."
    fi
    
    log "Prerequisites checked successfully"
}

# Function to display help
show_help() {
    echo "Usage: $0 [ENVIRONMENT]"
    echo ""
    echo "Available environments:"
    echo "  local       - Configuration for local development (default)"
    echo "  staging     - Configuration for staging environment"
    echo "  production  - Configuration for production environment"
    echo ""
    echo "Examples:"
    echo "  $0              # Local configuration"
    echo "  $0 local        # Local configuration"
    echo "  $0 staging      # Staging configuration"
    echo "  $0 production   # Production configuration"
}

# Main function
main() {
    # Display help if requested
    if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
        show_help
        exit 0
    fi
    
    log "Configuring environment: $ENVIRONMENT"
    
    check_prerequisites
    create_env_file
    
    log "Configuration completed!"
    info "Don't forget to configure sensitive variables in $ENV_FILE"
}

# Error handling
trap 'error "Configuration interrupted"' INT TERM

# Execution
main "$@" 