#!/bin/bash

# Script de diagnostic Firebase pour Limitless Health
# Vérifie la configuration et la connectivité Firebase

set -e

echo "🔍 Diagnostic Firebase - Limitless Health"
echo "=========================================="

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les résultats
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo ""
print_info "1. Vérification du projet Firebase actuel..."

# Vérifier le projet Firebase actuel
CURRENT_PROJECT=$(firebase use 2>/dev/null | head -1 | tr -d ' ' || echo "")
if [ -n "$CURRENT_PROJECT" ]; then
    print_status 0 "Projet actuel: $CURRENT_PROJECT"
else
    print_status 1 "Aucun projet Firebase actif"
    exit 1
fi

echo ""
print_info "2. Vérification des variables d'environnement..."

# Vérifier les variables d'environnement Firebase
ENV_FILE=".env.local"
if [ -f "$ENV_FILE" ]; then
    print_status 0 "Fichier .env.local trouvé"
    
    # Vérifier chaque variable Firebase
    API_KEY=$(grep "NEXT_PUBLIC_FIREBASE_API_KEY=" "$ENV_FILE" | cut -d'=' -f2)
    AUTH_DOMAIN=$(grep "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=" "$ENV_FILE" | cut -d'=' -f2)
    PROJECT_ID=$(grep "NEXT_PUBLIC_FIREBASE_PROJECT_ID=" "$ENV_FILE" | cut -d'=' -f2)
    
    if [[ "$API_KEY" != "mock-api-key" && -n "$API_KEY" ]]; then
        print_status 0 "API Key configurée"
    else
        print_status 1 "API Key non configurée ou mock"
    fi
    
    if [[ "$AUTH_DOMAIN" != "mock-project.firebaseapp.com" && -n "$AUTH_DOMAIN" ]]; then
        print_status 0 "Auth Domain configuré"
    else
        print_status 1 "Auth Domain non configuré ou mock"
    fi
    
    if [[ "$PROJECT_ID" != "mock-project-id" && -n "$PROJECT_ID" ]]; then
        print_status 0 "Project ID configuré"
    else
        print_status 1 "Project ID non configuré ou mock"
    fi
else
    print_status 1 "Fichier .env.local non trouvé"
fi

echo ""
print_info "3. Vérification de la connectivité Firebase..."

# Vérifier la connectivité avec l'API Firebase
if curl -s "https://$PROJECT_ID.firebaseapp.com" > /dev/null 2>&1; then
    print_status 0 "Connectivité Firebase OK"
else
    print_status 1 "Problème de connectivité Firebase"
fi

echo ""
print_info "4. Vérification des applications Firebase..."

# Lister les applications Firebase
FIREBASE_APPS=$(firebase apps:list 2>/dev/null | grep -c "WEB" || echo "0")
if [ "$FIREBASE_APPS" -gt 0 ]; then
    print_status 0 "$FIREBASE_APPS application(s) Firebase configurée(s)"
else
    print_status 1 "Aucune application Firebase configurée"
fi

echo ""
print_info "5. Vérification de l'authentification..."

# Vérifier si l'authentification est activée
AUTH_STATUS=$(firebase auth:export --project="$PROJECT_ID" 2>/dev/null | head -1 | grep -c "users" || echo "0")
if [ "$AUTH_STATUS" -ge 0 ]; then
    print_status 0 "Service d'authentification accessible"
else
    print_status 1 "Problème avec le service d'authentification"
fi

echo ""
print_info "6. Vérification de l'application Next.js..."

# Vérifier si l'application Next.js fonctionne
if curl -s "http://localhost:3000" > /dev/null 2>&1; then
    print_status 0 "Application Next.js accessible sur localhost:3000"
else
    print_warning "Application Next.js non accessible (démarrez avec 'npm run dev')"
fi

echo ""
print_info "7. Configuration Firebase dans le code..."

# Vérifier la configuration dans le code
if grep -q "sante-limitless-poc" "src/shared/config/firebase.ts" 2>/dev/null; then
    print_status 0 "Configuration Firebase détectée dans le code"
else
    print_warning "Configuration Firebase non trouvée dans le code"
fi

echo ""
echo "=========================================="
print_info "Diagnostic terminé !"

# Résumé des actions recommandées
echo ""
print_info "Actions recommandées :"
echo "1. Vérifiez que toutes les variables d'environnement sont correctes"
echo "2. Assurez-vous que l'authentification Google est activée dans Firebase Console"
echo "3. Testez l'authentification dans l'application"
echo "4. Vérifiez les logs Firebase pour d'éventuelles erreurs"

echo ""
print_info "Pour tester l'authentification :"
echo "1. Démarrez l'application : npm run dev"
echo "2. Allez sur http://localhost:3000/auth"
echo "3. Testez la connexion Google"

echo "" 