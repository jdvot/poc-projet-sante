#!/bin/bash

# Diagnose n8n Webhook Issues
# This script helps diagnose and fix n8n webhook problems

echo "🔍 Diagnostic n8n Webhook"
echo "=========================="

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

# Get webhook URL
WEBHOOK_URL="${N8N_WEBHOOK_URL:-$NEXT_PUBLIC_N8N_WEBHOOK_URL}"

if [ -z "$WEBHOOK_URL" ]; then
    print_error "Aucune URL de webhook n8n configurée"
    echo "Configurez N8N_WEBHOOK_URL ou NEXT_PUBLIC_N8N_WEBHOOK_URL dans .env.local"
    exit 1
fi

print_status "URL du webhook: $WEBHOOK_URL"

# Test 1: Basic connectivity
echo ""
print_status "Test 1: Connectivité de base"
if curl -s --connect-timeout 5 --max-time 10 "$WEBHOOK_URL" > /dev/null 2>&1; then
    print_success "✅ URL accessible"
else
    print_error "❌ URL non accessible"
    echo "   Vérifiez que le workflow n8n Cloud est activé"
    exit 1
fi

# Test 2: HTTP method support
echo ""
print_status "Test 2: Support de la méthode POST"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$WEBHOOK_URL" -H "Content-Type: application/json" -d '{}')
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" = "200" ]; then
    print_success "✅ Méthode POST supportée"
elif [ "$HTTP_CODE" = "405" ]; then
    print_error "❌ Méthode POST non supportée"
    echo "   Vérifiez la configuration du webhook dans n8n"
    exit 1
else
    print_warning "⚠️  Réponse inattendue: $HTTP_CODE"
fi

# Test 3: Valid payload
echo ""
print_status "Test 3: Payload valide"
VALID_PAYLOAD='{
  "message": "Test diagnostic",
  "files": [],
  "timestamp": "2024-01-01T00:00:00.000Z",
  "sessionId": "diagnostic-test"
}'

RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d "$VALID_PAYLOAD" \
    "$WEBHOOK_URL")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | head -n -1)

echo "HTTP Status: $HTTP_CODE"
echo "Response Body: $RESPONSE_BODY"

if [ "$HTTP_CODE" = "200" ]; then
    if [ -z "$RESPONSE_BODY" ]; then
        print_error "❌ Réponse vide - problème de configuration du workflow"
        echo "   Le workflow n8n ne renvoie pas de réponse"
    else
        # Try to parse JSON
        if echo "$RESPONSE_BODY" | jq . > /dev/null 2>&1; then
            print_success "✅ Réponse JSON valide"
            echo "   Contenu: $(echo "$RESPONSE_BODY" | jq -r '.response // "No response field"')"
        else
            print_warning "⚠️  Réponse non-JSON reçue"
            echo "   Contenu: $RESPONSE_BODY"
        fi
    fi
else
    print_error "❌ Erreur HTTP: $HTTP_CODE"
    echo "   Réponse: $RESPONSE_BODY"
fi

# Test 4: Check workflow configuration
echo ""
print_status "Test 4: Vérification de la configuration du workflow"

if [[ "$WEBHOOK_URL" == *"cloud.n8n.io"* ]]; then
    print_status "🌐 n8n Cloud détecté"
    echo ""
    echo "📋 Vérifications à effectuer dans n8n Cloud:"
    echo "1. Connectez-vous à https://cloud.n8n.io/"
    echo "2. Vérifiez que le workflow est activé"
    echo "3. Vérifiez la configuration du nœud Webhook:"
    echo "   - Méthode: POST"
    echo "   - Path: /chat"
    echo "   - Authentication: None (ou configurée)"
    echo "4. Vérifiez que le workflow a un nœud de sortie"
    echo "5. Vérifiez les logs d'exécution"
else
    print_status "🏠 n8n local détecté"
    echo ""
    echo "📋 Vérifications à effectuer:"
    echo "1. Vérifiez que n8n est en cours d'exécution"
    echo "2. Vérifiez la configuration du workflow"
    echo "3. Vérifiez les logs n8n"
fi

# Test 5: Common issues
echo ""
print_status "Test 5: Problèmes courants"

echo "🔍 Vérification des problèmes courants:"

# Check if URL is valid
if [[ ! "$WEBHOOK_URL" =~ ^https?://.* ]]; then
    print_error "❌ URL invalide: $WEBHOOK_URL"
else
    print_success "✅ Format d'URL valide"
fi

# Check if it's a n8n Cloud URL
if [[ "$WEBHOOK_URL" == *"cloud.n8n.io"* ]]; then
    print_success "✅ URL n8n Cloud détectée"
else
    print_warning "⚠️  URL n8n Cloud non détectée"
fi

# Check if webhook path is correct
if [[ "$WEBHOOK_URL" == */webhook/* ]]; then
    print_success "✅ Chemin webhook détecté"
else
    print_warning "⚠️  Chemin webhook non détecté"
fi

# Recommendations
echo ""
print_status "💡 Recommandations"

if [ "$HTTP_CODE" = "200" ] && [ -z "$RESPONSE_BODY" ]; then
    echo "🔧 Problème identifié: Réponse vide"
    echo "   Solution: Vérifiez que le workflow n8n a un nœud de sortie"
    echo "   Le workflow doit renvoyer une réponse JSON avec un champ 'response'"
elif [ "$HTTP_CODE" != "200" ]; then
    echo "🔧 Problème identifié: Erreur HTTP $HTTP_CODE"
    echo "   Solution: Vérifiez la configuration du webhook dans n8n"
else
    echo "✅ Configuration semble correcte"
    echo "   Si vous avez encore des problèmes, vérifiez les logs n8n"
fi

echo ""
echo "📚 Ressources utiles:"
echo "- n8n Cloud Dashboard: https://cloud.n8n.io/"
echo "- Documentation n8n: https://docs.n8n.io/"
echo "- Guide des webhooks: https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.webhook/"

echo ""
print_status "Diagnostic terminé! 🎯" 