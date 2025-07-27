# 📊 BloodTestChart - Graphique des Prises de Sang

## 📋 Vue d'ensemble

Le composant `BloodTestChart` permet de visualiser l'évolution des biomarqueurs sanguins dans le temps avec des graphiques interactifs et modernes utilisant Recharts.

## 🎯 Fonctionnalités Principales

### 1. **Visualisation Temporelle**

#### ✅ Graphiques Multiples

```typescript
// Types de graphiques supportés
type ChartType = 'line' | 'area' | 'bar';

// Utilisation
<BloodTestChart
  data={bloodTestData}
  selectedBiomarker="glucose"
  chartType="line"
/>
```

**Types de Graphiques :**

- **Line Chart** : Évolution temporelle avec lignes continues
- **Area Chart** : Zones colorées pour l'impact visuel
- **Bar Chart** : Comparaison discrète entre les dates

### 2. **Biomarqueurs Supportés**

#### ✅ Configuration Complète

```typescript
const biomarkerConfig = {
  glucose: {
    name: 'Glucose',
    unit: 'mmol/L',
    normalRange: [3.9, 6.1],
    color: '#3b82f6',
  },
  cholesterol: {
    name: 'Cholestérol Total',
    unit: 'mmol/L',
    normalRange: [3.5, 5.2],
    color: '#ef4444',
  },
  triglycerides: {
    name: 'Triglycérides',
    unit: 'mmol/L',
    normalRange: [0.5, 1.7],
    color: '#f59e0b',
  },
  hdl: {
    name: 'HDL',
    unit: 'mmol/L',
    normalRange: [1.0, 2.0],
    color: '#10b981',
  },
  ldl: {
    name: 'LDL',
    unit: 'mmol/L',
    normalRange: [1.5, 3.0],
    color: '#8b5cf6',
  },
  creatinine: {
    name: 'Créatinine',
    unit: 'μmol/L',
    normalRange: [60, 110],
    color: '#06b6d4',
  },
  hemoglobin: {
    name: 'Hémoglobine',
    unit: 'g/dL',
    normalRange: [12.0, 16.0],
    color: '#ec4899',
  },
};
```

**Biomarqueurs Inclus :**

- ✅ **Glucose** : Glycémie (mmol/L)
- ✅ **Cholestérol Total** : Lipides sanguins (mmol/L)
- ✅ **Triglycérides** : Graisses sanguines (mmol/L)
- ✅ **HDL** : Bon cholestérol (mmol/L)
- ✅ **LDL** : Mauvais cholestérol (mmol/L)
- ✅ **Créatinine** : Fonction rénale (μmol/L)
- ✅ **Hémoglobine** : Transport d'oxygène (g/dL)

### 3. **Analyse des Tendances**

#### ✅ Calcul Automatique

```typescript
const trends = useMemo(() => {
  if (chartData.length < 2) return { direction: 'stable', percentage: 0 };

  const firstValue = chartData[0].value;
  const lastValue = chartData[chartData.length - 1].value;
  const percentage = ((lastValue - firstValue) / firstValue) * 100;

  return {
    direction: percentage > 2 ? 'up' : percentage < -2 ? 'down' : 'stable',
    percentage: Math.abs(percentage),
  };
}, [chartData]);
```

**Indicateurs de Tendance :**

- 🟢 **En baisse** : Amélioration (flèche verte)
- 🔴 **En hausse** : Dégradation (flèche rouge)
- 🔵 **Stable** : Pas de changement significatif (icône stable)

### 4. **Interface Interactive**

#### ✅ Sélecteur de Biomarqueur

```typescript
<Select
  size="sm"
  radius="lg"
  data={Object.entries(biomarkerConfig).map(([key, config]) => ({
    value: key,
    label: config.name,
  }))}
  value={selectedBiomarker}
  onChange={(value) => {
    // Gérer le changement de biomarqueur
  }}
  style={{ minWidth: 150 }}
/>
```

**Fonctionnalités :**

- ✅ **Sélection dynamique** : Changer de biomarqueur en temps réel
- ✅ **Mise à jour automatique** : Graphique et données adaptés
- ✅ **Interface intuitive** : Dropdown avec noms complets

### 5. **Tooltip Personnalisé**

#### ✅ Informations Détaillées

```typescript
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Paper p="md" radius="lg" withBorder>
        <Stack gap="xs">
          <Text fw={600} size="sm">{label}</Text>
          <Text size="sm" c="dimmed">
            {biomarker.name}: {payload[0].value} {biomarker.unit}
          </Text>
          <Text size="sm" c="dimmed">
            Score global: {payload[0].payload.overallScore}%
          </Text>
        </Stack>
      </Paper>
    );
  }
  return null;
};
```

**Informations Affichées :**

- 📅 **Date** : Date de la prise de sang
- 📊 **Valeur** : Valeur du biomarqueur avec unité
- 🎯 **Score global** : Score de santé global de la prise
- 📈 **Tendance** : Évolution par rapport aux valeurs précédentes

