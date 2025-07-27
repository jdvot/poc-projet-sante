# 🚀 React Best Practices - Limitless Health

**Guide complet des meilleures pratiques React pour optimiser le projet Limitless Health**

---

## 📁 Structure de fichiers - Améliorations recommandées

### **Structure actuelle vs recommandée**

```
src/
├── app/                    # Next.js App Router (✅ déjà bien)
├── features/              # Modules métier (✅ déjà bien)
│   ├── auth/
│   │   ├── components/    # Composants spécifiques à l'auth
│   │   ├── hooks/         # Hooks métier
│   │   ├── stores/        # Stores Zustand
│   │   ├── types/         # Types TypeScript
│   │   └── index.ts       # Export centralisé
│   └── dashboard/
│       ├── components/
│       ├── hooks/
│       ├── stores/
│       └── types/
├── shared/                # Code partagé (✅ déjà bien)
│   ├── ui/               # Composants UI réutilisables
│   ├── hooks/            # Hooks génériques
│   ├── stores/           # Stores globaux
│   ├── types/            # Types globaux
│   └── utils/            # Utilitaires
└── lib/                  # Configuration (nouveau)
    ├── api/              # Configuration API
    ├── auth/             # Configuration auth
    └── constants/        # Constantes globales
```

---

## 🧩 Format des composants - Template standardisé

### **Structure recommandée pour tous les composants**

```typescript
/**
 * 1. Imports organisés par ordre alphabétique
 */
import { useState, useEffect, useCallback } from 'react';
import { Card, Title, Button, Text } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';

// Hooks personnalisés
import { useAuthStore } from '@/shared/stores/authStore';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';

// Types
import type { DashboardData, User } from '@/shared/types';

/**
 * 2. Types et interfaces
 */
interface DashboardProps {
  userId: string;
  onDataUpdate?: (data: DashboardData) => void;
  showRefreshButton?: boolean;
}

/**
 * 3. Constantes
 */
const REFRESH_INTERVAL = 30000; // 30 secondes
const MAX_RETRY_ATTEMPTS = 3;

/**
 * 4. Composant principal
 */
export function Dashboard({
  userId,
  onDataUpdate,
  showRefreshButton = true
}: DashboardProps) {
  /**
   * 5. Hooks et état
   */
  const { user } = useAuthStore();
  const { data, isLoading, error, refetch } = useDashboard(userId);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  /**
   * 6. Effets
   */
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refetch();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [autoRefresh, refetch]);

  /**
   * 7. Callbacks et fonctions helpers
   */
  const handleRefresh = useCallback(() => {
    refetch();
    onDataUpdate?.(data);
  }, [refetch, onDataUpdate, data]);

  const handleRetry = useCallback(() => {
    if (retryCount < MAX_RETRY_ATTEMPTS) {
      setRetryCount(prev => prev + 1);
      refetch();
    }
  }, [retryCount, refetch]);

  /**
   * 8. Rendu conditionnel
   */
  if (isLoading) return <DashboardSkeleton />;
  if (error) return <DashboardError error={error} onRetry={handleRetry} />;
  if (!data) return <DashboardEmpty />;

  /**
   * 9. JSX principal
   */
  return (
    <Card shadow="lg" padding="xl" radius="lg">
      <Title order={2} mb="lg">
        Dashboard - {user?.name}
      </Title>

      <DashboardContent data={data} />

      {showRefreshButton && (
        <DashboardActions
          onRefresh={handleRefresh}
          onToggleAutoRefresh={() => setAutoRefresh(!autoRefresh)}
          autoRefresh={autoRefresh}
        />
      )}
    </Card>
  );
}

/**
 * 10. Composants internes (micro-components)
 */
function DashboardSkeleton() {
  return (
    <Card shadow="lg" padding="xl">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </Card>
  );
}

function DashboardError({
  error,
  onRetry
}: {
  error: Error;
  onRetry: () => void;
}) {
  return (
    <Card shadow="lg" padding="xl" className="border-red-200 bg-red-50">
      <Title order={3} color="red" mb="md">
        Erreur de chargement
      </Title>
      <Text color="red" mb="lg">
        {error.message}
      </Text>
      <Button onClick={onRetry} variant="outline" color="red">
        Réessayer
      </Button>
    </Card>
  );
}

function DashboardEmpty() {
  return (
    <Card shadow="lg" padding="xl" className="text-center">
      <Text size="lg" color="dimmed">
        Aucune donnée disponible
      </Text>
    </Card>
  );
}
```

