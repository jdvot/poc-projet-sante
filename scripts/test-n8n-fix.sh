#!/bin/bash

# Test n8n Fix
# This script tests if the n8n workflow fix worked

echo "🧪 Test de la Correction n8n"
echo "============================"

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
    exit 1
fi

print_status "Test du webhook: $WEBHOOK_URL"

# Test payload
TEST_PAYLOAD='{
  "message": "Test de correction",
  "files": [],
  "timestamp": "2024-01-01T00:00:00.000Z",
  "sessionId": "test-fix"
}'

print_status "Envoi du payload de test..."

# Send request
RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d "$TEST_PAYLOAD" \
    "$WEBHOOK_URL")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | head -n -1)

echo ""
print_status "Résultats du test:"
echo "HTTP Status: $HTTP_CODE"
echo "Response Body: $RESPONSE_BODY"

# Analyze results
if [ "$HTTP_CODE" = "200" ]; then
    if [ -z "$RESPONSE_BODY" ]; then
        print_error "❌ Réponse toujours vide"
        echo ""
        echo "🔧 Le problème persiste. Vérifiez:"
        echo "1. Que le workflow est activé dans n8n Cloud"
        echo "2. Qu'un nœud 'Respond to Webhook' est présent"
        echo "3. Que la configuration du nœud de sortie est correcte"
        echo ""
        echo "📚 Consultez: docs/N8N_WORKFLOW_FIX_GUIDE.md"
    else
        # Try to parse JSON
        if echo "$RESPONSE_BODY" | jq . > /dev/null 2>&1; then
            print_success "✅ Réponse JSON valide reçue!"
            
            # Check for required fields
            RESPONSE_TEXT=$(echo "$RESPONSE_BODY" | jq -r '.response // "MISSING"')
            MODEL=$(echo "$RESPONSE_BODY" | jq -r '.model // "MISSING"')
            
            if [ "$RESPONSE_TEXT" != "MISSING" ] && [ "$MODEL" != "MISSING" ]; then
                print_success "✅ Tous les champs requis présents!"
                echo ""
                echo "🎉 Correction réussie! Votre AI Chat devrait maintenant fonctionner."
                echo ""
                echo "📋 Prochaines étapes:"
                echo "1. Testez l'AI Chat dans votre application"
                echo "2. Vérifiez les réponses AI réelles"
                echo "3. Configurez des prompts plus avancés"
            else
                print_warning "⚠️  Réponse JSON reçue mais champs manquants"
                echo "   Champs manquants:"
                echo "   - response: $RESPONSE_TEXT"
                echo "   - model: $MODEL"
            fi
        else
            print_warning "⚠️  Réponse reçue mais pas au format JSON"
            echo "   Contenu: $RESPONSE_BODY"
        fi
    fi
else
    print_error "❌ Erreur HTTP: $HTTP_CODE"
    echo "   Réponse: $RESPONSE_BODY"
    echo ""
    echo "🔧 Vérifiez:"
    echo "1. Que le workflow est activé"
    echo "2. Que l'URL du webhook est correcte"
    echo "3. Que la méthode POST est supportée"
fi

echo ""
print_status "Test terminé! 🎯" 