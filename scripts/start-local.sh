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

# Fonction pour vérifier le statut
check_status() {
    log "Vérification du statut des services..."
    
    # Attendre que l'application soit prête
    info "Attente du démarrage de l'application..."
    for i in {1..30}; do
        if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
            log "Application prête!"
            break
        fi
        
        if [ $i -eq 30 ]; then
            warn "L'application n'est pas encore prête après 30 secondes"
        else
            info "Attente... ($i/30)"
            sleep 1
        fi
    done
    
    # Afficher les URLs
    echo ""
    log "Services disponibles:"
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

# Fonction pour afficher l'aide
show_help() {
    echo "Usage: $0 [ENVIRONMENT] [SERVICES]"
    echo ""
    echo "Environnements:"
    echo "  local       - Environnement local (défaut)"
    echo ""
    echo "Services:"
    echo "  app         - Application uniquement (défaut)"
    echo "  full        - Tous les services de base"
    echo "  database    - Avec base de données PostgreSQL"
    echo "  n8n         - Avec n8n pour les webhooks"
    echo "  all         - Tous les services (app, db, redis, n8n)"
    echo ""
    echo "Exemples:"
    echo "  $0                    # Application uniquement"
    echo "  $0 local app          # Application uniquement"
    echo "  $0 local database     # Avec base de données"
    echo "  $0 local n8n          # Avec n8n"
    echo "  $0 local all          # Tous les services"
}

# Fonction principale
main() {
    # Afficher l'aide si demandé
    if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
        show_help
        exit 0
    fi
    
    log "Démarrage de l'environnement local: $ENVIRONMENT, services: $SERVICES"
    
    check_prerequisites
    setup_environment
    start_services
    check_status
    
    log "Environnement local prêt!"
    info "Utilisez 'docker-compose -f docker-compose.local.yml logs -f' pour voir les logs"
    info "Utilisez 'docker-compose -f docker-compose.local.yml down' pour arrêter"
}

# Gestion des erreurs
trap 'error "Démarrage interrompu"' INT TERM

# Exécution
main "$@" 