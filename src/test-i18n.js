// Test simple pour vérifier l'initialisation i18n
import i18n from './shared/i18n/config.ts';

console.log('i18n initialized:', i18n.isInitialized);
console.log('Current language:', i18n.language);
console.log('Available languages:', i18n.languages);

// Test des traductions AI Doctor
console.log('AI Doctor EN:', i18n.t('aiDoctor.title', { lng: 'en' }));
console.log('AI Doctor FR:', i18n.t('aiDoctor.title', { lng: 'fr' }));
console.log('AI Chat EN:', i18n.t('aiChat.title', { lng: 'en' }));
console.log('AI Chat FR:', i18n.t('aiChat.title', { lng: 'fr' })); 