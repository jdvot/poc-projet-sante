# Configuration n8n Cloud pour le Développement

## 🚀 Utilisation de n8n Cloud en Développement

Ce guide vous explique comment configurer et utiliser n8n Cloud pour le développement local de l'AI Chat.

### 📋 Prérequis

1. **Compte n8n Cloud** : [https://cloud.n8n.io/](https://cloud.n8n.io/)
2. **Workflow n8n configuré** avec webhook
3. **Variables d'environnement** configurées

### 🔧 Configuration Étape par Étape

#### 1. Configuration des Variables d'Environnement

Créez ou mettez à jour votre fichier `.env.local` :

```bash
# Configuration n8n Cloud
N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook/chat
N8N_API_KEY=votre_clé_api_n8n_ici

# Mode développement avec n8n Cloud
NODE_ENV=development
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook/chat

# Autres configurations...
NEXT_PUBLIC_APP_NAME=Limitless Health
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

#### 2. Configuration du Workflow n8n Cloud

1. **Connectez-vous à n8n Cloud** : [https://cloud.n8n.io/](https://cloud.n8n.io/)

2. **Créez un nouveau workflow** ou importez le workflow existant :

   ```bash
   # Import du workflow depuis le fichier JSON
   # Ouvrez n8n Cloud et importez : n8n-workflow-ai-chat.json
   ```

3. **Configurez le nœud Webhook** :
   - Méthode : `POST`
   - Path : `/chat`
   - Authentication : `None` (ou API Key si nécessaire)

4. **Configurez l'intégration AI** :
   - Ajoutez un nœud pour l'API Gemini Pro
   - Configurez les prompts pour les consultations médicales
   - Ajoutez le traitement des fichiers si nécessaire

5. **Activez le workflow** :
   - Cliquez sur "Activate" dans n8n Cloud
   - Copiez l'URL du webhook générée

#### 3. Test de la Configuration

```bash
# Test de la connexion n8n Cloud
./scripts/test-n8n-connection.sh

# Démarrage du serveur de développement
npm run dev
```

### 🎯 Utilisation en Développement

#### Avantages de n8n Cloud en Dev

✅ **Réponses AI réelles** : Pas de simulation  
✅ **Pas d'installation locale** : Tout dans le cloud  
✅ **Performance optimale** : Infrastructure n8n gérée  
✅ **Collaboration** : Partage facile des workflows  
✅ **Monitoring** : Logs et métriques intégrés

#### Workflow de Développement

1. **Développement local** :

   ```bash
   npm run dev
   ```

2. **Test des fonctionnalités** :
   - Ouvrez `http://localhost:3000/ai-chat`
   - Envoyez des messages de test
   - Vérifiez les réponses AI

3. **Debugging** :
   - Consultez les logs n8n Cloud
   - Vérifiez les métriques de performance
   - Testez différents types de messages

### 🔍 Monitoring et Debugging

#### Logs n8n Cloud

1. **Accédez aux logs** :
   - Connectez-vous à n8n Cloud
   - Allez dans "Executions" pour voir l'historique
   - Cliquez sur une exécution pour voir les détails

2. **Métriques importantes** :
   - Temps de réponse
   - Taux de succès
   - Erreurs et exceptions

#### Debugging Local

```bash
# Test direct du webhook
curl -X POST https://jdvot57.app.n8n.cloud/webhook/chat \
  -H "Content-Type: application/json" \
  -H "X-Session-Id: test-session" \
  -d '{
    "message": "Bonjour, j\'ai mal à la tête",
    "files": [],
    "timestamp": "2024-01-01T00:00:00.000Z",
    "sessionId": "test-session"
  }'
```

### 🛠️ Configuration Avancée

#### Sécurité

```bash
# Ajout d'une clé API pour la sécurité
N8N_API_KEY=votre_clé_api_secrète

# Dans le workflow n8n, configurez l'authentification
# Webhook → Authentication → API Key
```

#### Optimisation des Performances

1. **Cache des réponses** :
   - Ajoutez un nœud de cache dans n8n
   - Configurez la durée de cache appropriée

2. **Rate Limiting** :
   - Configurez les limites de requêtes
   - Ajoutez des délais entre les requêtes

3. **Fallback** :
   - Ajoutez des réponses de secours
   - Gestion des erreurs AI

### 🚨 Troubleshooting

#### Problèmes Courants

1. **"Webhook not found"** :
   - Vérifiez l'URL du webhook
   - Assurez-vous que le workflow est activé
   - Vérifiez les permissions

2. **"Authentication failed"** :
   - Vérifiez la clé API
   - Configurez l'authentification dans n8n

3. **"Timeout"** :
   - Vérifiez la complexité du workflow
   - Optimisez les requêtes AI
   - Augmentez les timeouts si nécessaire

#### Commandes de Debug

```bash
# Test de connectivité
curl -I https://jdvot57.app.n8n.cloud/webhook/chat

# Test avec authentification
curl -X POST https://jdvot57.app.n8n.cloud/webhook/chat \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'

# Vérification des variables d'environnement
echo $N8N_WEBHOOK_URL
echo $N8N_API_KEY
```

### 📊 Métriques et Monitoring

#### Métriques à Surveiller

- **Temps de réponse** : < 5 secondes
- **Taux de succès** : > 95%
- **Erreurs** : < 1%
- **Utilisation** : Quotas n8n Cloud

#### Alertes Recommandées

- Temps de réponse > 10 secondes
- Taux d'erreur > 5%
- Quota n8n Cloud atteint

### 🔗 Ressources Utiles

- [Documentation n8n Cloud](https://docs.n8n.io/hosting/)
- [Guide des Webhooks](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.webhook/)
- [API n8n Cloud](https://docs.n8n.io/api/)
- [Pricing n8n Cloud](https://cloud.n8n.io/pricing)

### 📝 Notes Importantes

- **Coûts** : n8n Cloud a des coûts selon l'utilisation
- **Limites** : Respectez les quotas de votre plan
- **Sécurité** : Gardez vos clés API secrètes
- **Backup** : Exportez régulièrement vos workflows
- **Monitoring** : Surveillez l'utilisation et les coûts
