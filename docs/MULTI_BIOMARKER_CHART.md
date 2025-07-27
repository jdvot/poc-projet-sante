# 📊 MultiBiomarkerChart - Graphique Multi-Biomarqueurs

## 📋 Vue d'ensemble

Le composant `MultiBiomarkerChart` permet de visualiser simultanément plusieurs biomarqueurs sanguins dans le temps avec un graphique interactif et moderne, incluant le support complet du thème sombre/clair et des traductions multilingues.

## 🎯 Fonctionnalités Principales

### 1. **Visualisation Multi-Biomarqueurs**

#### ✅ Affichage Simultané

```typescript
<MultiBiomarkerChart
  data={bloodTestData}
  selectedBiomarkers={['glucose', 'cholesterol', 'hdl']}
  showReferenceLines={true}
  showBrush={true}
/>
```

**Avantages :**

- ✅ **Comparaison directe** : Visualisation de plusieurs biomarqueurs sur le même graphique
- ✅ **Sélection dynamique** : MultiSelect pour choisir les biomarqueurs à afficher
- ✅ **Couleurs distinctes** : Palette de couleurs unique pour chaque biomarqueur
- ✅ **Légende interactive** : Affichage des tendances pour chaque biomarqueur

### 2. **Support Complet du Thème**

#### ✅ Adaptation Automatique

```typescript
const { colorScheme } = useMantineColorScheme();

// Adaptation des couleurs selon le thème
const isDark = colorScheme === 'dark';
const gridColor = isDark ? '#373a40' : '#e2e8f0';
const textColor = isDark ? '#c1c2c5' : '#64748b';
```

**Éléments Adaptatifs :**

- **Grille** : Couleurs adaptées au thème
- **Axes** : Texte et lignes selon le thème
- **Tooltips** : Arrière-plan et bordures adaptés
- **Points** : Bordures adaptées au thème
- **Brush** : Couleurs de sélection adaptées

### 3. **Traductions Multilingues**

#### ✅ Support FR/EN Complet

```typescript
// Traductions intégrées
const { t } = useTranslation();

// Utilisation dans les composants
<Text>{t('bloodTest.title')}</Text>
<Text>{t('bloodTest.biomarkers.glucose')}</Text>
```

**Traductions Disponibles :**

- ✅ **Titres et descriptions** : Interface complètement traduite
- ✅ **Noms des biomarqueurs** : Traductions médicales précises
- ✅ **Messages d'interface** : Tooltips, légendes, contrôles
- ✅ **Unités de mesure** : Support des unités internationales

### 4. **Lignes de Référence**

#### ✅ Plages Normales

```typescript
const referenceLines = useMemo(() => {
  return visibleBiomarkers.flatMap((biomarker) => {
    const config = biomarkerConfig[biomarker];
    return [
      {
        y: config.normalRange[0], // Minimum
        stroke: config.color,
        strokeDasharray: '3 3',
        strokeOpacity: 0.5,
      },
      {
        y: config.normalRange[1], // Maximum
        stroke: config.color,
        strokeDasharray: '3 3',
        strokeOpacity: 0.5,
      },
    ];
  });
}, [visibleBiomarkers, showRefs]);
```

**Fonctionnalités :**

- ✅ **Lignes pointillées** : Indication visuelle des plages normales
- ✅ **Couleurs cohérentes** : Même couleur que le biomarqueur
- ✅ **Activation/désactivation** : Switch pour contrôler l'affichage
- ✅ **Labels informatifs** : Description des plages min/max

### 5. **Outil de Sélection (Brush)**

#### ✅ Zoom Temporel

```typescript
{showBrushTool && (
  <Brush
    dataKey="date"
    height={30}
    stroke={colorScheme === 'dark' ? '#373a40' : '#e2e8f0'}
    fill={colorScheme === 'dark' ? '#25262b' : '#f8fafc'}
  />
)}
```

**Fonctionnalités :**

- ✅ **Sélection de période** : Zoom sur une période spécifique
- ✅ **Adaptation au thème** : Couleurs selon le mode sombre/clair
- ✅ **Contrôle utilisateur** : Activation/désactivation via switch
- ✅ **Interface intuitive** : Glisser-déposer pour sélectionner

### 6. **Analyse des Tendances**

#### ✅ Calculs Automatiques

```typescript
const trends = useMemo(() => {
  const trendsData: Record<string, { direction: string; percentage: number }> =
    {};

  visibleBiomarkers.forEach((biomarker) => {
    const values = chartData.map((point) => point[biomarker]).filter(Boolean);
    if (values.length >= 2) {
      const firstValue = values[0];
      const lastValue = values[values.length - 1];
      const percentage = ((lastValue - firstValue) / firstValue) * 100;

      trendsData[biomarker] = {
        direction: percentage > 2 ? 'up' : percentage < -2 ? 'down' : 'stable',
        percentage: Math.abs(percentage),
      };
    }
  });

  return trendsData;
}, [chartData, visibleBiomarkers]);
```

**Indicateurs :**

- 🟢 **En baisse** : Amélioration (flèche verte)
- 🔴 **En hausse** : Dégradation (flèche rouge)
- 🔵 **Stable** : Pas de changement significatif (icône stable)
- 📊 **Pourcentage** : Variation précise en pourcentage

## 🎨 Design System

### **Palette de Couleurs par Biomarqueur**

