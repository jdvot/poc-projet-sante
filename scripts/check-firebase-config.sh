#!/bin/bash

# Script de diagnostic Firebase pour l'authentification mobile
# Limitless Health - Projet sante-limitless-poc

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction de logging
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
}

# Variables
ENV_FILE=".env.local"
PROJECT_NAME="Limitless Health"
FIREBASE_PROJECT_ID="sante-limitless-poc"

echo "========================================"
echo "Diagnostic Firebase - Authentification Mobile"
echo "Projet: $PROJECT_NAME"
echo "========================================"
echo

# Vérifier que le fichier .env.local existe
check_env_file() {
    if [ ! -f "$ENV_FILE" ]; then
        error "Le fichier $ENV_FILE n'existe pas"
        echo
        echo "Créez le fichier avec les variables Firebase :"
        echo "NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key"
        echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com"
        echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id"
        echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com"
        echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id"
        echo "NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id"
        exit 1
    fi
    success "Fichier $ENV_FILE trouvé"
}

# Charger les variables d'environnement
load_env_vars() {
    log "Chargement des variables d'environnement..."
    
    # Source du fichier .env.local
    if [ -f "$ENV_FILE" ]; then
        export $(grep -v '^#' "$ENV_FILE" | xargs)
    fi
    
    # Variables Firebase
    FIREBASE_API_KEY="$NEXT_PUBLIC_FIREBASE_API_KEY"
    FIREBASE_AUTH_DOMAIN="$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
    FIREBASE_PROJECT_ID="$NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    FIREBASE_STORAGE_BUCKET="$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
    FIREBASE_MESSAGING_SENDER_ID="$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
    FIREBASE_APP_ID="$NEXT_PUBLIC_FIREBASE_APP_ID"
    
    success "Variables d'environnement chargées"
}

