# 🚀 Guide de Déploiement - Limitless Health

Ce guide explique comment déployer l'application Limitless Health avec Firebase Hosting, Docker et GitHub Actions CI/CD.

## 📋 Prérequis

- Node.js 18+ et npm
- Docker et Docker Compose
- Compte Firebase
- Compte GitHub
- Compte Docker Hub (optionnel)

## 🔧 Configuration Firebase

### 1. Installation de Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Connexion à Firebase

```bash
firebase login
```

### 3. Initialisation du projet Firebase

```bash
firebase init hosting
```

Sélectionnez votre projet Firebase et configurez :

- Public directory: `out`
- Single-page app: `Yes`
- Overwrite index.html: `No`

## 🐳 Configuration Docker

### Build de l'image

```bash
# Build pour la production
docker build -t limitless-health .

# Build pour le développement
docker build -f Dockerfile.dev -t limitless-health:dev .
```

### Exécution avec Docker

```bash
# Production
docker run -p 3000:3000 limitless-health

# Développement
docker run -p 3000:3000 -v $(pwd):/app limitless-health:dev
```

### Exécution avec Docker Compose

```bash
# Production
docker-compose up -d

# Développement
docker-compose --profile dev up -d

# Production avec Nginx
docker-compose --profile production up -d
```

## 🔄 CI/CD avec GitHub Actions

### Configuration des Secrets

Ajoutez les secrets suivants dans votre repository GitHub :

1. **FIREBASE_SERVICE_ACCOUNT** : Clé de service Firebase (JSON)
2. **DOCKER_USERNAME** : Nom d'utilisateur Docker Hub
3. **DOCKER_PASSWORD** : Mot de passe Docker Hub

### Workflows disponibles

- **CI** (`ci.yml`) : Tests, linting, build
- **Deploy** (`deploy.yml`) : Déploiement automatique

### Déclenchement des déploiements

- **Branch `main`** : Déploiement automatique en production
- **Branch `develop`** : Déploiement en staging
- **Pull Requests** : Tests automatiques

## 🚀 Déploiement Manuel

### Firebase Hosting

```bash
# Build de l'application
npm run build

# Déploiement
npm run firebase:deploy

# Ou avec Firebase CLI
firebase deploy --only hosting
```

### Docker

```bash
# Build et push vers Docker Hub
docker build -t your-username/limitless-health .
docker push your-username/limitless-health

# Déploiement sur un serveur
docker pull your-username/limitless-health
docker run -d -p 3000:3000 your-username/limitless-health
```

## 🔍 Monitoring et Logs

### Health Check

L'application expose un endpoint de santé :

```bash
curl http://localhost:3000/api/health
```

### Logs Docker

```bash
# Logs de l'application
docker logs <container-id>

# Logs avec Docker Compose
docker-compose logs -f app
```

## 🔒 Sécurité

### Variables d'environnement

Créez un fichier `.env.production` pour la production :

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_FIREBASE_CONFIG=your-firebase-config
```

### Headers de sécurité

L'application inclut automatiquement :

- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Content-Security-Policy

## 📊 Performance

### Optimisations incluses

- Compression Gzip
- Cache des assets statiques
- Rate limiting sur les API
- Optimisation des images Next.js

### Monitoring

- Health checks automatiques
- Métriques de performance
- Logs structurés

## 🛠️ Dépannage

### Problèmes courants

1. **Build échoue** : Vérifiez les dépendances et la configuration TypeScript
2. **Déploiement Firebase échoue** : Vérifiez les permissions et la configuration
3. **Docker ne démarre pas** : Vérifiez les ports et les variables d'environnement

### Commandes utiles

```bash
# Nettoyage Docker
docker system prune -a

# Vérification des logs Firebase
firebase hosting:channel:list

# Test local de l'export statique
npm run build && npm run firebase:serve
```

## 📚 Ressources

- [Documentation Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Documentation Docker](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## 🤝 Support

Pour toute question ou problème, consultez :

1. Les logs de déploiement dans GitHub Actions
2. La documentation Firebase
3. Les issues du repository
