#!/bin/bash

# ========================================
# Script de Configuration Firebase Authentication
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

# Configuration du projet
PROJECT_NAME="Limitless Health"
FIREBASE_PROJECT_ID="sante-limitless-poc"
SERVICE_ACCOUNT_EMAIL="firebase-adminsdk-fbsvc@sante-limitless-poc.iam.gserviceaccount.com"
CLIENT_ID="110214906255438358322"

# Fichiers
ENV_FILE=".env.local"
ENV_EXAMPLE="env.example"

# Vérification des prérequis
check_prerequisites() {
    log "Vérification des prérequis..."
    
    # Vérifier si on est dans le bon répertoire
    if [ ! -f "package.json" ]; then
        error "package.json non trouvé. Assurez-vous d'être dans le répertoire du projet."
    fi
    
    # Vérifier si firebase-admin est installé
    if ! npm list firebase-admin > /dev/null 2>&1; then
        warning "firebase-admin n'est pas installé. Installation en cours..."
        npm install firebase-admin --legacy-peer-deps
    fi
    
    success "Prérequis vérifiés"
}

# Création du fichier .env.local
create_env_file() {
    log "Création du fichier .env.local..."
    
    if [ -f "$ENV_FILE" ]; then
        warning "Le fichier $ENV_FILE existe déjà. Sauvegarde en cours..."
        cp "$ENV_FILE" "${ENV_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
    fi
    
    # Créer le fichier .env.local avec les vraies données Firebase
    cat > "$ENV_FILE" << EOF
# ========================================
# Configuration Limitless Health - Production
# ========================================

# Environnement
NODE_ENV=production

# ========================================
# Application
# ========================================
NEXT_PUBLIC_APP_NAME=$PROJECT_NAME
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=https://limitless-health.com

# ========================================
# API Configuration
# ========================================
NEXT_PUBLIC_API_URL=https://limitless-health.com/api
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.limitless-health.com/webhook/chat

# ========================================
# Firebase Configuration - Production
# ========================================
# IMPORTANT: Obtenez ces valeurs depuis la console Firebase
# Projet: $FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$FIREBASE_PROJECT_ID.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$FIREBASE_PROJECT_ID.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# ========================================
# Firebase Admin (Côté Serveur)
# ========================================
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCJIiBgtNQLrKm\\nacigvQQtHl6sSpPmYSgVBsghN1XKM0r/lqJKDY3F/cbvxkpyDVNLB8xDJxUKG/8N\\n9oC9W3vEeQ8eHLMcBzr54WONeNfDJ4jTrR+Oob0NE1XjXmmU/QBm1V62e+tkHomc\\nNARrPD75ghAsKdQ381zLQWD1SXBqKJLcux4mVQSPL10fFSuuDsVsRLlKSYVRQ8aA\\nD/9ZYRTud5OrNmjgzhgeMbqQXYCfmcXk+Ja866io1lHpiURyEmjy0Q8hDb7iezxO\\n91PZoR4d8B8aJbB4ENt6Hkby5eMb5ANSWQowEJLZrrr00/dJxAkf199nzRcIEVJA\\nRloW386NAgMBAAECggEAX66YtlevZK+3LYwqLIoroj77Auf4j4znr8E5ZiF6/x4b\\ngu8PCfc3HdLutmKgcyh9Ghf8REZhOKvGnu+T0H9jdtgBKuKTJaesmdXK9kEN+akk\\n5spGqMmuvmB+roHsAFlW1tenB8H4J85jHOCIIv+8u8Stys5MwMyIucX9jrZEmJSN\\njDatciw6cZ7uArhauZSlk7KMOzdoSjTJCyseg90k7OxwUH75kpGXnG9HOq+gJm3d\\nSZSAxwNqMnEu6PJ+EqBpyMtIjPqAxpMPFfDpZ/BcRtURm8Riwx9fbxZ7LrW1cnKh\\nM3JwEwduYGcPFSlqwKYc4+K2rMLW75e72QgfKz9AQwKBgQDq6/hdxy5l2f5DB9De\\nP4n8yKSrqKTr2LBokDZwrWoAtxDD/UCR0FMy/IoC3qOXYBl0KlIWD8PdLlMzuAQ3\\nn2n4doB8OlG05WC8jg6lv/niBpvnES8zmk+PTRVuQ2Oi2kGwf/u8bCHmixTQJqNF\\npa9O7cKp3Zap7HGm7fBSU+42cwKBgQDTj+O8yVPlMHePuILAHGRx9a0fnO4SYOOE\\nzjUYWOnG83ZqURZU2cpkv7NpKl7HAxUmCNUUcPca2Eqao8BZ1UoZXQTkM8jyutE2\\nMKexi4+fO9IX35MCtJxvIxORYyoJD0rplggzOuAC1J+Wl4OSJ7TD4Ykv6q59KYUx\\niQxYqlOm/wKBgQCofhjEQiEQIjtQnmF7lj0FFm+tQycOlXtpc83oISj/XE3lFFZk\\nfvO9hQ4DouXYo6999wCrHCGSGTDJznkP4AGkmHHtJ/MEeORaONVeooO6Tp0xLM0b\\nCNl5YYM2c5UZ78rfqdvHOBNUhHqoFJ5UTNKhHLzbEriGJbUaUlxk4Bfh6wKBgCXG\\njY2KDVbhHpglBAO1jiHjEjSQ2tmhPz7ZaxWb2rJRipVVQT2JXeA7cpeWnzG91Srj\\nbNinixfaAwg1sQTZVs/MkjEFJh5hSTX53hePqedu0Qa+Pwu+oCggBUByinDvsBqh\\nVXmAS7t1p8FF8JJKULahMNPDfcCPh17e77ttPl6VAoGAI1udQTwEvM+VNPjoDR5S\\nS9uT0jYkZWhPpvJGMXvjdf+n7zxnMhMlqgx/2aC7dN6PtAp3mP61jRrtwjrZnTwu\\n8pOgiN91943qiA1zePICz/+UqbpXeRT7dees6Lxm/9+4/kvSQ0J84K/9K82o0hQG\\nkhXc5aaI3AuCPepPTicNtIE=\\n-----END PRIVATE KEY-----\\n"

# ========================================
# Sentry Configuration
# ========================================
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/123456
SENTRY_ORG=limitless-health
SENTRY_PROJECT=limitless-health

# ========================================
# Analytics
# ========================================
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-vercel-analytics-id

# ========================================
# Feature Flags
# ========================================
NEXT_PUBLIC_ENABLE_AI_DOCTOR=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_DEBUG=false

# ========================================
# Development
# ========================================
NEXT_TELEMETRY_DISABLED=1
EOF

    success "Fichier $ENV_FILE créé"
}

