# 🔧 Résolution : Domaine non autorisé pour l'authentification Firebase

## 🚨 Problème Identifié

**Erreur** : "Ce domaine n'est pas autorisé pour l'authentification"

**Cause** : Le domaine `localhost` n'est pas configuré dans les domaines autorisés de Firebase.

## ✅ Solution Étape par Étape

### Étape 1 : Accéder à Firebase Console

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez le projet `sante-limitless-poc`

### Étape 2 : Configurer les Domaines Autorisés

1. Dans le menu de gauche, cliquez sur **Authentication**
2. Cliquez sur l'onglet **Settings** (⚙️)
3. Faites défiler jusqu'à la section **Authorized domains**
4. Cliquez sur **Add domain**

### Étape 3 : Ajouter les Domaines

Ajoutez les domaines suivants un par un :

```
localhost
sante-limitless-poc.firebaseapp.com
limitless-health.com
staging.limitless-health.com
```

### Étape 4 : Vérifier l'Activation de Google Auth

1. Dans **Authentication** > **Sign-in method**
2. Vérifiez que **Google** est activé
3. Si non, cliquez sur **Google** et activez-le

## 🔍 Vérification de la Configuration

### Vérifier les Variables d'Environnement

```bash
# Vérifier que les bonnes variables sont configurées
grep FIREBASE .env.local
```

Résultat attendu :

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAo2jMGkiZFl3y8dk72esvIL7jfYxgtYQY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sante-limitless-poc.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sante-limitless-poc
```

### Tester la Configuration

```bash
# Redémarrer l'application
npm run dev

# Tester l'authentification
# Allez sur http://localhost:3000
# Cliquez sur "Se connecter avec Google"
```

## 🚨 Domaines à Ajouter dans Firebase Console

### Développement Local

- `localhost`

### Production

- `sante-limitless-poc.firebaseapp.com`
- `limitless-health.com`
- `staging.limitless-health.com`

## 📋 Instructions Détaillées Firebase Console

### 1. Accès aux Paramètres d'Authentification

1. **Firebase Console** → Projet `sante-limitless-poc`
2. **Authentication** (dans le menu de gauche)
3. **Settings** (onglet en haut)
4. **Authorized domains** (section)

### 2. Ajout des Domaines

Pour chaque domaine :

1. Cliquez sur **Add domain**
2. Entrez le domaine (ex: `localhost`)
3. Cliquez sur **Add**

### 3. Vérification

Après ajout, vous devriez voir :

```
Authorized domains:
- localhost
- sante-limitless-poc.firebaseapp.com
- limitless-health.com
- staging.limitless-health.com
```

## 🧪 Test de Validation

### Test 1 : Développement Local

```bash
# Démarrer l'application
npm run dev

# Ouvrir http://localhost:3000
# Tester la connexion Google
```

### Test 2 : Vérification des Erreurs

Si l'erreur persiste :

1. Vérifiez la console du navigateur (F12)
2. Vérifiez les logs de l'application
3. Vérifiez que le domaine est bien ajouté dans Firebase

## 🔧 Script de Vérification

```bash
# Vérifier la configuration Firebase
./scripts/check-firebase-config.sh

# Tester l'authentification
./scripts/test-mobile-auth.sh
```

## 🚨 Troubleshooting

### Erreur Persiste Après Configuration

1. **Vider le cache du navigateur**
2. **Redémarrer l'application**
3. **Vérifier les domaines dans Firebase Console**
4. **Vérifier que Google Auth est activé**

### Erreur "Invalid API Key"

1. Vérifiez que l'API key est correcte
2. Vérifiez les restrictions d'API dans Google Cloud Console
3. Vérifiez que le projet Firebase est bien configuré

### Erreur "Popup Blocked"

1. Autorisez les popups pour `localhost:3000`
2. Désactivez les bloqueurs de popups
3. Utilisez la redirection au lieu des popups

## ✅ Validation Finale

Une fois configuré, vous devriez pouvoir :

- ✅ Accéder à `http://localhost:3000`
- ✅ Être redirigé vers `/auth`
- ✅ Cliquer sur "Se connecter avec Google"
- ✅ Sélectionner votre compte Google
- ✅ Être redirigé vers le dashboard

## 📞 Support

Si le problème persiste :

1. Vérifiez les logs de l'application
2. Vérifiez la console du navigateur
3. Vérifiez la configuration Firebase Console
4. Consultez la documentation Firebase

---

**Projet Firebase** : `sante-limitless-poc`  
**Domaine Principal** : `sante-limitless-poc.firebaseapp.com`  
**Domaine de Développement** : `localhost`
