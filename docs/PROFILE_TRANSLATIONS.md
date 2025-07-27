# 🌐 Traductions de la Page Profile - Limitless Health

## 🎯 Objectif

Améliorer et étendre les traductions pour la page de profil (profile), en assurant une expérience utilisateur cohérente et professionnelle en français et en anglais, avec un focus sur la terminologie médicale et de santé.

## 📁 Structure des Fichiers

### 1. **Fichier de Traductions** (`src/shared/i18n/profileTranslations.ts`)

```typescript
export const profileTranslations = {
  en: {
    profile: {
      // Traductions anglaises complètes
    },
  },
  fr: {
    profile: {
      // Traductions françaises complètes
    },
  },
};
```

### 2. **Hook de Traductions** (`src/features/profile/hooks/useProfileTranslations.ts`)

```typescript
import { useTranslation } from 'react-i18next';
import { profileTranslations } from '../../../shared/i18n/profileTranslations';

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

## 🏗️ Architecture des Traductions

### 1. **Organisation Hiérarchique**

```typescript
profile: {
  // Section principale
  title: '👤 Health Profile',
  subtitle: 'Manage your personal health information...',
  description: 'Complete your health profile...',

  // Header et Navigation
  header: {
    title: 'Health Profile',
    subtitle: 'Personal Health Management',
    breadcrumb: 'Profile',
    backToDashboard: 'Back to Dashboard',
  },

  // Informations personnelles
  personalInfo: {
    title: 'Personal Information',
    subtitle: 'Enter your health and personal details',
    description: 'Basic information about yourself and your health',
    required: 'Required',
    optional: 'Optional',
  },

  // Informations utilisateur
  userInfo: {
    title: 'Connected User',
    subtitle: 'Your account information',
    connected: 'Connected',
    verified: 'Verified',
    memberSince: 'Member since',
    lastLogin: 'Last login',
    accountStatus: 'Account Status',
    premium: 'Premium',
    basic: 'Basic',
  },

  // Statistiques de santé
  healthStats: {
    title: 'Health Statistics',
    subtitle: 'Real-time health metrics based on your profile',
    bmiScore: 'BMI Score',
    idealWeight: 'Ideal Weight',
    bmr: 'BMR',
    height: 'Height',
    weight: 'Weight',
    aboutBmi: 'About Body Mass Index (BMI)',
    bmiDescription: 'BMI is a body mass indicator...',
    bmiCategory: 'BMI Category: {{category}}',
    bmiRange: 'BMI Range',
    healthScore: 'Health Score',
    metabolicRate: 'Metabolic Rate',
    bodyComposition: 'Body Composition',
    recommendations: {
      underweight: 'Consider consulting...',
      normal: 'Great! Your BMI is within...',
      overweight: 'Consider lifestyle changes...',
      obese: 'We recommend consulting...',
    },
    categories: {
      underweight: 'Underweight',
      normalWeight: 'Normal Weight',
      overweight: 'Overweight',
      obese: 'Obese',
    },
  },

  // Progression du formulaire
  progress: {
    title: 'Profile Completion',
    subtitle: 'Complete your profile to unlock all features',
    percentage: '{{percentage}}% Complete',
    remaining: '{{count}} fields remaining',
    completed: 'Profile completed!',
    incomplete: 'Profile incomplete',
  },

  // Validation et erreurs
  validation: {
    errorsFound: '{{count}} validation error{{plural}} found',
    errorsFound_plural: '{{count}} validation errors found',
    fixErrors: 'Please fix the errors below',
    allValid: 'All fields are valid',
  },

  // Modifications non sauvegardées
  unsavedChanges: {
    title: 'Unsaved Changes',
    message: 'You have unsaved changes...',
    saveNow: 'Save Now',
    discard: 'Discard Changes',
    continueEditing: 'Continue Editing',
  },

  // Actions et boutons
  actions: {
    cancel: 'Cancel',
    save: 'Save Profile',
    saving: 'Saving...',
    saved: 'Profile Saved',
    edit: 'Edit Profile',
    reset: 'Reset Form',
    clear: 'Clear All',
    submit: 'Submit',
    update: 'Update',
    delete: 'Delete',
    confirm: 'Confirm',
  },

  // Champs du formulaire
  form: {
    fields: {
      name: 'Full Name',
      email: 'Email Address',
      age: 'Age',
      gender: 'Gender',
      height: 'Height (cm)',
      weight: 'Weight (kg)',
      activityLevel: 'Activity Level',
      medicalHistory: 'Medical History',
      allergies: 'Allergies',
      medications: 'Current Medications',
      goals: 'Health Goals',
      phone: 'Phone Number',
      address: 'Address',
      emergencyContact: 'Emergency Contact',
      bloodType: 'Blood Type',
      occupation: 'Occupation',
      lifestyle: 'Lifestyle',
    },
    placeholders: {
      name: 'Enter your full name',
      email: 'Enter your email address',
      age: 'Enter your age',
      height: 'Enter your height in centimeters',
      weight: 'Enter your weight in kilograms',
      medicalHistory: 'Describe your medical history',
      allergies: 'List any allergies',
      medications: 'List current medications',
      goals: 'Describe your health goals',
      phone: 'Enter your phone number',
      address: 'Enter your address',
      emergencyContact: 'Enter emergency contact information',
      occupation: 'Enter your occupation',
      lifestyle: 'Describe your lifestyle',
    },
    descriptions: {
      name: 'Your name as it will appear on your profile',
      email: 'Your email address for notifications and account recovery',
      age: 'Your current age for health calculations',
      height: 'Your height in centimeters for BMI calculations',
      weight: 'Your current weight in kilograms',
      medicalHistory: 'Any relevant medical history or conditions',
      allergies: 'Any allergies or sensitivities you have',
      medications: 'Current medications you are taking',
      goals: 'Your health and fitness goals',
    },
    options: {
      gender: {
        male: 'Male',
        female: 'Female',
        other: 'Other',
        preferNotToSay: 'Prefer not to say',
      },
      activityLevel: {
        sedentary: 'Sedentary (little or no exercise)',
        light: 'Lightly active (light exercise 1-3 days/week)',
        moderate: 'Moderately active (moderate exercise 3-5 days/week)',
        active: 'Very active (hard exercise 6-7 days/week)',
        veryActive: 'Extremely active (very hard exercise, physical job)',
      },
      bloodType: {
        aPositive: 'A+',
        aNegative: 'A-',
        bPositive: 'B+',
        bNegative: 'B-',
        abPositive: 'AB+',
        abNegative: 'AB-',
        oPositive: 'O+',
        oNegative: 'O-',
        unknown: 'Unknown',
      },
    },
    validation: {
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidAge: 'Age must be between 1 and 120',
      invalidHeight: 'Height must be between 50 and 300 cm',
      invalidWeight: 'Weight must be between 20 and 500 kg',
      invalidPhone: 'Please enter a valid phone number',
      minLength: 'This field must be at least {{min}} characters long',
      maxLength: 'This field must be no more than {{max}} characters long',
      invalidFormat: 'Invalid format',
      tooShort: 'Too short',
      tooLong: 'Too long',
      invalidValue: 'Invalid value',
    },
  },

  // Messages de succès et d'erreur
  messages: {
    success: {
      profileSaved: 'Profile saved successfully!',
      profileUpdated: 'Profile updated successfully!',
      changesApplied: 'Changes applied successfully!',
    },
    error: {
      saveFailed: 'Failed to save profile. Please try again.',
      loadFailed: 'Failed to load profile data. Please refresh the page.',
      validationFailed: 'Please fix the validation errors before saving.',
      networkError: 'Network error. Please check your connection.',
    },
    info: {
      loading: 'Loading profile data...',
      saving: 'Saving your profile...',
      processing: 'Processing your information...',
    },
  },

  // Tooltips et aide
  tooltips: {
    bmi: 'Body Mass Index - A measure of body fat based on height and weight',
    bmr: 'Basal Metabolic Rate - The number of calories your body burns at rest',
    idealWeight: 'Recommended weight range for your height and age',
    healthScore: 'Overall health assessment based on your profile data',
    required: 'This field is required to complete your profile',
    optional: 'This field is optional but recommended for better insights',
  },
}
```

### 2. **Catégories de Traductions**

#### ✅ **Section Principale**

- `title` - Titre principal avec emoji
- `subtitle` - Sous-titre descriptif
- `description` - Description détaillée

#### ✅ **Header et Navigation**

- `header.title` - Titre de l'en-tête
- `header.subtitle` - Sous-titre de l'en-tête
- `header.breadcrumb` - Fil d'Ariane
- `header.backToDashboard` - Lien de retour

#### ✅ **Informations Personnelles**

- `personalInfo.title` - Titre de la section
- `personalInfo.subtitle` - Sous-titre de la section
- `personalInfo.description` - Description de la section
- `personalInfo.required` - Badge "Requis"
- `personalInfo.optional` - Badge "Optionnel"

#### ✅ **Informations Utilisateur**

- `userInfo.title` - Titre de la section utilisateur
- `userInfo.subtitle` - Sous-titre de la section utilisateur
- `userInfo.connected` - Statut connecté
- `userInfo.verified` - Statut vérifié
- `userInfo.memberSince` - Membre depuis
- `userInfo.lastLogin` - Dernière connexion
- `userInfo.accountStatus` - Statut du compte
- `userInfo.premium` - Compte premium
- `userInfo.basic` - Compte basique

#### ✅ **Statistiques de Santé**

- `healthStats.title` - Titre des statistiques
- `healthStats.subtitle` - Sous-titre des statistiques
- `healthStats.bmiScore` - Score IMC
- `healthStats.idealWeight` - Poids idéal
- `healthStats.bmr` - Taux métabolique de base
- `healthStats.height` - Taille
- `healthStats.weight` - Poids
- `healthStats.aboutBmi` - À propos de l'IMC
- `healthStats.bmiDescription` - Description de l'IMC
- `healthStats.bmiCategory` - Catégorie IMC avec interpolation
- `healthStats.bmiRange` - Fourchette IMC
- `healthStats.healthScore` - Score de santé
- `healthStats.metabolicRate` - Taux métabolique
- `healthStats.bodyComposition` - Composition corporelle
- `healthStats.recommendations.*` - Recommandations par catégorie
- `healthStats.categories.*` - Catégories IMC

#### ✅ **Progression du Formulaire**

- `progress.title` - Titre de la progression
- `progress.subtitle` - Sous-titre de la progression
- `progress.percentage` - Pourcentage avec interpolation
- `progress.remaining` - Champs restants avec interpolation
- `progress.completed` - Profil complété
- `progress.incomplete` - Profil incomplet

#### ✅ **Validation et Erreurs**

- `validation.errorsFound` - Erreurs trouvées avec interpolation
- `validation.errorsFound_plural` - Erreurs trouvées (pluriel)
- `validation.fixErrors` - Corriger les erreurs
- `validation.allValid` - Tous les champs valides

#### ✅ **Modifications Non Sauvegardées**

- `unsavedChanges.title` - Titre des modifications
- `unsavedChanges.message` - Message d'avertissement
- `unsavedChanges.saveNow` - Sauvegarder maintenant
- `unsavedChanges.discard` - Annuler les modifications
- `unsavedChanges.continueEditing` - Continuer l'édition

#### ✅ **Actions et Boutons**

- `actions.cancel` - Annuler
- `actions.save` - Sauvegarder le profil
- `actions.saving` - Sauvegarde en cours
- `actions.saved` - Profil sauvegardé
- `actions.edit` - Modifier le profil
- `actions.reset` - Réinitialiser le formulaire
- `actions.clear` - Tout effacer
- `actions.submit` - Soumettre
- `actions.update` - Mettre à jour
- `actions.delete` - Supprimer
- `actions.confirm` - Confirmer

#### ✅ **Champs du Formulaire**

- `form.fields.*` - Labels des champs
- `form.placeholders.*` - Placeholders des champs
- `form.descriptions.*` - Descriptions des champs
- `form.options.gender.*` - Options de genre
- `form.options.activityLevel.*` - Niveaux d'activité
- `form.options.bloodType.*` - Groupes sanguins
- `form.validation.*` - Messages de validation

#### ✅ **Messages de Succès et d'Erreur**

- `messages.success.*` - Messages de succès
- `messages.error.*` - Messages d'erreur
- `messages.info.*` - Messages d'information

#### ✅ **Tooltips et Aide**

- `tooltips.bmi` - Aide sur l'IMC
- `tooltips.bmr` - Aide sur le BMR
- `tooltips.idealWeight` - Aide sur le poids idéal
- `tooltips.healthScore` - Aide sur le score de santé
- `tooltips.required` - Aide sur les champs requis
- `tooltips.optional` - Aide sur les champs optionnels

## 🔧 Utilisation dans les Composants

### 1. **Import du Hook useProfileTranslations**

```typescript
import { useProfileTranslations } from '../hooks/useProfileTranslations';

