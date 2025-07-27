#!/bin/bash

# Script de résolution du problème de domaine non autorisé Firebase
# Ce script diagnostique et guide la résolution du problème d'authentification

echo "🔧 Diagnostic Firebase - Domaine non autorisé"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Load environment variables from .env.local if it exists
if [ -f ".env.local" ]; then
    export $(grep -v '^#' .env.local | xargs)
fi

# Get Firebase configuration
FIREBASE_PROJECT_ID="${NEXT_PUBLIC_FIREBASE_PROJECT_ID:-'Not set'}"
FIREBASE_AUTH_DOMAIN="${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:-'Not set'}"
FIREBASE_API_KEY="${NEXT_PUBLIC_FIREBASE_API_KEY:-'Not set'}"

echo ""
print_status "Configuration Firebase actuelle :"
echo "  Projet ID: $FIREBASE_PROJECT_ID"
echo "  Auth Domain: $FIREBASE_AUTH_DOMAIN"
echo "  API Key: ${FIREBASE_API_KEY:0:10}..."

echo ""
print_status "Diagnostic du problème..."

# Check if Firebase config is valid
if [ "$FIREBASE_PROJECT_ID" = "Not set" ] || [ "$FIREBASE_AUTH_DOMAIN" = "Not set" ]; then
    print_error "Configuration Firebase manquante"
    echo "Vérifiez que le fichier .env.local contient les variables Firebase"
    exit 1
fi

# Check if using mock values
if [[ "$FIREBASE_PROJECT_ID" == *"mock"* ]] || [[ "$FIREBASE_AUTH_DOMAIN" == *"mock"* ]]; then
    print_error "Configuration Firebase avec valeurs mock détectée"
    echo "Vous devez utiliser les vraies clés Firebase du projet sante-limitless-poc"
    exit 1
fi

print_success "Configuration Firebase valide détectée"

echo ""
print_status "Instructions pour résoudre le problème :"
echo "================================================"

echo ""
echo "1. 🔗 Accéder à Firebase Console"
echo "   URL: https://console.firebase.google.com/"
echo "   Projet: $FIREBASE_PROJECT_ID"

echo ""
echo "2. 🔐 Configurer les domaines autorisés"
echo "   - Allez dans Authentication > Settings"
echo "   - Section 'Authorized domains'"
echo "   - Cliquez sur 'Add domain'"
echo "   - Ajoutez les domaines suivants :"

echo ""
echo "   Domaines à ajouter :"
echo "   - localhost"
echo "   - $FIREBASE_AUTH_DOMAIN"
echo "   - limitless-health.com"
echo "   - staging.limitless-health.com"

echo ""
echo "3. ✅ Activer l'authentification Google"
echo "   - Authentication > Sign-in method"
echo "   - Cliquez sur Google"
echo "   - Activez Google comme méthode de connexion"

echo ""
print_status "Test de connectivité Firebase..."

# Test Firebase connectivity
if curl -s --connect-timeout 5 --max-time 10 "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=$FIREBASE_API_KEY" > /dev/null 2>&1; then
    print_success "Connectivité Firebase OK"
else
    print_warning "Problème de connectivité Firebase"
fi

echo ""
print_status "Vérification de l'application..."

# Check if app is running
if curl -s --connect-timeout 5 --max-time 10 "http://localhost:3000" > /dev/null 2>&1; then
    print_success "Application accessible sur localhost:3000"
else
    print_warning "Application non accessible sur localhost:3000"
    echo "Démarrez l'application avec : npm run dev"
fi

echo ""
print_status "Instructions de test :"
echo "============================"

echo ""
echo "1. 🚀 Démarrer l'application :"
echo "   npm run dev"

echo ""
echo "2. 🌐 Tester l'authentification :"
echo "   - Ouvrir http://localhost:3000"
echo "   - Cliquer sur 'Se connecter avec Google'"
echo "   - Sélectionner votre compte Google"

echo ""
echo "3. 🔍 Vérifier les erreurs :"
echo "   - Ouvrir la console du navigateur (F12)"
echo "   - Vérifier les erreurs d'authentification"
echo "   - Vérifier les logs de l'application"

echo ""
print_status "Domaines autorisés requis :"
echo "=================================="

echo ""
echo "Dans Firebase Console > Authentication > Settings > Authorized domains :"
echo ""
echo "✅ localhost"
echo "✅ $FIREBASE_AUTH_DOMAIN"
echo "✅ limitless-health.com"
echo "✅ staging.limitless-health.com"

echo ""
print_status "URLs importantes :"
echo "======================"

echo ""
echo "🔗 Firebase Console:"
echo "   https://console.firebase.google.com/project/$FIREBASE_PROJECT_ID/authentication/settings"

echo ""
echo "🌐 Application locale:"
echo "   http://localhost:3000"

echo ""
echo "📚 Documentation:"
echo "   https://firebase.google.com/docs/auth/web/google-signin"

echo ""
print_warning "Si le problème persiste après configuration :"
echo "1. Vider le cache du navigateur"
echo "2. Redémarrer l'application"
echo "3. Vérifier que Google Auth est activé dans Firebase"
echo "4. Vérifier les restrictions d'API dans Google Cloud Console"

echo ""
print_success "Diagnostic terminé !"
echo "Suivez les instructions ci-dessus pour résoudre le problème." 