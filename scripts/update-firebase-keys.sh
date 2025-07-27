#!/bin/bash

# ========================================
# Script de Mise à Jour des Clés Firebase
# Limitless Health - sante-limitless-poc
# ========================================

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions utilitaires
log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Configuration Firebase réelle
FIREBASE_API_KEY="AIzaSyAo2jMGkiZFl3y8dk72esvIL7jfYxgtYQY"
FIREBASE_AUTH_DOMAIN="sante-limitless-poc.firebaseapp.com"
FIREBASE_PROJECT_ID="sante-limitless-poc"
FIREBASE_STORAGE_BUCKET="sante-limitless-poc.firebasestorage.app"
FIREBASE_MESSAGING_SENDER_ID="219684993961"
FIREBASE_APP_ID="1:219684993961:web:084d9b5e6d4555412f22b8"

# Fichier .env.local
ENV_FILE=".env.local"

# Vérification du fichier .env.local
check_env_file() {
    log "Vérification du fichier $ENV_FILE..."
    
    if [ ! -f "$ENV_FILE" ]; then
        error "Le fichier $ENV_FILE n'existe pas. Exécutez d'abord ./scripts/setup-firebase-auth.sh"
    fi
    
    success "Fichier $ENV_FILE trouvé"
}

# Mise à jour des clés Firebase
update_firebase_keys() {
    log "Mise à jour des clés Firebase avec les vraies valeurs..."
    
    # Sauvegarde du fichier original
    cp "$ENV_FILE" "${ENV_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
    
    # Mise à jour des clés Firebase
    sed -i.bak "s/NEXT_PUBLIC_FIREBASE_API_KEY=.*/NEXT_PUBLIC_FIREBASE_API_KEY=$FIREBASE_API_KEY/" "$ENV_FILE"
    sed -i.bak "s/NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=.*/NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN/" "$ENV_FILE"
    sed -i.bak "s/NEXT_PUBLIC_FIREBASE_PROJECT_ID=.*/NEXT_PUBLIC_FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID/" "$ENV_FILE"
    sed -i.bak "s/NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=.*/NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET/" "$ENV_FILE"
    sed -i.bak "s/NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=.*/NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID/" "$ENV_FILE"
    sed -i.bak "s/NEXT_PUBLIC_FIREBASE_APP_ID=.*/NEXT_PUBLIC_FIREBASE_APP_ID=$FIREBASE_APP_ID/" "$ENV_FILE"
    
    # Supprimer les fichiers temporaires
    rm -f "${ENV_FILE}.bak"
    
    success "Clés Firebase mises à jour"
}

# Vérification des clés mises à jour
verify_keys() {
    log "Vérification des clés Firebase mises à jour..."
    
    # Vérifier que les clés ont été mises à jour
    if grep -q "NEXT_PUBLIC_FIREBASE_API_KEY=$FIREBASE_API_KEY" "$ENV_FILE"; then
        success "API Key Firebase mise à jour"
    else
        error "Erreur lors de la mise à jour de l'API Key"
    fi
    
    if grep -q "NEXT_PUBLIC_FIREBASE_APP_ID=$FIREBASE_APP_ID" "$ENV_FILE"; then
        success "App ID Firebase mis à jour"
    else
        error "Erreur lors de la mise à jour de l'App ID"
    fi
    
    success "Toutes les clés Firebase ont été mises à jour avec succès"
}

# Affichage des informations de configuration
show_config_info() {
    log "Configuration Firebase mise à jour :"
    echo
    echo "Projet Firebase: $FIREBASE_PROJECT_ID"
    echo "API Key: $FIREBASE_API_KEY"
    echo "Auth Domain: $FIREBASE_AUTH_DOMAIN"
    echo "Storage Bucket: $FIREBASE_STORAGE_BUCKET"
    echo "Messaging Sender ID: $FIREBASE_MESSAGING_SENDER_ID"
    echo "App ID: $FIREBASE_APP_ID"
    echo
}

# Instructions pour activer l'authentification
show_auth_instructions() {
    log "Instructions pour activer l'authentification Google :"
    echo
    echo "1. Allez sur https://console.firebase.google.com/"
    echo "2. Sélectionnez le projet : $FIREBASE_PROJECT_ID"
    echo "3. Allez dans Authentication > Sign-in method"
    echo "4. Activez Google comme méthode de connexion"
    echo "5. Configurez les domaines autorisés :"
    echo "   - localhost"
    echo "   - limitless-health.com"
    echo "   - staging.limitless-health.com"
    echo
}

# Fonction principale
main() {
    echo "========================================"
    echo "Mise à Jour des Clés Firebase"
    echo "Projet: sante-limitless-poc"
    echo "========================================"
    echo
    
    check_env_file
    update_firebase_keys
    verify_keys
    show_config_info
    show_auth_instructions
    
    echo "========================================"
    success "Clés Firebase mises à jour avec succès !"
    echo "========================================"
    echo
    echo "Prochaines étapes :"
    echo "1. Activez l'authentification Google dans Firebase Console"
    echo "2. Redémarrez l'application : npm run dev"
    echo "3. Testez l'authentification"
    echo
}

# Exécution du script
main "$@" 