# 🧩 Types et Composants Atomiques - Limitless Health

## 🎯 Objectif

Créer une architecture de types et composants atomiques réutilisables pour le dashboard et les interfaces utilisateur, en assurant une cohérence, une maintenabilité et une extensibilité optimales.

## 📁 Structure des Fichiers

### 1. **Types Partagés** (`src/shared/types/`)

```
src/shared/types/
├── index.ts              # Point d'entrée des types
├── profile.ts            # Types pour le profil utilisateur
├── dashboard.ts          # Types pour le dashboard et la santé
└── ui.ts                 # Types pour les composants UI
```

### 2. **Composants Atomiques** (`src/shared/ui/`)

```
src/shared/ui/
├── AtomicCard.tsx        # Carte atomique réutilisable
├── AtomicBadge.tsx       # Badge atomique avec statuts
├── AtomicProgress.tsx    # Barre de progression atomique
├── AtomicAlert.tsx       # Alerte atomique
├── AtomicBiomarkerItem.tsx # Élément de biomarqueur atomique
└── index.ts              # Export des composants
```

## 🏗️ Architecture des Types

### 1. **Types de Base pour la Santé** (`dashboard.ts`)

#### ✅ **BloodTestData**

```typescript
export interface BloodTestData {
  id: string;
  date: string;
  biomarkers: {
    glucose: number;
    cholesterol: number;
    triglycerides: number;
    hdl: number;
    ldl: number;
    creatinine: number;
    hemoglobin: number;
  };
  overallScore: number;
  status: 'normal' | 'elevated' | 'high' | 'critical';
}
```

#### ✅ **BiomarkerData**

```typescript
export interface BiomarkerData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'elevated' | 'high' | 'critical';
  trend?: 'up' | 'down' | 'stable';
  lastUpdate?: string;
  normalRange?: [number, number];
  color?: string;
  strokeWidth?: number;
}
```

#### ✅ **DashboardStatistics**

```typescript
export interface DashboardStatistics {
  healthScore: number;
  normal: number;
  elevated: number;
  high: number;
  critical: number;
  total?: number;
}
```

#### ✅ **HealthStatus**

```typescript
export type HealthStatus = 'normal' | 'elevated' | 'high' | 'critical';

export interface HealthStatusConfig {
  color: string;
  icon: React.ComponentType<any>;
  gradient: string;
  bgGradient: string;
  label: string;
  description: string;
}

export type HealthStatusConfigs = Record<HealthStatus, HealthStatusConfig>;
```

### 2. **Types pour les Graphiques** (`dashboard.ts`)

#### ✅ **ChartBaseProps**

```typescript
export interface ChartBaseProps {
  data: BloodTestData[];
  height?: number | string;
  width?: number | string;
  className?: string;
}
```

#### ✅ **BloodTestChartProps**

```typescript
export interface BloodTestChartProps extends ChartBaseProps {
  selectedBiomarker?: string;
  chartType?: 'line' | 'area' | 'bar';
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
}
```

#### ✅ **MultiBiomarkerChartProps**

```typescript
export interface MultiBiomarkerChartProps extends ChartBaseProps {
  selectedBiomarkers?: string[];
  showReferenceLines?: boolean;
  showBrush?: boolean;
  brushRange?: [Date, Date];
  onBrushChange?: (range: [Date, Date]) => void;
  maxVisibleBiomarkers?: number;
}
```

### 3. **Types pour les Composants Atomiques** (`dashboard.ts`)

#### ✅ **AtomicCardProps**

```typescript
export interface AtomicCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withBorder?: boolean;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  hoverable?: boolean;
}
```

#### ✅ **AtomicBadgeProps**

```typescript
export interface AtomicBadgeProps {
  label: string;
  status?: HealthStatus;
  variant?: 'filled' | 'light' | 'outline' | 'dot' | 'gradient';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  icon?: React.ReactNode;
  rightSection?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```

#### ✅ **AtomicProgressProps**

```typescript
export interface AtomicProgressProps {
  value: number;
  max?: number;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'gradient' | 'striped';
  color?: string;
  showValue?: boolean;
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```

#### ✅ **AtomicAlertProps**

```typescript
export interface AtomicAlertProps {
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  variant?: 'light' | 'filled' | 'outline';
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
```

#### ✅ **BiomarkerItemProps**

