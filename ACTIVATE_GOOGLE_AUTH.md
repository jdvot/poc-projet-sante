# 🔐 Activation de l'Authentification Google - Firebase Console

## ✅ État Actuel

Les vraies clés Firebase ont été configurées avec succès :

- ✅ API Key : `AIzaSyAo2jMGkiZFl3y8dk72esvIL7jfYxgtYQY`
- ✅ App ID : `1:219684993961:web:084d9b5e6d4555412f22b8`
- ✅ Projet : `sante-limitless-poc`

## 🚀 Activation de l'Authentification Google

### Étape 1 : Accéder à Firebase Console

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez le projet `sante-limitless-poc`

### Étape 2 : Activer l'Authentification

1. Dans le menu de gauche, cliquez sur **Authentication**
2. Cliquez sur **Get started** (si pas encore configuré)
3. Allez dans l'onglet **Sign-in method**

### Étape 3 : Configurer Google

1. Cliquez sur **Google** dans la liste des providers
2. Cliquez sur **Enable** pour activer Google
3. Configurez les paramètres :
   - **Project public-facing name** : `Limitless Health`
   - **Project support email** : Votre email
   - **Authorized domains** : Laissez vide pour l'instant

4. Cliquez sur **Save**

### Étape 4 : Configurer les Domaines Autorisés

1. Dans **Authentication** > **Settings** > **Authorized domains**
2. Ajoutez les domaines suivants :
   - `localhost` (pour le développement)
   - `limitless-health.com` (pour la production)
   - `staging.limitless-health.com` (pour le staging)

### Étape 5 : Tester l'Authentification

1. Redémarrez l'application si nécessaire :

   ```bash
   npm run dev
   ```

2. Allez sur `http://localhost:3000`
3. Vous devriez être redirigé vers `/auth`
4. Cliquez sur "Se connecter avec Google"
5. Sélectionnez votre compte Google

## 🔧 Configuration Avancée

### Règles de Sécurité Firestore (Optionnel)

Si vous utilisez Firestore, configurez les règles de sécurité :

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

### Configuration des Notifications (Optionnel)

Pour activer les notifications push :

1. Dans Firebase Console > **Project Settings**
2. Allez dans l'onglet **Cloud Messaging**
3. Configurez les clés FCM

## 🧪 Test de l'Authentification

### Test de Connexion

1. Ouvrez l'application sur `http://localhost:3000`
2. Cliquez sur "Se connecter avec Google"
3. Sélectionnez votre compte Google
4. Vérifiez que vous êtes redirigé vers le dashboard

### Test de Déconnexion

1. Dans le dashboard, cliquez sur le bouton de déconnexion
2. Vérifiez que vous êtes redirigé vers la page d'authentification

### Test de Protection des Routes

1. Essayez d'accéder directement à `/dashboard` sans être connecté
2. Vérifiez que vous êtes redirigé vers `/auth`

## 🚨 Dépannage

### Erreur "Google sign-in failed"

1. Vérifiez que Google est activé dans Firebase Console
2. Vérifiez que `localhost` est dans les domaines autorisés
3. Vérifiez que les clés Firebase sont correctes

### Erreur "Unauthorized domain"

1. Ajoutez `localhost` dans les domaines autorisés
2. Redémarrez l'application

### Erreur "Popup blocked"

1. Autorisez les popups pour `localhost:3000`
2. Vérifiez que vous n'avez pas de bloqueur de popups actif

## ✅ Vérification Finale

Une fois l'authentification Google activée, vous devriez voir :

- ✅ Connexion avec Google fonctionnelle
- ✅ Redirection vers le dashboard après connexion
- ✅ Affichage du nom et de l'email de l'utilisateur
- ✅ Déconnexion fonctionnelle
- ✅ Protection des routes non-authentifiées

## 🎯 Prochaines Étapes

1. **Testez l'authentification** avec différents comptes Google
2. **Configurez les règles Firestore** si nécessaire
3. **Activez les notifications** Firebase Cloud Messaging
4. **Configurez l'analytics** Firebase Analytics
5. **Déployez en production** avec Firebase Hosting

---

## 🎉 Authentification Google Activée !

Une fois ces étapes suivies, l'authentification Google sera complètement fonctionnelle pour votre application Limitless Health.

**Projet Firebase** : `sante-limitless-poc`  
**Status** : ✅ Clés configurées, prêt pour activation Google

---

_Guide d'activation de l'authentification Google pour Limitless Health_
