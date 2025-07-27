export const authTranslations = {
  en: {
    auth: {
      title: '🔐 Authentication',
      subtitle: 'Sign in to your Limitless Health account',
      welcome: 'Welcome',
      connected: 'Connected',
      error: {
        title: 'Authentication Error',
        generic: 'An error occurred during authentication',
        noInternet: 'No internet connection. Please check your network.',
        popupBlocked: 'Popup blocked. Please allow popups for this site.',
        mobileRedirect:
          'On mobile, authentication is done by redirect. Please wait...',
        networkError:
          'Network error. Please check your connection and try again.',
        tooManyRequests:
          'Too many login attempts. Please wait a moment before trying again.',
        unauthorizedDomain: 'This domain is not authorized for authentication.',
        userDisabled: 'This user account has been disabled.',
        userNotFound: 'No user found with these credentials.',
        wrongPassword: 'Incorrect password.',
        invalidEmail: 'Invalid email address.',
        weakPassword: 'Password is too weak.',
        emailAlreadyInUse: 'This email address is already in use.',
        operationNotAllowed:
          'Google authentication is not enabled for this project.',
        accountExistsWithDifferentCredential:
          'An account already exists with the same email but different credentials.',
        redirectCancelledByUser: 'Authentication cancelled by user.',
        redirectOperationPending:
          'A redirect operation is already in progress.',
        invalidApiKey: 'Invalid Firebase API key.',
        appNotAuthorized: 'Application is not authorized.',
        configError: 'Firebase configuration error.',
        webStorageUnsupported: 'Web storage is not supported in this browser.',
        operationNotSupported:
          'This operation is not supported in this environment.',
        retry: 'Retry',
      },
      login: {
        title: 'Choose your sign-in method',
        googleButton: 'Sign in with Google',
        loading: 'Signing in...',
        mobileLoading: 'Redirecting to Google...',
        mobileRedirecting: 'Redirecting to Google...',
        cancelRedirect: 'Cancel',
        or: 'or',
      },
      logout: {
        button: 'Sign out',
        loading: 'Signing out...',
      },
      dashboard: {
        button: 'Access Dashboard',
      },
      home: {
        button: 'Go to Home',
      },
      features: {
        secure: '✅ Secure authentication with Firebase',
        privacy: '✅ Personal data protection',
        gdpr: '✅ GDPR compliance',
      },
      mobile: {
        title: 'Mobile Authentication',
        info: 'You will be redirected to Google to sign in, then automatically return to the application.',
        secure: 'Secure and fast connection',
        popupNote:
          'If the redirect does not work, check that popups are not blocked in your browser settings.',
        deviceMode: 'Mobile mode - Automatic redirect',
        desktopMode: 'Desktop mode - Login popup',
      },
      connectivity: {
        online: 'Online',
        offline: 'Offline',
        noConnection: 'No internet connection',
        checkNetwork: 'Check your network connection to sign in.',
      },
      footer: {
        terms: 'By signing in, you agree to our',
        termsLink: 'Terms of Service',
        privacy: 'and our',
        privacyLink: 'Privacy Policy',
      },
      user: {
        welcome: 'Welcome,',
        email: 'Email:',
      },
    },
  },
  fr: {
    auth: {
      title: '🔐 Authentification',
      subtitle: 'Connectez-vous à votre compte Limitless Health',
      welcome: 'Bienvenue',
      connected: 'Connecté',
      error: {
        title: "Erreur d'authentification",
        generic: "Une erreur est survenue lors de l'authentification",
        noInternet: 'Pas de connexion internet. Vérifiez votre réseau.',
        popupBlocked:
          'Popup bloquée. Veuillez autoriser les popups pour ce site.',
        mobileRedirect:
          "Sur mobile, l'authentification se fait par redirection. Veuillez patienter...",
        networkError:
          'Erreur de réseau. Vérifiez votre connexion et réessayez.',
        tooManyRequests:
          'Trop de tentatives de connexion. Veuillez attendre un moment avant de réessayer.',
        unauthorizedDomain:
          "Ce domaine n'est pas autorisé pour l'authentification.",
        userDisabled: 'Ce compte utilisateur a été désactivé.',
        userNotFound: 'Aucun utilisateur trouvé avec ces identifiants.',
        wrongPassword: 'Mot de passe incorrect.',
        invalidEmail: 'Adresse email invalide.',
        weakPassword: 'Le mot de passe est trop faible.',
        emailAlreadyInUse: 'Cette adresse email est déjà utilisée.',
        operationNotAllowed:
          "L'authentification Google n'est pas activée pour ce projet.",
        accountExistsWithDifferentCredential:
          'Un compte existe déjà avec la même adresse email mais des identifiants différents.',
        redirectCancelledByUser: "Connexion annulée par l'utilisateur.",
        redirectOperationPending:
          'Une opération de redirection est déjà en cours.',
        invalidApiKey: 'Clé API Firebase invalide.',
        appNotAuthorized: "L'application n'est pas autorisée.",
        configError: 'Erreur de configuration Firebase.',
        webStorageUnsupported:
          "Le stockage web n'est pas supporté dans ce navigateur.",
        operationNotSupported:
          "Cette opération n'est pas supportée dans cet environnement.",
        retry: 'Réessayer',
      },
      login: {
        title: 'Choisissez votre méthode de connexion',
        googleButton: 'Se connecter avec Google',
        loading: 'Connexion en cours...',
        mobileLoading: 'Redirection vers Google...',
        mobileRedirecting: 'Redirection vers Google...',
        cancelRedirect: 'Annuler',
        or: 'ou',
      },
      logout: {
        button: 'Se déconnecter',
        loading: 'Déconnexion...',
      },
      dashboard: {
        button: 'Accéder au Dashboard',
      },
      home: {
        button: "Aller à l'Accueil",
      },
      features: {
        secure: '✅ Authentification sécurisée avec Firebase',
        privacy: '✅ Protection des données personnelles',
        gdpr: '✅ Conformité RGPD',
      },
      mobile: {
        title: 'Authentification Mobile',
        info: "Vous allez être redirigé vers Google pour vous connecter, puis revenir automatiquement sur l'application.",
        secure: 'Connexion sécurisée et rapide',
        popupNote:
          'Si la redirection ne fonctionne pas, vérifiez que les popups ne sont pas bloqués dans les paramètres de votre navigateur.',
        deviceMode: 'Mode mobile - Redirection automatique',
        desktopMode: 'Mode desktop - Popup de connexion',
      },
      connectivity: {
        online: 'En ligne',
        offline: 'Hors ligne',
        noConnection: 'Pas de connexion internet',
        checkNetwork: 'Vérifiez votre connexion réseau pour vous connecter.',
      },
      footer: {
        terms: 'En vous connectant, vous acceptez nos',
        termsLink: "conditions d'utilisation",
        privacy: 'et notre',
        privacyLink: 'politique de confidentialité',
      },
      user: {
        welcome: 'Bienvenue,',
        email: 'Email:',
      },
    },
  },
};
