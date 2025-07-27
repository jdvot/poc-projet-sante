#!/bin/bash

# Setup n8n Cloud for Development
# This script helps configure n8n Cloud for local development

echo "🚀 Configuration n8n Cloud pour le Développement"
echo "================================================"

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

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    print_warning "Fichier .env.local non trouvé. Création..."
    cp env.local.example .env.local
    print_success "Fichier .env.local créé"
fi

# Function to update .env.local
update_env_file() {
    local key=$1
    local value=$2
    local file=".env.local"
    
    if grep -q "^${key}=" "$file"; then
        # Update existing key
        sed -i.bak "s|^${key}=.*|${key}=${value}|" "$file"
        rm "${file}.bak" 2>/dev/null
    else
        # Add new key
        echo "${key}=${value}" >> "$file"
    fi
}

# Get n8n Cloud configuration
echo ""
print_status "Configuration n8n Cloud..."

read -p "🌐 URL du webhook n8n Cloud (ex: https://jdvot57.app.n8n.cloud/webhook/chat): " webhook_url

if [ -z "$webhook_url" ]; then
    print_error "URL du webhook requise"
    exit 1
fi

# Validate URL format
if [[ ! "$webhook_url" =~ ^https://.*\.app\.n8n\.cloud/webhook/.* ]]; then
    print_warning "L'URL ne semble pas être un webhook n8n Cloud valide"
    read -p "Continuer quand même? (y/N): " continue_anyway
    if [[ ! "$continue_anyway" =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

read -p "🔑 Clé API n8n (optionnel, appuyez sur Entrée pour ignorer): " api_key

# Update .env.local
print_status "Mise à jour du fichier .env.local..."

update_env_file "N8N_WEBHOOK_URL" "$webhook_url"
update_env_file "NEXT_PUBLIC_N8N_WEBHOOK_URL" "$webhook_url"

if [ -n "$api_key" ]; then
    update_env_file "N8N_API_KEY" "$api_key"
    print_success "Clé API configurée"
fi

print_success "Variables d'environnement mises à jour"

# Test the configuration
echo ""
print_status "Test de la configuration..."

# Test connectivity
if curl -s --connect-timeout 5 --max-time 10 "$webhook_url" > /dev/null 2>&1; then
    print_success "✅ URL accessible"
else
    print_warning "⚠️  URL non accessible - vérifiez que le workflow est activé"
fi

# Test webhook endpoint
echo ""
print_status "Test du webhook..."
TEST_PAYLOAD='{"message":"test","files":[],"timestamp":"2024-01-01T00:00:00.000Z","sessionId":"test-session"}'

RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d "$TEST_PAYLOAD" \
    "$webhook_url")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" = "200" ]; then
    print_success "✅ Webhook fonctionne correctement"
    echo "Réponse: $RESPONSE_BODY"
elif [ "$HTTP_CODE" = "404" ]; then
    print_error "❌ Webhook non trouvé - vérifiez l'URL"
elif [ "$HTTP_CODE" = "000" ]; then
    print_error "❌ Connexion échouée - vérifiez que n8n Cloud est accessible"
else
    print_warning "⚠️  Réponse inattendue: $HTTP_CODE"
    echo "Réponse: $RESPONSE_BODY"
fi

# Create development guide
echo ""
print_status "Création du guide de développement..."

cat > docs/N8N_CLOUD_QUICK_START.md << 'EOF'
# Guide Rapide n8n Cloud

## Configuration Actuelle

- **URL Webhook**: `WEBHOOK_URL_PLACEHOLDER`
- **Mode**: Développement avec n8n Cloud
- **Status**: Configuré

## Utilisation

1. **Démarrer le serveur de développement**:
   ```bash
   npm run dev
   ```

2. **Tester l'AI Chat**:
   - Ouvrir: http://localhost:3000/ai-chat
   - Envoyer un message de test
   - Vérifier la réponse AI

3. **Monitoring**:
   - Dashboard n8n Cloud: https://cloud.n8n.io/
   - Logs d'exécution dans n8n Cloud

## Commandes Utiles

```bash
# Test de connexion
./scripts/test-n8n-connection.sh

# Test direct du webhook
curl -X POST WEBHOOK_URL_PLACEHOLDER \
  -H "Content-Type: application/json" \
  -d '{"message":"test","files":[],"sessionId":"test"}'
```

## Troubleshooting

- **Erreur 404**: Vérifiez que le workflow est activé
- **Erreur de connexion**: Vérifiez l'URL du webhook
- **Timeout**: Vérifiez la complexité du workflow

## Support

- Documentation: https://docs.n8n.io/
- n8n Cloud: https://cloud.n8n.io/
EOF

# Replace placeholder with actual URL
sed -i.bak "s|WEBHOOK_URL_PLACEHOLDER|$webhook_url|g" docs/N8N_CLOUD_QUICK_START.md
rm docs/N8N_CLOUD_QUICK_START.md.bak 2>/dev/null

print_success "Guide de développement créé: docs/N8N_CLOUD_QUICK_START.md"

# Final instructions
echo ""
print_success "🎉 Configuration n8n Cloud terminée!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Vérifiez que votre workflow n8n Cloud est activé"
echo "2. Démarrez le serveur: npm run dev"
echo "3. Testez l'AI Chat: http://localhost:3000/ai-chat"
echo "4. Consultez les logs: https://cloud.n8n.io/"
echo ""
echo "📚 Documentation:"
echo "- Guide complet: docs/N8N_CLOUD_DEVELOPMENT_SETUP.md"
echo "- Guide rapide: docs/N8N_CLOUD_QUICK_START.md"
echo ""
print_status "Configuration terminée avec succès! 🚀" 