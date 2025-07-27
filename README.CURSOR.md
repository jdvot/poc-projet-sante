# 🧠 GUIDE CURSOR - React/Next.js

**À CHAQUE MODIFICATION, vérifier ce guide et commenter dans le code si non-respecté.**

---

## 📁 Structure

```
/src
├── app/           # Next.js App Router
├── features/      # Modules métier (auth, dashboard, etc.)
├── shared/        # Code partagé (hooks, stores, types, ui)
└── test/          # Tests
```

---

## 🧩 Composants

### Règles

- **Function Components** uniquement, PascalCase
- **"use client"** en tête des fichiers interactifs
- **Props typées** avec interface
- **Séparer UI et logique**

```tsx
'use client';

interface Props {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: Props) {
  return <div onClick={onAction}>{title}</div>;
}
```

---

## 🪝 Hooks

### Règles strictes

- **Jamais dans conditions/boucles**
- **Dépendances complètes** dans useEffect
- **Hooks personnalisés** dans `/shared/hooks/`

```tsx
// ✅ CORRECT
const [state, setState] = useState('');
useEffect(() => {}, [state]);

// ❌ INCORRECT
if (condition) {
  const [state, setState] = useState('');
}
```

---

## 🌐 État global

### Zustand (dans `/shared/stores/`)

```tsx
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

### Services API (dans `/shared/api/`)

```tsx
export class ApiService {
  static async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint);
    return response.json();
  }
}
```

---

## 📝 TypeScript

### Règles

- **Pas de `any`**
- **Tout typer** : props, retours, variables
- **Types utilitaires** : `Partial<T>`, `Pick<T>`, `Omit<T>`

```tsx
// ✅
interface User {
  id: string;
  email: string;
}

type UserUpdate = Partial<User>;

// ❌
const data: any = response.json();
```

---

## ⚡ Performance

### Optimisations

- **React.memo** pour composants lourds
- **useMemo/useCallback** pour éviter re-renders
- **Lazy loading** pour composants volumineux

```tsx
const ExpensiveComponent = React.memo(({ data }: Props) => {
  const memoizedValue = useMemo(() => compute(data), [data]);
  return <div>{memoizedValue}</div>;
});
```

---

## 🎨 Accessibilité

### Règles de base

- **Labels** pour tous les inputs
- **Attributs ARIA** : `aria-label`, `aria-describedby`
- **Navigation clavier** fonctionnelle

```tsx
<label htmlFor="email">Email</label>
<input
  id="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
```

---

## 🧪 Tests

### Structure

```tsx
describe('Component', () => {
  it('should render', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

---

## 🔍 Checklist Revue de Code

### Vérifier automatiquement :

- [ ] Composant > 150 lignes → Décomposer
- [ ] Hook dans condition/boucle → Corriger
- [ ] `console.log` présent → Supprimer
- [ ] Gestion d'erreur manquante → Ajouter
- [ ] Types `any` → Typer
- [ ] Props non typées → Typer
- [ ] Attributs ARIA manquants → Ajouter
- [ ] Dépendances useEffect manquantes → Corriger

---

## 🚀 Commandes

```bash
npm run dev      # Développement
npm run build    # Build
npm run test     # Tests
npm run lint     # Linting
```

---

**💡 RÈGLE D'OR : Si tu vois quelque chose qui ne respecte pas ce guide, commente-le directement dans le code !**
