# 🧪 Guide n8n Cloud Test - Limitless Health

## 🚀 Configuration pour n8n Cloud Test

Ce guide explique comment utiliser l'endpoint de test n8n Cloud pour le développement.

### URL de Test Configurée

- **URL**: `https://jdvot57.app.n8n.cloud/webhook-test/chat`
- **Environnement**: Développement
- **Usage**: Tests et développement

## 📋 Configuration Rapide

### 1. Variables d'Environnement

Créez ou mettez à jour votre fichier `.env.local` :

```bash
# Configuration N8N - TEST CLOUD
N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook-test/chat
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook-test/chat

# Configuration de l'application
NEXT_PUBLIC_APP_NAME=Limitless Health
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 2. Démarrer l'Application

```bash
# Copier la configuration
cp env.local.example .env.local

# Démarrer l'application
npm run dev
```

### 3. Tester la Configuration

```bash
# Test de n8n Cloud Test
./scripts/test-n8n-local.sh
```

## 🔗 URLs d'Accès

- **Application Next.js**: http://localhost:3000
- **AI Chat**: http://localhost:3000/ai-chat
- **n8n Cloud**: https://cloud.n8n.io/
- **n8n Cloud Test**: https://jdvot57.app.n8n.cloud/webhook-test/chat

## 🧪 Tests et Validation

### Test de Connectivité

```bash
# Test de base n8n Cloud
curl -I https://jdvot57.app.n8n.cloud

# Test du webhook de test
curl -X POST https://jdvot57.app.n8n.cloud/webhook-test/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","files":[],"sessionId":"test"}'

# Test de l'API Next.js
curl -X POST http://localhost:3000/api/n8n/chat \
  -F "message=test"
```

### Script de Test Automatisé

```bash
# Test complet
./scripts/test-n8n-local.sh
```

## 🔧 Configuration dans le Code

### API Route (`src/app/api/n8n/chat/route.ts`)

```typescript
// Configuration n8n selon l'environnement
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://jdvot57.app.n8n.cloud/webhook/chat'
    : 'https://jdvot57.app.n8n.cloud/webhook-test/chat');
```

### Configuration Locale (`config/environments/local.ts`)

```typescript
export const localConfig = {
  api: {
    n8nWebhookUrl: 'https://jdvot57.app.n8n.cloud/webhook-test/chat',
  },
  // ...
};
```

## 🎯 Avantages de n8n Cloud Test

✅ **Environnement de test dédié** : Séparé de la production  
✅ **Tests sans impact** : Pas de risque sur les données réelles  
✅ **Développement rapide** : Pas d'installation locale  
✅ **Collaboration** : Partage facile avec l'équipe  
✅ **Monitoring** : Logs et métriques dans n8n Cloud  
✅ **Stabilité** : Infrastructure gérée par n8n

## 🔍 Troubleshooting

### Problèmes Courants

#### 1. Webhook 404

```bash
# Vérifier l'URL
curl -I https://jdvot57.app.n8n.cloud/webhook-test/chat

# Vérifier les variables d'environnement
grep N8N_WEBHOOK_URL .env.local
```

#### 2. Erreur de connexion

- Vérifier la connexion internet
- Vérifier l'URL n8n Cloud
- Vérifier que le workflow de test est actif

#### 3. Réponse vide

- Vérifier la configuration du workflow dans n8n Cloud
- Vérifier les logs d'exécution dans n8n Cloud
- Vérifier les credentials Gemini

### Debugging

```bash
# Test de connectivité
curl -v https://jdvot57.app.n8n.cloud/webhook-test/chat

# Test avec payload complet
curl -X POST https://jdvot57.app.n8n.cloud/webhook-test/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Test complet",
    "files": [],
    "timestamp": "2024-01-01T00:00:00.000Z",
    "sessionId": "test-debug"
  }'
```

## 📊 Monitoring

### n8n Cloud Dashboard

1. **Accéder à n8n Cloud**: https://cloud.n8n.io/
2. **Ouvrir le workflow de test**
3. **Vérifier les exécutions récentes**
4. **Consulter les logs d'erreur**

### Logs Application

```bash
# Logs Next.js
npm run dev

# Logs avec plus de détails
DEBUG=* npm run dev
```

## 🔄 Migration entre Environnements

### Passer de Test à Production

```bash
# Modifier .env.local
N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook/chat
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook/chat

# Redémarrer l'application
npm run dev
```

### Passer de Production à Test

```bash
# Modifier .env.local
N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook-test/chat
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook-test/chat

# Redémarrer l'application
npm run dev
```

## 📝 Notes Importantes

- **Endpoint de test** : `/webhook-test/chat` (différent de `/webhook/chat`)
- **Workflow séparé** : Le workflow de test est distinct du workflow de production
- **Données de test** : Les données de test ne sont pas partagées avec la production
- **Performance** : Même infrastructure que n8n Cloud, performance optimale
- **Sécurité** : Accès sécurisé via n8n Cloud

## 🆘 Support

En cas de problème :

1. **Vérifier la connectivité** : `./scripts/test-n8n-local.sh`
2. **Consulter n8n Cloud** : https://cloud.n8n.io/
3. **Vérifier les logs** : Logs d'exécution dans n8n Cloud
4. **Tester manuellement** : Utiliser curl pour tester le webhook
5. **Vérifier la configuration** : Variables d'environnement et workflow

## 🎉 Avantages pour le Développement

- **Tests isolés** : Environnement de test dédié
- **Développement rapide** : Pas de configuration locale complexe
- **Collaboration** : Partage facile des workflows de test
- **Monitoring** : Logs et métriques intégrés
- **Stabilité** : Infrastructure gérée professionnellement