| Biomarqueur       | Couleur | Code Hex  | Signification       |
| ----------------- | ------- | --------- | ------------------- |
| **Glucose**       | Bleu    | `#3b82f6` | Glycémie            |
| **Cholestérol**   | Rouge   | `#ef4444` | Lipides             |
| **Triglycérides** | Orange  | `#f59e0b` | Graisses            |
| **HDL**           | Vert    | `#10b981` | Bon cholestérol     |
| **LDL**           | Violet  | `#8b5cf6` | Mauvais cholestérol |
| **Créatinine**    | Cyan    | `#06b6d4` | Fonction rénale     |
| **Hémoglobine**   | Rose    | `#ec4899` | Transport O₂        |

### **Adaptation Thématique**

#### **Mode Clair**

- **Arrière-plan** : `#ffffff`
- **Bordures** : `#e2e8f0`
- **Grille** : `#e2e8f0`
- **Texte** : `#64748b`
- **Points** : Bordure blanche

#### **Mode Sombre**

- **Arrière-plan** : `#1a1b1e`
- **Bordures** : `#373a40`
- **Grille** : `#373a40`
- **Texte** : `#c1c2c5`
- **Points** : Bordure sombre

## 📊 Données et Structure

### **Interface TypeScript**

```typescript
interface BloodTestData {
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

interface MultiBiomarkerChartProps {
  data: BloodTestData[];
  selectedBiomarkers?: string[];
  showReferenceLines?: boolean;
  showBrush?: boolean;
}
```

### **Données Mockées Étendues**

```typescript
const mockBloodTestData: BloodTestData[] = [
  // 6 mois de données (janvier à juin 2024)
  // Évolution réaliste des biomarqueurs
  // Scores de santé globaux
  // Statuts de santé
];
```

## 🔧 Technologies Utilisées

### **Recharts Avancé**

- **LineChart** : Graphique principal multi-lignes
- **ReferenceLine** : Lignes de référence pour les plages normales
- **Brush** : Outil de sélection temporelle
- **ResponsiveContainer** : Adaptation automatique
- **Tooltip personnalisé** : Informations détaillées

### **Mantine UI v7**

- **useMantineColorScheme** : Détection automatique du thème
- **MultiSelect** : Sélection multiple de biomarqueurs
- **Switch** : Contrôles d'affichage
- **ActionIcon** : Boutons d'action
- **Composants adaptatifs** : Thème automatique

### **React Hooks Optimisés**

- **useMemo** : Calculs de tendances mémorisés
- **useState** : Gestion des contrôles utilisateur
- **useTranslation** : Support multilingue
- **Performance** : Re-renders minimisés

## 📱 Responsive Design

### **Breakpoints**

- **Mobile (< 768px)** : Graphique plein écran, contrôles empilés
- **Tablet (≥ 768px)** : Interface adaptée, légende réorganisée
- **Desktop (≥ 1024px)** : Toutes les fonctionnalités, layout optimal

### **Adaptations**

- **Hauteur** : 500px fixe pour la cohérence
- **Largeur** : 100% responsive
- **MultiSelect** : Adaptation selon l'espace disponible
- **Légende** : Réorganisation automatique

## 🚀 Performance

### **Optimisations Appliquées**

- ✅ **Mémorisation** : `useMemo` pour les calculs coûteux
- ✅ **Re-renders** : Minimisés avec des dépendances optimisées
- ✅ **Données** : Transformation optimisée pour Recharts
- ✅ **Thème** : Adaptation fluide sans recalculs

### **Métriques Cibles**

- ⚡ Rendu initial : < 150ms
- ⚡ Changement de biomarqueur : < 50ms
- ⚡ Changement de thème : < 30ms
- ⚡ Animations : 60fps fluides

## 🔮 Évolutions Futures

### **Fonctionnalités Prévisionnelles**

- [ ] **Export de graphiques** : PNG, PDF, SVG
- [ ] **Annotations médicales** : Notes sur les points de données
- [ ] **Alertes visuelles** : Indicateurs pour valeurs hors norme
- [ ] **Comparaisons** : Comparaison avec valeurs cibles
- [ ] **Filtres temporels** : Sélection de périodes prédéfinies

### **Améliorations Techniques**

- [ ] **Données temps réel** : Intégration APIs médicales
- [ ] **Animations avancées** : Transitions fluides
- [ ] **Accessibilité** : Support lecteurs d'écran
- [ ] **PWA features** : Mode hors ligne

## 📝 Utilisation

### **Intégration Simple**

```typescript
import { MultiBiomarkerChart } from './components/MultiBiomarkerChart';

// Dans le dashboard
<MultiBiomarkerChart
  data={bloodTestData}
  selectedBiomarkers={['glucose', 'cholesterol', 'hdl']}
  showReferenceLines={true}
  showBrush={true}
/>
```

### **Props Disponibles**

```typescript
interface MultiBiomarkerChartProps {
  data: BloodTestData[]; // Données des prises de sang
  selectedBiomarkers?: string[]; // Biomarqueurs sélectionnés
  showReferenceLines?: boolean; // Afficher les lignes de référence
  showBrush?: boolean; // Afficher l'outil de sélection
}
```

---

**Référence :** Ce composant offre une visualisation complète et interactive de multiples biomarqueurs sanguins avec support complet du thème et des traductions pour un suivi médical optimal.
