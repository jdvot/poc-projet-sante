import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock complet pour react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // French translations for common keys used in tests
      const translations: Record<string, string> = {
        'settings.title': 'Paramètres',
        'settings.description': 'Gérez vos préférences et paramètres',
        'settings.notifications.title': 'Notifications',
        'settings.notifications.description':
          'Configurez vos préférences de notifications',
        'settings.notifications.email': 'Notifications par email',
        'settings.notifications.emailDesc':
          'Recevoir des notifications par email',
        'settings.notifications.push': 'Notifications push',
        'settings.notifications.pushDesc': 'Recevoir des notifications push',
        'settings.notifications.sms': 'Notifications SMS',
        'settings.notifications.smsDesc': 'Recevoir des notifications par SMS',
        'settings.privacy.title': 'Confidentialité',
        'settings.privacy.description':
          'Gérez vos paramètres de confidentialité',
        'settings.privacy.shareData': 'Partager les données',
        'settings.privacy.shareDataDesc':
          'Autoriser le partage de données anonymes',
        'settings.privacy.analytics': 'Analytics',
        'settings.privacy.analyticsDesc':
          'Autoriser la collecte de données analytiques',
        'settings.accessibility.title': 'Accessibilité',
        'settings.accessibility.description':
          "Personnalisez l'interface pour votre confort",
        'settings.accessibility.fontSize': 'Taille de police',
        'settings.accessibility.highContrast': 'Contraste élevé',
        'settings.accessibility.highContrastDesc':
          'Activer le mode contraste élevé',
        'settings.accessibility.reducedMotion': 'Mouvement réduit',
        'settings.accessibility.reducedMotionDesc': 'Réduire les animations',
        'settings.accessibility.small': 'Petite',
        'settings.accessibility.medium': 'Moyenne',
        'settings.accessibility.large': 'Grande',
        'settings.units.title': 'Unités de mesure',
        'settings.units.description':
          'Choisissez vos unités de mesure préférées',
        'settings.units.weight': 'Poids',
        'settings.units.height': 'Taille',
        'settings.units.temperature': 'Température',
        'settings.discard': 'Annuler',
        'settings.reset': 'Réinitialiser',
        'settings.save': 'Enregistrer',
        'settings.currentSettings': 'Paramètres actuels',
        'settings.language': 'Langue',
        'settings.activeNotifications': 'Notifications actives',
        'settings.notifications.active': 'Notifications actives',
        'settings.weight': 'Poids',
        'settings.height': 'Taille',
        'settings.temperature': 'Température',
        // Profile translations
        'profile.title': 'Profil Santé',
        'profile.description':
          'Gérez vos informations personnelles et de santé',
        'profile.saveChanges': 'Sauvegarder les modifications',
        'profile.cancel': 'Annuler',
        'profile.noName': 'No name',
        'profile.saveChangesButton': 'Sauvegarder les modifications',
        'profile.name': 'John Doe',
        'profile.email': 'john@example.com',
        'profile.actions.save': 'Save Profile',
        'profile.actions.cancel': 'Cancel',
        // Additional settings translations
        'settings.languageFrench': 'Langue: Français',
        'settings.activeNotificationsCount': 'Notifications actives: 1',
        'settings.weightUnit': 'Poids: KG',
        // Navigation translations
        welcome: 'Bienvenue',
        'dashboard.title': 'Tableau de bord',
        'dashboard.subtitle': "Vue d'ensemble de votre santé",
        'dashboard.refresh': 'Actualiser',
        'navigation.profile': 'Profil',
        aiDoctor: 'IA Médecin',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: vi.fn(),
      language: 'fr',
    },
  }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}));

// Mock pour window.matchMedia (nécessaire pour Mantine)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Add a mock for ResizeObserver, which is not available in JSDOM environment
// This is required for Mantine components that use use-resize-observer hook
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock scrollIntoView for DOM elements
Element.prototype.scrollIntoView = vi.fn();
