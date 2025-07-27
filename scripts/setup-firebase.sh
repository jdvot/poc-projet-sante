#!/bin/bash

# Script de configuration Firebase pour Limitless Health
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
PROJECT_ID=${1:-"limitless-health"}
ENVIRONMENT=${2:-"production"}

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
    
    log "Prérequis vérifiés avec succès"
}

# Connexion à Firebase
login_firebase() {
    log "Connexion à Firebase..."
    
    if ! firebase projects:list &> /dev/null; then
        info "Vous devez vous connecter à Firebase..."
        firebase login
    else
        log "Déjà connecté à Firebase"
    fi
}

# Vérification du projet Firebase
check_firebase_project() {
    log "Vérification du projet Firebase..."
    
    if ! firebase projects:list | grep -q "$PROJECT_ID"; then
        error "Le projet Firebase '$PROJECT_ID' n'existe pas. Créez-le d'abord dans la console Firebase."
    fi
    
    log "Projet Firebase '$PROJECT_ID' trouvé"
}

# Initialisation de Firebase
init_firebase() {
    log "Initialisation de Firebase..."
    
    # Vérifier si .firebaserc existe
    if [ ! -f ".firebaserc" ]; then
        info "Configuration du projet Firebase..."
        echo "{\"projects\":{\"default\":\"$PROJECT_ID\"}}" > .firebaserc
        log "Fichier .firebaserc créé"
    fi
    
    # Vérifier si firebase.json existe
    if [ ! -f "firebase.json" ]; then
        error "Le fichier firebase.json est manquant"
    fi
    
    log "Firebase initialisé"
}

# Configuration des variables d'environnement
setup_environment() {
    log "Configuration des variables d'environnement..."
    
    # Créer .env.local si il n'existe pas
    if [ ! -f ".env.local" ]; then
        info "Création du fichier .env.local..."
        cp env.local.example .env.local
        log "Fichier .env.local créé à partir de env.local.example"
    fi
    
    # Créer .env.production si il n'existe pas
    if [ ! -f ".env.production" ]; then
        info "Création du fichier .env.production..."
        cat > .env.production << EOF
NODE_ENV=production
NEXT_PUBLIC_FIREBASE_PROJECT_ID=$PROJECT_ID
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$PROJECT_ID.firebaseapp.com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$PROJECT_ID.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
EOF
        log "Fichier .env.production créé"
        warn "N'oubliez pas de configurer les vraies valeurs Firebase dans .env.production"
    fi
    
    log "Variables d'environnement configurées"
}

# Configuration des règles Firestore
setup_firestore() {
    log "Configuration de Firestore..."
    
    # Vérifier si les règles existent
    if [ ! -f "firestore.rules" ]; then
        error "Le fichier firestore.rules est manquant"
    fi
    
    # Vérifier si les index existent
    if [ ! -f "firestore.indexes.json" ]; then
        error "Le fichier firestore.indexes.json est manquant"
    fi
    
    log "Configuration Firestore vérifiée"
}

# Test de la configuration
test_configuration() {
    log "Test de la configuration..."
    
    # Test du build
    info "Test du build Firebase..."
    npm run build:firebase
    
    # Test des emulators (optionnel)
    if [ "$ENVIRONMENT" = "local" ]; then
        info "Démarrage des emulators Firebase..."
        firebase emulators:start --only hosting &
        EMULATOR_PID=$!
        sleep 10
        
        # Test de l'application
        if curl -f http://localhost:5000 > /dev/null 2>&1; then
            log "Test des emulators réussi"
        else
            warn "Test des emulators échoué"
        fi
        
        kill $EMULATOR_PID
    fi
    
    log "Configuration testée avec succès"
}

# Affichage des informations finales
show_final_info() {
    log "Configuration Firebase terminée avec succès!"
    
    info "Prochaines étapes:"
    info "1. Configurez les vraies valeurs Firebase dans .env.production"
    info "2. Activez l'authentification dans la console Firebase"
    info "3. Configurez Firestore dans la console Firebase"
    info "4. Testez localement: npm run firebase:serve"
    info "5. Déployez: npm run firebase:deploy"
    
    info "URLs de votre application:"
    info "- Production: https://$PROJECT_ID.web.app"
    info "- Alternative: https://$PROJECT_ID.firebaseapp.com"
    
    info "Console Firebase: https://console.firebase.google.com/project/$PROJECT_ID"
}

# Fonction principale
main() {
    log "Configuration Firebase pour le projet: $PROJECT_ID"
    
    check_prerequisites
    login_firebase
    check_firebase_project
    init_firebase
    setup_environment
    setup_firestore
    test_configuration
    show_final_info
}

# Gestion des erreurs
trap 'error "Configuration interrompue"' INT TERM

# Exécution
main "$@" 