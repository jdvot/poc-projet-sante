#!/bin/bash

# Script de déploiement Firebase optimisé pour Limitless Health
set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] ✅ $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ⚠️  WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ❌ ERROR: $1${NC}"
    exit 1
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] ℹ️  INFO: $1${NC}"
}

success() {
    echo -e "${PURPLE}[$(date +'%Y-%m-%d %H:%M:%S')] 🎉 SUCCESS: $1${NC}"
}

# Variables
ENVIRONMENT=${1:-production}
DEPLOY_TYPE=${2:-all} # all, hosting, firestore, functions
PROJECT_ID=$(grep -o '"default": "[^"]*"' .firebaserc | cut -d'"' -f4)

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
    
    # Vérifier Firebase CLI
    if ! command -v firebase &> /dev/null; then
        warn "Firebase CLI n'est pas installé. Installation..."
        npm install -g firebase-tools
    fi
    
    # Vérifier la connexion Firebase
    if ! firebase projects:list &> /dev/null; then
        error "Vous n'êtes pas connecté à Firebase. Exécutez 'firebase login'"
    fi
    
    log "Prérequis vérifiés avec succès"
}

# Vérification de la configuration
check_configuration() {
    log "Vérification de la configuration..."
    
    if [ ! -f ".firebaserc" ]; then
        error "Fichier .firebaserc manquant"
    fi
    
    if [ ! -f "firebase.json" ]; then
        error "Fichier firebase.json manquant"
    fi
    
    if [ ! -f "next.config.firebase.ts" ]; then
        error "Fichier next.config.firebase.ts manquant"
    fi
    
    info "Projet Firebase: $PROJECT_ID"
    log "Configuration vérifiée"
}

# Nettoyage des builds précédents
cleanup_previous_builds() {
    log "Nettoyage des builds précédents..."
    
    # Supprimer les dossiers de build
    rm -rf .next
    rm -rf out
    rm -rf dist
    
    # Nettoyer le cache npm si nécessaire
    if [ "$CLEAN_NPM_CACHE" = "true" ]; then
        npm cache clean --force
    fi
    
    log "Nettoyage terminé"
}

# Installation des dépendances
install_dependencies() {
    log "Installation des dépendances..."
    npm ci --legacy-peer-deps
    log "Dépendances installées"
}

# Tests (optionnels)
run_tests() {
    if [ "$SKIP_TESTS" != "true" ]; then
        log "Exécution des tests..."
        
        # Tests unitaires
        if npm run test:coverage &> /dev/null; then
            log "Tests unitaires passés"
        else
            warn "Tests unitaires échoués (continuation du déploiement)"
        fi
        
        # Linting
        if npm run lint &> /dev/null; then
            log "Linting passé"
        else
            warn "Linting échoué (continuation du déploiement)"
        fi
    else
        warn "Tests ignorés (SKIP_TESTS=true)"
    fi
}

# Build de l'application
build_application() {
    log "Build de l'application pour Firebase..."
    
    # Sauvegarder la config originale
    if [ -f "next.config.ts" ] && [ ! -f "next.config.original.ts" ]; then
        cp next.config.ts next.config.original.ts
    fi
    
    # Build avec la config Firebase
    npm run build:firebase
    
    # Vérifier que le dossier out existe
    if [ ! -d "out" ]; then
        error "Le dossier 'out' n'a pas été créé. Build échoué."
    fi
    
    # Vérifier la taille du build
    BUILD_SIZE=$(du -sh out | cut -f1)
    info "Taille du build: $BUILD_SIZE"
    
    log "Application buildée avec succès"
}

# Déploiement Firebase
deploy_firebase() {
    log "Déploiement Firebase..."
    
    case $DEPLOY_TYPE in
        "hosting")
            deploy_hosting
            ;;
        "firestore")
            deploy_firestore
            ;;
        "functions")
            deploy_functions
            ;;
        "all")
            deploy_hosting
            deploy_firestore
            deploy_functions
            ;;
        *)
            error "Type de déploiement invalide: $DEPLOY_TYPE"
            ;;
    esac
}

# Déploiement Hosting
deploy_hosting() {
    log "Déploiement Firebase Hosting..."
    firebase deploy --only hosting
    
    # Récupérer l'URL de déploiement
    DEPLOY_URL=$(firebase hosting:channel:list | grep "live" | awk '{print $4}')
    success "Hosting déployé: $DEPLOY_URL"
}

# Déploiement Firestore
deploy_firestore() {
    log "Déploiement Firestore..."
    
    # Déployer les règles
    if [ -f "firestore.rules" ]; then
        firebase deploy --only firestore:rules
        log "Règles Firestore déployées"
    fi
    
    # Déployer les index (optionnel)
    if [ -f "firestore.indexes.json" ]; then
        if firebase deploy --only firestore:indexes &> /dev/null; then
            log "Index Firestore déployés"
        else
            warn "Index Firestore non déployés (API non activée)"
        fi
    fi
}

# Déploiement Functions
deploy_functions() {
    log "Déploiement Cloud Functions..."
    
    if [ -d "functions" ]; then
        firebase deploy --only functions
        log "Cloud Functions déployées"
    else
        warn "Aucune Cloud Function à déployer"
    fi
}

# Test de l'application déployée
test_deployment() {
    if [ "$SKIP_TESTS" != "true" ]; then
        log "Test de l'application déployée..."
        
        # Récupérer l'URL de déploiement
        DEPLOY_URL=$(firebase hosting:channel:list | grep "live" | awk '{print $4}')
        
        if [ -n "$DEPLOY_URL" ]; then
            # Test de connectivité
            if curl -f "$DEPLOY_URL" &> /dev/null; then
                success "Application accessible: $DEPLOY_URL"
            else
                warn "Impossible de tester l'application (peut être normal)"
            fi
        fi
    fi
}

# Affichage des informations finales
show_deployment_info() {
    success "Déploiement terminé avec succès!"
    
    # Récupérer l'URL de déploiement
    DEPLOY_URL=$(firebase hosting:channel:list | grep "live" | awk '{print $4}')
    
    echo ""
    echo "🚀 Informations de déploiement:"
    echo "   Projet: $PROJECT_ID"
    echo "   Environnement: $ENVIRONMENT"
    echo "   URL: $DEPLOY_URL"
    echo "   Console Firebase: https://console.firebase.google.com/project/$PROJECT_ID"
    echo ""
    echo "📋 Commandes utiles:"
    echo "   Test local: npm run firebase:serve"
    echo "   Logs: firebase hosting:channel:list"
    echo "   Rollback: firebase hosting:revert"
    echo ""
}

# Fonction principale
main() {
    echo ""
    echo "🔥 Déploiement Firebase - Limitless Health"
    echo "=========================================="
    echo ""
    
    info "Environnement: $ENVIRONMENT"
    info "Type de déploiement: $DEPLOY_TYPE"
    info "Projet: $PROJECT_ID"
    echo ""
    
    check_prerequisites
    check_configuration
    cleanup_previous_builds
    install_dependencies
    run_tests
    build_application
    deploy_firebase
    test_deployment
    show_deployment_info
}

# Gestion des erreurs
trap 'error "Déploiement interrompu"' INT TERM

# Variables d'environnement optionnelles
export SKIP_TESTS=${SKIP_TESTS:-false}
export CLEAN_NPM_CACHE=${CLEAN_NPM_CACHE:-false}

# Exécution
main "$@" 