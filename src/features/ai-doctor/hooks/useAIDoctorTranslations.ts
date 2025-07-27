import { useTranslation } from 'react-i18next';

export const useAIDoctorTranslations = () => {
  const { t, i18n } = useTranslation();

  // Debug: vérifier si les traductions sont disponibles (only in development)
  if (process.env.NODE_ENV === 'development' && i18n) {
    console.log('useAIDoctorTranslations - Current language:', i18n.language);
    console.log(
      'useAIDoctorTranslations - aiDoctor.title:',
      t('aiDoctor.title')
    );
    console.log('useAIDoctorTranslations - aiChat.title:', t('aiChat.title'));
  }

  return {
    // AI Doctor main component translations
    aiDoctor: {
      title: t('aiDoctor.title'),
      subtitle: t('aiDoctor.subtitle'),
      recommendation: {
        title: t('aiDoctor.recommendation.title'),
        confidence: t('aiDoctor.recommendation.confidence'),
        category: t('aiDoctor.recommendation.category'),
        generatedOn: t('aiDoctor.recommendation.generatedOn'),
        urgency: {
          low: t('aiDoctor.recommendation.urgency.low'),
          medium: t('aiDoctor.recommendation.urgency.medium'),
          high: t('aiDoctor.recommendation.urgency.high'),
          critical: t('aiDoctor.recommendation.urgency.critical'),
        },
        confidenceLevel: {
          veryHigh: t('aiDoctor.recommendation.confidenceLevel.veryHigh'),
          high: t('aiDoctor.recommendation.confidenceLevel.high'),
          moderate: t('aiDoctor.recommendation.confidenceLevel.moderate'),
          low: t('aiDoctor.recommendation.confidenceLevel.low'),
        },
        categories: {
          lifestyle: t('aiDoctor.recommendation.categories.lifestyle'),
          medical: t('aiDoctor.recommendation.categories.medical'),
          nutrition: t('aiDoctor.recommendation.categories.nutrition'),
          exercise: t('aiDoctor.recommendation.categories.exercise'),
        },
      },
    },
    // AI Chat component translations
    aiChat: {
      title: t('aiChat.title'),
      subtitle: t('aiChat.subtitle'),
      welcome: t('aiChat.welcome'),
      welcomeDescription: t('aiChat.welcomeDescription'),
      placeholder: t('aiChat.placeholder'),
      send: t('aiChat.send'),
      sendMessage: t('aiChat.sendMessage'),
      clear: t('aiChat.clear'),
      clearChat: t('aiChat.clearChat'),
      attachFile: t('aiChat.attachFile'),
      filesSelected: t('aiChat.filesSelected'),
      attachedFiles: t('aiChat.attachedFiles'),
      fileAttached: t('aiChat.fileAttached'),
      removeFile: t('aiChat.removeFile'),
      voiceInput: t('aiChat.voiceInput'),
      error: t('aiChat.error'),
      you: t('aiChat.you'),
      aiAssistant: t('aiChat.aiAssistant'),
      n8nIntegration: t('aiChat.n8nIntegration'),
      n8nDescription: t('aiChat.n8nDescription'),
      features: {
        health: t('aiChat.features.health'),
        diagnosis: t('aiChat.features.diagnosis'),
        advice: t('aiChat.features.advice'),
      },
      messageTooLong: t('aiChat.messageTooLong'),
    },
  };
};
