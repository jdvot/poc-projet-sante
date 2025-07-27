# 🎨 Thème Partagé - Limitless Health

## 🎯 Objectif

Créer un système de thème partagé pour toute l'application Mantine, permettant une cohérence visuelle globale et une gestion centralisée du thème avec des couleurs personnalisées pour une application de santé.

## 🏗️ Architecture du Thème

### Structure des Fichiers

```
src/shared/
├── config/
│   └── theme.ts              # Configuration principale du thème
├── providers/
│   └── ThemeProvider.tsx     # Provider du thème
├── hooks/
│   └── useAppTheme.ts        # Hook personnalisé pour le thème
└── ui/
    ├── ThemedCard.tsx        # Composant Card thématisé
    ├── ThemedButton.tsx      # Composant Button thématisé
    ├── ThemedPaper.tsx       # Composant Paper thématisé
    └── ThemeDemo.tsx         # Démonstration du thème
```

## 🎨 Configuration du Thème

### 1. Configuration Principale (`src/shared/config/theme.ts`)

#### Couleurs Personnalisées

```typescript
colors: {
  // Couleurs spécifiques à la santé
  health: [
    '#f0f9ff', // 0 - Très clair
    '#e0f2fe', // 1
    '#bae6fd', // 2
    '#7dd3fc', // 3
    '#38bdf8', // 4
    '#0ea5e9', // 5
    '#0284c7', // 6 - Primaire
    '#0369a1', // 7
    '#075985', // 8
    '#0c4a6e', // 9 - Très foncé
  ],
  wellness: [
    '#f0fdf4', // 0 - Très clair
    '#dcfce7', // 1
    '#bbf7d0', // 2
    '#86efac', // 3
    '#4ade80', // 4
    '#22c55e', // 5
    '#16a34a', // 6 - Primaire
    '#15803d', // 7
    '#166534', // 8
    '#14532d', // 9 - Très foncé
  ],
  medical: [
    '#fef2f2', // 0 - Très clair
    '#fee2e2', // 1
    '#fecaca', // 2
    '#fca5a5', // 3
    '#f87171', // 4
    '#ef4444', // 5
    '#dc2626', // 6 - Primaire
    '#b91c1c', // 7
    '#991b1b', // 8
    '#7f1d1d', // 9 - Très foncé
  ],
}
```

#### Configuration des Composants

```typescript
components: {
  Button: {
    defaultProps: {
      radius: 'md',
      size: 'md',
    },
  },
  Card: {
    defaultProps: {
      radius: 'lg',
      withBorder: true,
      shadow: 'sm',
    },
  },
  // ... autres composants
}
```

#### Variables Personnalisées

```typescript
other: {
  gradients: {
    primary: 'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-cyan-6) 100%)',
    health: 'linear-gradient(135deg, var(--mantine-color-health-6) 0%, var(--mantine-color-wellness-6) 100%)',
    medical: 'linear-gradient(135deg, var(--mantine-color-medical-6) 0%, var(--mantine-color-red-6) 100%)',
  },
  colors: {
    success: 'var(--mantine-color-green-6)',
    warning: 'var(--mantine-color-yellow-6)',
    error: 'var(--mantine-color-red-6)',
    info: 'var(--mantine-color-blue-6)',
  },
  spacing: {
    section: '3rem',
    page: '2rem',
    card: '1.5rem',
  },
  radius: {
    card: '1rem',
    button: '0.75rem',
    input: '0.5rem',
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
}
```

## 🔧 Provider du Thème

### ThemeProvider (`src/shared/providers/ThemeProvider.tsx`)

```typescript
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <>
      <ColorSchemeScript />
      <MantineProvider theme={appTheme} defaultColorScheme="auto">
        {children}
      </MantineProvider>
    </>
  );
};
```

## 🎣 Hook Personnalisé

### useAppTheme (`src/shared/hooks/useAppTheme.ts`)

```typescript
export const useAppTheme = () => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  // Gradients personnalisés
  const gradients = {
    primary:
      'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-cyan-6) 100%)',
    health:
      'linear-gradient(135deg, var(--mantine-color-health-6) 0%, var(--mantine-color-wellness-6) 100%)',
    medical:
      'linear-gradient(135deg, var(--mantine-color-medical-6) 0%, var(--mantine-color-red-6) 100%)',
  };

  // Couleurs sémantiques
  const colors = {
    success: 'var(--mantine-color-green-6)',
    warning: 'var(--mantine-color-yellow-6)',
    error: 'var(--mantine-color-red-6)',
    info: 'var(--mantine-color-blue-6)',
  };

  // Fonctions utilitaires
  const isDark = colorScheme === 'dark';
  const isLight = colorScheme === 'light';

  // Styles conditionnels
  const getCardStyle = () => ({
    background: isDark ? 'var(--mantine-color-dark-7)' : 'white',
    border: isDark
      ? '1px solid var(--mantine-color-dark-4)'
      : '1px solid var(--mantine-color-gray-3)',
  });

  return {
    theme,
    colorScheme,
    toggleColorScheme,
    gradients,
    colors,
    spacing,
    radius,
    transitions,
    isDark,
    isLight,
    getCardStyle,
    getPaperStyle,
    getGradientStyle,
  };
};
```

## 🧩 Composants Thématisés

### 1. ThemedCard

```typescript
interface ThemedCardProps extends Omit<CardProps, 'style'> {
  variant?: 'default' | 'gradient' | 'elevated';
  gradientType?: 'primary' | 'secondary' | 'accent' | 'health' | 'medical';
}

// Utilisation
<ThemedCard variant="elevated">
  <Title>Contenu de la carte</Title>
  <Text>Description avec style adaptatif</Text>
</ThemedCard>
```

### 2. ThemedButton

