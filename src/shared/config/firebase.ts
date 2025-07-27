import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  connectAuthEmulator,
} from 'firebase/auth';
import { config } from './index';

const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Configuration pour la redirection mobile
if (typeof window !== 'undefined') {
  // Définir l'URL de redirection pour mobile
  console.log('URL de redirection configurée:', window.location.origin);
}

// Google Auth Provider avec configuration optimisée
export const googleProvider = new GoogleAuthProvider();

// Configuration du provider Google
googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline',
  // Ajouter l'URL de redirection pour mobile
  redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
  // Ajouter des paramètres pour améliorer la compatibilité mobile
  include_granted_scopes: 'true',
});

// Ajouter les scopes nécessaires
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Configuration pour le développement
if (
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true'
) {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    console.log('Firebase Auth Emulator connecté');
  } catch (error) {
    console.log('Firebase Auth Emulator déjà connecté ou non disponible');
  }
}

export default app;