# Configuration Firebase Admin
setup_firebase_admin() {
    log "Configuration Firebase Admin..."
    
    # Vérifier si le fichier firebase-admin.ts existe
    if [ ! -f "src/shared/config/firebase-admin.ts" ]; then
        error "Le fichier firebase-admin.ts n'existe pas"
    fi
    
    success "Firebase Admin configuré"
}

# Instructions pour obtenir les clés Firebase
show_firebase_instructions() {
    log "Instructions pour obtenir les clés Firebase :"
    echo
    echo "1. Allez sur https://console.firebase.google.com/"
    echo "2. Sélectionnez le projet : $FIREBASE_PROJECT_ID"
    echo "3. Allez dans Project Settings (⚙️)"
    echo "4. Dans l'onglet General, faites défiler jusqu'à 'Your apps'"
    echo "5. Si aucune app web n'existe, cliquez sur l'icône Web (</>)"
    echo "6. Nommez l'app : limitless-health-web"
    echo "7. Copiez la configuration et remplacez les valeurs dans $ENV_FILE"
    echo
    echo "Variables à remplacer :"
    echo "- NEXT_PUBLIC_FIREBASE_API_KEY"
    echo "- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
    echo "- NEXT_PUBLIC_FIREBASE_APP_ID"
    echo
}

# Instructions pour activer l'authentification Google
show_auth_instructions() {
    log "Instructions pour activer l'authentification Google :"
    echo
    echo "1. Dans Firebase Console, allez dans Authentication"
    echo "2. Cliquez sur 'Get started'"
    echo "3. Dans l'onglet 'Sign-in method', activez Google"
    echo "4. Configurez :"
    echo "   - Nom du projet public : $PROJECT_NAME"
    echo "   - Email de support : votre email"
    echo "   - Domaine autorisé : localhost (pour le développement)"
    echo
    echo "5. Dans Authentication > Settings > Authorized domains, ajoutez :"
    echo "   - localhost"
    echo "   - limitless-health.com"
    echo "   - staging.limitless-health.com"
    echo
}

# Test de la configuration
test_configuration() {
    log "Test de la configuration..."
    
    # Vérifier que le fichier .env.local existe
    if [ ! -f "$ENV_FILE" ]; then
        error "Le fichier $ENV_FILE n'existe pas"
    fi
    
    # Vérifier que les variables Firebase sont définies
    if ! grep -q "NEXT_PUBLIC_FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID" "$ENV_FILE"; then
        warning "La variable NEXT_PUBLIC_FIREBASE_PROJECT_ID n'est pas correctement configurée"
    fi
    
    success "Configuration testée"
}

# Affichage de l'aide
show_help() {
    echo "Script de Configuration Firebase Authentication - $PROJECT_NAME"
    echo
    echo "Usage: $0 [OPTIONS]"
    echo
    echo "Options:"
    echo "  -h, --help     Afficher cette aide"
    echo "  -t, --test     Tester la configuration"
    echo "  -f, --force    Forcer la recréation du fichier .env.local"
    echo
    echo "Ce script configure l'authentification Firebase pour le projet $PROJECT_NAME"
    echo "avec le projet Firebase : $FIREBASE_PROJECT_ID"
    echo
}

# Fonction principale
main() {
    echo "========================================"
    echo "Configuration Firebase Authentication"
    echo "Projet: $PROJECT_NAME"
    echo "Firebase: $FIREBASE_PROJECT_ID"
    echo "========================================"
    echo
    
    # Traitement des arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -t|--test)
                test_configuration
                exit 0
                ;;
            -f|--force)
                FORCE=true
                shift
                ;;
            *)
                error "Option inconnue: $1"
                ;;
        esac
    done
    
    # Exécution des étapes
    check_prerequisites
    create_env_file
    setup_firebase_admin
    test_configuration
    
    echo
    echo "========================================"
    success "Configuration Firebase terminée !"
    echo "========================================"
    echo
    
    show_firebase_instructions
    show_auth_instructions
    
    echo
    echo "Prochaines étapes :"
    echo "1. Obtenez les clés Firebase depuis la console"
    echo "2. Activez l'authentification Google"
    echo "3. Testez l'authentification : npm run dev"
    echo "4. Consultez la documentation : docs/FIREBASE_AUTHENTICATION_SETUP.md"
    echo
}

# Exécution du script
main "$@" 