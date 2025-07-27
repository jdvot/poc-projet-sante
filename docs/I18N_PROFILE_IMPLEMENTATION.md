# 🌐 Internationalisation - Module Profile

## 📋 Vue d'ensemble

Ce document décrit l'implémentation complète de l'internationalisation (i18n) pour le module Profile de l'application Limitless Health.

## 🏗️ Architecture des Traductions

### Structure des Fichiers

```
src/
├── shared/
│   └── i18n/
│       ├── config.ts                    # Configuration i18n principale
│       └── profileTranslations.ts       # Traductions spécifiques au profile
└── features/
    └── profile/
        ├── hooks/
        │   └── useProfileTranslations.ts # Hook personnalisé pour les traductions
        └── components/
            ├── ProfileForm.tsx          # Composant principal avec traductions
            ├── UserInfo.tsx             # Informations utilisateur traduites
            ├── HealthStats.tsx          # Statistiques de santé traduites
            └── ValidationErrors.tsx     # Erreurs de validation traduites
```

## 🔧 Implémentation Technique

### 1. Fichier de Traductions (`profileTranslations.ts`)

```typescript
export const profileTranslations = {
  en: {
    profile: {
      title: '👤 Health Profile',
      subtitle: 'Manage your personal health information...',
      // ... autres traductions
    },
  },
  fr: {
    profile: {
      title: '👤 Profil de Santé',
      subtitle: 'Gérez vos informations de santé...',
      // ... autres traductions
    },
  },
};
```

**Caractéristiques :**

- Structure hiérarchique organisée par fonctionnalité
- Support complet anglais/français
- Interpolation de variables (`{{count}}`, `{{category}}`)
- Gestion des pluriels

### 2. Hook Personnalisé (`useProfileTranslations.ts`)

```typescript
export function useProfileTranslations() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'en' | 'fr';

  const profileT =
    profileTranslations[currentLanguage]?.profile ||
    profileTranslations.en.profile;

  return {
    t,
    profileT,
    currentLanguage,
  };
}
```

**Avantages :**

- Accès centralisé aux traductions
- Fallback automatique vers l'anglais
- Type safety avec TypeScript
- Réutilisabilité dans tous les composants

### 3. Utilisation dans les Composants

#### ProfileForm.tsx

```typescript
const ProfileForm: React.FC<ProfileFormProps> = ({ ... }) => {
  const { profileT } = useProfileTranslations();

  return (
    <ModernSection
      title={profileT.title}
      subtitle={profileT.subtitle}
      // ...
    >
      <Text>{profileT.description}</Text>
    </ModernSection>
  );
};
```

#### HealthStats.tsx

```typescript
const HealthStats: React.FC<HealthStatsProps> = ({ ... }) => {
  const { profileT } = useProfileTranslations();

  return (
    <ModernSection
      title={profileT.healthStats.title}
      subtitle={profileT.healthStats.subtitle}
    >
      <ModernProgress
        label={profileT.healthStats.bmiScore}
        // ...
      />
    </ModernSection>
  );
};
```

## 📚 Catégories de Traductions

### 1. Interface Utilisateur

- **Titres et sous-titres** : Titres de sections, descriptions
- **Boutons et actions** : Sauvegarder, Annuler, etc.
- **Messages d'état** : Chargement, sauvegarde, erreurs

### 2. Formulaires

- **Labels des champs** : Nom, Email, Âge, etc.
- **Placeholders** : Textes d'aide dans les champs
- **Options** : Genres, niveaux d'activité
- **Validation** : Messages d'erreur

### 3. Statistiques de Santé

- **Métriques** : IMC, poids idéal, BMR
- **Catégories** : Sous-poids, normal, surpoids, obésité
- **Recommandations** : Conseils personnalisés selon l'IMC
- **Informations** : Explications sur les calculs

### 4. Messages Système

- **Erreurs de validation** : Messages d'erreur de formulaire
- **Modifications non sauvegardées** : Alertes utilisateur
- **États de chargement** : Indicateurs de progression

## 🌍 Gestion des Langues

### Langues Supportées

- **Anglais (en)** : Langue par défaut
- **Français (fr)** : Langue principale de l'application

### Détection Automatique

```typescript
detection: {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
  lookupLocalStorage: 'language-storage',
}
```

### Fallback

- Fallback automatique vers l'anglais si une traduction est manquante
- Gestion des clés de traduction manquantes
- Logs de débogage en mode développement

## 🔄 Interpolation et Variables

### Variables Simples

```typescript
// Traduction
bmiCategory: 'BMI Category: {{category}}'

// Utilisation
title={profileT.healthStats.bmiCategory.replace('{{category}}', stats.bmiCategory.label)}
```

### Gestion des Pluriels

```typescript
// Traduction
errorsFound: '{{count}} validation error{{plural}} found',
errorsFound_plural: '{{count}} validation errors found',

// Utilisation
title={profileT.validation.errorsFound.replace('{{count}}', errors.length.toString())}
```

## 🧪 Tests et Validation

### Tests de Traduction

```typescript
// Vérification de la présence de toutes les clés
const requiredKeys = ['title', 'subtitle', 'description', ...];
const missingKeys = requiredKeys.filter(key => !profileT[key]);

if (missingKeys.length > 0) {
  console.warn('Missing translation keys:', missingKeys);
}
```

### Validation des Types

```typescript
interface ProfileTranslations {
  title: string;
  subtitle: string;
  description: string;
  // ... autres propriétés
}
```

## 🚀 Bonnes Pratiques

### 1. Organisation

- **Séparation des responsabilités** : Traductions dans des fichiers dédiés
- **Structure hiérarchique** : Organisation logique par fonctionnalité
- **Nommage cohérent** : Clés descriptives et organisées

### 2. Performance

- **Chargement lazy** : Traductions chargées à la demande
- **Mise en cache** : Utilisation du localStorage
- **Optimisation des bundles** : Traductions incluses dans le bundle principal

### 3. Maintenabilité

- **Documentation** : Commentaires explicatifs
- **Validation** : Vérification des clés manquantes
- **Tests** : Tests unitaires pour les traductions

### 4. Accessibilité

- **Support RTL** : Prêt pour les langues de droite à gauche
- **Longueur des textes** : Gestion des textes longs
- **Caractères spéciaux** : Support des accents et caractères Unicode

## 🔮 Évolutions Futures

### Fonctionnalités Planifiées

1. **Support de nouvelles langues** : Espagnol, Allemand, etc.
2. **Traductions dynamiques** : Chargement depuis une API
3. **Gestion des contextes** : Traductions contextuelles
4. **Outils de traduction** : Interface d'administration

### Améliorations Techniques

1. **Type safety avancée** : Types stricts pour toutes les traductions
2. **Validation automatique** : Vérification des clés manquantes
3. **Performance** : Optimisation du chargement
4. **Tests automatisés** : Tests de régression pour les traductions

## 📊 Métriques et Monitoring

### Indicateurs de Qualité

- **Couverture des traductions** : Pourcentage de clés traduites
- **Cohérence** : Uniformité des termes utilisés
- **Performance** : Temps de chargement des traductions
- **Erreurs** : Clés manquantes ou mal formatées

### Outils de Monitoring

- **Logs de débogage** : Traçage des traductions manquantes
- **Métriques utilisateur** : Langues les plus utilisées
- **Alertes** : Notifications en cas de problème

---

_Cette documentation sert de référence pour l'implémentation et la maintenance des traductions du module Profile._
