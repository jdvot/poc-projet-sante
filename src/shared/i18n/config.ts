import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { bloodTestTranslations } from './bloodTestTranslations';
import { dashboardTranslations } from './dashboardTranslations';
import { homeTranslations } from './homeTranslations';
import { settingsTranslationsExtended } from './settingsTranslationsExtended';

const resources = {
  en: {
    translation: {
      ...bloodTestTranslations.en,
      ...dashboardTranslations.en,
      ...homeTranslations.en,
      ...settingsTranslationsExtended.en,
      welcome: 'Welcome',
      dashboard: {
        title: 'Health Dashboard',
        statistics: 'Health Statistics',
        biomarkers: 'Biomarkers',
        refresh: 'Refresh',
        retry: 'Retry',
        loadingError: 'Loading Error',
        loadingErrorDescription:
          'Unable to load dashboard data. Please try again.',
        lastCheck: 'Last check',
        healthScore: 'Health Score',
        globalHealth: 'Global Health',
        status: {
          normal: 'Normal',
          elevated: 'Elevated',
          high: 'High',
          critical: 'Critical',
        },
      },
      navigation: {
        profile: 'Profile',
      },
      aiDoctor: 'AI Doctor',
      aiChat: {
        title: 'AI Doctor',
        subtitle: 'Assistant IA spécialisé en santé',
        welcome: 'Bienvenue dans votre consultation IA',
        welcomeDescription:
          'Posez vos questions de santé et recevez des conseils personnalisés',
        placeholder: 'Posez votre question de santé...',
        send: 'Envoyer',
        sendMessage: 'Envoyer le message',
        clear: 'Effacer',
        clearChat: 'Effacer la conversation',
        attachFile: 'Joindre un fichier',
        filesSelected: 'fichier(s) sélectionné(s)',
        attachedFiles: 'Fichiers joints',
        fileAttached: 'Fichier joint',
        removeFile: 'Supprimer le fichier',
        voiceInput: 'Entrée vocale',
        error: 'Erreur',
        you: 'Vous',
        aiAssistant: 'Assistant IA',
        n8nIntegration: 'Intégration n8n',
        n8nDescription:
          'Cette interface est connectée à n8n pour le traitement des requêtes IA',
        features: {
          health: 'Santé',
          diagnosis: 'Diagnostic',
          advice: 'Conseils',
        },
      },
      settings: {
        title: 'Settings',
        description: 'Manage your preferences and personal settings',
        save: 'Save',
        saved: 'Saved',
        saveChanges: 'Save Changes',
        discard: 'Discard',
        reset: 'Reset to Default',
        changesDetected: "Changes detected. Don't forget to save.",
        currentSettings: 'Current Settings',
        language: 'Language',
        notifications: {
          title: 'Notifications',
          description: 'Configure your notification preferences',
          email: 'Email Notifications',
          emailDesc: 'Receive notifications by email',
          push: 'Push Notifications',
          pushDesc: 'Receive push notifications',
          sms: 'SMS Notifications',
          smsDesc: 'Receive notifications by SMS',
          active: 'Active Notifications',
          saved: {
            title: 'Settings Saved',
            message: 'Your settings have been saved successfully. {{changes}}',
            singleChange: '1 setting modified',
            multipleChanges: '{{count}} settings modified',
          },
          reset: {
            title: 'Settings Reset',
            message: 'All your settings have been reset to default values.',
          },
          discarded: {
            title: 'Changes Discarded',
            message: 'Your changes have been discarded.',
          },
          settingChanged: {
            title: 'Setting Changed',
            message: '{{setting}} has been {{action}}.',
          },
          error: {
            title: 'Error',
            message: 'An error occurred while processing your settings.',
          },
        },
        privacy: {
          title: 'Privacy',
          description: 'Manage your privacy settings',
          shareData: 'Share Data',
          shareDataDesc: 'Allow sharing of anonymized data',
          analytics: 'Analytics',
          analyticsDesc: 'Allow collection of analytics data',
        },
        accessibility: {
          title: 'Accessibility',
          description: 'Customize the interface for better accessibility',
          fontSize: 'Font Size',
          fontSizeDesc: 'Choose font size',
          small: 'Small',
          medium: 'Medium',
          large: 'Large',
          highContrast: 'High Contrast',
          highContrastDesc: 'Enable high contrast mode',
          reducedMotion: 'Reduced Motion',
          reducedMotionDesc: 'Reduce animations',
        },
        units: {
          title: 'Measurement Units',
          description: 'Choose your preferred measurement units',
          weight: 'Weight',
          weightDesc: 'Unit for weight',
          height: 'Height',
          heightDesc: 'Unit for height',
          temperature: 'Temperature',
          temperatureDesc: 'Unit for temperature',
        },
      },
    },
  },
  fr: {
    translation: {
      ...bloodTestTranslations.fr,
      ...dashboardTranslations.fr,
      ...homeTranslations.fr,
      ...settingsTranslationsExtended.fr,
      welcome: 'Bienvenue',
      dashboard: {
        title: 'Tableau de bord santé',
        statistics: 'Statistiques de santé',
        biomarkers: 'Biomarqueurs',
        refresh: 'Actualiser',
        retry: 'Réessayer',
        loadingError: 'Erreur de chargement',
        loadingErrorDescription:
          'Impossible de charger les données du tableau de bord. Veuillez réessayer.',
        lastCheck: 'Dernier contrôle',
        healthScore: 'Score de santé',
        globalHealth: 'Santé globale',
        status: {
          normal: 'Normal',
          elevated: 'Élevé',
          high: 'Haut',
          critical: 'Critique',
        },
      },
      navigation: {
        profile: 'Profil',
      },
      aiDoctor: 'Médecin IA',
      settings: {
        title: 'Paramètres',
        description: 'Gérez vos préférences et paramètres personnalisés',
        save: 'Sauvegarder',
        saved: 'Sauvegardé',
        saveChanges: 'Sauvegarder les modifications',
        discard: 'Annuler',
        reset: 'Réinitialiser',
        changesDetected:
          "Des modifications ont été détectées. N'oubliez pas de sauvegarder.",
        currentSettings: 'Paramètres actuels',
        language: 'Langue',
        notifications: {
          title: 'Notifications',
          description: 'Configurez vos préférences de notifications',
          email: 'Notifications par email',
          emailDesc: 'Recevoir des notifications par email',
          push: 'Notifications push',
          pushDesc: 'Recevoir des notifications push',
          sms: 'Notifications SMS',
          smsDesc: 'Recevoir des notifications par SMS',
          active: 'Notifications actives',
          saved: {
            title: 'Paramètres sauvegardés',
            message:
              'Vos paramètres ont été sauvegardés avec succès. {{changes}}',
            singleChange: '1 paramètre modifié',
            multipleChanges: '{{count}} paramètres modifiés',
          },
          reset: {
            title: 'Paramètres réinitialisés',
            message:
              'Tous vos paramètres ont été réinitialisés aux valeurs par défaut.',
          },
          discarded: {
            title: 'Modifications annulées',
            message: 'Vos modifications ont été annulées.',
          },
          settingChanged: {
            title: 'Paramètre modifié',
            message: '{{setting}} a été {{action}}.',
          },
          error: {
            title: 'Erreur',
            message:
              'Une erreur est survenue lors du traitement de vos paramètres.',
          },
        },
        privacy: {
          title: 'Confidentialité',
          description: 'Gérez vos paramètres de confidentialité',
          shareData: 'Partager les données',
          shareDataDesc: 'Autoriser le partage de données anonymisées',
          analytics: 'Analytics',
          analyticsDesc: 'Autoriser la collecte de données analytiques',
        },
        accessibility: {
          title: 'Accessibilité',
          description:
            "Personnalisez l'interface pour une meilleure accessibilité",
          fontSize: 'Taille de police',
          fontSizeDesc: 'Choisissez la taille de police',
          small: 'Petite',
          medium: 'Moyenne',
          large: 'Grande',
          highContrast: 'Contraste élevé',
          highContrastDesc: 'Activer le mode contraste élevé',
          reducedMotion: 'Mouvement réduit',
          reducedMotionDesc: 'Réduire les animations',
        },
        units: {
          title: 'Unités de mesure',
          description: 'Choisissez vos unités de mesure préférées',
          weight: 'Poids',
          weightDesc: 'Unité pour le poids',
          height: 'Taille',
          heightDesc: 'Unité pour la taille',
          temperature: 'Température',
          temperatureDesc: 'Unité pour la température',
        },
      },
    },
  },
};

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

export default i18n;