```typescript
export interface BiomarkerItemProps {
  biomarker: BiomarkerData;
  showTrend?: boolean;
  showLastUpdate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact' | 'detailed';
}
```

### 4. **Types pour les Filtres et Actions** (`dashboard.ts`)

#### ✅ **DashboardFilters**

```typescript
export interface DashboardFilters {
  dateRange?: [Date, Date];
  biomarkers?: string[];
  status?: HealthStatus[];
  chartType?: 'line' | 'area' | 'bar';
}
```

#### ✅ **DashboardActions**

```typescript
export interface DashboardActions {
  onBiomarkerSelect?: (biomarker: string) => void;
  onDateRangeChange?: (range: [Date, Date]) => void;
  onStatusFilter?: (status: HealthStatus[]) => void;
  onChartTypeChange?: (type: 'line' | 'area' | 'bar') => void;
  onRefresh?: () => void;
  onExport?: (format: 'csv' | 'pdf' | 'png') => void;
}
```

### 5. **Types pour les Hooks** (`dashboard.ts`)

#### ✅ **UseDashboardReturn**

```typescript
export interface UseDashboardReturn {
  data: BloodTestData[];
  statistics: DashboardStatistics;
  loading: boolean;
  error: Error | null;
  filters: DashboardFilters;
  actions: DashboardActions;
  refresh: () => void;
}
```

#### ✅ **UseBiomarkerConfigReturn**

```typescript
export interface UseBiomarkerConfigReturn {
  configs: BiomarkerConfigs;
  getConfig: (biomarker: string) => BiomarkerConfig | null;
  getColor: (biomarker: string) => string;
  getNormalRange: (biomarker: string) => [number, number] | null;
}
```

## 🧩 Composants Atomiques

### 1. **AtomicCard** - Carte Réutilisable

#### ✅ **Fonctionnalités**

- **Variants** : `default`, `elevated`, `outlined`, `gradient`
- **Tailles** : `sm`, `md`, `lg`
- **Thème adaptatif** : Light/Dark mode
- **Animations** : Hover effects
- **Flexibilité** : Header, footer, actions, icon

#### ✅ **Utilisation**

```typescript
import { AtomicCard } from '../shared/ui/AtomicCard';

<AtomicCard
  title="Health Score"
  subtitle="Your overall health assessment"
  variant="elevated"
  size="lg"
  icon={<IconHeart size={24} />}
  actions={<Button>View Details</Button>}
  hoverable
>
  <Text>Your health score is 85/100</Text>
</AtomicCard>
```

#### ✅ **Props Principales**

- `title` - Titre de la carte
- `subtitle` - Sous-titre descriptif
- `variant` - Style visuel (default, elevated, outlined, gradient)
- `size` - Taille du composant (sm, md, lg)
- `icon` - Icône dans l'en-tête
- `actions` - Actions dans l'en-tête
- `footer` - Contenu du pied de page
- `hoverable` - Effet de survol
- `loading` - État de chargement

### 2. **AtomicBadge** - Badge avec Statuts

#### ✅ **Fonctionnalités**

- **Statuts de santé** : `normal`, `elevated`, `high`, `critical`
- **Variants** : `filled`, `light`, `outline`, `dot`, `gradient`
- **Tailles** : `xs`, `sm`, `md`, `lg`
- **Couleurs automatiques** selon le statut
- **Icônes et sections** personnalisables

#### ✅ **Utilisation**

```typescript
import { AtomicBadge } from '../shared/ui/AtomicBadge';

<AtomicBadge
  label="Glucose"
  status="elevated"
  variant="light"
  icon={<IconTrendingUp size={12} />}
  rightSection={<Text size="xs">6.2 mmol/L</Text>}
/>
```

#### ✅ **Props Principales**

- `label` - Texte du badge
- `status` - Statut de santé (normal, elevated, high, critical)
- `variant` - Style visuel (filled, light, outline, dot, gradient)
- `color` - Couleur personnalisée (override le statut)
- `icon` - Icône à gauche
- `rightSection` - Contenu à droite
- `fullWidth` - Largeur complète

### 3. **AtomicProgress** - Barre de Progression

#### ✅ **Fonctionnalités**

- **Couleurs automatiques** selon la valeur
- **Variants** : `default`, `gradient`, `striped`
- **Tailles** : `xs`, `sm`, `md`, `lg`, `xl`
- **Animations** : Striped et animated
- **Labels et valeurs** configurables

