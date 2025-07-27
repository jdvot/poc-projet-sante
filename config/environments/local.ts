export const localConfig = {
  // Application
  app: {
    name: 'Limitless Health',
    version: '1.0.0',
    url: 'http://localhost:3000',
    debug: true,
  },

  // API
  api: {
    baseUrl: 'http://localhost:3000/api',
    timeout: 10000,
    n8nWebhookUrl: 'http://localhost:5678/webhook/chat',
  },

  // Firebase (Mock pour le développement local)
  firebase: {
    apiKey: 'mock-api-key',
    authDomain: 'mock-project.firebaseapp.com',
    projectId: 'mock-project-id',
    storageBucket: 'mock-project.appspot.com',
    messagingSenderId: '123456789',
    appId: 'mock-app-id',
  },

  // Sentry (Mock pour le développement local)
  sentry: {
    dsn: 'https://mock-dsn@sentry.io/123456',
    org: 'limitless-health',
    project: 'limitless-health',
  },

  // Analytics (Mock pour le développement local)
  analytics: {
    gaMeasurementId: 'G-MOCKID',
    vercelAnalyticsId: 'mock-vercel-id',
  },

  // Feature Flags
  features: {
    aiDoctor: true,
    notifications: true,
    analytics: false, // Désactivé en local
    debug: true,
  },

  // Development
  development: {
    enableTelemetry: false,
    enableDebug: true,
    enableQueryDevTools: true,
    enableStorybook: true,
  },

  // Testing
  testing: {
    cypressBaseUrl: 'http://localhost:3000',
    vitestEnv: 'jsdom',
  },
} as const;
