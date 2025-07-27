# 🏥 PROFILE HEALTH DATA DESIGN RULES

## 📋 Vue d'ensemble

Ce document définit les règles de design pour l'affichage des données de santé dans le profil utilisateur. Le design remplace les ronds traditionnels par un système moderne de cartes et de métriques visuelles.

## 🎨 Architecture du Design

### Structure Générale

```
HealthStats Component
├── Header Section
│   ├── Icon + Title + Subtitle
├── BMI Score Card (Principal)
│   ├── Score avec Badge coloré
│   ├── Barre de progression
│   └── Description
├── Metrics Grid (4 cartes)
│   ├── Height Card
│   ├── Weight Card
│   ├── Ideal Weight Card
│   └── BMR Card
└── Recommendations Card
    └── Conseils personnalisés
```

## 🎯 Composants Principaux

### 1. BMI Score Card - Élément Principal

**Objectif :** Afficher le score BMI de manière proéminente avec contexte visuel.

**Structure :**

```typescript
<Card>
  <Group>
    <IconTarget />
    <Text>Score BMI</Text>
    <Badge color={bmiColor}>{bmiValue}</Badge>
  </Group>
  <Progress value={percentage} color={bmiColor} />
  <Text>Description</Text>
</Card>
```

**Règles de Couleur BMI :**

- **BMI < 18.5** : `blue` (Insuffisance pondérale)
- **BMI 18.5-24.9** : `green` (Poids normal)
- **BMI 25-29.9** : `orange` (Surpoids)
- **BMI ≥ 30** : `red` (Obésité)

### 2. Metrics Grid - Grille de Métriques

**Objectif :** Afficher les mesures principales dans des cartes compactes.

**Layout :**

- **Mobile** : 2x2 grid (6 colonnes par carte)
- **Desktop** : 1x4 grid (3 colonnes par carte)

**Structure de Carte :**

```typescript
<Paper>
  <Stack align="center">
    <IconCircle /> {/* Icône dans cercle coloré */}
    <Text size="xl" fw={700}>{value}</Text>
    <Badge>{unit}</Badge>
    <Text size="xs">{label}</Text>
  </Stack>
</Paper>
```

## 🎨 Système de Couleurs

### Palette de Couleurs par Métrique

| Métrique        | Couleur Principale | Gradient            | Arrière-plan        |
| --------------- | ------------------ | ------------------- | ------------------- |
| **Taille**      | `#06b6d4` (Cyan)   | `#06b6d4 → #0891b2` | `#ecfeff → #cffafe` |
| **Poids**       | `#3b82f6` (Bleu)   | `#3b82f6 → #1d4ed8` | `#eff6ff → #dbeafe` |
| **Poids Idéal** | `#10b981` (Vert)   | `#10b981 → #059669` | `#ecfdf5 → #d1fae5` |
| **BMR**         | `#f59e0b` (Orange) | `#f59e0b → #d97706` | `#fffbeb → #fef3c7` |

### Règles de Couleur

1. **Cohérence** : Chaque métrique a sa couleur dédiée
2. **Contraste** : Icônes blanches sur fonds colorés
3. **Accessibilité** : Couleurs respectant les standards WCAG
4. **Thème** : Adaptation automatique dark/light mode

## 📱 Responsive Design

### Breakpoints

```typescript
// Mobile (base)
<Grid.Col span={6}>

// Small screens (sm)
<Grid.Col span={{ base: 6, sm: 3 }}>
```

### Comportement

- **Mobile (< 768px)** : 2 cartes par ligne
- **Tablet (≥ 768px)** : 4 cartes par ligne
- **Desktop (≥ 1024px)** : 4 cartes par ligne

## 🔧 Composants Techniques

### Imports Requis

```typescript
import {
  Group,
  Stack,
  Text,
  Card,
  Box,
  Title,
  Progress,
  Badge,
  Grid,
  Paper,
} from '@mantine/core';
import {
  IconHeart,
  IconScale,
  IconRuler,
  IconBrain,
  IconFlame,
  IconStar,
  IconTarget,
  IconChartBar,
} from '@tabler/icons-react';
```

