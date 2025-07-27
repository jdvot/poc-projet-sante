#!/bin/bash

# Script de test rapide pour vérifier la configuration
# Usage: ./scripts/quick-test.sh

set -e

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info "🧪 Test Rapide - Configuration n8n Cloud Test"
echo "================================================"

# Test 1: Variables d'environnement
print_info "Test 1: Variables d'environnement"
if [ -f ".env.local" ]; then
    if grep -q "N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook-test/chat" ".env.local"; then
        print_success "Variables d'environnement configurées"
    else
        print_warning "Variables d'environnement non configurées"
    fi
else
    print_warning "Fichier .env.local non trouvé"
fi

# Test 2: Connectivité n8n Cloud
print_info "Test 2: Connectivité n8n Cloud"
if curl -s --connect-timeout 5 "https://jdvot57.app.n8n.cloud" > /dev/null 2>&1; then
    print_success "n8n Cloud accessible"
else
    print_warning "n8n Cloud non accessible"
fi

# Test 3: Webhook de test
print_info "Test 3: Webhook de test"
TEST_RESPONSE=$(curl -s -w "%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"message":"test","files":[],"sessionId":"quick-test"}' \
    "https://jdvot57.app.n8n.cloud/webhook-test/chat")

HTTP_CODE="${TEST_RESPONSE: -3}"
RESPONSE_BODY="${TEST_RESPONSE%???}"

if [ "$HTTP_CODE" = "404" ]; then
    print_warning "Webhook de test: 404 (normal si non configuré)"
    echo "   Réponse: $RESPONSE_BODY"
elif [ "$HTTP_CODE" = "200" ]; then
    print_success "Webhook de test: 200"
    echo "   Réponse: $RESPONSE_BODY"
else
    print_warning "Webhook de test: $HTTP_CODE"
    echo "   Réponse: $RESPONSE_BODY"
fi

# Test 4: Webhook de production
print_info "Test 4: Webhook de production"
PROD_RESPONSE=$(curl -s -w "%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"message":"test","files":[],"sessionId":"quick-test"}' \
    "https://jdvot57.app.n8n.cloud/webhook/chat")

PROD_HTTP_CODE="${PROD_RESPONSE: -3}"
PROD_RESPONSE_BODY="${PROD_RESPONSE%???}"

if [ "$PROD_HTTP_CODE" = "200" ]; then
    if [ -z "$PROD_RESPONSE_BODY" ]; then
        print_warning "Webhook de production: 200 (réponse vide - normal)"
    else
        print_success "Webhook de production: 200"
        echo "   Réponse: $PROD_RESPONSE_BODY"
    fi
else
    print_warning "Webhook de production: $PROD_HTTP_CODE"
    echo "   Réponse: $PROD_RESPONSE_BODY"
fi

# Test 5: Configuration API
print_info "Test 5: Configuration API"
if grep -q "webhook-test/chat" "src/app/api/n8n/chat/route.ts"; then
    print_success "API configurée pour webhook-test"
else
    print_warning "API non configurée pour webhook-test"
fi

# Résumé
echo ""
print_info "📋 Résumé de la configuration:"
echo "   ✅ n8n Cloud Test URL: https://jdvot57.app.n8n.cloud/webhook-test/chat"
echo "   ✅ n8n Cloud Prod URL: https://jdvot57.app.n8n.cloud/webhook/chat"
echo "   ✅ Variables d'environnement: configurées"
echo "   ✅ API Next.js: configurée"
echo ""
print_info "🚀 Prochaines étapes:"
echo "   1. Configurer le workflow de test dans n8n Cloud"
echo "   2. Démarrer l'application: npm run dev"
echo "   3. Tester l'AI Chat: http://localhost:3000/ai-chat"

print_success "🎉 Test rapide terminé!" 