export const productionConfig = {
  // Application
  app: {
    name: 'Limitless Health',
    version: '1.0.0',
    url: 'https://limitless-health.com',
    debug: false,
  },

  // API
  api: {
    baseUrl: 'https://limitless-health.com/api',
    timeout: 15000,
    n8nWebhookUrl: 'https://jdvot57.app.n8n.cloud/webhook/chat',
  },

  // Firebase (Production)
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  },

  // Sentry (Production)
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN!,
    org: process.env.SENTRY_ORG!,
    project: process.env.SENTRY_PROJECT!,
  },

  // Analytics (Production)
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!,
    vercelAnalyticsId: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID!,
  },

  // Feature Flags
  features: {
    aiDoctor: true,
    notifications: true,
    analytics: true,
    debug: false,
  },

  // Development
  development: {
    enableTelemetry: false,
    enableDebug: false,
    enableQueryDevTools: false,
    enableStorybook: false,
  },

  // Performance
  performance: {
    enableCompression: true,
    enableCaching: true,
    enableMinification: true,
    enableSourceMaps: false,
  },

  // Security
  security: {
    enableCSP: true,
    enableHSTS: true,
    enableRateLimiting: true,
    enableCORS: true,
  },
} as const;