# Vérifier les variables Firebase
check_firebase_vars() {
    log "Vérification des variables Firebase..."
    
    local missing_vars=()
    
    if [ -z "$FIREBASE_API_KEY" ]; then
        missing_vars+=("NEXT_PUBLIC_FIREBASE_API_KEY")
    fi
    
    if [ -z "$FIREBASE_AUTH_DOMAIN" ]; then
        missing_vars+=("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN")
    fi
    
    if [ -z "$FIREBASE_PROJECT_ID" ]; then
        missing_vars+=("NEXT_PUBLIC_FIREBASE_PROJECT_ID")
    fi
    
    if [ -z "$FIREBASE_STORAGE_BUCKET" ]; then
        missing_vars+=("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET")
    fi
    
    if [ -z "$FIREBASE_MESSAGING_SENDER_ID" ]; then
        missing_vars+=("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID")
    fi
    
    if [ -z "$FIREBASE_APP_ID" ]; then
        missing_vars+=("NEXT_PUBLIC_FIREBASE_APP_ID")
    fi
    
    if [ ${#missing_vars[@]} -eq 0 ]; then
        success "Toutes les variables Firebase sont définies"
    else
        error "Variables Firebase manquantes :"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        return 1
    fi
}

# Vérifier la connectivité Firebase
check_firebase_connectivity() {
    log "Test de connectivité Firebase..."
    
    # Test de l'API Firebase
    local response=$(curl -s -o /dev/null -w "%{http_code}" \
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=$FIREBASE_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{"email":"test@example.com","password":"test123","returnSecureToken":true}')
    
    if [ "$response" = "400" ]; then
        success "Connectivité Firebase OK (erreur 400 attendue pour test@example.com)"
    elif [ "$response" = "403" ]; then
        warning "Connectivité Firebase OK mais clé API peut être restreinte"
    else
        error "Problème de connectivité Firebase (code: $response)"
        return 1
    fi
}

# Vérifier la configuration du projet
check_project_config() {
    log "Vérification de la configuration du projet..."
    
    if [ "$FIREBASE_PROJECT_ID" = "$PROJECT_NAME" ]; then
        success "ID du projet Firebase correct"
    else
        warning "ID du projet Firebase : $FIREBASE_PROJECT_ID"
    fi
    
    if [[ "$FIREBASE_AUTH_DOMAIN" == *"$FIREBASE_PROJECT_ID"* ]]; then
        success "Domaine d'authentification cohérent"
    else
        warning "Domaine d'authentification : $FIREBASE_AUTH_DOMAIN"
    fi
}

# Vérifier les domaines autorisés
check_authorized_domains() {
    log "Vérification des domaines autorisés..."
    
    echo "Domaines à vérifier dans Firebase Console :"
    echo "  - localhost"
    echo "  - $FIREBASE_AUTH_DOMAIN"
    echo "  - limitless-health.com"
    echo "  - staging.limitless-health.com"
    echo
    echo "Instructions :"
    echo "1. Allez sur https://console.firebase.google.com/"
    echo "2. Sélectionnez le projet : $FIREBASE_PROJECT_ID"
    echo "3. Authentication > Settings > Authorized domains"
    echo "4. Vérifiez que les domaines ci-dessus sont listés"
    echo
}

# Vérifier l'activation de Google Auth
check_google_auth() {
    log "Vérification de l'authentification Google..."
    
    echo "Instructions pour activer Google Auth :"
    echo "1. Allez sur https://console.firebase.google.com/"
    echo "2. Sélectionnez le projet : $FIREBASE_PROJECT_ID"
    echo "3. Authentication > Sign-in method"
    echo "4. Activez Google comme méthode de connexion"
    echo "5. Configurez :"
    echo "   - Nom du projet public : $PROJECT_NAME"
    echo "   - Email de support : votre email"
    echo
}

# Vérifier la configuration de l'application
check_app_config() {
    log "Vérification de la configuration de l'application..."
    
    # Vérifier que l'application est démarrée
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        success "Application accessible sur http://localhost:3000"
    else
        warning "Application non accessible sur http://localhost:3000"
        echo "Démarrez l'application avec : npm run dev"
    fi
    
    # Vérifier les dépendances
    if [ -f "package.json" ]; then
        if grep -q "firebase" package.json; then
            success "Firebase SDK installé"
        else
            error "Firebase SDK non installé"
            echo "Installez avec : npm install firebase"
        fi
    fi
}

# Test de l'authentification mobile
test_mobile_auth() {
    log "Test de l'authentification mobile..."
    
    echo "Tests à effectuer manuellement :"
    echo "1. Ouvrez l'application sur un appareil mobile"
    echo "2. Allez sur la page d'authentification"
    echo "3. Cliquez sur 'Se connecter avec Google'"
    echo "4. Vérifiez que la redirection fonctionne"
    echo "5. Vérifiez le retour à l'application"
    echo
    echo "Problèmes courants :"
    echo "- Domaines non autorisés dans Firebase Console"
    echo "- Authentification Google non activée"
    echo "- Variables d'environnement incorrectes"
    echo "- Problèmes de réseau sur mobile"
    echo
}

# Afficher les informations de configuration
show_config_info() {
    log "Configuration Firebase actuelle :"
    echo
    echo "Projet Firebase: $FIREBASE_PROJECT_ID"
    echo "API Key: ${FIREBASE_API_KEY:0:10}..."
    echo "Auth Domain: $FIREBASE_AUTH_DOMAIN"
    echo "Storage Bucket: $FIREBASE_STORAGE_BUCKET"
    echo "Messaging Sender ID: $FIREBASE_MESSAGING_SENDER_ID"
    echo "App ID: $FIREBASE_APP_ID"
    echo
}

# Fonction principale
main() {
    echo "========================================"
    echo "Diagnostic Firebase - Authentification Mobile"
    echo "Projet: $PROJECT_NAME"
    echo "========================================"
    echo
    
    check_env_file
    load_env_vars
    check_firebase_vars
    check_firebase_connectivity
    check_project_config
    check_authorized_domains
    check_google_auth
    check_app_config
    test_mobile_auth
    show_config_info
    
    echo "========================================"
    success "Diagnostic terminé !"
    echo "========================================"
    echo
    echo "Si des problèmes persistent :"
    echo "1. Vérifiez la configuration Firebase Console"
    echo "2. Redémarrez l'application : npm run dev"
    echo "3. Testez sur différents appareils mobiles"
    echo "4. Vérifiez les logs de la console navigateur"
    echo
}

# Exécution du script
main "$@" 