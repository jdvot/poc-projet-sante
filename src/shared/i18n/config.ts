import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to Limitless Health!',
      dashboard: 'Dashboard',
      aiDoctor: 'AI Doctor',
      profile: 'Profile',
      settings: 'Settings',
      auth: 'Sign in',
      theme: {
        light: 'Light',
        dark: 'Dark',
        auto: 'Auto',
        switchTo: 'Switch to',
        title: 'Theme',
      },
      language: 'Language',
      navigation: {
        main: 'Main navigation',
      },
      home: {
        description: 'A comprehensive health platform with AI-powered features',
        currentSettings: 'Current Settings',
        features: 'Features',
        instructions: 'How to use',
        instructionsText:
          'Use the language and theme switchers in the navigation bar to change the interface language and appearance.',
      },
      // Add more translations as needed
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue sur Limitless Health !',
      dashboard: 'Tableau de bord',
      aiDoctor: 'Docteur IA',
      profile: 'Profil',
      settings: 'Paramètres',
      auth: 'Connexion',
      theme: {
        light: 'Clair',
        dark: 'Sombre',
        auto: 'Auto',
        switchTo: 'Passer au mode',
        title: 'Thème',
      },
      language: 'Langue',
      navigation: {
        main: 'Navigation principale',
      },
      home: {
        description:
          "Une plateforme de santé complète avec des fonctionnalités alimentées par l'IA",
        currentSettings: 'Paramètres actuels',
        features: 'Fonctionnalités',
        instructions: 'Comment utiliser',
        instructionsText:
          "Utilisez les sélecteurs de langue et de thème dans la barre de navigation pour changer la langue et l'apparence de l'interface.",
      },
      // Add more translations as needed
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
