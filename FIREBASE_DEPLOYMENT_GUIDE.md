# 🚀 Guide de Déploiement Firebase - Limitless Health

## ✅ Configuration Finalisée

Votre projet Limitless Health est maintenant entièrement configuré pour le déploiement Firebase ! Voici ce qui a été mis en place :

### 📁 Fichiers de Configuration Créés/Modifiés

- ✅ `firebase.json` - Configuration Firebase optimisée
- ✅ `.firebaserc` - Projet Firebase par défaut
- ✅ `firestore.rules` - Règles de sécurité Firestore
- ✅ `firestore.indexes.json` - Index Firestore optimisés
- ✅ `next.config.firebase.ts` - Configuration Next.js pour export statique
- ✅ `package.json` - Scripts de déploiement ajoutés
- ✅ `scripts/deploy.sh` - Script de déploiement automatisé
- ✅ `scripts/setup-firebase.sh` - Script de configuration Firebase
- ✅ `.github/workflows/firebase-deploy.yml` - CI/CD GitHub Actions
- ✅ `README.FIREBASE.md` - Documentation complète

## 🚀 Déploiement Rapide

### 1. Configuration Initiale (Première fois seulement)

```bash
# Installation Firebase CLI
npm install -g firebase-tools

# Connexion à Firebase
firebase login

# Configuration automatique
./scripts/setup-firebase.sh
```

### 2. Déploiement Manuel

```bash
# Build et déploiement complet
npm run firebase:deploy

# Ou étape par étape
npm run build:firebase
firebase deploy --only hosting
```

### 3. Déploiement Automatisé

```bash
# Utiliser le script de déploiement
./scripts/deploy.sh production

# Ou via npm
npm run deploy:production
```

## 🔧 Scripts Disponibles

### Scripts NPM

```bash
# Build
npm run build:firebase          # Build pour Firebase
npm run build:static           # Build statique

# Déploiement
npm run firebase:deploy        # Build + déploiement hosting
npm run firebase:deploy:all    # Build + déploiement complet
npm run firebase:serve         # Test local
npm run firebase:emulators    # Emulators Firebase

# Services spécifiques
npm run firebase:rules:deploy  # Déployer règles Firestore
npm run firebase:indexes:deploy # Déployer index Firestore
npm run firebase:functions:deploy # Déployer fonctions

# Déploiement automatisé
npm run deploy:production      # Déploiement production
npm run deploy:staging         # Déploiement staging
```

### Scripts Shell

```bash
# Configuration
./scripts/setup-firebase.sh [project-id] [environment]

# Déploiement
./scripts/deploy.sh [environment] [tag]
```

## 🌐 URLs de Déploiement

Une fois déployé, votre application sera accessible sur :

- **Production** : `https://limitless-health.web.app`
- **Alternative** : `https://limitless-health.firebaseapp.com`
- **Console Firebase** : `https://console.firebase.google.com/project/limitless-health`

## 🔒 Sécurité

### Règles Firestore Configurées

- ✅ Authentification requise pour toutes les opérations
- ✅ Accès utilisateur limité à ses propres données
- ✅ Accès admin pour la surveillance
- ✅ Protection contre les accès non autorisés

### Headers de Sécurité

- ✅ `X-Frame-Options: DENY`
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `Referrer-Policy: origin-when-cross-origin`

## 📊 Performance

### Optimisations Incluses

- ✅ **Cache des assets** : 1 an pour JS/CSS/images
- ✅ **Compression** : Gzip automatique
- ✅ **CDN global** : Distribution mondiale
- ✅ **HTTPS** : Certificat SSL automatique
- ✅ **Export statique** : Pages pré-générées

### Métriques

- ✅ **Core Web Vitals** : Surveillés automatiquement
- ✅ **Health checks** : `/api/health` et `/api/metrics`
- ✅ **Bundle Analysis** : Optimisation des tailles

## 🔄 CI/CD avec GitHub Actions

### Configuration Requise

Ajoutez ces secrets dans votre repository GitHub :

1. **FIREBASE_SERVICE_ACCOUNT** : Clé de service Firebase (JSON)
2. **DOCKER_USERNAME** : Nom d'utilisateur Docker Hub (optionnel)
3. **DOCKER_PASSWORD** : Mot de passe Docker Hub (optionnel)

### Workflows Automatiques

- **Push sur `main`** : Déploiement automatique en production
- **Push sur `develop`** : Déploiement en staging
- **Pull Requests** : Tests automatiques

## 🧪 Tests et Validation

### Tests Locaux

```bash
# Test du build
npm run build:firebase

# Test avec emulators
npm run firebase:emulators

# Test de l'application
npm run firebase:serve

# Tests automatisés
npm run test
npm run cypress:run
```

### Validation du Déploiement

```bash
# Health check
curl https://limitless-health.web.app/api/health

# Métriques
curl https://limitless-health.web.app/api/metrics
```

## 🛠️ Dépannage

### Problèmes Courants

#### 1. Build Échoue

```bash
# Nettoyer le cache
rm -rf .next out node_modules/.cache
npm ci
npm run build:firebase
```

#### 2. Déploiement Échoue

```bash
# Vérifier la connexion
firebase login
firebase projects:list
firebase use --add
```

#### 3. Erreurs de Règles Firestore

```bash
# Tester les règles localement
firebase emulators:start --only firestore
firebase firestore:rules:validate
```

### Commandes Utiles

```bash
# Logs Firebase
firebase hosting:channel:list
firebase functions:log
firebase firestore:indexes

# Nettoyage
docker system prune -a
firebase emulators:export ./emulator-data
```

## 📚 Ressources

### Documentation

- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

### Outils

- [Firebase Console](https://console.firebase.google.com)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [GitHub Actions](https://docs.github.com/en/actions)

## 🎯 Checklist de Déploiement

### Avant le Déploiement

- [ ] Tests unitaires passent
- [ ] Tests E2E passent
- [ ] Linting OK
- [ ] Build Firebase réussi
- [ ] Variables d'environnement configurées
- [ ] Règles Firestore testées

### Après le Déploiement

- [ ] Application accessible
- [ ] Authentification fonctionne
- [ ] Base de données accessible
- [ ] Performance OK
- [ ] Monitoring configuré
- [ ] Backup configuré

## 🚀 Prochaines Étapes

1. **Déployer en production** : `npm run firebase:deploy`
2. **Configurer le monitoring** : Sentry, Analytics
3. **Mettre en place les backups** : Firestore exports
4. **Optimiser les performances** : Bundle analysis
5. **Configurer les domaines personnalisés** : Firebase Hosting

---

## 🎉 Félicitations !

Votre application Limitless Health est maintenant prête pour le déploiement Firebase !

**URL de production** : `https://limitless-health.web.app`

**Console Firebase** : `https://console.firebase.google.com/project/limitless-health`

---

_Dernière mise à jour : $(date)_