```typescript
interface ThemedButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'health' | 'medical' | 'outline' | 'light';
}

// Utilisation
<ThemedButton variant="health" onClick={handleClick}>
  Action Santé
</ThemedButton>
```

### 3. ThemedPaper

```typescript
interface ThemedPaperProps extends Omit<PaperProps, 'style'> {
  variant?: 'default' | 'gradient' | 'elevated';
  gradientType?: 'primary' | 'secondary' | 'accent' | 'health' | 'medical';
}

// Utilisation
<ThemedPaper variant="gradient" gradientType="health">
  <Title c="white">Section Santé</Title>
</ThemedPaper>
```

## 🚀 Utilisation dans l'Application

### 1. Dans un Composant

```typescript
import { useAppTheme } from '@/shared/hooks/useAppTheme';
import { ThemedCard, ThemedButton } from '@/shared/ui';

const MyComponent = () => {
  const { isDark, gradients, colors } = useAppTheme();

  return (
    <ThemedCard variant="elevated">
      <Title>Mon Composant</Title>
      <Text>Mode sombre: {isDark ? 'Activé' : 'Désactivé'}</Text>
      <ThemedButton variant="health">
        Action
      </ThemedButton>
    </ThemedCard>
  );
};
```

### 2. Styles Conditionnels

```typescript
const { getCardStyle, getGradientStyle } = useAppTheme();

// Style adaptatif
const cardStyle = getCardStyle();

// Gradient personnalisé
const gradientStyle = getGradientStyle('health');
```

### 3. Couleurs Sémantiques

```typescript
const { colors } = useAppTheme();

// Utilisation des couleurs sémantiques
<Badge color="green" style={{ backgroundColor: colors.success }}>
  Succès
</Badge>
```

## 🎨 Palette de Couleurs

### Couleurs Principales

- **Health** : Bleu clair (#0284c7) - Pour les éléments de santé générale
- **Wellness** : Vert (#16a34a) - Pour les éléments de bien-être
- **Medical** : Rouge (#dc2626) - Pour les éléments médicaux

### Couleurs Sémantiques

- **Success** : Vert (#22c55e) - Actions réussies
- **Warning** : Jaune (#eab308) - Avertissements
- **Error** : Rouge (#ef4444) - Erreurs
- **Info** : Bleu (#3b82f6) - Informations

### Gradients

- **Primary** : Bleu vers Cyan
- **Health** : Health vers Wellness
- **Medical** : Medical vers Rouge
- **Secondary** : Vert vers Teal
- **Accent** : Purple vers Pink

## 🔄 Gestion du Thème Sombre

### Adaptation Automatique

- **Couleurs** : Adaptation automatique via variables CSS Mantine
- **Contraste** : Maintien des ratios de contraste appropriés
- **Lisibilité** : Optimisation des couleurs pour chaque mode

### Styles Conditionnels

```typescript
const getCardStyle = () => ({
  background: isDark ? 'var(--mantine-color-dark-7)' : 'white',
  border: isDark
    ? '1px solid var(--mantine-color-dark-4)'
    : '1px solid var(--mantine-color-gray-3)',
});
```

## 📱 Responsive Design

### Breakpoints

```typescript
breakpoints: {
  xs: '36em',   // 576px
  sm: '48em',   // 768px
  md: '62em',   // 992px
  lg: '75em',   // 1200px
  xl: '88em',   // 1408px
}
```

### Espacements Adaptatifs

```typescript
spacing: {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
}
```

## 🧪 Tests

### Test du Thème

```typescript
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ThemeDemo } from '@/shared/ui/ThemeDemo';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <MantineProvider theme={appTheme}>
      {component}
    </MantineProvider>
  );
};

it('displays theme information correctly', () => {
  renderWithTheme(<ThemeDemo />);
  expect(screen.getByText(/Démonstration du Thème Partagé/)).toBeInTheDocument();
});
```

## 📋 Bonnes Pratiques

### 1. Utilisation des Composants Thématisés

- **Préférer** `ThemedCard`, `ThemedButton`, `ThemedPaper` aux composants Mantine de base
- **Utiliser** les variants appropriés pour chaque contexte
- **Éviter** les styles inline quand possible

### 2. Gestion des Couleurs

- **Utiliser** les couleurs sémantiques (`colors.success`, `colors.error`)
- **Préférer** les gradients prédéfinis
- **Respecter** la hiérarchie des couleurs

### 3. Responsive Design

- **Utiliser** les breakpoints définis
- **Tester** sur différentes tailles d'écran
- **Optimiser** pour mobile-first

### 4. Performance

- **Éviter** les recalculs de styles
- **Utiliser** les variables CSS quand possible
- **Optimiser** les transitions

## 🔗 Intégration

### 1. Dans le Layout Principal

```typescript
// src/app/layout.tsx
import { ThemeProvider } from '@/shared/providers/ThemeProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          <AppNavbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Dans les Composants Existants

```typescript
// Remplacer
<Card style={{ background: 'white' }}>
  Contenu
</Card>

// Par
<ThemedCard variant="default">
  Contenu
</ThemedCard>
```

## 🎯 Avantages

### 1. **Cohérence Visuelle**

- Couleurs uniformes dans toute l'application
- Styles cohérents pour tous les composants
- Expérience utilisateur unifiée

### 2. **Maintenabilité**

- Configuration centralisée
- Modifications globales faciles
- Code plus propre et organisé

### 3. **Réutilisabilité**

- Composants thématisés réutilisables
- Patterns de design cohérents
- Développement plus rapide

### 4. **Accessibilité**

- Contraste approprié
- Support du thème sombre
- Lisibilité optimisée

---

_Documentation créée le 25/01/2025 - Thème Partagé Limitless Health_
