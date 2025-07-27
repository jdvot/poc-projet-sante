# 🐳 Guide n8n Local avec Docker - Limitless Health

## 🚀 Démarrage Rapide

### 1. Configuration Initiale

```bash
# Copier le fichier d'environnement local
cp env.local.example .env.local

# Démarrer l'environnement complet (app + n8n)
./scripts/start-local.sh full
```

### 2. Accès aux Services

- **Application Next.js**: http://localhost:3000
- **AI Chat**: http://localhost:3000/ai-chat
- **n8n**: http://localhost:5678
- **n8n Login**: admin / admin123

## 📋 Étapes Détaillées

### Étape 1: Démarrer l'Environnement

```bash
# Option 1: Environnement complet (recommandé)
./scripts/start-local.sh full

# Option 2: Services individuels
./scripts/start-local.sh app    # Application uniquement
./scripts/start-local.sh n8n    # n8n uniquement
```

### Étape 2: Configurer n8n

1. **Ouvrir n8n**: http://localhost:5678
2. **Se connecter**: admin / admin123
3. **Importer le workflow**:
   - Cliquer sur "Import from file"
   - Sélectionner `n8n-workflow-ai-chat.json`
   - Cliquer sur "Import"

### Étape 3: Activer le Workflow

1. **Ouvrir le workflow** importé
2. **Vérifier la configuration**:
   - Webhook URL: `http://localhost:5678/webhook/chat`
   - Méthode: POST
3. **Cliquer sur "Activate"** (bouton vert)

### Étape 4: Tester l'Intégration

```bash
# Test de n8n local
./scripts/test-n8n-local.sh

# Ou test manuel
curl -X POST http://localhost:5678/webhook/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Test local","files":[],"sessionId":"test"}'
```

## 🔧 Configuration des Variables d'Environnement

### Fichier `.env.local`

```bash
# Configuration N8N - LOCAL DOCKER
N8N_WEBHOOK_URL=http://localhost:5678/webhook/chat
NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook/chat

# Configuration de l'application
NEXT_PUBLIC_APP_NAME=Limitless Health
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🐳 Commandes Docker Utiles

### Gestion des Services

```bash
# Démarrer tous les services
docker-compose -f docker-compose.local.yml --profile n8n up -d

# Arrêter tous les services
docker-compose -f docker-compose.local.yml down

# Redémarrer un service
docker-compose -f docker-compose.local.yml restart n8n

# Voir les logs
docker-compose -f docker-compose.local.yml logs -f n8n
docker-compose -f docker-compose.local.yml logs -f app

# Statut des services
docker-compose -f docker-compose.local.yml ps
```

### Scripts de Gestion

```bash
# Scripts disponibles
./scripts/start-local.sh full      # Démarrer tout
./scripts/start-local.sh stop      # Arrêter tout
./scripts/start-local.sh restart   # Redémarrer tout
./scripts/start-local.sh logs      # Voir les logs
./scripts/start-local.sh status    # Statut des services
```

## 🧪 Tests et Debugging

### Test de Connectivité

```bash
# Test de n8n
curl -I http://localhost:5678

# Test du webhook
curl -X POST http://localhost:5678/webhook/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}'

# Test de l'API Next.js
curl -X POST http://localhost:3000/api/n8n/chat \
  -F "message=test"
```

### Script de Test Automatisé

```bash
# Test complet de n8n local
./scripts/test-n8n-local.sh
```

## 🔍 Troubleshooting

### Problèmes Courants

#### 1. n8n non accessible

```bash
# Vérifier si n8n est en cours d'exécution
docker-compose -f docker-compose.local.yml ps

# Redémarrer n8n
docker-compose -f docker-compose.local.yml restart n8n

# Voir les logs n8n
docker-compose -f docker-compose.local.yml logs n8n
```

#### 2. Webhook 404

- Vérifier que le workflow est importé dans n8n
- Vérifier que le workflow est activé
- Vérifier l'URL du webhook dans le workflow

#### 3. Erreur de connexion

```bash
# Vérifier les variables d'environnement
grep N8N_WEBHOOK_URL .env.local

# Redémarrer l'application
docker-compose -f docker-compose.local.yml restart app
```

#### 4. Workflow non fonctionnel

1. Ouvrir n8n: http://localhost:5678
2. Vérifier les logs d'exécution du workflow
3. Vérifier la configuration des nœuds
4. Tester chaque nœud individuellement

### Logs Utiles

```bash
# Logs n8n
docker-compose -f docker-compose.local.yml logs -f n8n

# Logs application
docker-compose -f docker-compose.local.yml logs -f app

# Logs avec timestamps
docker-compose -f docker-compose.local.yml logs -f --timestamps n8n
```

## 📊 Monitoring

### Dashboard n8n

- **URL**: http://localhost:5678
- **Login**: admin / admin123
- **Fonctionnalités**:
  - Visualisation des workflows
  - Logs d'exécution
  - Métriques de performance
  - Gestion des credentials

### Health Checks

```bash
# Health check application
curl http://localhost:3000/api/health

# Health check n8n
curl http://localhost:5678
```

## 🔄 Migration entre Local et Cloud

### Passer de Local à Cloud

```bash
# Modifier .env.local
N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook/chat
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook/chat

# Redémarrer l'application
./scripts/start-local.sh restart
```

### Passer de Cloud à Local

```bash
# Modifier .env.local
N8N_WEBHOOK_URL=http://localhost:5678/webhook/chat
NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook/chat

# Démarrer n8n local
./scripts/start-local.sh n8n

# Redémarrer l'application
./scripts/start-local.sh restart
```

## 🎯 Avantages de n8n Local

✅ **Développement isolé** : Pas d'impact sur la production  
✅ **Tests complets** : Workflow complet fonctionnel  
✅ **Debugging facile** : Logs détaillés et accès direct  
✅ **Pas de coûts** : Utilisation gratuite  
✅ **Contrôle total** : Configuration personnalisée  
✅ **Développement hors ligne** : Fonctionne sans internet

## 📝 Notes Importantes

- **Données persistantes** : Les workflows et données n8n sont sauvegardés dans un volume Docker
- **Ports utilisés** : 3000 (app), 5678 (n8n)
- **Credentials** : admin / admin123 (configurables dans docker-compose.local.yml)
- **Workflow** : Utilise le même workflow que n8n Cloud
- **Performance** : Plus lent que n8n Cloud mais suffisant pour le développement

## 🆘 Support

En cas de problème :

1. **Vérifier les logs** : `./scripts/start-local.sh logs`
2. **Tester la connectivité** : `./scripts/test-n8n-local.sh`
3. **Redémarrer les services** : `./scripts/start-local.sh restart`
4. **Consulter la documentation** : Voir les autres guides n8n
