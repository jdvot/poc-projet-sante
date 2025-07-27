#!/bin/bash

# Script de déploiement automatisé pour Limitless Health
set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Variables
ENVIRONMENT=${1:-production}
DOCKER_IMAGE="limitless-health"
DOCKER_TAG=${2:-latest}

# Vérification des prérequis
check_prerequisites() {
    log "Vérification des prérequis..."
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js n'est pas installé"
    fi
    
    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        error "npm n'est pas installé"
    fi
    
    # Vérifier Docker
    if ! command -v docker &> /dev/null; then
        error "Docker n'est pas installé"
    fi
    
    # Vérifier Firebase CLI
    if ! command -v firebase &> /dev/null; then
        warn "Firebase CLI n'est pas installé. Installation..."
        npm install -g firebase-tools
    fi
    
    log "Prérequis vérifiés avec succès"
}

# Installation des dépendances
install_dependencies() {
    log "Installation des dépendances..."
    npm ci
    log "Dépendances installées"
}

# Tests
run_tests() {
    log "Exécution des tests..."
    npm run test:coverage
    npm run lint
    npm run format:check
    log "Tests passés avec succès"
}

# Build de l'application
build_application() {
    log "Build de l'application..."
    npm run build
    log "Application buildée avec succès"
}

# Build Docker
build_docker() {
    log "Build de l'image Docker..."
    docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
    log "Image Docker buildée avec succès"
}

# Test Docker
test_docker() {
    log "Test de l'image Docker..."
    docker run -d --name test-container -p 3000:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}
    sleep 10
    
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        log "Test Docker réussi"
    else
        error "Test Docker échoué"
    fi
    
    docker stop test-container
    docker rm test-container
}

# Déploiement Firebase
deploy_firebase() {
    log "Déploiement Firebase..."
    firebase deploy --only hosting
    log "Déploiement Firebase terminé"
}

# Push Docker
push_docker() {
    if [ -n "$DOCKER_USERNAME" ] && [ -n "$DOCKER_PASSWORD" ]; then
        log "Push de l'image Docker..."
        docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
        docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG}
        docker push ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG}
        log "Image Docker poussée avec succès"
    else
        warn "Variables Docker Hub non configurées, skip du push"
    fi
}

# Nettoyage
cleanup() {
    log "Nettoyage..."
    docker system prune -f
    log "Nettoyage terminé"
}

# Fonction principale
main() {
    log "Début du déploiement pour l'environnement: $ENVIRONMENT"
    
    check_prerequisites
    install_dependencies
    run_tests
    build_application
    build_docker
    test_docker
    
    if [ "$ENVIRONMENT" = "production" ]; then
        deploy_firebase
        push_docker
    fi
    
    cleanup
    
    log "Déploiement terminé avec succès!"
}

# Gestion des erreurs
trap 'error "Déploiement interrompu"' INT TERM

# Exécution
main "$@" 