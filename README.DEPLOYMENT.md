# 🚀 Déploiement - Limitless Health

Ce document décrit les différentes méthodes de déploiement disponibles pour l'application Limitless Health.

## 📋 Vue d'ensemble

L'application supporte plusieurs méthodes de déploiement :

- **Firebase Hosting** : Déploiement statique optimisé
- **Docker** : Conteneurisation pour tous les environnements
- **GitHub Actions** : CI/CD automatisé

## 🔥 Firebase Hosting

### Configuration rapide

```bash
# Installation Firebase CLI
npm install -g firebase-tools

# Connexion
firebase login

# Initialisation
firebase init hosting

# Build et déploiement
npm run build:firebase
npm run firebase:deploy
```

### Configuration automatique

Le projet inclut déjà :

- `firebase.json` : Configuration Firebase
- `.firebaserc` : Configuration du projet
- Workflow GitHub Actions pour déploiement automatique

## 🐳 Docker

### Build et exécution

```bash
# Build production
npm run docker:build

# Exécution
npm run docker:run

# Développement
npm run docker:dev

# Production avec Nginx
npm run docker:prod
```

### Docker Compose

```bash
# Développement
docker-compose --profile dev up -d

# Production
docker-compose up -d

# Production avec Nginx
docker-compose --profile production up -d
```

## 🔄 CI/CD GitHub Actions

### Workflows disponibles

1. **CI** (`.github/workflows/ci.yml`)
   - Tests unitaires et E2E
   - Linting et formatage
   - Build de validation
   - Tests Docker

2. **Deploy** (`.github/workflows/deploy.yml`)
   - Déploiement Firebase automatique
   - Push Docker Hub
   - Déploiement staging

### Secrets requis

Configurez ces secrets dans votre repository GitHub :

```bash
FIREBASE_SERVICE_ACCOUNT=# JSON de la clé de service Firebase
DOCKER_USERNAME=# Nom d'utilisateur Docker Hub
DOCKER_PASSWORD=# Mot de passe Docker Hub
```

## 🛠️ Scripts de déploiement

### Déploiement automatisé

```bash
# Production
npm run deploy

# Staging
npm run deploy:staging

# Manuel
./scripts/deploy.sh [environment] [tag]
```

### Scripts disponibles

- `npm run build:firebase` : Build pour Firebase
- `npm run docker:build` : Build Docker
- `npm run docker:dev` : Docker Compose dev
- `npm run docker:prod` : Docker Compose production
- `npm run firebase:deploy` : Déploiement Firebase
- `npm run firebase:serve` : Serveur local Firebase

## 🔧 Configuration des environnements

### Variables d'environnement

Créez les fichiers suivants selon l'environnement :

```bash
.env.local          # Développement local
.env.production     # Production
.env.staging        # Staging
```

### Configuration Next.js

- `next.config.ts` : Configuration Docker (standalone)
- `next.config.firebase.ts` : Configuration Firebase (export)

## 📊 Monitoring

### Health Check

```bash
# Vérification de santé
curl http://localhost:3000/api/health

# Réponse attendue
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production",
  "version": "1.0.0"
}
```

### Logs

```bash
# Docker
docker logs <container-id>

# Docker Compose
docker-compose logs -f app

# Firebase
firebase hosting:channel:list
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

## 🚨 Dépannage

### Problèmes courants

1. **Build échoue**

   ```bash
   npm ci
   npm run build:firebase
   ```

2. **Docker ne démarre pas**

   ```bash
   docker system prune -a
   docker build --no-cache -t limitless-health .
   ```

3. **Firebase déploiement échoue**
   ```bash
   firebase login --reauth
   firebase use <project-id>
   ```

### Commandes de diagnostic

```bash
# Vérification des ports
netstat -tulpn | grep :3000

# Vérification Docker
docker ps -a
docker images

# Vérification Firebase
firebase projects:list
firebase hosting:channel:list
```

## 📚 Ressources

- [Documentation Firebase](https://firebase.google.com/docs/hosting)
- [Documentation Docker](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## 🤝 Support

Pour toute question :

1. Consultez les logs de déploiement
2. Vérifiez la documentation Firebase
3. Ouvrez une issue sur GitHub
