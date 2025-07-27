# 🔐 Configuration Firebase Authentication - Limitless Health

Ce guide détaille la configuration complète de l'authentification Firebase pour le projet Limitless Health avec les vraies données du projet `sante-limitless-poc`.

## 📋 Informations du Projet

- **Projet Firebase** : `sante-limitless-poc`
- **Service Account** : `firebase-adminsdk-fbsvc@sante-limitless-poc.iam.gserviceaccount.com`
- **Client ID** : `110214906255438358322`

## 🚀 Configuration Rapide

### 1. Créer le fichier `.env.local`

Créez un fichier `.env.local` à la racine du projet avec les valeurs suivantes :

```env
# ========================================
# Configuration Limitless Health - Production
# ========================================

# Environnement
NODE_ENV=production

# ========================================
# Application
# ========================================
NEXT_PUBLIC_APP_NAME=Limitless Health
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=https://limitless-health.com

# ========================================
# API Configuration
# ========================================
NEXT_PUBLIC_API_URL=https://limitless-health.com/api
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.limitless-health.com/webhook/chat

# ========================================
# Firebase Configuration - Production
# ========================================
# IMPORTANT: Obtenez ces valeurs depuis la console Firebase
# Projet: sante-limitless-poc
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sante-limitless-poc.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sante-limitless-poc
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sante-limitless-poc.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# ========================================
# Firebase Admin (Côté Serveur)
# ========================================
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCJIiBgtNQLrKm\nacigvQQtHl6sSpPmYSgVBsghN1XKM0r/lqJKDY3F/cbvxkpyDVNLB8xDJxUKG/8N\n9oC9W3vEeQ8eHLMcBzr54WONeNfDJ4jTrR+Oob0NE1XjXmmU/QBm1V62e+tkHomc\nNARrPD75ghAsKdQ381zLQWD1SXBqKJLcux4mVQSPL10fFSuuDsVsRLlKSYVRQ8aA\nD/9ZYRTud5OrNmjgzhgeMbqQXYCfmcXk+Ja866io1lHpiURyEmjy0Q8hDb7iezxO\n91PZoR4d8B8aJbB4ENt6Hkby5eMb5ANSWQowEJLZrrr00/dJxAkf199nzRcIEVJA\nRloW386NAgMBAAECggEAX66YtlevZK+3LYwqLIoroj77Auf4j4znr8E5ZiF6/x4b\ngu8PCfc3HdLutmKgcyh9Ghf8REZhOKvGnu+T0H9jdtgBKuKTJaesmdXK9kEN+akk\n5spGqMmuvmB+roHsAFlW1tenB8H4J85jHOCIIv+8u8Stys5MwMyIucX9jrZEmJSN\njDatciw6cZ7uArhauZSlk7KMOzdoSjTJCyseg90k7OxwUH75kpGXnG9HOq+gJm3d\nSZSAxwNqMnEu6PJ+EqBpyMtIjPqAxpMPFfDpZ/BcRtURm8Riwx9fbxZ7LrW1cnKh\nM3JwEwduYGcPFSlqwKYc4+K2rMLW75e72QgfKz9AQwKBgQDq6/hdxy5l2f5DB9De\nP4n8yKSrqKTr2LBokDZwrWoAtxDD/UCR0FMy/IoC3qOXYBl0KlIWD8PdLlMzuAQ3\nn2n4doB8OlG05WC8jg6lv/niBpvnES8zmk+PTRVuQ2Oi2kGwf/u8bCHmixTQJqNF\npa9O7cKp3Zap7HGm7fBSU+42cwKBgQDTj+O8yVPlMHePuILAHGRx9a0fnO4SYOOE\nzjUYWOnG83ZqURZU2cpkv7NpKl7HAxUmCNUUcPca2Eqao8BZ1UoZXQTkM8jyutE2\nMKexi4+fO9IX35MCtJxvIxORYyoJD0rplggzOuAC1J+Wl4OSJ7TD4Ykv6q59KYUx\niQxYqlOm/wKBgQCofhjEQiEQIjtQnmF7lj0FFm+tQycOlXtpc83oISj/XE3lFFZk\nfvO9hQ4DouXYo6999wCrHCGSGTDJznkP4AGkmHHtJ/MEeORaONVeooO6Tp0xLM0b\nCNl5YYM2c5UZ78rfqdvHOBNUhHqoFJ5UTNKhHLzbEriGJbUaUlxk4Bfh6wKBgCXG\njY2KDVbhHpglBAO1jiHjEjSQ2tmhPz7ZaxWb2rJRipVVQT2JXeA7cpeWnzG91Srj\nbNinixfaAwg1sQTZVs/MkjEFJh5hSTX53hePqedu0Qa+Pwu+oCggBUByinDvsBqh\nVXmAS7t1p8FF8JJKULahMNPDfcCPh17e77ttPl6VAoGAI1udQTwEvM+VNPjoDR5S\nS9uT0jYkZWhPpvJGMXvjdf+n7zxnMhMlqgx/2aC7dN6PtAp3mP61jRrtwjrZnTwu\n8pOgiN91943qiA1zePICz/+UqbpXeRT7dees6Lxm/9+4/kvSQ0J84K/9K82o0hQG\nkhXc5aaI3AuCPepPTicNtIE=\n-----END PRIVATE KEY-----\n"

# ========================================
# Sentry Configuration
# ========================================
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/123456
SENTRY_ORG=limitless-health
SENTRY_PROJECT=limitless-health

# ========================================
# Analytics
# ========================================
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-vercel-analytics-id

# ========================================
# Feature Flags
# ========================================
NEXT_PUBLIC_ENABLE_AI_DOCTOR=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_DEBUG=false

# ========================================
# Development
# ========================================
NEXT_TELEMETRY_DISABLED=1
```

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