#### ✅ **Utilisation**

```typescript
import { AtomicProgress } from '../shared/ui/AtomicProgress';

<AtomicProgress
  value={75}
  max={100}
  label="Health Score"
  variant="gradient"
  size="lg"
  showValue
  animated
/>
```

#### ✅ **Props Principales**

- `value` - Valeur actuelle
- `max` - Valeur maximale (défaut: 100)
- `label` - Label de la barre
- `variant` - Style visuel (default, gradient, striped)
- `color` - Couleur personnalisée
- `showValue` - Afficher le pourcentage
- `animated` - Animation de la barre

### 4. **AtomicAlert** - Alerte Réutilisable

#### ✅ **Fonctionnalités**

- **Types** : `info`, `success`, `warning`, `error`
- **Variants** : `light`, `filled`, `outline`
- **Fermeture** : Optionnelle avec callback
- **Icônes** personnalisables
- **Thème adaptatif**

#### ✅ **Utilisation**

```typescript
import { AtomicAlert } from '../shared/ui/AtomicAlert';

<AtomicAlert
  title="Data Updated"
  message="Your health data has been successfully updated."
  type="success"
  variant="light"
  closable
  onClose={() => console.log('Alert closed')}
/>
```

#### ✅ **Props Principales**

- `title` - Titre de l'alerte
- `message` - Message principal
- `type` - Type d'alerte (info, success, warning, error)
- `variant` - Style visuel (light, filled, outline)
- `icon` - Icône personnalisée
- `closable` - Bouton de fermeture
- `onClose` - Callback de fermeture

### 5. **AtomicBiomarkerItem** - Élément de Biomarqueur

#### ✅ **Fonctionnalités**

- **Layouts** : Horizontal et vertical
- **Variants** : `default`, `compact`, `detailed`
- **Tailles** : `sm`, `md`, `lg`
- **Tendances** : Icônes up/down/stable
- **Statuts** : Couleurs automatiques
- **Détails** : Plages normales, dernières mises à jour

#### ✅ **Utilisation**

```typescript
import { AtomicBiomarkerItem } from '../shared/ui/AtomicBiomarkerItem';

<AtomicBiomarkerItem
  biomarker={{
    id: '1',
    name: 'Glucose',
    value: 6.2,
    unit: 'mmol/L',
    status: 'elevated',
    trend: 'up',
    normalRange: [3.9, 6.1],
    lastUpdate: '2024-01-15'
  }}
  variant="detailed"
  size="lg"
  showTrend
  showLastUpdate
/>
```

#### ✅ **Props Principales**

- `biomarker` - Données du biomarqueur
- `variant` - Style d'affichage (default, compact, detailed)
- `size` - Taille du composant (sm, md, lg)
- `showTrend` - Afficher les icônes de tendance
- `showLastUpdate` - Afficher la dernière mise à jour

## 🔧 Utilisation dans les Composants

### 1. **Dashboard avec Composants Atomiques**

```typescript
import React from 'react';
import { Container, Stack, Grid } from '@mantine/core';
import {
  AtomicCard,
  AtomicBadge,
  AtomicProgress,
  AtomicAlert,
  AtomicBiomarkerItem,
} from '../shared/ui';
import { BloodTestData, BiomarkerData } from '../shared/types';

const Dashboard: React.FC = () => {
  const healthData: BloodTestData = {
    id: '1',
    date: '2024-01-15',
    biomarkers: {
      glucose: 6.2,
      cholesterol: 5.5,
      triglycerides: 1.8,
      hdl: 1.2,
      ldl: 3.8,
      creatinine: 95,
      hemoglobin: 13.5,
    },
    overallScore: 75,
    status: 'elevated',
  };

  const biomarker: BiomarkerData = {
    id: '1',
    name: 'Glucose',
    value: 6.2,
    unit: 'mmol/L',
    status: 'elevated',
    trend: 'up',
    normalRange: [3.9, 6.1],
    lastUpdate: '2024-01-15',
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Carte de score de santé */}
        <AtomicCard
          title="Health Score"
          subtitle="Your overall health assessment"
          variant="elevated"
          icon={<IconHeart size={24} />}
        >
          <AtomicProgress
            value={healthData.overallScore}
            label="Overall Health"
            variant="gradient"
            size="lg"
            showValue
            animated
          />
        </AtomicCard>

        {/* Grille de biomarqueurs */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <AtomicBiomarkerItem
              biomarker={biomarker}
              variant="detailed"
              size="lg"
              showTrend
              showLastUpdate
            />
          </Grid.Col>
        </Grid>

        {/* Alertes */}
        <AtomicAlert
          title="Attention Required"
          message="Your glucose levels are elevated. Consider consulting your healthcare provider."
          type="warning"
          variant="light"
          closable
        />
      </Stack>
    </Container>
  );
};
```