const ProfileForm: React.FC<ProfileFormProps> = ({ onSave, onCancel, initialData }) => {
  const { profileT } = useProfileTranslations();

  return (
    <div>
      <h1>{profileT.title}</h1>
      <p>{profileT.subtitle}</p>
    </div>
  );
};
```

### 2. **Traductions avec Interpolation**

```typescript
// Interpolation simple
{
  profileT.healthStats.bmiCategory.replace('{{category}}', bmiCategory);
}

// Interpolation avec comptage
{
  profileT.validation.errorsFound.replace(
    '{{count}}',
    errors.length.toString()
  );
}

// Interpolation avec pourcentage
{
  profileT.progress.percentage.replace(
    '{{percentage}}',
    completionPercentage.toString()
  );
}
```

### 3. **Exemples d'Utilisation**

#### ✅ **Section Header**

```typescript
<Title order={1} size="h1">
  {profileT.title}
</Title>
<Text size="lg" c="dimmed">
  {profileT.subtitle}
</Text>
```

#### ✅ **Champs de Formulaire**

```typescript
<TextInput
  label={profileT.form.fields.name}
  placeholder={profileT.form.placeholders.name}
  description={profileT.form.descriptions.name}
  error={errors.name?.message}
/>
```

#### ✅ **Statistiques de Santé**

```typescript
<Card>
  <Title order={3}>{profileT.healthStats.title}</Title>
  <Text>{profileT.healthStats.bmiScore}: {bmiValue}</Text>
  <Text>{profileT.healthStats.bmiCategory.replace('{{category}}', category)}</Text>
