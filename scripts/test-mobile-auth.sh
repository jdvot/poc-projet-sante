#!/bin/bash

# Script de test pour l'authentification mobile
# Usage: ./scripts/test-mobile-auth.sh

set -e

echo "🔍 Test d'authentification mobile - Limitless Health"
echo "=================================================="

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    local status=$1
    local message=$2
    case $status in
        "success")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "error")
            echo -e "${RED}❌ $message${NC}"
            ;;
        "warning")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "info")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
    esac
}

# Vérifier si on est dans le bon répertoire
if [ ! -f "package.json" ]; then
    print_status "error" "Ce script doit être exécuté depuis la racine du projet"
    exit 1
fi

print_status "info" "Vérification de l'environnement..."

# Vérifier les variables d'environnement Firebase
echo ""
print_status "info" "Vérification des variables d'environnement Firebase:"

FIREBASE_VARS=(
    "NEXT_PUBLIC_FIREBASE_API_KEY"
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
    "NEXT_PUBLIC_FIREBASE_APP_ID"
)

MOCK_VALUES=(
    "mock-api-key"
    "mock-project.firebaseapp.com"
    "mock-project-id"
    "mock-project.appspot.com"
    "123456789"
    "mock-app-id"
)

for i in "${!FIREBASE_VARS[@]}"; do
    var_name="${FIREBASE_VARS[$i]}"
    mock_value="${MOCK_VALUES[$i]}"
    
    if [ -z "${!var_name}" ]; then
        print_status "error" "$var_name: Non définie"
    elif [ "${!var_name}" = "$mock_value" ]; then
        print_status "warning" "$var_name: Utilise une valeur mock ($mock_value)"
    else
        print_status "success" "$var_name: Configurée"
    fi
done

# Vérifier les dépendances
echo ""
print_status "info" "Vérification des dépendances..."

if [ -d "node_modules" ]; then
    print_status "success" "node_modules: Présent"
else
    print_status "error" "node_modules: Manquant - exécutez 'npm install'"
fi

# Vérifier les fichiers de configuration
echo ""
print_status "info" "Vérification des fichiers de configuration:"

CONFIG_FILES=(
    "src/shared/config/firebase.ts"
    "src/shared/hooks/useFirebaseAuth.ts"
    "src/features/auth/AuthPage.tsx"
    "src/shared/hooks/useDeviceDetection.ts"
)

for file in "${CONFIG_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_status "success" "$file: Présent"
    else
        print_status "error" "$file: Manquant"
    fi
done

# Vérifier les tests
echo ""
print_status "info" "Vérification des tests:"

TEST_FILES=(
    "cypress/e2e/auth-mobile.cy.ts"
    "src/features/auth/AuthPage.test.tsx"
)

for file in "${TEST_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_status "success" "$file: Présent"
    else
        print_status "warning" "$file: Manquant"
    fi
done

# Instructions pour tester
echo ""
print_status "info" "Instructions pour tester l'authentification mobile:"
echo ""
echo "1. Démarrez le serveur de développement:"
echo "   npm run dev"
echo ""
echo "2. Ouvrez l'application sur un appareil mobile ou utilisez les outils de développement:"
echo "   - Chrome: F12 > Toggle device toolbar"
echo "   - Firefox: F12 > Responsive Design Mode"
echo ""
echo "3. Naviguez vers la page d'authentification:"
echo "   http://localhost:3000/auth"
echo ""
echo "4. Vérifiez les éléments suivants:"
echo "   - Indicateur 'Mode mobile' affiché"
echo "   - Bouton 'Diagnostic mobile' visible"
echo "   - Message de redirection lors du clic sur 'Se connecter avec Google'"
echo ""
echo "5. Si l'authentification échoue:"
echo "   - Cliquez sur 'Diagnostic mobile' pour voir les détails"
echo "   - Vérifiez la console du navigateur pour les erreurs"
echo "   - Assurez-vous que les domaines sont autorisés dans Firebase Console"
echo ""

# Vérifier si le serveur est en cours d'exécution
if pgrep -f "next dev" > /dev/null; then
    print_status "success" "Serveur de développement: En cours d'exécution"
    echo "   URL: http://localhost:3000"
else
    print_status "warning" "Serveur de développement: Non démarré"
    echo "   Pour démarrer: npm run dev"
fi

echo ""
print_status "info" "Test terminé. Consultez les recommandations ci-dessus." 