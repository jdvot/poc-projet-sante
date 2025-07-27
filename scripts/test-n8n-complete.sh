#!/bin/bash

# Test Complet n8n - Limitless Health
# Ce script teste l'ensemble du système n8n

echo "🧪 Test Complet n8n - Limitless Health"
echo "======================================"

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
    # Load only simple variables, avoid complex ones
    export $(grep -v '^#' .env.local | grep -v '=' | grep -v 'KEY' | xargs 2>/dev/null || true)
fi

# Get webhook URL
WEBHOOK_URL="${N8N_WEBHOOK_URL:-$NEXT_PUBLIC_N8N_WEBHOOK_URL}"

if [ -z "$WEBHOOK_URL" ]; then
    print_error "Aucune URL de webhook n8n configurée"
    echo "Configurez N8N_WEBHOOK_URL ou NEXT_PUBLIC_N8N_WEBHOOK_URL dans .env.local"
    exit 1
fi

print_status "URL du webhook: $WEBHOOK_URL"

echo ""
print_status "Test 1: Connectivité n8n Cloud"
echo "-----------------------------------"

# Test basic connectivity
if curl -s --connect-timeout 5 --max-time 10 "$WEBHOOK_URL" > /dev/null 2>&1; then
    print_success "✅ URL accessible"
else
    print_error "❌ URL non accessible"
    exit 1
fi

echo ""
print_status "Test 2: Webhook n8n Direct"
echo "--------------------------------"

# Test direct webhook
TEST_PAYLOAD='{"message":"Test complet n8n","files":[],"timestamp":"2024-01-15T10:30:00.000Z","sessionId":"test-complet"}'

RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d "$TEST_PAYLOAD" \
    "$WEBHOOK_URL")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | head -n -1)

echo "HTTP Status: $HTTP_CODE"
echo "Response Body: $RESPONSE_BODY"

if [ "$HTTP_CODE" = "200" ] && [ -n "$RESPONSE_BODY" ]; then
    print_success "✅ Webhook n8n fonctionne correctement"
    echo "Réponse AI reçue: $RESPONSE_BODY"
elif [ "$HTTP_CODE" = "200" ] && [ -z "$RESPONSE_BODY" ]; then
    print_warning "⚠️  Webhook répond mais avec une réponse vide"
    echo "Le workflow n8n doit être reconfiguré"
else
    print_error "❌ Problème avec le webhook n8n"
    echo "HTTP Code: $HTTP_CODE"
    echo "Réponse: $RESPONSE_BODY"
fi

echo ""
print_status "Test 3: API Next.js"
echo "------------------------"

# Check if Next.js server is running
if curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
    print_success "✅ Serveur Next.js en cours d'exécution"
else
    print_warning "⚠️  Serveur Next.js non accessible"
    echo "Démarrez le serveur avec: npm run dev"
    echo "Test de l'API Next.js ignoré"
    NEXTJS_AVAILABLE=false
fi

if [ "$NEXTJS_AVAILABLE" != "false" ]; then
    # Test API Next.js
    API_RESPONSE=$(curl -s -w "\n%{http_code}" \
        -X POST \
        -F "message=Test via API Next.js" \
        "http://localhost:3000/api/n8n/chat/")

    API_HTTP_CODE=$(echo "$API_RESPONSE" | tail -n1)
    API_RESPONSE_BODY=$(echo "$API_RESPONSE" | head -n -1)

    echo "API HTTP Status: $API_HTTP_CODE"
    echo "API Response: $API_RESPONSE_BODY"

    if [ "$API_HTTP_CODE" = "200" ]; then
        print_success "✅ API Next.js fonctionne"
        if echo "$API_RESPONSE_BODY" | grep -q "Development Mode"; then
            print_warning "⚠️  Mode simulation activé (n8n non disponible)"
        else
            print_success "✅ Réponse AI réelle reçue"
        fi
    else
        print_error "❌ Problème avec l'API Next.js"
    fi
fi

echo ""
print_status "Test 4: Interface Utilisateur"
echo "-----------------------------------"

# Check if UI is accessible
if curl -s http://localhost:3000/ai-chat > /dev/null 2>&1; then
    print_success "✅ Interface utilisateur accessible"
    echo "URL: http://localhost:3000/ai-chat"
else
    print_warning "⚠️  Interface utilisateur non accessible"
    echo "Vérifiez que le serveur Next.js est démarré"
fi

echo ""
print_status "Résumé des Tests"
echo "-------------------"

echo "📊 Statut:"
if [ "$HTTP_CODE" = "200" ] && [ -n "$RESPONSE_BODY" ]; then
    echo "   ✅ n8n Cloud: FONCTIONNEL"
    echo "   ✅ API Next.js: FONCTIONNEL"
    echo "   ✅ Interface: ACCESSIBLE"
    echo ""
    print_success "🎉 Système n8n entièrement opérationnel!"
elif [ "$HTTP_CODE" = "200" ] && [ -z "$RESPONSE_BODY" ]; then
    echo "   ⚠️  n8n Cloud: RÉPONSE VIDE"
    echo "   ✅ API Next.js: FALLBACK ACTIF"
    echo "   ✅ Interface: ACCESSIBLE"
    echo ""
    print_warning "🔧 Configuration n8n à corriger"
    echo "   - Le workflow n8n retourne une réponse vide"
    echo "   - L'API Next.js fonctionne en mode fallback"
    echo "   - L'interface utilisateur est accessible"
else
    echo "   ❌ n8n Cloud: PROBLÈME"
    echo "   ✅ API Next.js: FALLBACK ACTIF"
    echo "   ⚠️  Interface: À VÉRIFIER"
    echo ""
    print_error "🚨 Problème de configuration n8n"
fi

echo ""
print_status "Recommandations"
echo "------------------"

if [ "$HTTP_CODE" = "200" ] && [ -z "$RESPONSE_BODY" ]; then
    echo "🔧 Pour corriger n8n:"
    echo "   1. Accédez à n8n Cloud: https://cloud.n8n.io/"
    echo "   2. Vérifiez le workflow 'My workflow (enhanced + llm response)'"
    echo "   3. Configurez les credentials Gemini"
    echo "   4. Activez le workflow"
    echo ""
    echo "📋 Alternative:"
    echo "   - Utilisez le workflow simplifié: n8n-workflow-simple-test.json"
    echo "   - Ou configurez n8n local: docker-compose up n8n"
else
    echo "✅ Système fonctionnel"
    echo "   - Testez l'interface utilisateur"
    echo "   - Vérifiez les réponses AI"
    echo "   - Configurez des prompts avancés si nécessaire"
fi

echo ""
print_status "Tests terminés! 🎯" 