</Card>
```

#### ✅ **Validation d'Erreurs**

```typescript
<Alert>
  <Text>
    {profileT.validation.errorsFound.replace('{{count}}', errors.length.toString())}
  </Text>
</Alert>
```

#### ✅ **Actions et Boutons**

```typescript
<Button loading={isLoading}>
  {isLoading ? profileT.actions.saving : profileT.actions.save}
</Button>
```

#### ✅ **Messages de Succès/Erreur**

```typescript
{isSuccess && (
  <Alert color="green">
    {profileT.messages.success.profileSaved}
  </Alert>
)}

{isError && (
  <Alert color="red">
    {profileT.messages.error.saveFailed}
  </Alert>
)}
```

#### ✅ **Tooltips et Aide**

```typescript
<Tooltip label={profileT.tooltips.bmi}>
  <IconInfoCircle size={16} />
</Tooltip>
```

## 🌍 Support Multilingue

### 1. **Langues Supportées**

- **Français (fr)** - Langue par défaut
- **Anglais (en)** - Langue secondaire

### 2. **Détection Automatique**

```typescript
// Configuration i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    lng: 'fr', // Force default language
    interpolation: { escapeValue: false },
    supportedLngs: ['en', 'fr'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language-storage',
    },
  });
```

### 3. **Changement de Langue**

```typescript
// Via le composant LanguageSwitcher
<LanguageSwitcher />