### 2. **Composant de Statistiques**

```typescript
import React from 'react';
import { Group, Stack } from '@mantine/core';
import { AtomicCard, AtomicBadge, AtomicProgress } from '../shared/ui';
import { DashboardStatistics } from '../shared/types';

interface DashboardStatsProps {
  statistics: DashboardStatistics;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ statistics }) => {
  return (
    <Stack gap="md">
      <AtomicCard
        title="Health Statistics"
        subtitle="Overview of your health metrics"
        variant="outlined"
      >
        <Stack gap="md">
          {/* Score de santé global */}
          <AtomicProgress
            value={statistics.healthScore}
            label="Health Score"
            variant="gradient"
            size="lg"
            showValue
            animated
          />

          {/* Badges de statut */}
          <Group>
            <AtomicBadge
              label="Normal"
              status="normal"
              variant="light"
              rightSection={<Text size="xs">{statistics.normal}</Text>}
            />
            <AtomicBadge
              label="Elevated"
              status="elevated"
              variant="light"
              rightSection={<Text size="xs">{statistics.elevated}</Text>}
            />
            <AtomicBadge
              label="High"
              status="high"
              variant="light"
              rightSection={<Text size="xs">{statistics.high}</Text>}
            />
            <AtomicBadge
              label="Critical"
              status="critical"
              variant="light"
              rightSection={<Text size="xs">{statistics.critical}</Text>}
            />
          </Group>
        </Stack>
      </AtomicCard>
    </Stack>
  );
};
```

## 🧪 Tests des Composants Atomiques

### 1. **Test d'AtomicCard**

```typescript
import { render, screen } from '@testing-library/react';
import { AtomicCard } from '../shared/ui/AtomicCard';

describe('AtomicCard', () => {
  it('renders with title and content', () => {
    render(
      <AtomicCard title="Test Card" subtitle="Test Subtitle">
        <div>Test Content</div>
      </AtomicCard>
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies different variants correctly', () => {
    const { rerender } = render(
      <AtomicCard variant="elevated" title="Test">
        Content
      </AtomicCard>
    );

    const card = screen.getByText('Test').closest('.mantine-Card-root');
    expect(card).toHaveStyle({ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' });

    rerender(
      <AtomicCard variant="outlined" title="Test">
        Content
      </AtomicCard>
    );

    expect(card).toHaveStyle({ background: 'transparent' });
  });
});
```

### 2. **Test d'AtomicBadge**

```typescript
import { render, screen } from '@testing-library/react';
import { AtomicBadge } from '../shared/ui/AtomicBadge';

describe('AtomicBadge', () => {
  it('renders with correct status color', () => {
    render(<AtomicBadge label="Test" status="normal" />);

    const badge = screen.getByText('Test');
    expect(badge).toHaveClass('mantine-Badge-root');
  });

  it('applies custom color when provided', () => {
    render(<AtomicBadge label="Test" status="normal" color="purple" />);

    const badge = screen.getByText('Test');
    expect(badge).toHaveStyle({ color: 'var(--mantine-color-purple-6)' });
  });
});
```

## 🚀 Avantages

### 1. **Cohérence Globale**

- ✅ **Types standardisés** pour toutes les données de santé
- ✅ **Composants uniformes** dans toute l'application
- ✅ **Terminologie cohérente** pour les statuts et métriques
- ✅ **Design system** unifié

### 2. **Maintenabilité**

- ✅ **Types TypeScript** stricts et documentés
- ✅ **Composants modulaires** et réutilisables
- ✅ **Props bien définies** avec valeurs par défaut
- ✅ **Séparation des responsabilités** claire

### 3. **Extensibilité**

