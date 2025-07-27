import {
  initializeApp,
  getApps,
  cert,
  ServiceAccount,
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Configuration Firebase Admin pour le côté serveur
const firebaseAdminConfig: ServiceAccount = {
  projectId: 'sante-limitless-poc',
  privateKey:
    process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ||
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCJIiBgtNQLrKm\nacigvQQtHl6sSpPmYSgVBsghN1XKM0r/lqJKDY3F/cbvxkpyDVNLB8xDJxUKG/8N\n9oC9W3vEeQ8eHLMcBzr54WONeNfDJ4jTrR+Oob0NE1XjXmmU/QBm1V62e+tkHomc\nNARrPD75ghAsKdQ381zLQWD1SXBqKJLcux4mVQSPL10fFSuuDsVsRLlKSYVRQ8aA\nD/9ZYRTud5OrNmjgzhgeMbqQXYCfmcXk+Ja866io1lHpiURyEmjy0Q8hDb7iezxO\n91PZoR4d8B8aJbB4ENt6Hkby5eMb5ANSWQowEJLZrrr00/dJxAkf199nzRcIEVJA\nRloW386NAgMBAAECggEAX66YtlevZK+3LYwqLIoroj77Auf4j4znr8E5ZiF6/x4b\ngu8PCfc3HdLutmKgcyh9Ghf8REZhOKvGnu+T0H9jdtgBKuKTJaesmdXK9kEN+akk\n5spGqMmuvmB+roHsAFlW1tenB8H4J85jHOCIIv+8u8Stys5MwMyIucX9jrZEmJSN\njDatciw6cZ7uArhauZSlk7KMOzdoSjTJCyseg90k7OxwUH75kpGXnG9HOq+gJm3d\nSZSAxwNqMnEu6PJ+EqBpyMtIjPqAxpMPFfDpZ/BcRtURm8Riwx9fbxZ7LrW1cnKh\nM3JwEwduYGcPFSlqwKYc4+K2rMLW75e72QgfKz9AQwKBgQDq6/hdxy5l2f5DB9De\nP4n8yKSrqKTr2LBokDZwrWoAtxDD/UCR0FMy/IoC3qOXYBl0KlIWD8PdLlMzuAQ3\nn2n4doB8OlG05WC8jg6lv/niBpvnES8zmk+PTRVuQ2Oi2kGwf/u8bCHmixTQJqNF\npa9O7cKp3Zap7HGm7fBSU+42cwKBgQDTj+O8yVPlMHePuILAHGRx9a0fnO4SYOOE\nzjUYWOnG83ZqURZU2cpkv7NpKl7HAxUmCNUUcPca2Eqao8BZ1UoZXQTkM8jyutE2\nMKexi4+fO9IX35MCtJxvIxORYyoJD0rplggzOuAC1J+Wl4OSJ7TD4Ykv6q59KYUx\niQxYqlOm/wKBgQCofhjEQiEQIjtQnmF7lj0FFm+tQycOlXtpc83oISj/XE3lFFZk\nfvO9hQ4DouXYo6999wCrHCGSGTDJznkP4AGkmHHtJ/MEeORaONVeooO6Tp0xLM0b\nCNl5YYM2c5UZ78rfqdvHOBNUhHqoFJ5UTNKhHLzbEriGJbUaUlxk4Bfh6wKBgCXG\njY2KDVbhHpglBAO1jiHjEjSQ2tmhPz7ZaxWb2rJRipVVQT2JXeA7cpeWnzG91Srj\nbNinixfaAwg1sQTZVs/MkjEFJh5hSTX53hePqedu0Qa+Pwu+oCggBUByinDvsBqh\nVXmAS7t1p8FF8JJKULahMNPDfcCPh17e77ttPl6VAoGAI1udQTwEvM+VNPjoDR5S\nS9uT0jYkZWhPpvJGMXvjdf+n7zxnMhMlqgx/2aC7dN6PtAp3mP61jRrtwjrZnTwu\n8pOgiN91943qiA1zePICz/+UqbpXeRT7dees6Lxm/9+4/kvSQ0J84K/9K82o0hQG\nkhXc5aaI3AuCPepPTicNtIE=\n-----END PRIVATE KEY-----\n',
  clientEmail:
    'firebase-adminsdk-fbsvc@sante-limitless-poc.iam.gserviceaccount.com',
};

// Initialiser Firebase Admin seulement si pas déjà initialisé et pas en mode statique
if (!getApps().length && typeof window === 'undefined') {
  try {
    initializeApp({
      credential: cert(firebaseAdminConfig),
      projectId: 'sante-limitless-poc',
    });
  } catch (error) {
    console.warn('Firebase Admin initialization failed:', error);
  }
}

// Exporter les services Firebase Admin (seulement côté serveur)
export const adminAuth = typeof window === 'undefined' ? getAuth() : null;
export const adminDb = typeof window === 'undefined' ? getFirestore() : null;

export default getApps()[0] || null;
