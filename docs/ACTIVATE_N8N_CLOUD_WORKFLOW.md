# 🚀 Activation du Workflow n8n Cloud

## 📋 Workflow Disponible

Vous avez déjà un workflow n8n Cloud complet dans `n8n-workflow-ai-chat.json` avec :

- ✅ **Webhook ID** : `7fcf1274-2e93-4611-88d4-ba8beef56f82`
- ✅ **LLM Chain** avec Gemini Pro
- ✅ **Validation des entrées**
- ✅ **Nœud de sortie** configuré

## 🔧 Étapes d'Activation

### 1. Accéder à n8n Cloud

1. **Connectez-vous** à [https://cloud.n8n.io/](https://cloud.n8n.io/)
2. **Ouvrez votre workspace**
3. **Vérifiez si le workflow existe déjà**

### 2. Importer le Workflow (si nécessaire)

Si le workflow n'existe pas dans n8n Cloud :

1. **Cliquez sur "Import from file"**
2. **Sélectionnez** `n8n-workflow-ai-chat.json`
3. **Importez le workflow**

### 3. Activer le Workflow

1. **Ouvrez le workflow** "My workflow (enhanced + llm response)"
2. **Cliquez sur "Activate"** (bouton vert)
3. **Vérifiez que le statut est "Active"**

### 4. Vérifier la Configuration

1. **Ouvrez le nœud "Webhook Trigger"**
2. **Vérifiez l'URL** : elle devrait être `https://jdvot57.app.n8n.cloud/webhook/chat`
3. **Vérifiez la méthode** : POST
4. **Vérifiez le path** : `/chat`

### 5. Configurer les Credentials (si nécessaire)

Le workflow utilise un nœud LLM Chain qui nécessite des credentials Gemini :

1. **Ouvrez le nœud "Basic LLM Chain"**
2. **Cliquez sur "Add Credential"**
3. **Sélectionnez "Google Gemini"**
4. **Ajoutez votre clé API Gemini**

## 🧪 Test de l'Activation

### Test 1: Vérification de l'URL

```bash
# Test de connectivité
curl -I https://jdvot57.app.n8n.cloud/webhook/chat
```

### Test 2: Test du Webhook

```bash
# Test avec payload simple
curl -X POST https://jdvot57.app.n8n.cloud/webhook/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Bonjour, comment allez-vous ?",
    "files": [],
    "sessionId": "test-activation"
  }'
```

### Test 3: Test avec le Script

```bash
# Utilisez le script de test
./scripts/test-n8n-fix.sh
```

## 🔍 Vérification des Logs

1. **Dans n8n Cloud**, allez dans "Executions"
2. **Cliquez sur la dernière exécution**
3. **Vérifiez que tous les nœuds s'exécutent correctement**

## 🚨 Problèmes Courants

### 1. Workflow Non Activé

- **Symptôme** : Erreur 404
- **Solution** : Activez le workflow dans n8n Cloud

### 2. Credentials Manquantes

- **Symptôme** : Erreur dans le nœud LLM Chain
- **Solution** : Configurez les credentials Gemini

### 3. URL Incorrecte

- **Symptôme** : Erreur de connexion
- **Solution** : Vérifiez l'URL du webhook dans le nœud

### 4. Workflow Non Importé

- **Symptôme** : Workflow introuvable
- **Solution** : Importez le fichier JSON

## 📊 Structure du Workflow

```
[Webhook Trigger] → [Validate Input] → [Prepare LLM Context] → [Basic LLM Chain] → [Format Response] → [Webhook Response]
```

### Détails des Nœuds

1. **Webhook Trigger** : Reçoit les requêtes POST
2. **Validate Input** : Valide le message et les fichiers
3. **Prepare LLM Context** : Prépare le contexte pour l'IA
4. **Basic LLM Chain** : Appelle Gemini Pro
5. **Format Response** : Formate la réponse
6. **Webhook Response** : Renvoie la réponse JSON

## ✅ Vérification du Succès

Une fois activé, vous devriez recevoir :

```json
{
  "response": "Bonjour ! Je suis votre assistant médical IA...",
  "sessionId": "test-activation",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "hasFiles": false,
  "fileCount": 0,
  "contentType": "text"
}
```

## 🎯 Prochaines Étapes

1. **Activez le workflow** dans n8n Cloud
2. **Testez avec le script** : `./scripts/test-n8n-fix.sh`
3. **Vérifiez l'AI Chat** dans votre application
4. **Configurez des prompts avancés** si nécessaire

## 📞 Support

Si vous avez des problèmes :

1. **Vérifiez les logs** dans n8n Cloud
2. **Testez avec le script de diagnostic** : `./scripts/diagnose-n8n-webhook.sh`
3. **Vérifiez la configuration** étape par étape
4. **Consultez la documentation** n8n

---

**Note** : Une fois ce workflow activé, votre AI Chat fonctionnera avec des réponses AI réelles de Gemini Pro ! 🚀
