# 🔧 Guide de dépannage - Authentification mobile

## Problèmes courants et solutions

### 1. Configuration Firebase avec valeurs mock

**Symptôme :** L'authentification ne fonctionne pas et affiche "Configuration Firebase mock détectée"

**Solution :**

```bash
# Vérifiez vos variables d'environnement
cat .env.local

# Assurez-vous d'avoir les vraies valeurs Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=votre-vraie-cle-api
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre-projet-id
```

### 2. Domaine non autorisé dans Firebase

**Symptôme :** Erreur "Ce domaine n'est pas autorisé pour l'authentification"

**Solution :**

1. Allez dans [Firebase Console](https://console.firebase.google.com)
2. Sélectionnez votre projet
3. Authentication > Settings > Authorized domains
4. Ajoutez votre domaine (ex: `localhost`, `votre-domaine.com`)

### 3. Popups bloqués sur mobile

**Symptôme :** Erreur "Popup bloquée" sur mobile

**Solution :**

- L'application utilise automatiquement la redirection sur mobile
- Si le problème persiste, vérifiez les paramètres du navigateur
- Safari mobile : Réglages > Safari > Bloquer les popups > Désactivé

### 4. Problèmes de connectivité

**Symptôme :** Erreur "Pas de connexion internet"

**Solution :**

- Vérifiez votre connexion internet
- Testez sur un autre réseau
- Vérifiez que Firebase est accessible

### 5. Navigateur non supporté

**Symptôme :** Erreur "Cette opération n'est pas supportée dans cet environnement"

**Solution :**

- Utilisez un navigateur moderne (Chrome, Firefox, Safari, Edge)
- Évitez les navigateurs intégrés dans les apps (Instagram, Facebook, etc.)

## Diagnostic automatique

### Utilisation du script de diagnostic

```bash
# Exécuter le script de diagnostic
./scripts/test-mobile-auth.sh
```

### Utilisation du composant de diagnostic

1. Ouvrez l'application sur mobile
2. Allez sur la page d'authentification
3. Cliquez sur "Diagnostic mobile"
4. Consultez les informations affichées

## Tests manuels

### Test de détection mobile

```javascript
// Dans la console du navigateur
console.log('User Agent:', navigator.userAgent);
console.log('Screen size:', window.innerWidth, 'x', window.innerHeight);
console.log('Touch support:', 'ontouchstart' in window);
console.log('Max touch points:', navigator.maxTouchPoints);
```

### Test de configuration Firebase

```javascript
// Dans la console du navigateur
import { auth } from './src/shared/config/firebase';
console.log('Firebase config:', auth.app.options);
```

## Logs de débogage

### Activer les logs détaillés

```javascript
// Dans src/shared/hooks/useFirebaseAuth.ts
const DEBUG = true;

if (DEBUG) {
  console.log('Firebase Auth Debug:', {
    isMobile,
    userAgent: navigator.userAgent,
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
    online: navigator.onLine,
  });
}
```

## Solutions spécifiques par navigateur

### Safari mobile

**Problèmes courants :**

- Blocage des popups
- Restrictions de stockage web
- Problèmes de redirection

**Solutions :**

1. Réglages > Safari > Bloquer les popups > Désactivé
2. Réglages > Safari > Empêcher le suivi > Désactivé
3. Vider le cache et les données de navigation

### Chrome mobile

**Problèmes courants :**

- Blocage des popups
- Problèmes de cookies tiers

**Solutions :**

1. Paramètres > Site settings > Pop-ups and redirects > Autorisé
2. Paramètres > Site settings > Cookies > Autoriser les cookies tiers

### Firefox mobile

**Problèmes courants :**

- Blocage des popups
- Restrictions de stockage

**Solutions :**

1. Paramètres > Protection renforcée > Désactivé
2. Paramètres > Cookies et données de sites > Accepter les cookies

## Tests automatisés

### Exécuter les tests E2E

```bash
# Tests Cypress pour l'authentification mobile
npm run cypress:run --spec "cypress/e2e/auth-mobile.cy.ts"

# Ou ouvrir Cypress en mode interactif
npm run cypress:open
```

### Tests unitaires

```bash
# Tests des composants d'authentification
npm test -- src/features/auth/

# Tests des hooks
npm test -- src/shared/hooks/useFirebaseAuth.test.ts
```

## Monitoring et alertes

### Sentry

Les erreurs d'authentification sont automatiquement envoyées à Sentry pour le monitoring.

### Logs personnalisés

```javascript
// Ajouter des logs personnalisés
console.log('Auth attempt:', {
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent,
  isMobile,
  error: error?.code,
});
```

## Support

### Ressources utiles

- [Documentation Firebase Auth](https://firebase.google.com/docs/auth)
- [Guide d'authentification mobile](https://firebase.google.com/docs/auth/web/redirect-auth)
- [Dépannage Firebase](https://firebase.google.com/docs/auth/web/troubleshooting)

### Contact

Pour des problèmes spécifiques, consultez :

- Les logs de la console du navigateur
- Les logs Sentry
- La documentation Firebase
- L'équipe de développement

## Checklist de vérification

- [ ] Variables d'environnement Firebase configurées
- [ ] Domaines autorisés dans Firebase Console
- [ ] Navigateur moderne et à jour
- [ ] Connexion internet stable
- [ ] Popups autorisés (si nécessaire)
- [ ] Tests automatisés passent
- [ ] Diagnostic mobile sans erreurs critiques
