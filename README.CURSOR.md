🧠 README.CURSOR.txt

Tu es l’assistant de développement sur ce projet React.
À CHAQUE SESSION, lorsque tu ouvres un fichier ou modifies du code, tu DOIS :

1. Relire ce README
2. Analyser les fichiers modifiés
3. Appliquer les bonnes pratiques listées ci‑dessous
4. Commenter directement dans le code si un point n’est pas respecté

---

1. Structure du projet
   /src
   /components # UI atoms & molecules (Function Components, PascalCase)
   /features # Domain modules (feature-based)
   /hooks # Custom React hooks
   /pages # Pages (Next.js App Router ou React Router)
   /services # Appels API & logique métier
   /stores # Zustand / Context API
   /types # Déclarations TypeScript partagées
   /utils # Fonctions pures réutilisables

---

2. Composants

- Function Components uniquement, nom en PascalCase.
- Fichiers .tsx.
- Props typées via interface Props { … } ou type Props = { … }.
- Séparer UI et logique : data fetching dans /services ou hooks (/hooks).
- Dans Next.js App Router, ajouter "use client" en tête de tout fichier interactif.

---

3. Hooks & état local

- useState, useEffect, useMemo, useCallback, useRef :
  - Jamais dans une condition ou une boucle.
  - useEffect avec tableau de dépendances complet.
- Créer des hooks personnalisés (useFetchX, useAuth, etc.) dans /hooks.

---

4. État global & data fetching

- Zustand ou Context API pour l’état partagé.
- @tanstack/react-query pour les requêtes : cache, loading, erreurs, invalidation.
- Appels réseau dans /services/api.ts ou /features/<X>/services.

---

5. Styling & accessibilité

- CSS-in-JS (Emotion/Styled) ou CSS Modules.
- Attributs ARIA, label + htmlFor pour chaque input.
- role / tabIndex pour éléments non-natifs focusables.

---

6. TypeScript

- Pas de any : typer toutes les props, retours et variables.
- Utiliser Partial<T>, Pick<T>, Record<K,V> pour affiner les types.

---

7. Performance

- React.memo pour composants lourds.
- useMemo & useCallback pour éviter les re-renders inutiles.
- Signaler tout goulet d’étranglement potentiel.

---

8. Tests

- Jest + React Testing Library :
  - Tests unitaires pour hooks/utilitaires.
  - Tests d’intégration légère pour composants critiques.

---

9. Revue de code & commentaires
   À chaque review, commente si :

- Un composant dépasse 150 lignes ou a trop de responsabilités.
- Un hook est mal utilisé (dépendances manquantes).
- Un console.log de debug est présent.
- Il manque la gestion d’erreur (try/catch) ou loading/error.
- Des problèmes d’accessibilité ou de typage.

---

10. Maintenance continue

- Documenter les choix architecturaux importants.
- Proposer des refactors quand un module devient complexe.
- Mettre à jour ce README au fil des évolutions.

🙏 Merci Cursor ! Grâce à ce guide, ce projet React restera propre, performant et maintenable. 🚀
