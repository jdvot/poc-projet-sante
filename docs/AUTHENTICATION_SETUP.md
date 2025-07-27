# 🔐 Configuration de l'Authentification Firebase

Ce guide explique comment configurer l'authentification Google Firebase pour l'application Limitless Health.

## 📋 Prérequis

1. **Compte Firebase** : Créez un projet sur [Firebase Console](https://console.firebase.google.com/)
2. **Configuration Firebase** : Activez l'authentification Google dans votre projet Firebase

## 🚀 Configuration Rapide

### 1. Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet"
3. Nommez votre projet (ex: `limitless-health`)
4. Suivez les étapes de configuration

### 2. Activer l'authentification Google

1. Dans votre projet Firebase, allez dans "Authentication"
2. Cliquez sur "Get started"
3. Dans l'onglet "Sign-in method", activez "Google"
4. Configurez les paramètres :
   - **Nom du projet public** : Votre nom de projet
   - **Email de support** : Votre email
   - **Domaine autorisé** : `localhost` pour le développement

### 3. Obtenir les clés de configuration

1. Dans votre projet Firebase, allez dans "Project settings" (⚙️)
2. Dans l'onglet "General", faites défiler jusqu'à "Your apps"
3. Cliquez sur l'icône Web (</>) pour ajouter une app web
4. Nommez votre app (ex: `limitless-health-web`)
5. Copiez la configuration Firebase

### 4. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Configuration Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=votre-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre-projet-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre-projet.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=votre-app-id

# Configuration de l'application
NEXT_PUBLIC_APP_NAME=Limitless Health
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Configuration N8N
NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook/chat

# Feature Flags
NEXT_PUBLIC_ENABLE_AI_DOCTOR=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=true

# Development
NEXT_TELEMETRY_DISABLED=1
```

## 🔧 Configuration Avancée

### Domaines autorisés

Pour la production, ajoutez vos domaines dans Firebase Console :

1. Authentication > Settings > Authorized domains
2. Ajoutez vos domaines :
   - `limitless-health.com`
   - `staging.limitless-health.com`

### Règles de sécurité

Configurez les règles de sécurité Firestore si nécessaire :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🧪 Test de l'Authentification

### Développement local

1. Démarrez l'application :

   ```bash
   npm run dev
   ```

2. Allez sur `http://localhost:3000`
3. Vous devriez être redirigé vers `/auth`
4. Cliquez sur "Se connecter avec Google"
5. Sélectionnez votre compte Google
6. Vous devriez être redirigé vers le dashboard

### Vérification

- ✅ L'utilisateur est connecté
- ✅ La navbar affiche le nom de l'utilisateur
- ✅ Les routes sont protégées
- ✅ Le bouton de déconnexion fonctionne

## 🚨 Dépannage

### Erreur "Firebase App not initialized"

Vérifiez que toutes les variables d'environnement Firebase sont définies.

### Erreur "Google sign-in failed"

1. Vérifiez que l'authentification Google est activée dans Firebase
2. Vérifiez que le domaine est autorisé
3. Vérifiez les règles de sécurité

### Erreur "Invalid API key"

1. Vérifiez que l'API key est correcte
2. Vérifiez que le projet Firebase est bien configuré
3. Vérifiez les restrictions d'API dans Google Cloud Console

## 🔒 Sécurité

### Variables d'environnement

- Ne committez jamais le fichier `.env.local`
- Utilisez des variables d'environnement différentes pour chaque environnement
- Utilisez des clés de service pour les opérations serveur

### Authentification

- L'authentification est gérée côté client avec Firebase Auth
- Les tokens sont automatiquement gérés par Firebase
- La déconnexion efface les tokens locaux

## 📱 Fonctionnalités

### Authentification Google

- ✅ Connexion avec Google
- ✅ Gestion des sessions
- ✅ Déconnexion
- ✅ Protection des routes
- ✅ Interface utilisateur stylée

### Protection des Routes

- ✅ Redirection automatique vers `/auth` si non connecté
- ✅ AuthGuard pour protéger les pages
- ✅ Loading states pendant l'authentification

### Interface Utilisateur

- ✅ Page d'authentification stylée avec animations
- ✅ Bouton Google avec icône
- ✅ Gestion des erreurs
- ✅ États de chargement
- ✅ Responsive design

## 🔄 Mise à Jour

Pour mettre à jour la configuration :

1. Modifiez les variables d'environnement
2. Redémarrez l'application
3. Testez l'authentification

## 📚 Ressources

- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Google Sign-In](https://firebase.google.com/docs/auth/web/google-signin)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