### 4. Configurer les domaines autorisés

Dans **Authentication > Settings > Authorized domains**, ajoutez :

- `localhost`
- `limitless-health.com`
- `staging.limitless-health.com`

## 🔧 Configuration Avancée

### Firebase Admin SDK

Le fichier `src/shared/config/firebase-admin.ts` est configuré avec les données du service account. Il permet :

- Authentification côté serveur
- Gestion des utilisateurs
- Accès à Firestore
- Vérification des tokens

### Règles de sécurité Firestore

Configurez les règles de sécurité dans Firebase Console :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Utilisateurs peuvent lire/écrire leurs propres données
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Profils de santé
    match /healthProfiles/{profileId} {
      allow read, write: if request.auth != null && request.auth.uid == profileId;
    }

    // Conversations AI Doctor
    match /aiChats/{chatId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 🧪 Test de l'Authentification

### Développement local

```bash
# Installer les dépendances
npm install

# Démarrer l'application
npm run dev
```

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

## 📱 Fonctionnalités

### Authentification Google

- ✅ Connexion avec Google
- ✅ Gestion des sessions
- ✅ Déconnexion
- ✅ Protection des routes
- ✅ Interface utilisateur stylée
- ✅ Persistance des données utilisateur

### Protection des Routes

- ✅ Redirection automatique vers `/auth` si non connecté
- ✅ AuthGuard pour protéger les pages
- ✅ Loading states pendant l'authentification
- ✅ Gestion des erreurs d'authentification

### Interface Utilisateur

- ✅ Page d'authentification stylée avec animations
- ✅ Bouton Google avec icône
- ✅ Gestion des erreurs
- ✅ États de chargement
- ✅ Responsive design
- ✅ Thème sombre/clair

## 🔄 Mise à Jour

Pour mettre à jour la configuration :

1. Modifiez les variables d'environnement dans `.env.local`
2. Redémarrez l'application
3. Testez l'authentification
4. Vérifiez les règles de sécurité Firestore

## 📚 Ressources

- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Google Sign-In](https://firebase.google.com/docs/auth/web/google-signin)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## 🎯 Prochaines Étapes

1. **Configuration des notifications** : Firebase Cloud Messaging
2. **Analytics** : Firebase Analytics
3. **Performance** : Firebase Performance Monitoring
4. **Crashlytics** : Firebase Crashlytics
5. **Hosting** : Firebase Hosting pour le déploiement

---

_Configuration Firebase Authentication terminée pour Limitless Health_
