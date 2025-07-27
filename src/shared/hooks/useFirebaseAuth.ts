'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  AuthError,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { useAuthStore } from '../stores/authStore';
import { useIsMobile } from './useDeviceDetection';
import { useTranslation } from 'react-i18next';

// Types pour l'authentification
interface AuthState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  user: FirebaseUser | null;
  redirectPending: boolean;
  configError: boolean;
  mobileAuthError: boolean; // Nouveau : erreur spécifique mobile
}

interface AuthActions {
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  clearError: () => void;
  clearRedirectPending: () => void;
  retryAuthentication: () => Promise<void>;
  retryMobileAuth: () => Promise<void>; // Nouveau : retry spécifique mobile
}

export const useFirebaseAuth = (): AuthState & AuthActions => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [redirectPending, setRedirectPending] = useState(false);
  const [configError, setConfigError] = useState(false);
  const [mobileAuthError, setMobileAuthError] = useState(false);
  const { login, logout, isAuthenticated } = useAuthStore();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  // Fonction pour vérifier la configuration Firebase
  const checkFirebaseConfig = useCallback(() => {
    try {
      const config = auth.app.options;
      const requiredFields = ['apiKey', 'authDomain', 'projectId'] as const;
      const missingFields = requiredFields.filter((field) => !config[field]);

      // Vérifier si on utilise des valeurs mock
      const isUsingMockConfig =
        config.apiKey === 'mock-api-key' ||
        config.authDomain === 'mock-project.firebaseapp.com' ||
        config.projectId === 'mock-project-id';

      if (isUsingMockConfig) {
        console.warn(
          'Configuration Firebase mock détectée - authentification non fonctionnelle'
        );
        setConfigError(true);
        return false;
      }

      if (missingFields.length > 0) {
        console.error('Configuration Firebase incomplète:', missingFields);
        setConfigError(true);
        return false;
      }

      setConfigError(false);
      return true;
    } catch (err) {
      console.error(
        'Erreur lors de la vérification de la configuration Firebase:',
        err
      );
      setConfigError(true);
      return false;
    }
  }, []);

  // Fonction pour convertir Firebase User vers notre format
  const convertFirebaseUser = useCallback((firebaseUser: FirebaseUser) => {
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'Utilisateur',
      email: firebaseUser.email || '',
      photoURL: firebaseUser.photoURL || '',
    };
  }, []);

  // Fonction pour gérer les erreurs d'authentification avec traductions
  const handleAuthError = useCallback(
    (err: AuthError) => {
      console.error("Erreur d'authentification Firebase:", err);

      // Réinitialiser les erreurs spécifiques
      setMobileAuthError(false);

      switch (err.code) {
        case 'auth/popup-closed-by-user':
          setError(t('auth.error.redirectCancelledByUser'));
          break;
        case 'auth/popup-blocked':
          if (isMobile) {
            setError(t('auth.error.mobileRedirect'));
            setMobileAuthError(true);
          } else {
            setError(t('auth.error.popupBlocked'));
          }
          break;
        case 'auth/unauthorized-domain':
          setError(t('auth.error.unauthorizedDomain'));
          setConfigError(true);
          break;
        case 'auth/network-request-failed':
          setError(t('auth.error.networkError'));
          break;
        case 'auth/too-many-requests':
          setError(t('auth.error.tooManyRequests'));
          break;
        case 'auth/user-disabled':
          setError(t('auth.error.userDisabled'));
          break;
        case 'auth/user-not-found':
          setError(t('auth.error.userNotFound'));
          break;
        case 'auth/wrong-password':
          setError(t('auth.error.wrongPassword'));
          break;
        case 'auth/invalid-email':
          setError(t('auth.error.invalidEmail'));
          break;
        case 'auth/weak-password':
          setError(t('auth.error.weakPassword'));
          break;
        case 'auth/email-already-in-use':
          setError(t('auth.error.emailAlreadyInUse'));
          break;
        case 'auth/operation-not-allowed':
          setError(t('auth.error.operationNotAllowed'));
          setConfigError(true);
          break;
        case 'auth/account-exists-with-different-credential':
          setError(t('auth.error.accountExistsWithDifferentCredential'));
          break;
        case 'auth/redirect-cancelled-by-user':
          setError(t('auth.error.redirectCancelledByUser'));
          setMobileAuthError(true);
          break;
        case 'auth/redirect-operation-pending':
          setError(t('auth.error.redirectOperationPending'));
          setRedirectPending(true);
          break;
        case 'auth/invalid-api-key':
          setError(t('auth.error.invalidApiKey'));
          setConfigError(true);
          break;
        case 'auth/app-not-authorized':
          setError(t('auth.error.appNotAuthorized'));
          setConfigError(true);
          break;
        case 'auth/web-storage-unsupported':
          setError(t('auth.error.webStorageUnsupported'));
          setMobileAuthError(true);
          break;
        case 'auth/operation-not-supported-in-this-environment':
          setError(t('auth.error.operationNotSupported'));
          setMobileAuthError(true);
          break;
        default:
          setError(t('auth.error.generic'));
      }
    },
    [t, isMobile]
  );

  // Vérifier le résultat de la redirection au chargement
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        console.log('Vérification du résultat de redirection...');
        const result = await getRedirectResult(auth);

        if (result) {
          console.log('Résultat de redirection récupéré:', result.user.email);
          setRedirectPending(false);
          setMobileAuthError(false);

          // Optionnel : Récupérer le token d'accès
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential?.accessToken) {
            console.log("Token d'accès récupéré");
          }
        } else {
          console.log('Aucun résultat de redirection trouvé');
          setRedirectPending(false);
        }
      } catch (err) {
        const authError = err as AuthError;
        console.error(
          'Erreur lors de la vérification de redirection:',
          authError
        );
        handleAuthError(authError);
        setRedirectPending(false);
      }
    };

    // Vérifier si nous sommes sur une page de redirection
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const isRedirect = urlParams.has('apiKey') || urlParams.has('authDomain');

      if (isRedirect) {
        console.log('Page de redirection détectée');
        setRedirectPending(true);
      }
    }

    checkRedirectResult();
  }, []); // Remove handleAuthError dependency to prevent infinite loop

  // Écouter les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          // Utilisateur connecté
          setUser(firebaseUser);
          const userData = convertFirebaseUser(firebaseUser);
          login(userData);
          setRedirectPending(false);
          setMobileAuthError(false);

          // Log pour le debugging
          console.log('Utilisateur connecté:', {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          });
        } else {
          // Utilisateur déconnecté
          setUser(null);
          logout();
          console.log('Utilisateur déconnecté');
        }
        setLoading(false);
        setError(null); // Effacer les erreurs lors des changements d'état
      },
      (err) => {
        console.error(
          "Erreur lors de l'écoute de l'état d'authentification:",
          err
        );
        setError(t('auth.error.generic'));
        setLoading(false);
        setRedirectPending(false);
      }
    );

    return () => unsubscribe();
  }, []); // Remove dependencies to prevent infinite loop - these functions are stable

  // Connexion avec Google
  const signInWithGoogle = useCallback(async () => {
    try {
      setError(null);
      setMobileAuthError(false);
      setLoading(true);

      // Vérifier la configuration Firebase
      if (!checkFirebaseConfig()) {
        setError(t('auth.error.configError'));
        setLoading(false);
        return;
      }

      // Configuration du provider Google
      googleProvider.setCustomParameters({
        prompt: 'select_account',
        access_type: 'offline',
        // Ajouter l'URL de redirection pour mobile
        redirect_uri:
          typeof window !== 'undefined' ? window.location.origin : '',
        // Ajouter des paramètres pour améliorer la compatibilité mobile
        include_granted_scopes: 'true',
      });

      // Utiliser signInWithRedirect sur mobile, signInWithPopup sur desktop
      if (isMobile) {
        console.log('Authentification mobile avec redirection');
        setRedirectPending(true);

        // Ajouter un délai pour permettre à l'UI de se mettre à jour
        await new Promise((resolve) => setTimeout(resolve, 100));

        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectError) {
          console.error('Erreur de redirection mobile:', redirectError);
          setMobileAuthError(true);
          setRedirectPending(false);
          setLoading(false);

          // Essayer avec popup comme fallback
          console.log('Tentative de fallback avec popup...');
          try {
            const result = await signInWithPopup(auth, googleProvider);
            if (result.user) {
              console.log('Fallback popup réussi:', result.user.email);
            }
          } catch (popupError) {
            console.error('Erreur fallback popup:', popupError);
            handleAuthError(popupError as AuthError);
          }
        }
      } else {
        console.log('Authentification desktop avec popup');
        const result = await signInWithPopup(auth, googleProvider);

        // Vérifier si l'utilisateur a été créé avec succès
        if (result.user) {
          console.log('Connexion Google réussie:', result.user.email);

          // Optionnel : Récupérer le token d'accès
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential?.accessToken) {
            console.log("Token d'accès récupéré");
          }
        }
      }
    } catch (err) {
      const authError = err as AuthError;
      console.error('Erreur lors de la connexion Google:', authError);
      handleAuthError(authError);
      setLoading(false);
      setRedirectPending(false);
    }
  }, [handleAuthError, isMobile, checkFirebaseConfig, t]);

  // Déconnexion
  const signOutUser = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      await signOut(auth);
      console.log('Déconnexion réussie');
    } catch (err) {
      const authError = err as AuthError;
      console.error('Erreur lors de la déconnexion:', authError);
      setError(t('auth.error.generic'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  // Effacer les erreurs
  const clearError = useCallback(() => {
    setError(null);
    setMobileAuthError(false);
  }, []);

  // Effacer l'état de redirection en cours
  const clearRedirectPending = useCallback(() => {
    setRedirectPending(false);
  }, []);

  // Retry de l'authentification
  const retryAuthentication = useCallback(async () => {
    setError(null);
    setConfigError(false);
    setMobileAuthError(false);
    await signInWithGoogle();
  }, [signInWithGoogle]);

  // Nouveau : Retry spécifique pour l'authentification mobile
  const retryMobileAuth = useCallback(async () => {
    setError(null);
    setMobileAuthError(false);
    setRedirectPending(false);

    // Attendre un peu avant de réessayer
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await signInWithGoogle();
  }, [signInWithGoogle]);

  return {
    loading,
    error,
    isAuthenticated,
    user,
    redirectPending,
    configError,
    mobileAuthError,
    signInWithGoogle,
    signOutUser,
    clearError,
    clearRedirectPending,
    retryAuthentication,
    retryMobileAuth,
  };
};
