# 🔧 Configuration n8n - Limitless Health

## 📋 Vue d'ensemble

L'application Limitless Health utilise une URL n8n unique pour tous les environnements pour simplifier la configuration et assurer la cohérence.

## 🌍 URL n8n Unique

### URL Principale

- **URL** : `https://jdvot57.app.n8n.cloud/webhook/chat`
- **Usage** : Tous les environnements (dev, staging, production)
- **Configuration** : Automatique pour tous les environnements

## 🔧 Configuration

### Priorité de Configuration

1. **Variable d'environnement explicite** : `N8N_WEBHOOK_URL`
2. **URL par défaut** : `https://jdvot57.app.n8n.cloud/webhook/chat`

```typescript
// src/app/api/n8n/chat/route.ts
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL || 'https://jdvot57.app.n8n.cloud/webhook/chat';
```

## 📁 Configuration des Fichiers

### Tous les Environnements

```typescript
api: {
  n8nWebhookUrl: 'https://jdvot57.app.n8n.cloud/webhook/chat',
}
```

## 🚀 Utilisation

### Tous les Environnements

```bash
# L'application utilise automatiquement la même URL n8n
npm run dev
NODE_ENV=staging npm run dev
NODE_ENV=production npm run dev
```

## 🔍 Override Manuel

Pour utiliser une URL différente, utilisez la variable d'environnement :

```bash
# Utiliser une URL personnalisée
N8N_WEBHOOK_URL=https://custom-n8n-instance.com/webhook/chat npm run dev
```

## 🧪 Tests

### Test de Connectivité

```bash
# Test de l'URL n8n
./scripts/test-n8n-connection.sh

# Test manuel avec curl
curl -X POST https://jdvot57.app.n8n.cloud/webhook/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","sessionId":"test"}'
```

## 🎯 Avantages

✅ **Configuration simple** : Une seule URL à gérer  
✅ **Cohérence** : Même comportement sur tous les environnements  
✅ **Maintenance facile** : Pas de duplication de configuration  
✅ **Flexibilité** : Possibilité d'override avec les variables d'environnement

## 🔧 Workflow n8n Requis

Un seul workflow n8n est nécessaire :

- **URL** : `https://jdvot57.app.n8n.cloud/webhook/chat`
- **Méthode** : POST
- **Usage** : Tous les environnements

### Import du Workflow

```bash
# Importer le workflow dans n8n Cloud
# 1. Ouvrir https://cloud.n8n.io/
# 2. Créer le workflow avec l'URL /chat
# 3. Activer le workflow
```

## 🚨 Troubleshooting

### Problème : URL incorrecte utilisée

**Solution** : Vérifier la variable `N8N_WEBHOOK_URL`

```bash
echo $N8N_WEBHOOK_URL
```

### Problème : Workflow n8n non trouvé

**Solution** : Vérifier que le workflow est activé dans n8n Cloud

### Problème : Erreur de configuration

**Solution** : Utiliser l'override manuel

```bash
N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook/chat npm run dev
```
