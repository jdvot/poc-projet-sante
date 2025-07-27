export const stagingConfig = {
  // Application
  app: {
    name: 'Limitless Health (Staging)',
    version: '1.0.0',
    url: 'https://staging.limitless-health.com',
    debug: true,
  },

  // API
  api: {
    baseUrl: 'https://staging.limitless-health.com/api',
    timeout: 12000,
    n8nWebhookUrl:
      process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
      'https://staging-n8n.limitless-health.com/webhook/chat',
  },

  // Firebase (Staging)
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  },

  // Sentry (Staging)
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN!,
    org: process.env.SENTRY_ORG!,
    project: process.env.SENTRY_PROJECT!,
  },

  // Analytics (Staging - limité)
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!,
    vercelAnalyticsId: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID!,
  },

  // Feature Flags
  features: {
    aiDoctor: true,
    notifications: true,
    analytics: true, // Activé pour tester
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
    enableCompression: true,
    enableCaching: true,
    enableMinification: true,
    enableSourceMaps: true, // Activé pour le debugging
  },

  // Security
  security: {
    enableCSP: true,
    enableHSTS: true,
    enableRateLimiting: true,
    enableCORS: true,
  },
} as const;
