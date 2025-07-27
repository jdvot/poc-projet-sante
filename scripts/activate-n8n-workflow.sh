#!/bin/bash

# Activate n8n Workflow Script
# This script helps activate and test n8n workflows

echo "🚀 Activation du Workflow n8n"
echo "============================="

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

# Test current workflow
echo ""
print_status "Test du workflow actuel..."

TEST_PAYLOAD='{"message":"Test d\'activation du workflow","files":[],"timestamp":"2024-01-15T10:30:00.000Z","sessionId":"test-activation"}'

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
    print_success "✅ Workflow fonctionne correctement"
    echo "Réponse reçue: $RESPONSE_BODY"
elif [ "$HTTP_CODE" = "200" ] && [ -z "$RESPONSE_BODY" ]; then
    print_warning "⚠️  Workflow répond mais avec une réponse vide"
    echo "Le workflow n8n doit être reconfiguré"
else
    print_error "❌ Problème avec le workflow"
    echo "HTTP Code: $HTTP_CODE"
    echo "Réponse: $RESPONSE_BODY"
fi

echo ""
print_status "Instructions pour corriger le workflow:"
echo ""
echo "1. Connectez-vous à n8n Cloud: https://cloud.n8n.io/"
echo "2. Ouvrez le workflow 'My workflow (enhanced + llm response)'"
echo "3. Vérifiez que tous les nœuds sont connectés:"
echo "   - Webhook Trigger → Validate Input → Prepare LLM Context → Basic LLM Chain → Format Response → Webhook Response"
echo "4. Vérifiez que le nœud 'Basic LLM Chain' a des credentials configurés"
echo "5. Activez le workflow si ce n'est pas déjà fait"
echo ""
echo "Ou importez le workflow simplifié:"
echo "1. Dans n8n Cloud, cliquez sur 'Import from file'"
echo "2. Sélectionnez: n8n-workflow-simple-test.json"
echo "3. Activez le nouveau workflow"
echo "4. Testez avec: ./scripts/test-n8n-webhook.sh"

echo ""
print_status "Test du workflow simplifié..."

# Test with simple payload
SIMPLE_PAYLOAD='{"message":"Test simple"}'

SIMPLE_RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d "$SIMPLE_PAYLOAD" \
    "$WEBHOOK_URL")

SIMPLE_HTTP_CODE=$(echo "$SIMPLE_RESPONSE" | tail -n1)
SIMPLE_RESPONSE_BODY=$(echo "$SIMPLE_RESPONSE" | head -n -1)

echo "Simple Test HTTP Status: $SIMPLE_HTTP_CODE"
echo "Simple Test Response Body: $SIMPLE_RESPONSE_BODY"

if [ "$SIMPLE_HTTP_CODE" = "200" ] && [ -n "$SIMPLE_RESPONSE_BODY" ]; then
    print_success "✅ Workflow simplifié fonctionne"
elif [ "$SIMPLE_HTTP_CODE" = "200" ] && [ -z "$SIMPLE_RESPONSE_BODY" ]; then
    print_error "❌ Même le workflow simplifié retourne une réponse vide"
    echo "Problème de configuration du nœud de réponse"
else
    print_warning "⚠️  Problème avec le workflow simplifié"
fi

echo ""
print_status "Diagnostic terminé! 🎯"
echo ""
echo "📚 Ressources utiles:"
echo "- n8n Cloud Dashboard: https://cloud.n8n.io/"
echo "- Documentation n8n: https://docs.n8n.io/"
echo "- Guide des webhooks: https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.webhook/" 