- ✅ **Architecture modulaire** facile à étendre
- ✅ **Types génériques** pour de nouveaux biomarqueurs
- ✅ **Composants configurables** pour différents cas d'usage
- ✅ **Hooks personnalisés** pour la logique métier

### 4. **Performance**

- ✅ **Composants optimisés** avec React.memo si nécessaire
- ✅ **Rendu conditionnel** pour les éléments optionnels
- ✅ **Styles CSS-in-JS** optimisés
- ✅ **Bundle splitting** naturel

### 5. **Expérience Développeur**

- ✅ **IntelliSense complet** avec TypeScript
- ✅ **Props typées** avec validation
- ✅ **Exemples d'utilisation** documentés
- ✅ **Tests unitaires** couvrants

## 🔮 Améliorations Futures

### 1. **Nouveaux Composants Atomiques**

- 🔮 **AtomicChart** - Graphiques réutilisables
- 🔮 **AtomicTable** - Tableaux de données
- 🔮 **AtomicForm** - Formulaires atomiques
- 🔮 **AtomicModal** - Modales et dialogs
- 🔮 **AtomicMenu** - Menus et dropdowns

### 2. **Fonctionnalités Avancées**

- 🔮 **Animations** plus sophistiquées
- 🔮 **Accessibilité** améliorée (ARIA, navigation clavier)
- 🔮 **Internationalisation** intégrée
- 🔮 **Thèmes personnalisés** par utilisateur

### 3. **Outils de Développement**

- 🔮 **Storybook** pour tous les composants
- 🔮 **Tests visuels** avec Chromatic
- 🔮 **Documentation interactive** avec MDX
- 🔮 **Générateur de composants** automatisé

### 4. **Intégration Avancée**

- 🔮 **GraphQL** avec types générés
- 🔮 **State management** avec Zustand
- 🔮 **Caching** avec React Query
- 🔮 **PWA** avec service workers

## 📊 Composants Créés

### ✅ **Types Créés (15/15)**

- [x] **BloodTestData** - Données de prise de sang
- [x] **BiomarkerData** - Données de biomarqueurs
- [x] **DashboardStatistics** - Statistiques du dashboard
- [x] **HealthStatus** - Statuts de santé
- [x] **ChartBaseProps** - Props de base pour graphiques
- [x] **BloodTestChartProps** - Props pour graphiques de sang
- [x] **MultiBiomarkerChartProps** - Props pour graphiques multi-biomarqueurs
- [x] **AtomicCardProps** - Props pour cartes atomiques
- [x] **AtomicBadgeProps** - Props pour badges atomiques
- [x] **AtomicProgressProps** - Props pour barres de progression
- [x] **AtomicAlertProps** - Props pour alertes atomiques
- [x] **BiomarkerItemProps** - Props pour éléments de biomarqueurs
- [x] **DashboardFilters** - Filtres du dashboard
- [x] **DashboardActions** - Actions du dashboard
- [x] **UseDashboardReturn** - Retour du hook dashboard

### ✅ **Composants Créés (5/5)**

- [x] **AtomicCard** - Carte réutilisable avec variants
- [x] **AtomicBadge** - Badge avec statuts de santé
- [x] **AtomicProgress** - Barre de progression adaptative
- [x] **AtomicAlert** - Alerte réutilisable
- [x] **AtomicBiomarkerItem** - Élément de biomarqueur

### ✅ **Intégration Technique (5/5)**

- [x] **Types exportés** dans index.ts
- [x] **Composants exportés** dans ui/index.ts
- [x] **Documentation complète** créée
- [x] **Exemples d'utilisation** fournis
- [x] **Tests de base** implémentés

## 🎉 **Résultat Final**

**L'architecture de types et composants atomiques est maintenant complète et fonctionnelle !**

- ✅ **Types TypeScript** stricts et documentés
- ✅ **Composants atomiques** réutilisables et configurables
- ✅ **Architecture modulaire** et extensible
- ✅ **Design system** cohérent
- ✅ **Documentation exhaustive** avec exemples
- ✅ **Tests de base** implémentés
- ✅ **Intégration technique** parfaite

L'application dispose maintenant d'une **base solide et évolutive** pour tous les composants de santé et d'interface utilisateur ! 🧩⚡✨

---

_Documentation créée le 25/01/2025 - Types et Composants Atomiques Limitless Health_