---

## 🎯 Améliorations spécifiques pour Limitless Health

### **1. Organisation des stores Zustand**

```typescript
// ✅ Recommandé : Séparer par domaine métier
src / features / auth / stores / authStore.ts;
src / features / dashboard / stores / dashboardStore.ts;
src / features / profile / stores / profileStore.ts;
src / shared / stores / globalStore.ts; // Pour les stores vraiment globaux

// ❌ Éviter : Tout dans shared/stores/
```

### **2. Hooks personnalisés optimisés**

```typescript
// src/features/dashboard/hooks/useDashboard.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDashboardData, updateDashboardData } from '../api/dashboardApi';

export function useDashboard(userId: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['dashboard', userId],
    queryFn: () => fetchDashboardData(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const mutation = useMutation({
    mutationFn: updateDashboardData,
    onSuccess: (data) => {
      // Optimistic update
      queryClient.setQueryData(['dashboard', userId], data);
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      // Log error to Sentry
      console.error('Dashboard update failed:', error);
    },
  });

  return {
    ...query,
    updateData: mutation.mutate,
    isUpdating: mutation.isPending,
    updateError: mutation.error,
  };
}
```

### **3. Gestion d'erreurs robuste**

```typescript
// src/shared/components/ErrorBoundary.tsx
'use client';

import React, { Component, ReactNode } from 'react';
import { Card, Title, Text, Button } from '@mantine/core';
import * as Sentry from '@sentry/nextjs';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to Sentry
    Sentry.captureException(error, { extra: errorInfo });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card shadow="lg" padding="xl" className="text-center">
          <Title order={2} color="red" mb="md">
            Une erreur est survenue
          </Title>
          <Text color="dimmed" mb="lg">
            Nous nous excusons pour ce désagrément. Veuillez rafraîchir la page.
          </Text>
          <Button
            onClick={() => window.location.reload()}
            variant="filled"
            color="blue"
          >
            Rafraîchir la page
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}
```

### **4. Performance optimisations**

```typescript
// Utiliser React.memo pour les composants coûteux
export const DashboardChart = React.memo(function DashboardChart({
  data,
  onDataPointClick
}: DashboardChartProps) {
  // Composant optimisé qui ne se re-render que si data change
  return (
    <div>
      {/* Chart implementation */}
    </div>
  );
});

// Lazy loading pour les pages
const AIDoctorPage = lazy(() => import('@/features/ai-doctor/AIDoctorPage'));
const ProfilePage = lazy(() => import('@/features/profile/ProfilePage'));

// Suspense wrapper
export function LazyPageWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {children}
    </Suspense>
  );
}
```

---

## 📋 Checklist d'amélioration

### **Immédiat (Priorité haute)**

- [ ] **Organiser les imports** avec des alias TypeScript
- [ ] **Standardiser le format des composants** selon le template ci-dessus
- [ ] **Ajouter des Error Boundaries** pour chaque feature
- [ ] **Optimiser les re-renders** avec React.memo et useMemo
- [ ] **Implémenter la gestion d'erreurs** avec Sentry

### **Court terme (Priorité moyenne)**

- [ ] **Séparer les stores par domaine** (auth, dashboard, etc.)
- [ ] **Ajouter des tests unitaires** pour les hooks personnalisés
- [ ] **Implémenter le lazy loading** pour les pages
- [ ] **Optimiser les requêtes TanStack Query**
- [ ] **Ajouter des métriques de performance**

