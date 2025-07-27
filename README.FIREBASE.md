q<zarj, # 🚀 Guide de Déploiement Firebase - Limitless Health

Ce guide détaille la configuration et le déploiement de l'application Limitless Health sur Firebase Hosting.

## 📋 Prérequis

- Node.js 18+ et npm
- Compte Google avec accès à Firebase
- Projet Firebase créé dans la console

## 🔧 Configuration Initiale

### 1. Installation de Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Configuration Automatique

Utilisez notre script de configuration automatique :

```bash
# Configuration pour la production
./scripts/setup-firebase.sh

# Configuration pour un projet spécifique
./scripts/setup-firebase.sh your-project-id

# Configuration pour le développement local
./scripts/setup-firebase.sh your-project-id local
```

### 3. Configuration Manuelle

Si vous préférez configurer manuellement :

```bash
# Connexion à Firebase
firebase login

# Initialisation du projet
firebase init hosting
firebase init firestore
firebase init functions
```

## 🏗️ Structure du Projet Firebase

```
limitless-health/
├── firebase.json          # Configuration Firebase
├── .firebaserc           # Projet Firebase par défaut
├── firestore.rules       # Règles de sécurité Firestore
├── firestore.indexes.json # Index Firestore
├── functions/            # Cloud Functions (optionnel)
└── out/                 # Build statique (généré)
```

## 🚀 Scripts de Déploiement

### Scripts NPM Disponibles

```bash
# Build pour Firebase
npm run build:firebase

# Déploiement complet
npm run firebase:deploy

# Déploiement hosting seulement
npm run firebase:deploy:hosting

# Déploiement Firestore
npm run firebase:firestore:deploy

# Déploiement des règles
npm run firebase:rules:deploy

# Déploiement des index
npm run firebase:indexes:deploy

# Test local
npm run firebase:serve

# Emulators
npm run firebase:emulators
```

### Script de Déploiement Automatisé

```bash
# Déploiement production
./scripts/deploy.sh production

# Déploiement staging
./scripts/deploy.sh staging

# Déploiement avec tag Docker
./scripts/deploy.sh production v1.0.0
```

## 🔄 CI/CD avec GitHub Actions

### Configuration des Secrets

Ajoutez ces secrets dans votre repository GitHub :

1. **FIREBASE_SERVICE_ACCOUNT** : Clé de service Firebase (JSON)
2. **DOCKER_USERNAME** : Nom d'utilisateur Docker Hub (optionnel)
3. **DOCKER_PASSWORD** : Mot de passe Docker Hub (optionnel)

### Workflows Automatiques

- **Push sur `main`** : Déploiement automatique en production
- **Push sur `develop`** : Déploiement en staging
- **Pull Requests** : Tests automatiques

## 🔒 Sécurité

### Règles Firestore

Les règles Firestore sont configurées pour :

- ✅ Authentification requise pour toutes les opérations
- ✅ Accès utilisateur limité à ses propres données
- ✅ Accès admin pour la surveillance
- ✅ Protection contre les accès non autorisés

### Headers de Sécurité

L'application inclut automatiquement :

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`

## 📊 Performance

### Optimisations Incluses

- **Cache des assets** : 1 an pour JS/CSS/images
- **Compression** : Gzip automatique
- **CDN global** : Distribution mondiale
- **HTTPS** : Certificat SSL automatique

### Métriques de Performance

- **Core Web Vitals** : Surveillés automatiquement
- **Lighthouse** : Scores optimisés
- **Bundle Analysis** : Analyse des tailles de fichiers

## 🧪 Tests et Validation

### Tests Locaux

```bash
# Test du build
npm run build:firebase

# Test avec emulators
npm run firebase:emulators

# Test de l'application
npm run firebase:serve
```

### Tests Automatisés

```bash
# Tests unitaires
npm run test

# Tests E2E
npm run cypress:run

# Linting
npm run lint

# Formatage
npm run format:check
```

## 🔍 Monitoring et Debugging

### Logs Firebase

```bash
# Voir les logs de hosting
firebase hosting:channel:list

# Voir les logs des fonctions
firebase functions:log

# Voir les logs Firestore
firebase firestore:indexes
```

### Health Checks

L'application expose des endpoints de santé :

```bash
# Health check
curl https://your-project.web.app/api/health

# Métriques
curl https://your-project.web.app/api/metrics
```

## 🛠️ Dépannage

### Problèmes Courants

#### 1. Build Échoue

```bash
# Nettoyer le cache
rm -rf .next out node_modules/.cache

# Réinstaller les dépendances
npm ci

# Rebuild
npm run build:firebase
```

#### 2. Déploiement Échoue

```bash
# Vérifier la connexion
firebase login

# Vérifier le projet
firebase projects:list

# Vérifier les permissions
firebase use --add
```

#### 3. Erreurs de Règles Firestore

```bash
# Tester les règles localement
firebase emulators:start --only firestore

# Valider les règles
firebase firestore:rules:validate
```

### Commandes Utiles

```bash
# Nettoyage complet
npm run clean

# Vérification de la configuration
firebase projects:list
firebase use

# Export des données d'emulator
firebase emulators:export ./emulator-data

# Import des données d'emulator
firebase emulators:start --import=./emulator-data
```

## 📚 Ressources

### Documentation Officielle

- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

### Outils Recommandés

- [Firebase Console](https://console.firebase.google.com)
- [Firebase Extensions](https://firebase.google.com/docs/extensions)
- [Firebase Performance](https://firebase.google.com/docs/perf-mon)

## 🤝 Support

### En Cas de Problème

1. **Vérifiez les logs** : `firebase hosting:channel:list`
2. **Testez localement** : `npm run firebase:serve`
3. **Consultez la documentation** : Liens ci-dessus
4. **Créez une issue** : GitHub repository

### Contact

- **Documentation** : Ce fichier et les autres README
- **Issues** : GitHub repository
- **Firebase Support** : Console Firebase

---

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

---

_Dernière mise à jour : $(date)_
