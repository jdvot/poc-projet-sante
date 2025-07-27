import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { bloodTestTranslations } from './bloodTestTranslations';
import { dashboardTranslations } from './dashboardTranslations';
import { homeTranslations } from './homeTranslations';
import { settingsTranslationsExtended } from './settingsTranslationsExtended';
import { aiDoctorTranslations } from './aiDoctorTranslations';
import { authTranslations } from './authTranslations';

const resources = {
  en: {
    translation: {
      ...bloodTestTranslations.en,
      ...dashboardTranslations.en,
      ...homeTranslations.en,
      ...settingsTranslationsExtended.en,
      ...aiDoctorTranslations.en,
      ...authTranslations.en,
      welcome: 'Welcome',
      navigation: {
        home: 'Home',
        dashboard: 'Dashboard',
        aiDoctor: 'AI Doctor',
        aiChat: 'AI Chat',
        profile: 'Profile',
        settings: 'Settings',
        about: 'About',
        contact: 'Contact',
      },
      theme: {
        light: 'Light',
        dark: 'Dark',
        auto: 'Auto',
      },
      user: {
        account: 'User Account',
        profile: 'My Profile',
        settings: 'Settings',
        logout: 'Logout',
        manage: 'Manage',
        configure: 'Configure',
        exit: 'Exit',
      },
      // Test direct des traductions AI Doctor
      aiDoctorTest: aiDoctorTranslations.en.aiDoctor.title,
      aiChatTest: aiDoctorTranslations.en.aiChat.title,
    },
  },
  fr: {
    translation: {
      ...bloodTestTranslations.fr,
      ...dashboardTranslations.fr,
      ...homeTranslations.fr,
      ...settingsTranslationsExtended.fr,
      ...aiDoctorTranslations.fr,
      ...authTranslations.fr,
      welcome: 'Bienvenue',
      navigation: {
        home: 'Accueil',
        dashboard: 'Tableau de bord',
        aiDoctor: 'Médecin IA',
        aiChat: 'Chat IA',
        profile: 'Profil',
        settings: 'Paramètres',
        about: 'À propos',
        contact: 'Contact',
      },
      theme: {
        light: 'Clair',
        dark: 'Sombre',
        auto: 'Automatique',
      },
      user: {
        account: 'Compte utilisateur',
        profile: 'Mon profil',
        settings: 'Paramètres',
        logout: 'Se déconnecter',
        manage: 'Gérer',
        configure: 'Configurer',
        exit: 'Quitter',
      },
      // Test direct des traductions AI Doctor
      aiDoctorTest: aiDoctorTranslations.fr.aiDoctor.title,
      aiChatTest: aiDoctorTranslations.fr.aiChat.title,
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
