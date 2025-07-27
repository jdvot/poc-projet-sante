#!/bin/bash

# Script de finalisation de la configuration Firebase
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
PROJECT_ID=${1:-"sante-limitless-poc"}

# Vérification de la configuration
check_deployment() {
    log "Vérification du déploiement..."
    
    # Test de l'application
    info "Test de l'application..."
    if curl -f https://${PROJECT_ID}.web.app/api/health > /dev/null 2>&1; then
        log "✅ Application accessible"
    else
        error "❌ Application non accessible"
    fi
    
    # Test des métriques
    info "Test des métriques..."
    if curl -f https://${PROJECT_ID}.web.app/api/metrics > /dev/null 2>&1; then
        log "✅ Métriques accessibles"
    else
        warn "⚠️ Métriques non accessibles"
    fi
}

# Configuration des services Firebase
setup_firebase_services() {
    log "Configuration des services Firebase..."
    
    info "Activation des APIs Firebase..."
    echo "Pour activer les APIs Firebase, visitez :"
    echo "https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=${PROJECT_ID}"
    echo ""
    echo "APIs à activer :"
    echo "- Cloud Firestore API"
    echo "- Firebase Authentication API"
    echo "- Firebase Hosting API"
    echo ""
    
    read -p "Appuyez sur Entrée une fois les APIs activées..."
}

# Configuration de l'authentification
setup_authentication() {
    log "Configuration de l'authentification..."
    
    info "Pour configurer l'authentification, visitez :"
    echo "https://console.firebase.google.com/project/${PROJECT_ID}/authentication"
    echo ""
    echo "Méthodes d'authentification recommandées :"
    echo "- Email/Password"
    echo "- Google"
    echo "- GitHub (optionnel)"
    echo ""
    
    read -p "Appuyez sur Entrée une fois l'authentification configurée..."
}

# Configuration de Firestore
setup_firestore() {
    log "Configuration de Firestore..."
    
    info "Pour configurer Firestore, visitez :"
    echo "https://console.firebase.google.com/project/${PROJECT_ID}/firestore"
    echo ""
    echo "Étapes :"
    echo "1. Créer une base de données"
    echo "2. Choisir le mode de production"
    echo "3. Sélectionner la région (eur3 recommandée)"
    echo ""
    
    read -p "Appuyez sur Entrée une fois Firestore configuré..."
}

# Déploiement des index Firestore
deploy_firestore_indexes() {
    log "Déploiement des index Firestore..."
    
    if firebase deploy --only firestore:indexes; then
        log "✅ Index Firestore déployés"
    else
        warn "⚠️ Échec du déploiement des index (normal si Firestore n'est pas encore configuré)"
    fi
}

# Configuration des variables d'environnement
setup_environment_variables() {
    log "Configuration des variables d'environnement..."
    
    info "Variables d'environnement à configurer dans .env.production :"
    echo ""
    echo "NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key"
    echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${PROJECT_ID}.firebaseapp.com"
    echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID=${PROJECT_ID}"
    echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${PROJECT_ID}.appspot.com"
    echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id"
    echo "NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id"
    echo ""
    
    info "Pour obtenir ces valeurs, visitez :"
    echo "https://console.firebase.google.com/project/${PROJECT_ID}/settings/general"
    echo ""
}

# Test final
final_test() {
    log "Test final de l'application..."
    
    info "Test de l'application complète..."
    echo "URL de l'application : https://${PROJECT_ID}.web.app"
    echo ""
    
    # Test des endpoints
    echo "Tests des endpoints :"
    echo "- Health check : https://${PROJECT_ID}.web.app/api/health"
    echo "- Métriques : https://${PROJECT_ID}.web.app/api/metrics"
    echo ""
    
    read -p "Appuyez sur Entrée pour ouvrir l'application dans le navigateur..."
    
    # Ouvrir l'application dans le navigateur
    if command -v open &> /dev/null; then
        open "https://${PROJECT_ID}.web.app"
    elif command -v xdg-open &> /dev/null; then
        xdg-open "https://${PROJECT_ID}.web.app"
    else
        info "Ouvrez manuellement : https://${PROJECT_ID}.web.app"
    fi
}

# Affichage des informations finales
show_final_info() {
    log "🎉 Configuration Firebase terminée avec succès!"
    
    echo ""
    echo "📋 Résumé de la configuration :"
    echo "✅ Application déployée : https://${PROJECT_ID}.web.app"
    echo "✅ Console Firebase : https://console.firebase.google.com/project/${PROJECT_ID}"
    echo "✅ Hosting configuré"
    echo "✅ Règles Firestore déployées"
    echo ""
    
    echo "🔧 Prochaines étapes :"
    echo "1. Configurer l'authentification Firebase"
    echo "2. Créer la base de données Firestore"
    echo "3. Configurer les variables d'environnement"
    echo "4. Tester l'application complète"
    echo "5. Configurer le monitoring (Sentry, Analytics)"
    echo ""
    
    echo "📚 Documentation :"
    echo "- Guide complet : README.FIREBASE.md"
    echo "- Scripts de déploiement : scripts/deploy.sh"
    echo "- Configuration automatique : scripts/setup-firebase.sh"
    echo ""
}

# Fonction principale
main() {
    log "Finalisation de la configuration Firebase pour le projet: $PROJECT_ID"
    
    check_deployment
    setup_firebase_services
    setup_authentication
    setup_firestore
    deploy_firestore_indexes
    setup_environment_variables
    final_test
    show_final_info
}

# Gestion des erreurs
trap 'error "Configuration interrompue"' INT TERM

# Exécution
main "$@" 