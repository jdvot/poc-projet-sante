import { localConfig } from './environments/local';
import { stagingConfig } from './environments/staging';
import { productionConfig } from './environments/production';

// Types pour la configuration
export interface AppConfig {
  app: {
    name: string;
    version: string;
    url: string;
    debug: boolean;
  };
  api: {
    baseUrl: string;
    timeout: number;
    n8nWebhookUrl: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  sentry: {
    dsn: string;
    org: string;
    project: string;
  };
  analytics: {
    gaMeasurementId: string;
    vercelAnalyticsId: string;
  };
  features: {
    aiDoctor: boolean;
    notifications: boolean;
    analytics: boolean;
    debug: boolean;
  };
  development: {
    enableTelemetry: boolean;
    enableDebug: boolean;
    enableQueryDevTools: boolean;
    enableStorybook: boolean;
  };
  performance?: {
    enableCompression: boolean;
    enableCaching: boolean;
    enableMinification: boolean;
    enableSourceMaps: boolean;
  };
  security?: {
    enableCSP: boolean;
    enableHSTS: boolean;
    enableRateLimiting: boolean;
    enableCORS: boolean;
  };
  testing?: {
    cypressBaseUrl: string;
    vitestEnv: string;
  };
}

// Fonction pour déterminer l'environnement
function getEnvironment(): 'local' | 'staging' | 'production' {
  const nodeEnv = process.env.NODE_ENV;
  const vercelEnv = process.env.VERCEL_ENV;
  const customEnv = process.env.NEXT_PUBLIC_ENVIRONMENT;

  // Si un environnement personnalisé est défini
  if (customEnv && ['local', 'staging', 'production'].includes(customEnv)) {
    return customEnv as 'local' | 'staging' | 'production';
  }

  // Si on est sur Vercel
  if (vercelEnv) {
    switch (vercelEnv) {
      case 'production':
        return 'production';
      case 'preview':
        return 'staging';
      default:
        return 'local';
    }
  }

  // Basé sur NODE_ENV
  switch (nodeEnv) {
    case 'production':
      return 'production';
    case 'development':
    case 'test':
      return 'local';
    default:
      return 'local';
  }
}

// Configuration selon l'environnement
function getConfig(): AppConfig {
  const environment = getEnvironment();

  switch (environment) {
    case 'production':
      return productionConfig;
    case 'staging':
      return stagingConfig;
    case 'local':
    default:
      return localConfig;
  }
}

// Configuration exportée
export const config = getConfig();

// Fonction utilitaire pour vérifier l'environnement
export const isProduction = () => getEnvironment() === 'production';
export const isStaging = () => getEnvironment() === 'staging';
export const isLocal = () => getEnvironment() === 'local';
export const isDevelopment = () => !isProduction();

// Fonction utilitaire pour obtenir l'environnement actuel
export const getCurrentEnvironment = () => getEnvironment();

// Export des configurations individuelles pour les tests
export { localConfig, stagingConfig, productionConfig };