// Programmatiquement
i18n.changeLanguage('en');
```

## 🧪 Tests des Traductions

### 1. **Tests de Rendu**

```typescript
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../shared/i18n/config';

test('renders profile form with correct translations', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <ProfileForm />
    </I18nextProvider>
  );

  expect(screen.getByText('👤 Health Profile')).toBeInTheDocument();
  expect(screen.getByText('Personal Information')).toBeInTheDocument();
});
```

### 2. **Tests de Changement de Langue**

```typescript
test('changes language correctly', () => {
  const { rerender } = render(
    <I18nextProvider i18n={i18n}>
      <ProfileForm />
    </I18nextProvider>
  );

  // Vérifier le français (par défaut)
  expect(screen.getByText('Informations Personnelles')).toBeInTheDocument();

  // Changer vers l'anglais
  i18n.changeLanguage('en');
  rerender(
    <I18nextProvider i18n={i18n}>
      <ProfileForm />
    </I18nextProvider>
  );

  // Vérifier l'anglais
  expect(screen.getByText('Personal Information')).toBeInTheDocument();
});
```

### 3. **Tests d'Interpolation**

```typescript
test('interpolates values correctly', () => {
  const { profileT } = useProfileTranslations();

  const bmiCategory = 'Normal Weight';
  const interpolated = profileT.healthStats.bmiCategory.replace(
    '{{category}}',
    bmiCategory
  );

  expect(interpolated).toBe('BMI Category: Normal Weight');
});
```

## 📋 Checklist de Vérification

### ✅ **Traductions Implémentées**

- [x] Section principale (titre, sous-titre, description)
- [x] Header et navigation (titre, sous-titre, breadcrumb, retour)
- [x] Informations personnelles (titre, sous-titre, description, badges)
- [x] Informations utilisateur (titre, sous-titre, statuts, dates)
- [x] Statistiques de santé (titre, sous-titre, métriques, IMC, recommandations)
- [x] Progression du formulaire (titre, sous-titre, pourcentage, restants)
- [x] Validation et erreurs (erreurs trouvées, corriger, valide)
- [x] Modifications non sauvegardées (titre, message, actions)
- [x] Actions et boutons (annuler, sauvegarder, modifier, etc.)
- [x] Champs du formulaire (labels, placeholders, descriptions)
- [x] Options des champs (genre, niveau d'activité, groupe sanguin)
- [x] Validation des champs (requis, email, âge, taille, poids, téléphone)
- [x] Messages de succès et d'erreur (sauvegardé, échec, chargement)
- [x] Tooltips et aide (IMC, BMR, poids idéal, score de santé)

### ✅ **Intégration Technique**

- [x] Fichier de traductions étendu
- [x] Hook useProfileTranslations fonctionnel
- [x] Composants ProfileForm mis à jour
- [x] Composants ProfileFormFields mis à jour
- [x] Composants UserInfo mis à jour
- [x] Composants HealthStats mis à jour
- [x] Composants ValidationErrors mis à jour
- [x] Tests de traduction ajoutés
- [x] Documentation complète

### ✅ **Qualité des Traductions**

- [x] Cohérence terminologique médicale
- [x] Respect du contexte de santé
- [x] Adaptation culturelle française/anglaise
- [x] Lisibilité et clarté
- [x] Support des caractères spéciaux
- [x] Interpolation correcte

## 🚀 Avantages

### 1. **Cohérence Globale**

- ✅ Traductions standardisées dans toute l'application
- ✅ Terminologie médicale cohérente
- ✅ Expérience utilisateur uniforme

### 2. **Maintenabilité**

- ✅ Fichier de traductions centralisé et étendu
- ✅ Structure hiérarchique claire
- ✅ Facilité d'ajout de nouvelles langues
- ✅ Hook personnalisé pour l'accès aux traductions

### 3. **Accessibilité**

- ✅ Support complet du français et de l'anglais
- ✅ Détection automatique de la langue
- ✅ Persistance des préférences utilisateur
- ✅ Terminologie médicale accessible

### 4. **Performance**

- ✅ Chargement optimisé des traductions
- ✅ Cache des traductions en localStorage
- ✅ Interpolation efficace
- ✅ Hook optimisé pour les performances

### 5. **Expérience Utilisateur**

- ✅ Messages d'erreur clairs et informatifs
- ✅ Tooltips d'aide contextuelle
- ✅ Progression du formulaire visible
- ✅ Feedback utilisateur approprié

## 🔮 Améliorations Futures

### 1. **Nouvelles Langues**

- 🔮 Espagnol (es) - Pour les marchés hispanophones
- 🔮 Allemand (de) - Pour les marchés germanophones
- 🔮 Italien (it) - Pour les marchés italophones
- 🔮 Portugais (pt) - Pour les marchés lusophones

### 2. **Fonctionnalités Avancées**

- 🔮 Traductions contextuelles selon le profil utilisateur
- 🔮 Pluriels et genres adaptés au contexte médical
- 🔮 Formatage des nombres et dates selon la locale
- 🔮 Traductions dynamiques selon les unités de mesure

### 3. **Outils de Développement**

- 🔮 Validation automatique des traductions médicales
- 🔮 Extraction automatique des clés de traduction
- 🔮 Interface de gestion des traductions
- 🔮 Tests automatisés de cohérence terminologique

### 4. **Accessibilité Avancée**

- 🔮 Support des lecteurs d'écran pour la terminologie médicale
- 🔮 Traductions adaptées aux différents niveaux de compréhension
- 🔮 Support des unités de mesure alternatives
- 🔮 Explications contextuelles pour les termes techniques

## 📊 Composants Mis à Jour

### ✅ **Composants Traduits**

- [x] **ProfileForm.tsx** - Composant principal avec toutes les traductions
- [x] **ProfileFormFields.tsx** - Champs de formulaire avec labels et descriptions
- [x] **UserInfo.tsx** - Informations utilisateur avec statuts
- [x] **HealthStats.tsx** - Statistiques de santé avec métriques et recommandations
- [x] **ValidationErrors.tsx** - Messages d'erreur de validation

### ✅ **Structure des Traductions**

- [x] **Organisation hiérarchique** claire et logique
- [x] **Catégories spécialisées** pour la santé et la médecine
- [x] **Clés de traduction** descriptives et cohérentes
- [x] **Support multilingue** complet et fonctionnel
- [x] **Interpolation** pour les valeurs dynamiques
- [x] **Terminologie médicale** précise et accessible

---

_Documentation créée le 25/01/2025 - Traductions Profile Limitless Health_
