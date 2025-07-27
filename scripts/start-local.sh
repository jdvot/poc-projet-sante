#!/bin/bash

# Script de démarrage local avec n8n Docker
# Usage: ./scripts/start-local.sh [mode]

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions d'affichage
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    print_error "Docker n'est pas installé. Veuillez installer Docker d'abord."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose n'est pas installé. Veuillez installer Docker Compose d'abord."
    exit 1
fi

# Mode par défaut
MODE=${1:-"full"}

print_info "🚀 Démarrage de l'environnement local Limitless Health"
print_info "Mode: $MODE"

# Vérifier si le fichier .env.local existe
if [ ! -f ".env.local" ]; then
    print_warning "Fichier .env.local non trouvé. Création depuis l'exemple..."
    cp env.local.example .env.local
    print_success "Fichier .env.local créé"
fi

# Fonction pour démarrer les services
start_services() {
    local services=$1
    print_info "Démarrage des services: $services"
    
    case $services in
        "app")
            docker-compose -f docker-compose.local.yml up app -d
            ;;
        "n8n")
            docker-compose -f docker-compose.local.yml --profile n8n up n8n -d
            ;;
        "full")
            docker-compose -f docker-compose.local.yml --profile n8n up -d
            ;;
        "database")
            docker-compose -f docker-compose.local.yml --profile database up postgres -d
            ;;
        "cache")
            docker-compose -f docker-compose.local.yml --profile cache up redis -d
            ;;
        *)
            print_error "Mode inconnu: $services"
            print_info "Modes disponibles: app, n8n, full, database, cache"
            exit 1
            ;;
    esac
}

# Fonction pour vérifier les services
check_services() {
    print_info "Vérification des services..."
    
    # Vérifier l'application Next.js
    if curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
        print_success "✅ Application Next.js: http://localhost:3000"
    else
        print_warning "⚠️  Application Next.js: En cours de démarrage..."
    fi
    
    # Vérifier n8n
    if curl -s http://localhost:5678 > /dev/null 2>&1; then
        print_success "✅ n8n: http://localhost:5678"
        print_info "   Login: admin / admin123"
    else
        print_warning "⚠️  n8n: En cours de démarrage..."
    fi
}

# Fonction pour afficher les URLs
show_urls() {
    echo ""
    print_info "🌐 URLs d'accès:"
    echo "   Application: http://localhost:3000"
    echo "   AI Chat: http://localhost:3000/ai-chat"
    echo "   n8n: http://localhost:5678"
    echo "   n8n Login: admin / admin123"
    echo ""
    print_info "📋 Prochaines étapes:"
    echo "   1. Ouvrir n8n: http://localhost:5678"
    echo "   2. Importer le workflow: n8n-workflow-ai-chat.json"
    echo "   3. Activer le workflow"
    echo "   4. Tester l'AI Chat: http://localhost:3000/ai-chat"
}

# Démarrage selon le mode
case $MODE in
    "app")
        start_services "app"
        ;;
    "n8n")
        start_services "n8n"
        ;;
    "full")
        start_services "full"
        ;;
    "database")
        start_services "database"
        ;;
    "cache")
        start_services "cache"
        ;;
    "stop")
        print_info "Arrêt des services..."
        docker-compose -f docker-compose.local.yml down
        print_success "Services arrêtés"
        exit 0
        ;;
    "restart")
        print_info "Redémarrage des services..."
        docker-compose -f docker-compose.local.yml down
        docker-compose -f docker-compose.local.yml --profile n8n up -d
        ;;
    "logs")
        docker-compose -f docker-compose.local.yml logs -f
        exit 0
        ;;
    "status")
        docker-compose -f docker-compose.local.yml ps
        exit 0
        ;;
    *)
        print_error "Mode inconnu: $MODE"
        echo ""
        print_info "Modes disponibles:"
        echo "   app      - Application Next.js uniquement"
        echo "   n8n      - n8n uniquement"
        echo "   full     - Application + n8n (recommandé)"
        echo "   database - Base de données PostgreSQL"
        echo "   cache    - Cache Redis"
        echo "   stop     - Arrêter tous les services"
        echo "   restart  - Redémarrer tous les services"
        echo "   logs     - Afficher les logs"
        echo "   status   - Statut des services"
        echo ""
        print_info "Exemple: ./scripts/start-local.sh full"
        exit 1
        ;;
esac

# Attendre que les services démarrent
print_info "Attente du démarrage des services..."
sleep 10

# Vérifier les services
check_services

# Afficher les URLs
show_urls

print_success "🎉 Environnement local démarré avec succès!" 