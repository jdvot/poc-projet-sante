import * as Sentry from '@sentry/nextjs';

// DSN mock pour le POC
const SENTRY_DSN = 'https://mock-dsn@sentry.io/123456';

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  environment: process.env.NODE_ENV,
});

export default Sentry;
