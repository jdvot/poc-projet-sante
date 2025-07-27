# 🔐 Authentification Firebase - Limitless Health

## ✅ État de l'Authentification

L'authentification Firebase est **finalisée** et prête à être utilisée avec le projet `sante-limitless-poc`.

## 🚀 Configuration Rapide

### 1. Exécuter le script de configuration

```bash
# Exécuter le script de configuration automatique
./scripts/setup-firebase-auth.sh
```

Ce script va :

- ✅ Installer Firebase Admin SDK
- ✅ Créer le fichier `.env.local` avec les vraies données
- ✅ Configurer Firebase Admin
- ✅ Tester la configuration

### 2. Obtenir les clés Firebase depuis la console

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez le projet `sante-limitless-poc`
3. Allez dans **Project Settings** (⚙️)
4. Dans l'onglet **General**, faites défiler jusqu'à **Your apps**
5. Si aucune app web n'existe, cliquez sur l'icône Web (</>) pour en créer une
6. Nommez l'app `limitless-health-web`
7. Copiez la configuration et remplacez les valeurs dans `.env.local`

### 3. Activer l'authentification Google

1. Dans Firebase Console, allez dans **Authentication**
2. Cliquez sur **Get started**
3. Dans l'onglet **Sign-in method**, activez **Google**
4. Configurez :
   - **Nom du projet public** : Limitless Health
   - **Email de support** : votre email
   - **Domaine autorisé** : `localhost` pour le développement

## 📁 Fichiers Configurés

### Configuration Firebase Client

- `src/shared/config/firebase.ts` - Configuration Firebase côté client
- `src/shared/config/firebase-admin.ts` - Configuration Firebase Admin côté serveur

### Hooks et Stores

- `src/shared/hooks/useFirebaseAuth.ts` - Hook d'authentification amélioré
- `src/shared/stores/authStore.ts` - Store Zustand pour l'état d'authentification

### Composants

- `src/features/auth/AuthPage.tsx` - Page d'authentification améliorée
- `src/shared/components/AuthGuard.tsx` - Protection des routes

### Documentation

- `docs/FIREBASE_AUTHENTICATION_SETUP.md` - Guide complet de configuration
- `scripts/setup-firebase-auth.sh` - Script de configuration automatique

## 🔧 Fonctionnalités Implémentées

### ✅ Authentification Google

- Connexion avec Google OAuth
- Gestion des sessions
- Déconnexion sécurisée
- Persistance des données utilisateur

### ✅ Gestion des Erreurs

- Messages d'erreur localisés en français
- Gestion de tous les codes d'erreur Firebase
- Auto-effacement des erreurs après 5 secondes
- Logs détaillés pour le debugging

### ✅ Protection des Routes

- AuthGuard pour protéger les pages
- Redirection automatique vers `/auth`
- États de chargement pendant l'authentification
- Gestion des erreurs d'authentification

### ✅ Interface Utilisateur

- Page d'authentification moderne et responsive
- Bouton Google avec icône et états de chargement
- Affichage du profil utilisateur connecté
- Avatar et informations utilisateur
- Thème sombre/clair compatible

### ✅ Sécurité

- Firebase Admin SDK pour les opérations serveur
- Clés privées sécurisées dans les variables d'environnement
- Tokens d'authentification gérés automatiquement
- Conformité RGPD

## 🧪 Test de l'Authentification

### Démarrage de l'application

```bash
# Installer les dépendances
npm install

# Démarrer l'application
npm run dev
```

### Test de connexion

1. Allez sur `http://localhost:3000`
2. Vous devriez être redirigé vers `/auth`
3. Cliquez sur "Se connecter avec Google"
4. Sélectionnez votre compte Google
5. Vous devriez être redirigé vers le dashboard

### Vérification

- ✅ L'utilisateur est connecté
- ✅ La navbar affiche le nom de l'utilisateur
- ✅ Les routes sont protégées
- ✅ Le bouton de déconnexion fonctionne
- ✅ Les données utilisateur sont persistées

## 🚨 Dépannage

### Erreur "Firebase App not initialized"

Vérifiez que toutes les variables d'environnement Firebase sont définies dans `.env.local`.

### Erreur "Google sign-in failed"

1. Vérifiez que l'authentification Google est activée dans Firebase
2. Vérifiez que le domaine est autorisé
3. Vérifiez les règles de sécurité

### Erreur "Invalid API key"

1. Vérifiez que l'API key est correcte
2. Vérifiez que le projet Firebase est bien configuré
3. Vérifiez les restrictions d'API dans Google Cloud Console

### Erreur "Firebase Admin not initialized"

1. Vérifiez que `firebase-admin` est installé
2. Vérifiez que `FIREBASE_PRIVATE_KEY` est défini dans `.env.local`
3. Vérifiez que le fichier `firebase-admin.ts` est correctement configuré

## 🔒 Sécurité

### Variables d'environnement

- Ne committez jamais le fichier `.env.local`
- Utilisez des variables d'environnement différentes pour chaque environnement
- La clé privée Firebase Admin doit rester secrète

### Authentification

- L'authentification est gérée côté client avec Firebase Auth
- Les tokens sont automatiquement gérés par Firebase
- La déconnexion efface les tokens locaux
- Firebase Admin SDK pour les opérations serveur sécurisées

## 📱 Fonctionnalités Avancées

### Gestion des États

- États de chargement pendant l'authentification
- Gestion des erreurs avec messages localisés
- Auto-effacement des erreurs
- Persistance des données utilisateur

### Interface Utilisateur

- Design moderne et responsive
- Animations et transitions fluides
- Support du thème sombre/clair
- Avatar utilisateur avec photo de profil

### Développement

- Logs détaillés pour le debugging
- Types TypeScript complets
- Gestion des erreurs robuste
- Code modulaire et réutilisable

## 🔄 Mise à Jour

Pour mettre à jour la configuration :

1. Modifiez les variables d'environnement dans `.env.local`
2. Redémarrez l'application
3. Testez l'authentification
4. Vérifiez les règles de sécurité Firestore

## 📚 Ressources

- [Documentation complète](docs/FIREBASE_AUTHENTICATION_SETUP.md)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Google Sign-In](https://firebase.google.com/docs/auth/web/google-signin)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

## 🎯 Prochaines Étapes

1. **Configuration des notifications** : Firebase Cloud Messaging
2. **Analytics** : Firebase Analytics
3. **Performance** : Firebase Performance Monitoring
4. **Crashlytics** : Firebase Crashlytics
5. **Hosting** : Firebase Hosting pour le déploiement

---

## ✅ Authentification Finalisée

L'authentification Firebase est maintenant **complètement configurée** et **prête à l'emploi** pour le projet Limitless Health avec le projet Firebase `sante-limitless-poc`.

**Projet Firebase** : `sante-limitless-poc`  
**Service Account** : `firebase-adminsdk-fbsvc@sante-limitless-poc.iam.gserviceaccount.com`  
**Client ID** : `110214906255438358322`

---

_Authentification Firebase finalisée pour Limitless Health_
