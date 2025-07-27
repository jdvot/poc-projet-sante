# ⚙️ Configuration des Environnements - Limitless Health

Ce guide détaille la configuration des différents environnements pour l'application Limitless Health.

## 📋 Vue d'ensemble

L'application supporte trois environnements principaux :

- **Local** : Développement local avec hot reload
- **Staging** : Environnement de test et validation
- **Production** : Environnement de production avec optimisations

## 🏠 Environnement Local

### Configuration rapide

```bash
# Configuration automatique
npm run setup:local

# Démarrage avec Docker
npm run docker:local

# Ou démarrage manuel
npm run dev
```

### Services disponibles

```bash
# Application uniquement
./scripts/start-local.sh local app

# Avec base de données PostgreSQL
./scripts/start-local.sh local database

# Avec n8n pour les webhooks
./scripts/start-local.sh local n8n

# Tous les services
./scripts/start-local.sh local all
```

### URLs locales

- **Application** : http://localhost:3000
- **Health Check** : http://localhost:3000/api/health
- **Metrics** : http://localhost:3000/api/metrics
- **PostgreSQL** : localhost:5432
- **Redis** : localhost:6379
- **n8n** : http://localhost:5678 (admin/admin123)

## 🧪 Environnement Staging

### Configuration

```bash
# Configuration automatique
npm run setup:staging

# Déploiement
npm run deploy:staging
```

### Variables d'environnement

Créez un fichier `.env.staging` avec :

```env
NODE_ENV=staging
NEXT_PUBLIC_APP_URL=https://staging.limitless-health.com
NEXT_PUBLIC_API_URL=https://staging.limitless-health.com/api
NEXT_PUBLIC_FIREBASE_API_KEY=your-staging-api-key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-staging-project-id
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-staging-project.firebaseapp.com
```

## 🚀 Environnement Production

### Configuration

```bash
# Configuration automatique
npm run setup:production

# Démarrage avec Docker
npm run docker:production

# Déploiement Firebase
npm run firebase:deploy
```

### Services disponibles

```bash
# Application uniquement
./scripts/start-production.sh production app

# Avec Nginx
./scripts/start-production.sh production full

# Avec monitoring
./scripts/start-production.sh production monitoring

# Tous les services
./scripts/start-production.sh production all
```

### URLs de production

- **Application** : https://limitless-health.com
- **Health Check** : https://limitless-health.com/api/health
- **Metrics** : https://limitless-health.com/api/metrics
- **Prometheus** : http://localhost:9090
- **Grafana** : http://localhost:3001 (admin/admin123)

## 🔧 Configuration des Variables d'Environnement

### Fichier d'exemple

Le fichier `env.example` contient toutes les variables disponibles :

```env
# Application
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=Limitless Health
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/chat

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Sentry
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-org
SENTRY_PROJECT=limitless-health

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-vercel-analytics-id

# Feature Flags
NEXT_PUBLIC_ENABLE_AI_DOCTOR=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Development
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_ENABLE_DEBUG=true
```

### Configuration automatique

```bash
# Configuration locale
./scripts/setup-env.sh local

# Configuration staging
./scripts/setup-env.sh staging

# Configuration production
./scripts/setup-env.sh production
```

## 🐳 Configuration Docker

### Fichiers Docker Compose

- **`docker-compose.local.yml`** : Environnement local avec services optionnels
- **`docker-compose.production.yml`** : Production avec monitoring
- **`docker-compose.yml`** : Configuration par défaut

### Commandes Docker

```bash
# Build
npm run docker:build

# Développement
npm run docker:dev

# Production
npm run docker:prod

# Démarrage local complet
npm run docker:local

# Démarrage production complet
npm run docker:production
```

## 📊 Monitoring et Observabilité

### Métriques Prometheus

L'application expose des métriques sur `/api/metrics` :

- `limitless_health_requests_total` : Nombre total de requêtes
- `limitless_health_errors_total` : Nombre total d'erreurs
- `limitless_health_uptime_seconds` : Temps de fonctionnement
- `limitless_health_memory_usage_bytes` : Utilisation mémoire

### Health Check

Endpoint de santé sur `/api/health` :

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production",
  "version": "1.0.0"
}
```

## 🔒 Sécurité

### Headers de sécurité

L'application inclut automatiquement :

- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Content-Security-Policy

### Rate Limiting

Nginx configure le rate limiting :

- API : 10 requêtes/seconde
- Auth : 1 requête/seconde

### SSL/TLS

En production, l'application utilise HTTPS avec :

- Certificats auto-signés pour les tests
- Support pour Let's Encrypt
- Redirection HTTP vers HTTPS

## 🛠️ Scripts de Configuration

### Scripts disponibles

- `scripts/setup-env.sh` : Configuration des variables d'environnement
- `scripts/start-local.sh` : Démarrage environnement local
- `scripts/start-production.sh` : Démarrage environnement production
- `scripts/deploy.sh` : Déploiement automatisé

### Utilisation

```bash
# Aide
./scripts/setup-env.sh --help
./scripts/start-local.sh --help
./scripts/start-production.sh --help

# Configuration
./scripts/setup-env.sh local
./scripts/setup-env.sh staging
./scripts/setup-env.sh production

# Démarrage
./scripts/start-local.sh local app
./scripts/start-production.sh production full
```

## 🔄 Gestion des Environnements

### Détermination automatique

L'application détermine automatiquement l'environnement selon :

1. Variable `NEXT_PUBLIC_ENVIRONMENT`
2. Variable `VERCEL_ENV` (si sur Vercel)
3. Variable `NODE_ENV`

### Configuration TypeScript

```typescript
import { config, isProduction, isLocal, isStaging } from '@/config';

// Utilisation
if (isProduction()) {
  // Code spécifique à la production
}

if (isLocal()) {
  // Code spécifique au développement local
}

// Accès aux configurations
const apiUrl = config.api.baseUrl;
const firebaseConfig = config.firebase;
```

## 🚨 Dépannage

### Problèmes courants

1. **Variables d'environnement manquantes**

   ```bash
   ./scripts/setup-env.sh local
   ```

2. **Ports déjà utilisés**

   ```bash
   # Vérifier les ports
   netstat -tulpn | grep :3000

   # Arrêter les services
   docker-compose down
   ```

3. **Certificats SSL manquants**

   ```bash
   # Génération automatique
   ./scripts/start-production.sh production full
   ```

4. **Services non démarrés**

   ```bash
   # Vérifier les logs
   docker-compose logs -f app

   # Redémarrer
   docker-compose restart app
   ```

### Commandes de diagnostic

```bash
# Vérification des services
docker ps -a
docker-compose ps

# Logs des services
docker-compose logs -f
docker-compose logs -f app

# Vérification de la santé
curl http://localhost:3000/api/health
curl http://localhost:3000/api/metrics

# Vérification des variables d'environnement
docker-compose exec app env | grep NEXT_PUBLIC
```

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Docker](https://docs.docker.com/)
- [Documentation Firebase](https://firebase.google.com/docs)
- [Documentation Prometheus](https://prometheus.io/docs/)

## 🤝 Support

Pour toute question :

1. Consultez les logs de démarrage
2. Vérifiez la configuration des variables d'environnement
3. Testez les endpoints de santé
4. Ouvrez une issue sur GitHub
