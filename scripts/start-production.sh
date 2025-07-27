#!/bin/bash

# Script de démarrage pour l'environnement de production
set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
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
ENVIRONMENT=${1:-production}
SERVICES=${2:-app}
DOMAIN=${3:-limitless-health.com}

# Fonction pour vérifier les prérequis
check_prerequisites() {
    log "Vérification des prérequis..."
    
    # Vérifier Docker
    if ! command -v docker &> /dev/null; then
        error "Docker n'est pas installé"
    fi
    
    # Vérifier Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose n'est pas installé"
    fi
    
    # Vérifier que nous sommes dans le bon répertoire
    if [ ! -f "package.json" ]; then
        error "Le fichier package.json n'existe pas. Assurez-vous d'être dans le répertoire du projet."
    fi
    
    # Vérifier les variables d'environnement
    if [ ! -f ".env.production" ]; then
        error "Le fichier .env.production n'existe pas. Exécutez d'abord: ./scripts/setup-env.sh production"
    fi
    
    log "Prérequis vérifiés avec succès"
}

# Fonction pour configurer SSL
setup_ssl() {
    log "Configuration SSL..."
    
    # Créer le répertoire SSL s'il n'existe pas
    mkdir -p ssl
    
    # Vérifier si les certificats existent
    if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
        warn "Certificats SSL non trouvés. Génération de certificats auto-signés..."
        
        # Générer des certificats auto-signés pour les tests
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout ssl/key.pem \
            -out ssl/cert.pem \
            -subj "/C=FR/ST=France/L=Paris/O=Limitless Health/CN=$DOMAIN"
        
        log "Certificats SSL générés"
    else
        log "Certificats SSL trouvés"
    fi
}

# Fonction pour démarrer les services
start_services() {
    log "Démarrage des services de production..."
    
    case $SERVICES in
        "app")
            info "Démarrage de l'application uniquement..."
            docker-compose -f docker-compose.production.yml up -d app
            ;;
        "full")
            info "Démarrage de tous les services..."
            docker-compose -f docker-compose.production.yml up -d
            ;;
        "monitoring")
            info "Démarrage avec monitoring..."
            docker-compose -f docker-compose.production.yml --profile monitoring up -d
            ;;
        "all")
            info "Démarrage de tous les services avec monitoring..."
            docker-compose -f docker-compose.production.yml --profile monitoring up -d
            ;;
        *)
            error "Service non reconnu: $SERVICES"
            ;;
    esac
    
    log "Services démarrés"
}

# Fonction pour vérifier le statut
check_status() {
    log "Vérification du statut des services..."
    
    # Attendre que l'application soit prête
    info "Attente du démarrage de l'application..."
    for i in {1..60}; do
        if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
            log "Application prête!"
            break
        fi
        
        if [ $i -eq 60 ]; then
            warn "L'application n'est pas encore prête après 60 secondes"
        else
            info "Attente... ($i/60)"
            sleep 2
        fi
    done
    
    # Afficher les URLs
    echo ""
    log "Services disponibles:"
    echo "  🌐 Application: http://localhost:3000"
    echo "  🔒 Application (HTTPS): https://localhost"
    echo "  📊 Health Check: http://localhost:3000/api/health"
    echo "  📈 Metrics: http://localhost:3000/api/metrics"
    
    if [ "$SERVICES" = "monitoring" ] || [ "$SERVICES" = "all" ]; then
        echo "  📊 Prometheus: http://localhost:9090"
        echo "  📈 Grafana: http://localhost:3001 (admin/admin123)"
    fi
    
    echo ""
}

# Fonction pour configurer le firewall
setup_firewall() {
    log "Configuration du firewall..."
    
    # Vérifier si ufw est disponible
    if command -v ufw &> /dev/null; then
        info "Configuration UFW..."
        
        # Autoriser SSH
        ufw allow ssh
        
        # Autoriser HTTP et HTTPS
        ufw allow 80/tcp
        ufw allow 443/tcp
        
        # Autoriser les ports de l'application
        ufw allow 3000/tcp
        
        # Autoriser les ports de monitoring si nécessaire
        if [ "$SERVICES" = "monitoring" ] || [ "$SERVICES" = "all" ]; then
            ufw allow 9090/tcp  # Prometheus
            ufw allow 3001/tcp  # Grafana
        fi
        
        # Activer le firewall
        ufw --force enable
        
        log "Firewall configuré"
    else
        warn "UFW non disponible, configuration du firewall ignorée"
    fi
}

# Fonction pour afficher l'aide
show_help() {
    echo "Usage: $0 [ENVIRONMENT] [SERVICES] [DOMAIN]"
    echo ""
    echo "Environnements:"
    echo "  production   - Environnement de production (défaut)"
    echo ""
    echo "Services:"
    echo "  app          - Application uniquement (défaut)"
    echo "  full         - Application + Nginx"
    echo "  monitoring   - Avec monitoring (Prometheus + Grafana)"
    echo "  all          - Tous les services"
    echo ""
    echo "Exemples:"
    echo "  $0                           # Application uniquement"
    echo "  $0 production app            # Application uniquement"
    echo "  $0 production full           # Avec Nginx"
    echo "  $0 production monitoring     # Avec monitoring"
    echo "  $0 production all            # Tous les services"
    echo "  $0 production all example.com # Avec domaine personnalisé"
}

# Fonction principale
main() {
    # Afficher l'aide si demandé
    if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
        show_help
        exit 0
    fi
    
    log "Démarrage de l'environnement de production: $ENVIRONMENT, services: $SERVICES, domaine: $DOMAIN"
    
    check_prerequisites
    setup_ssl
    setup_firewall
    start_services
    check_status
    
    log "Environnement de production prêt!"
    info "Utilisez 'docker-compose -f docker-compose.production.yml logs -f' pour voir les logs"
    info "Utilisez 'docker-compose -f docker-compose.production.yml down' pour arrêter"
    info "N'oubliez pas de configurer votre DNS pour pointer vers ce serveur"
}

# Gestion des erreurs
trap 'error "Démarrage interrompu"' INT TERM

# Exécution
main "$@" 