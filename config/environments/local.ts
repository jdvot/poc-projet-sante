export const localConfig = {
  // Application
  app: {
    name: 'Limitless Health (Local)',
    version: '1.0.0',
    url: 'http://localhost:3000',
    debug: true,
  },

  // API
  api: {
    baseUrl: 'http://localhost:3000/api',
    timeout: 10000,
    n8nWebhookUrl: 'https://jdvot57.app.n8n.cloud/webhook/chat',
  },

  // Firebase (Local - Mock)
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  },

  // Sentry (Local - Désactivé)
  sentry: {
    dsn: '',
    org: '',
    project: '',
  },

  // Analytics (Local - Désactivé)
  analytics: {
    gaMeasurementId: '',
    vercelAnalyticsId: '',
  },

  // Feature Flags
  features: {
    aiDoctor: true,
    notifications: true,
    analytics: false,
    debug: true,
  },

  // Development
  development: {
    enableTelemetry: false,
    enableDebug: true,
    enableQueryDevTools: true,
    enableStorybook: false,
  },

  // Performance
  performance: {
    enableCompression: false,
    enableCaching: false,
    enableMinification: false,
    enableSourceMaps: true,
  },

  // Security
  security: {
    enableCSP: false,
    enableHSTS: false,
    enableRateLimiting: false,
    enableCORS: true,
  },
} as const;
