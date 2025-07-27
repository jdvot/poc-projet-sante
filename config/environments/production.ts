export const productionConfig = {
  // Configuration Firebase
  firebase: {
    apiKey: 'AIzaSyAo2jMGkiZFl3y8dk72esvIL7jfYxgtYQY',
    authDomain: 'sante-limitless-poc.firebaseapp.com',
    projectId: 'sante-limitless-poc',
    storageBucket: 'sante-limitless-poc.firebasestorage.app',
    messagingSenderId: '219684993961',
    appId: '1:219684993961:web:084d9b5e6d4555412f22b8',
  },

  // Configuration de l'application
  app: {
    name: 'Limitless Health',
    version: '1.0.0',
    url: 'https://sante-limitless-poc.web.app',
    apiUrl: 'https://sante-limitless-poc.web.app/api',
  },

  // Configuration N8N
  n8n: {
    webhookUrl: 'https://jdvot57.app.n8n.cloud/webhook/chat',
  },

  // Feature Flags
  features: {
    enableAIDoctor: true,
    enableNotifications: true,
    enableAnalytics: false,
    enableDebug: false,
  },

  // Configuration Sentry
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    org: process.env.SENTRY_ORG,
    project: 'limitless-health',
  },
};