### **Long terme (Priorité basse)**

- [ ] **Ajouter Storybook** pour la documentation des composants
- [ ] **Implémenter des tests E2E** avec Cypress
- [ ] **Optimiser le bundle size** avec code splitting
- [ ] **Ajouter des animations** avec Framer Motion
- [ ] **Implémenter PWA** features

---

## 🔧 Configuration recommandée

### **tsconfig.json - Alias optimisés**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/shared/types/*"],
      "@/hooks/*": ["./src/shared/hooks/*"],
      "@/stores/*": ["./src/shared/stores/*"],
      "@/ui/*": ["./src/shared/ui/*"]
    },
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### **ESLint - Règles strictes**

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    // React Hooks
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',

    // TypeScript
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-const': 'error',

    // React
    'react/jsx-key': 'error',
    'react/no-array-index-key': 'warn',
    'react/self-closing-comp': 'error',

    // General
    'prefer-const': 'error',
    'no-console': 'warn',
    'no-debugger': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
```

### **Prettier - Formatage cohérent**

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

---

## 🎨 Conventions de nommage

### **Fichiers et dossiers**

```typescript
// Composants
Dashboard.tsx          // PascalCase
DashboardCard.tsx      // PascalCase
useDashboard.ts        // camelCase pour les hooks
dashboardApi.ts        // camelCase pour les services

// Dossiers
features/              // lowercase
shared/                // lowercase
components/            // lowercase
```

### **Variables et fonctions**

```typescript
// Variables
const userData = {}; // camelCase
const MAX_RETRY_ATTEMPTS = 3; // UPPER_SNAKE_CASE pour les constantes

// Fonctions
const handleClick = () => {}; // camelCase avec verbe
const fetchUserData = () => {}; // camelCase avec verbe

// Types et interfaces
interface UserProfile {} // PascalCase
type DashboardData = {}; // PascalCase
```

---

## 🧪 Tests - Bonnes pratiques

### **Tests unitaires avec Vitest**

```typescript
// src/features/dashboard/hooks/useDashboard.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDashboard } from './useDashboard';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useDashboard', () => {
  it('should fetch dashboard data', async () => {
    const { result } = renderHook(() => useDashboard('user-123'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
  });
});
```

---

## 📊 Métriques de performance

### **Indicateurs à surveiller**

- **First Contentful Paint (FCP)** : < 1.5s
- **Largest Contentful Paint (LCP)** : < 2.5s
- **Cumulative Layout Shift (CLS)** : < 0.1
- **First Input Delay (FID)** : < 100ms

### **Outils de monitoring**

- **Lighthouse** pour les audits de performance
- **Sentry** pour le monitoring d'erreurs
- **Web Vitals** pour les métriques en temps réel

---

## 🔄 Workflow de développement

### **Git Flow recommandé**

```bash
# Feature branch
git checkout -b feature/dashboard-improvements

# Commit conventionnel
git commit -m "feat(dashboard): add real-time data updates"

# Types de commits
feat: nouvelle fonctionnalité
fix: correction de bug
docs: documentation
style: formatage
refactor: refactoring
test: tests
chore: tâches de maintenance
```

---

## 📚 Ressources utiles

- [React Handbook](https://reacthandbook.dev/project-standards) - Standards de projet
- [Better Programming](https://betterprogramming.pub/21-best-practices-for-a-clean-react-project-df788a682fb) - 21 bonnes pratiques
- [Pro React](https://github.com/SurjitSahoo/react-best-practices) - Guide avancé
- [Zustand Documentation](https://github.com/pmndrs/zustand) - State management
- [TanStack Query](https://tanstack.com/query/latest) - Data fetching

---

**💡 Rappel :** Ces bonnes pratiques doivent être appliquées progressivement. Commencez par les priorités hautes et améliorez continuellement votre codebase ! 🚀
