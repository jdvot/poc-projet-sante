#!/bin/bash

# Script de test n8n Cloud Test
# Usage: ./scripts/test-n8n-local.sh

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions d'affichage
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# URL n8n Cloud Test
N8N_URL="https://jdvot57.app.n8n.cloud"
N8N_WEBHOOK_URL="https://jdvot57.app.n8n.cloud/webhook-test/chat"

print_info "🧪 Test de n8n Cloud Test - Limitless Health"
echo "================================================"

# Vérifier si n8n Cloud est accessible
print_info "Vérification de n8n Cloud..."

if ! curl -s --connect-timeout 5 "$N8N_URL" > /dev/null 2>&1; then
    print_error "n8n Cloud n'est pas accessible sur $N8N_URL"
    print_info "Vérifiez votre connexion internet et l'URL n8n Cloud"
    exit 1
fi

print_success "n8n Cloud est accessible sur $N8N_URL"

# Test de connectivité de base
print_info "Test de connectivité de base..."

if curl -s -I "$N8N_URL" | grep -q "200"; then
    print_success "Connectivité de base: OK"
else
    print_error "Connectivité de base: ÉCHEC"
    exit 1
fi

# Test du webhook de test
print_info "Test du webhook de test..."

WEBHOOK_RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"message":"test","files":[],"sessionId":"test-cloud"}' \
    "$N8N_WEBHOOK_URL")

HTTP_CODE=$(echo "$WEBHOOK_RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$WEBHOOK_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "404" ]; then
    print_warning "Webhook de test non trouvé (normal si le workflow n'est pas configuré)"
    print_info "Prochaines étapes:"
    echo "   1. Vérifier que le workflow de test existe dans n8n Cloud"
    echo "   2. Vérifier que le webhook /webhook-test/chat est configuré"
    echo "   3. Vérifier que le workflow est activé"
elif [ "$HTTP_CODE" = "200" ]; then
    print_success "Webhook de test fonctionne! Réponse: $RESPONSE_BODY"
else
    print_warning "Réponse inattendue: $HTTP_CODE"
    echo "Réponse: $RESPONSE_BODY"
fi

# Test de l'API Next.js avec n8n Cloud Test
print_info "Test de l'API Next.js avec n8n Cloud Test..."

# Vérifier si l'application Next.js est en cours d'exécution
if ! curl -s --connect-timeout 5 "http://localhost:3000/api/health" > /dev/null 2>&1; then
    print_warning "Application Next.js non accessible"
    print_info "Démarrez l'application avec: npm run dev"
else
    print_success "Application Next.js accessible"
    
    # Test de l'API chat
    API_RESPONSE=$(curl -s -w "\n%{http_code}" \
        -X POST \
        -F "message=Test via API Next.js avec n8n Cloud Test" \
        "http://localhost:3000/api/n8n/chat")
    
    API_HTTP_CODE=$(echo "$API_RESPONSE" | tail -n1)
    API_RESPONSE_BODY=$(echo "$API_RESPONSE" | sed '$d')
    
    if [ "$API_HTTP_CODE" = "200" ]; then
        print_success "API Next.js fonctionne!"
        echo "Réponse: $API_RESPONSE_BODY"
    else
        print_warning "API Next.js: $API_HTTP_CODE"
        echo "Réponse: $API_RESPONSE_BODY"
    fi
fi

# Vérification des variables d'environnement
print_info "Vérification des variables d'environnement..."

if [ -f ".env.local" ]; then
    if grep -q "N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook-test/chat" ".env.local"; then
        print_success "Variable N8N_WEBHOOK_URL configurée pour n8n Cloud Test"
    else
        print_warning "Variable N8N_WEBHOOK_URL non configurée pour n8n Cloud Test"
        print_info "Ajoutez dans .env.local:"
        echo "   N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook-test/chat"
    fi
else
    print_warning "Fichier .env.local non trouvé"
    print_info "Créez-le avec: cp env.local.example .env.local"
fi

# Instructions finales
echo ""
print_info "📋 Instructions pour utiliser n8n Cloud Test:"
echo ""
echo "1. 🚀 Démarrer l'application:"
echo "   npm run dev"
echo ""
echo "2. 🔗 Accéder à n8n Cloud:"
echo "   URL: https://cloud.n8n.io/"
echo "   Vérifier le workflow de test"
echo ""
echo "3. 🧪 Tester l'AI Chat:"
echo "   URL: http://localhost:3000/ai-chat"
echo ""
echo "4. 📊 Monitoring:"
echo "   - Logs application: npm run dev"
echo "   - n8n Cloud dashboard: https://cloud.n8n.io/"
echo ""

print_success "🎉 Test de n8n Cloud Test terminé!" 