### Hooks Utilisés

```typescript
import { useHealthCalculations } from '../hooks/useHealthCalculations';
import { useProfileTranslations } from '../hooks/useProfileTranslations';
import { useUnitConversion } from '../../../shared/hooks/useUnitConversion';
```

## 📊 Logique Métier

### Calculs de Données

```typescript
// Conversion des unités
const heightInCm = unitConversion.height.fromDisplay(heightNum);
const weightInKg = unitConversion.weight.fromDisplay(weightNum);

// Calculs de santé
const stats = useHealthCalculations({
  height: heightInCm,
  weight: weightInKg,
  age: ageNum,
  gender,
});

// Pourcentage BMI pour la barre de progression
const getBmiPercentage = (bmi: number) => {
  if (bmi < 18.5) return (bmi / 18.5) * 100;
  if (bmi < 25) return 100;
  if (bmi < 30) return Math.min(100 + ((bmi - 25) / 5) * 50, 150);
  return Math.min(150 + ((bmi - 30) / 10) * 50, 200);
};
```

### Affichage des Valeurs

```typescript
// Taille - Arrondi pour les pieds
{
  unitConversion.height.unit === 'ft' ? Math.floor(heightNum) : heightNum;
}

// Poids - Arrondi pour les livres
{
  unitConversion.weight.unit === 'lbs' ? Math.round(weightNum) : weightNum;
}

// BMR - Toujours arrondi
{
  Math.round(stats.bmr);
}
```

## 🎯 Bonnes Pratiques

### 1. Structure des Composants

- **Séparation des responsabilités** : Chaque section dans sa propre carte
- **Hiérarchie visuelle** : BMI en premier, métriques secondaires ensuite
- **Cohérence** : Même structure pour toutes les cartes de métriques

### 2. Accessibilité

- **Contraste suffisant** : Couleurs respectant WCAG 2.1 AA
- **Textes alternatifs** : Tooltips sur les icônes
- **Navigation clavier** : Focus visible sur les éléments interactifs

### 3. Performance

- **Calculs optimisés** : Utilisation de `useMemo` pour les calculs coûteux
- **Rendu conditionnel** : Affichage des cartes selon les données disponibles
- **Lazy loading** : Chargement des composants selon les besoins

### 4. Internationalisation

- **Traductions** : Utilisation du hook `useProfileTranslations`
- **Unités dynamiques** : Adaptation selon les préférences utilisateur
- **Formats locaux** : Affichage des nombres selon la locale

## 🔄 Évolutions Futures

### Améliorations Possibles

1. **Animations** : Transitions fluides entre les états
2. **Graphiques** : Ajout de mini-graphiques pour les tendances
3. **Comparaisons** : Affichage des valeurs cibles vs actuelles
4. **Alertes** : Notifications visuelles pour les valeurs critiques

### Extensibilité

- **Nouvelles métriques** : Ajout facile de nouvelles cartes
- **Thèmes personnalisés** : Système de couleurs extensible
- **Layouts alternatifs** : Possibilité de changer l'agencement

## 📝 Notes de Développement

### Décisions de Design

1. **Remplacement des ronds** : Choix pour un design plus moderne et informatif
2. **Grille responsive** : Adaptation automatique aux différentes tailles d'écran
3. **Couleurs sémantiques** : Utilisation de couleurs pour transmettre du sens
4. **Hiérarchie claire** : BMI en vedette, autres métriques en support

### Considérations Techniques

- **Compatibilité Mantine** : Utilisation des composants Mantine v7+
- **TypeScript** : Typage strict pour toutes les props et données
- **Tests** : Couverture de tests pour les calculs et l'affichage
- **Performance** : Optimisation des re-renders et calculs

---

**Référence :** Ce document sert de guide pour maintenir la cohérence du design des données de santé dans le profil utilisateur de Limitless Health.