## 🎨 Design System

### **Palette de Couleurs par Biomarqueur**

| Biomarqueur       | Couleur | Code Hex  | Utilisation      |
| ----------------- | ------- | --------- | ---------------- |
| **Glucose**       | Bleu    | `#3b82f6` | Ligne principale |
| **Cholestérol**   | Rouge   | `#ef4444` | Alertes          |
| **Triglycérides** | Orange  | `#f59e0b` | Attention        |
| **HDL**           | Vert    | `#10b981` | Positif          |
| **LDL**           | Violet  | `#8b5cf6` | Risque           |
| **Créatinine**    | Cyan    | `#06b6d4` | Fonction rénale  |
| **Hémoglobine**   | Rose    | `#ec4899` | Transport        |

### **Éléments Visuels**

- **Grille** : Lignes pointillées subtiles (`#e2e8f0`)
- **Axes** : Texte gris (`#64748b`) sans lignes
- **Points** : Cercles colorés avec bordure blanche
- **Tooltips** : Cartes avec ombre et bordure arrondie

## 📊 Données Mockées

### **Structure des Données**

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
```

### **Exemple de Données**

```typescript
const mockBloodTestData: BloodTestData[] = [
  {
    id: '1',
    date: '2024-01-15',
    biomarkers: {
      glucose: 5.2,
      cholesterol: 4.8,
      triglycerides: 1.2,
      hdl: 1.4,
      ldl: 2.8,
      creatinine: 85,
      hemoglobin: 14.2,
    },
    overallScore: 85,
    status: 'normal',
  },
  // ... autres prises de sang
];
```

## 🔧 Technologies Utilisées

### **Recharts**

- **Bibliothèque** : Recharts v2.x
- **Composants** : LineChart, AreaChart, BarChart
- **Responsive** : ResponsiveContainer pour l'adaptation
- **Personnalisation** : Tooltips et légendes custom

### **Mantine UI**

- **Composants** : Card, Select, Badge, Group, Stack
- **Design** : Cohérence avec le système de design
- **Responsive** : Adaptation automatique aux écrans

### **React Hooks**

- **useMemo** : Optimisation des calculs de tendances
- **useTranslation** : Support multilingue
- **Performance** : Re-renders minimisés

## 📱 Responsive Design

### **Breakpoints**

- **Mobile (< 768px)** : Graphique plein écran, sélecteur compact
- **Tablet (≥ 768px)** : Graphique adaptatif, interface optimisée
- **Desktop (≥ 1024px)** : Graphique large, toutes les fonctionnalités

### **Adaptations**

- **Hauteur** : 400px fixe pour la cohérence
- **Largeur** : 100% responsive
- **Tooltips** : Adaptation selon l'espace disponible
- **Légende** : Réorganisation selon la taille d'écran

## 🚀 Performance

### **Optimisations Appliquées**

- ✅ **Mémorisation** : `useMemo` pour les calculs de tendances
- ✅ **Re-renders** : Minimisés avec des dépendances optimisées
- ✅ **Données** : Transformation optimisée pour Recharts
- ✅ **Responsive** : Adaptation fluide sans recalculs

### **Métriques Cibles**

- ⚡ Rendu initial : < 100ms
- ⚡ Changement de biomarqueur : < 50ms
- ⚡ Animations : 60fps fluides
- ⚡ Tooltip : Affichage instantané

## 🔮 Évolutions Futures

### **Fonctionnalités Prévisionnelles**

- [ ] **Graphiques multiples** : Affichage de plusieurs biomarqueurs simultanément
- [ ] **Comparaisons** : Comparaison avec les valeurs cibles
- [ ] **Alertes visuelles** : Indicateurs pour les valeurs hors norme
- [ ] **Export** : Téléchargement des graphiques en PNG/PDF
- [ ] **Annotations** : Notes médicales sur les points de données

### **Améliorations Techniques**

- [ ] **Données temps réel** : Intégration avec APIs médicales
- [ ] **Animations avancées** : Transitions fluides entre les vues
- [ ] **Mode sombre** : Adaptation au thème sombre
- [ ] **Accessibilité** : Support des lecteurs d'écran

## 📝 Utilisation

### **Intégration Simple**

```typescript
import { BloodTestChart } from './components/BloodTestChart';

// Dans le dashboard
<BloodTestChart
  data={bloodTestData}
  selectedBiomarker="glucose"
  chartType="line"
/>
```

### **Props Disponibles**

```typescript
interface BloodTestChartProps {
  data: BloodTestData[]; // Données des prises de sang
  selectedBiomarker?: string; // Biomarqueur sélectionné
  chartType?: 'line' | 'area' | 'bar'; // Type de graphique
}
```

---

**Référence :** Ce composant offre une visualisation complète et interactive de l'évolution des biomarqueurs sanguins pour un suivi médical optimal.
