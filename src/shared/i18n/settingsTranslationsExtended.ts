export const settingsTranslationsExtended = {
  en: {
    settings: {
      // Main Settings Section
      title: 'Settings',
      description: 'Manage your preferences and personalized settings',

      // Header and Navigation
      header: {
        title: 'Settings',
        subtitle: 'Personalized Configuration',
        breadcrumb: 'Settings',
        backToDashboard: 'Back to Dashboard',
      },

      // Actions and Buttons
      actions: {
        save: 'Save',
        saved: 'Saved',
        saveChanges: 'Save Changes',
        discard: 'Discard',
        reset: 'Reset to Default',
        cancel: 'Cancel',
        apply: 'Apply',
        confirm: 'Confirm',
        close: 'Close',
        edit: 'Edit',
        delete: 'Delete',
        restore: 'Restore Defaults',
        update: 'Update',
        submit: 'Submit',
        test: 'Test',
        preview: 'Preview',
      },

      // Status and Messages
      status: {
        changesDetected: 'Changes have been detected. Remember to save.',
        noChanges: 'No changes detected',
        saving: 'Saving...',
        saved: 'Settings saved successfully!',
        error: 'Error saving settings',
        loading: 'Loading settings...',
        unsavedChanges: 'You have unsaved changes',
        changesApplied: 'Changes applied successfully',
        changesDiscarded: 'Changes discarded',
        settingsReset: 'Settings reset to defaults',
      },

      // Current Settings Display
      currentSettings: 'Current Settings',
      language: 'Language',

      // Notifications Section
      notifications: {
        active: 'Active Notifications',
        title: 'Notifications',
        description: 'Configure your notification preferences',
        email: 'Email Notifications',
        emailDesc: 'Receive notifications by email',
        push: 'Push Notifications',
        pushDesc: 'Receive push notifications',
        sms: 'SMS Notifications',
        smsDesc: 'Receive notifications by SMS',
        inApp: 'In-App Notifications',
        inAppDesc: 'Show notifications within the application',
        sound: 'Sound Notifications',
        soundDesc: 'Play sound for notifications',
        vibration: 'Vibration',
        vibrationDesc: 'Vibrate for notifications',
        quietHours: 'Quiet Hours',
        quietHoursDesc: 'Silence notifications during specified hours',
        frequency: 'Notification Frequency',
        frequencyDesc: 'How often to receive notifications',
        saved: {
          title: 'Settings Saved',
          message: 'Your settings have been saved successfully. {{changes}}',
          singleChange: '1 setting modified',
          multipleChanges: '{{count}} settings modified',
        },
        error: {
          title: 'Save Error',
          message: 'An error occurred while saving your settings.',
        },
        reset: {
          title: 'Settings Reset',
          message: 'All your settings have been reset to default values.',
        },
        discarded: {
          title: 'Changes Discarded',
          message: 'Your changes have been discarded.',
        },
        settingChanged: {
          title: 'Setting Modified',
          message: '{{setting}} has been {{action}}.',
        },
        options: {
          frequency: {
            immediate: 'Immediate',
            hourly: 'Hourly',
            daily: 'Daily',
            weekly: 'Weekly',
            never: 'Never',
          },
          priority: {
            low: 'Low',
            normal: 'Normal',
            high: 'High',
            urgent: 'Urgent',
          },
        },
      },

      // Privacy Section
      privacy: {
        title: 'Privacy',
        description: 'Manage your privacy settings',
        shareData: 'Share Data',
        shareDataDesc: 'Allow sharing of anonymized data',
        analytics: 'Analytics',
        analyticsDesc: 'Allow collection of analytics data',
        location: 'Location Services',
        locationDesc: 'Allow access to your location',
        camera: 'Camera Access',
        cameraDesc: 'Allow access to your camera',
        microphone: 'Microphone Access',
        microphoneDesc: 'Allow access to your microphone',
        contacts: 'Contacts Access',
        contactsDesc: 'Allow access to your contacts',
        healthData: 'Health Data Sharing',
        healthDataDesc: 'Share health data with healthcare providers',
        dataRetention: 'Data Retention',
        dataRetentionDesc: 'How long to keep your data',
        exportData: 'Export Data',
        exportDataDesc: 'Download a copy of your data',
        deleteData: 'Delete Data',
        deleteDataDesc: 'Permanently delete your data',
        options: {
          dataRetention: {
            thirtyDays: '30 Days',
            ninetyDays: '90 Days',
            oneYear: '1 Year',
            forever: 'Forever',
            custom: 'Custom',
          },
        },
      },

      // Accessibility Section
      accessibility: {
        title: 'Accessibility',
        description: 'Customize the interface for better accessibility',
        fontSize: 'Font Size',
        fontSizeDesc: 'Choose the font size',
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
        extraLarge: 'Extra Large',
        highContrast: 'High Contrast',
        highContrastDesc: 'Enable high contrast mode',
        reducedMotion: 'Reduced Motion',
        reducedMotionDesc: 'Reduce animations',
        screenReader: 'Screen Reader Support',
        screenReaderDesc: 'Enable screen reader compatibility',
        keyboardNavigation: 'Keyboard Navigation',
        keyboardNavigationDesc: 'Enable keyboard-only navigation',
        focusIndicators: 'Focus Indicators',
        focusIndicatorsDesc: 'Show focus indicators',
        colorBlindness: 'Color Blindness Support',
        colorBlindnessDesc: 'Optimize colors for color blindness',
        dyslexia: 'Dyslexia Support',
        dyslexiaDesc: 'Use dyslexia-friendly fonts',
        options: {
          fontSize: {
            extraSmall: 'Extra Small',
            small: 'Small',
            medium: 'Medium',
            large: 'Large',
            extraLarge: 'Extra Large',
            huge: 'Huge',
          },
          contrast: {
            normal: 'Normal',
            high: 'High',
            veryHigh: 'Very High',
            custom: 'Custom',
          },
        },
      },

      // Units Section
      units: {
        title: 'Measurement Units',
        description: 'Choose your preferred measurement units',
        weight: 'Weight',
        weightDesc: 'Unit for weight',
        height: 'Height',
        heightDesc: 'Unit for height',
        temperature: 'Temperature',
        temperatureDesc: 'Unit for temperature',
        distance: 'Distance',
        distanceDesc: 'Unit for distance',
        volume: 'Volume',
        volumeDesc: 'Unit for volume',
        pressure: 'Pressure',
        pressureDesc: 'Unit for blood pressure',
        speed: 'Speed',
        speedDesc: 'Unit for speed',
        options: {
          weight: {
            kg: 'Kilograms (kg)',
            lbs: 'Pounds (lbs)',
            g: 'Grams (g)',
            oz: 'Ounces (oz)',
          },
          height: {
            cm: 'Centimeters (cm)',
            ft: 'Feet & Inches (ft)',
            m: 'Meters (m)',
            in: 'Inches (in)',
          },
          temperature: {
            celsius: 'Celsius (°C)',
            fahrenheit: 'Fahrenheit (°F)',
            kelvin: 'Kelvin (K)',
          },
          distance: {
            km: 'Kilometers (km)',
            mi: 'Miles (mi)',
            m: 'Meters (m)',
            yd: 'Yards (yd)',
          },
          volume: {
            l: 'Liters (L)',
            gal: 'Gallons (gal)',
            ml: 'Milliliters (ml)',
            flOz: 'Fluid Ounces (fl oz)',
          },
          pressure: {
            mmHg: 'mmHg',
            kPa: 'kPa',
            psi: 'PSI',
            atm: 'Atmospheres (atm)',
          },
          speed: {
            kmh: 'Kilometers per hour (km/h)',
            mph: 'Miles per hour (mph)',
            ms: 'Meters per second (m/s)',
          },
        },
      },

      // Security Section
      security: {
        title: 'Security',
        description: 'Manage your security settings',
        password: 'Password',
        passwordDesc: 'Change your password',
        twoFactor: 'Two-Factor Authentication',
        twoFactorDesc: 'Enable two-factor authentication',
        biometric: 'Biometric Authentication',
        biometricDesc: 'Use fingerprint or face recognition',
        sessionTimeout: 'Session Timeout',
        sessionTimeoutDesc: 'Automatically log out after inactivity',
        loginHistory: 'Login History',
        loginHistoryDesc: 'View recent login attempts',
        deviceManagement: 'Device Management',
        deviceManagementDesc: 'Manage connected devices',
        options: {
          sessionTimeout: {
            fifteenMinutes: '15 Minutes',
            thirtyMinutes: '30 Minutes',
            oneHour: '1 Hour',
            fourHours: '4 Hours',
            oneDay: '1 Day',
            never: 'Never',
          },
        },
      },

      // Display Section
      display: {
        title: 'Display',
        description: 'Customize your display settings',
        theme: 'Theme',
        themeDesc: 'Choose your preferred theme',
        brightness: 'Brightness',
        brightnessDesc: 'Adjust screen brightness',
        autoBrightness: 'Auto Brightness',
        autoBrightnessDesc: 'Automatically adjust brightness',
        nightMode: 'Night Mode',
        nightModeDesc: 'Enable dark mode at night',
        colorScheme: 'Color Scheme',
        colorSchemeDesc: 'Choose your color scheme',
        options: {
          theme: {
            light: 'Light',
            dark: 'Dark',
            auto: 'Auto',
            custom: 'Custom',
          },
          colorScheme: {
            blue: 'Blue',
            green: 'Green',
            purple: 'Purple',
            orange: 'Orange',
            red: 'Red',
            custom: 'Custom',
          },
        },
      },

      // Performance Section
      performance: {
        title: 'Performance',
        description: 'Optimize app performance',
        cache: 'Cache Management',
        cacheDesc: 'Manage app cache',
        clearCache: 'Clear Cache',
        clearCacheDesc: 'Clear all cached data',
        dataUsage: 'Data Usage',
        dataUsageDesc: 'Monitor data consumption',
        batteryOptimization: 'Battery Optimization',
        batteryOptimizationDesc: 'Optimize for battery life',
        backgroundSync: 'Background Sync',
        backgroundSyncDesc: 'Sync data in background',
        autoUpdate: 'Auto Update',
        autoUpdateDesc: 'Automatically update the app',
      },

      // Help and Support
      help: {
        title: 'Help & Support',
        description: 'Get help and support',
        faq: 'FAQ',
        faqDesc: 'Frequently asked questions',
        contact: 'Contact Support',
        contactDesc: 'Get in touch with support',
        feedback: 'Send Feedback',
        feedbackDesc: 'Share your feedback',
        about: 'About',
        aboutDesc: 'App information and version',
        terms: 'Terms of Service',
        termsDesc: 'Read terms of service',
        privacy: 'Privacy Policy',
        privacyDesc: 'Read privacy policy',
        licenses: 'Licenses',
        licensesDesc: 'Third-party licenses',
      },

      // Success and Error Messages
      messages: {
        success: {
          settingsSaved: 'Settings saved successfully!',
          settingsUpdated: 'Settings updated successfully!',
          changesApplied: 'Changes applied successfully!',
          cacheCleared: 'Cache cleared successfully!',
          passwordChanged: 'Password changed successfully!',
        },
        error: {
          saveFailed: 'Failed to save settings. Please try again.',
          loadFailed: 'Failed to load settings. Please refresh the page.',
          validationFailed: 'Please fix the validation errors before saving.',
          networkError: 'Network error. Please check your connection.',
          permissionDenied: 'Permission denied. Please check your settings.',
        },
        info: {
          loading: 'Loading settings...',
          saving: 'Saving your settings...',
          processing: 'Processing your changes...',
          noChanges: 'No changes to save',
        },
        warning: {
          unsavedChanges:
            'You have unsaved changes. Are you sure you want to leave?',
          dataLoss: 'This action may result in data loss. Are you sure?',
          permissionRequired: 'This feature requires additional permissions.',
        },
      },

      // Tooltips and Help
      tooltips: {
        save: 'Save your current settings',
        reset: 'Reset all settings to default values',
        discard: 'Discard unsaved changes',
        language: 'Change the application language',
        theme: 'Switch between light and dark themes',
        notifications: 'Configure notification preferences',
        privacy: 'Manage your privacy settings',
        accessibility: 'Customize accessibility options',
        units: 'Choose your preferred measurement units',
        security: 'Manage security settings',
        display: 'Customize display settings',
        performance: 'Optimize app performance',
        help: 'Get help and support',
      },
    },
  },
  fr: {
    settings: {
      // Main Settings Section
      title: 'Paramètres',
      description: 'Gérez vos préférences et paramètres personnalisés',

      // Header and Navigation
      header: {
        title: 'Paramètres',
        subtitle: 'Configuration Personnalisée',
        breadcrumb: 'Paramètres',
        backToDashboard: 'Retour au Tableau de Bord',
      },

      // Actions and Buttons
      actions: {
        save: 'Sauvegarder',
        saved: 'Sauvegardé',
        saveChanges: 'Sauvegarder les modifications',
        discard: 'Annuler',
        reset: 'Réinitialiser',
        cancel: 'Annuler',
        apply: 'Appliquer',
        confirm: 'Confirmer',
        close: 'Fermer',
        edit: 'Modifier',
        delete: 'Supprimer',
        restore: 'Restaurer les valeurs par défaut',
        update: 'Mettre à jour',
        submit: 'Soumettre',
        test: 'Tester',
        preview: 'Aperçu',
      },

      // Status and Messages
      status: {
        changesDetected:
          "Des modifications ont été détectées. N'oubliez pas de sauvegarder.",
        noChanges: 'Aucune modification détectée',
        saving: 'Sauvegarde...',
        saved: 'Paramètres sauvegardés avec succès !',
        error: 'Erreur lors de la sauvegarde',
        loading: 'Chargement des paramètres...',
        unsavedChanges: 'Vous avez des modifications non sauvegardées',
        changesApplied: 'Modifications appliquées avec succès',
        changesDiscarded: 'Modifications annulées',
        settingsReset: 'Paramètres réinitialisés aux valeurs par défaut',
      },

      // Current Settings Display
      currentSettings: 'Paramètres actuels',
      language: 'Langue',

      // Notifications Section
      notifications: {
        active: 'Notifications actives',
        title: 'Notifications',
        description: 'Configurez vos préférences de notifications',
        email: 'Notifications par email',
        emailDesc: 'Recevoir des notifications par email',
        push: 'Notifications push',
        pushDesc: 'Recevoir des notifications push',
        sms: 'Notifications SMS',
        smsDesc: 'Recevoir des notifications par SMS',
        inApp: "Notifications dans l'app",
        inAppDesc: "Afficher les notifications dans l'application",
        sound: 'Notifications sonores',
        soundDesc: 'Jouer un son pour les notifications',
        vibration: 'Vibration',
        vibrationDesc: 'Vibrer pour les notifications',
        quietHours: 'Heures silencieuses',
        quietHoursDesc:
          'Silencier les notifications pendant les heures spécifiées',
        frequency: 'Fréquence des notifications',
        frequencyDesc: 'À quelle fréquence recevoir les notifications',
        saved: {
          title: 'Paramètres sauvegardés',
          message:
            'Vos paramètres ont été sauvegardés avec succès. {{changes}}',
          singleChange: '1 paramètre modifié',
          multipleChanges: '{{count}} paramètres modifiés',
        },
        error: {
          title: 'Erreur de sauvegarde',
          message:
            'Une erreur est survenue lors de la sauvegarde de vos paramètres.',
        },
        reset: {
          title: 'Paramètres réinitialisés',
          message:
            'Tous vos paramètres ont été réinitialisés aux valeurs par défaut.',
        },
        discarded: {
          title: 'Modifications annulées',
          message: 'Vos modifications ont été annulées.',
        },
        settingChanged: {
          title: 'Paramètre modifié',
          message: '{{setting}} a été {{action}}.',
        },
        options: {
          frequency: {
            immediate: 'Immédiat',
            hourly: 'Horaire',
            daily: 'Quotidien',
            weekly: 'Hebdomadaire',
            never: 'Jamais',
          },
          priority: {
            low: 'Faible',
            normal: 'Normal',
            high: 'Élevé',
            urgent: 'Urgent',
          },
        },
      },

      // Privacy Section
      privacy: {
        title: 'Confidentialité',
        description: 'Gérez vos paramètres de confidentialité',
        shareData: 'Partager les données',
        shareDataDesc: 'Autoriser le partage de données anonymisées',
        analytics: 'Analytics',
        analyticsDesc: 'Autoriser la collecte de données analytiques',
        location: 'Services de localisation',
        locationDesc: "Autoriser l'accès à votre localisation",
        camera: 'Accès à la caméra',
        cameraDesc: "Autoriser l'accès à votre caméra",
        microphone: 'Accès au microphone',
        microphoneDesc: "Autoriser l'accès à votre microphone",
        contacts: 'Accès aux contacts',
        contactsDesc: "Autoriser l'accès à vos contacts",
        healthData: 'Partage des données de santé',
        healthDataDesc:
          'Partager les données de santé avec les professionnels de santé',
        dataRetention: 'Rétention des données',
        dataRetentionDesc: 'Combien de temps conserver vos données',
        exportData: 'Exporter les données',
        exportDataDesc: 'Télécharger une copie de vos données',
        deleteData: 'Supprimer les données',
        deleteDataDesc: 'Supprimer définitivement vos données',
        options: {
          dataRetention: {
            thirtyDays: '30 jours',
            ninetyDays: '90 jours',
            oneYear: '1 an',
            forever: 'Pour toujours',
            custom: 'Personnalisé',
          },
        },
      },

      // Accessibility Section
      accessibility: {
        title: 'Accessibilité',
        description:
          "Personnalisez l'interface pour une meilleure accessibilité",
        fontSize: 'Taille de police',
        fontSizeDesc: 'Choisissez la taille de police',
        small: 'Petite',
        medium: 'Moyenne',
        large: 'Grande',
        extraLarge: 'Très grande',
        highContrast: 'Contraste élevé',
        highContrastDesc: 'Activer le mode contraste élevé',
        reducedMotion: 'Mouvement réduit',
        reducedMotionDesc: 'Réduire les animations',
        screenReader: "Support lecteur d'écran",
        screenReaderDesc: "Activer la compatibilité lecteur d'écran",
        keyboardNavigation: 'Navigation clavier',
        keyboardNavigationDesc: 'Activer la navigation clavier uniquement',
        focusIndicators: 'Indicateurs de focus',
        focusIndicatorsDesc: 'Afficher les indicateurs de focus',
        colorBlindness: 'Support daltonisme',
        colorBlindnessDesc: 'Optimiser les couleurs pour le daltonisme',
        dyslexia: 'Support dyslexie',
        dyslexiaDesc: 'Utiliser des polices adaptées à la dyslexie',
        options: {
          fontSize: {
            extraSmall: 'Très petite',
            small: 'Petite',
            medium: 'Moyenne',
            large: 'Grande',
            extraLarge: 'Très grande',
            huge: 'Énorme',
          },
          contrast: {
            normal: 'Normal',
            high: 'Élevé',
            veryHigh: 'Très élevé',
            custom: 'Personnalisé',
          },
        },
      },

      // Units Section
      units: {
        title: 'Unités de mesure',
        description: 'Choisissez vos unités de mesure préférées',
        weight: 'Poids',
        weightDesc: 'Unité pour le poids',
        height: 'Taille',
        heightDesc: 'Unité pour la taille',
        temperature: 'Température',
        temperatureDesc: 'Unité pour la température',
        distance: 'Distance',
        distanceDesc: 'Unité pour la distance',
        volume: 'Volume',
        volumeDesc: 'Unité pour le volume',
        pressure: 'Pression',
        pressureDesc: 'Unité pour la pression artérielle',
        speed: 'Vitesse',
        speedDesc: 'Unité pour la vitesse',
        options: {
          weight: {
            kg: 'Kilogrammes (kg)',
            lbs: 'Livres (lbs)',
            g: 'Grammes (g)',
            oz: 'Onces (oz)',
          },
          height: {
            cm: 'Centimètres (cm)',
            ft: 'Pieds et pouces (ft)',
            m: 'Mètres (m)',
            in: 'Pouces (in)',
          },
          temperature: {
            celsius: 'Celsius (°C)',
            fahrenheit: 'Fahrenheit (°F)',
            kelvin: 'Kelvin (K)',
          },
          distance: {
            km: 'Kilomètres (km)',
            mi: 'Miles (mi)',
            m: 'Mètres (m)',
            yd: 'Yards (yd)',
          },
          volume: {
            l: 'Litres (L)',
            gal: 'Gallons (gal)',
            ml: 'Millilitres (ml)',
            flOz: 'Onces fluides (fl oz)',
          },
          pressure: {
            mmHg: 'mmHg',
            kPa: 'kPa',
            psi: 'PSI',
            atm: 'Atmosphères (atm)',
          },
          speed: {
            kmh: 'Kilomètres par heure (km/h)',
            mph: 'Miles par heure (mph)',
            ms: 'Mètres par seconde (m/s)',
          },
        },
      },

      // Security Section
      security: {
        title: 'Sécurité',
        description: 'Gérez vos paramètres de sécurité',
        password: 'Mot de passe',
        passwordDesc: 'Changer votre mot de passe',
        twoFactor: 'Authentification à deux facteurs',
        twoFactorDesc: "Activer l'authentification à deux facteurs",
        biometric: 'Authentification biométrique',
        biometricDesc:
          "Utiliser l'empreinte digitale ou la reconnaissance faciale",
        sessionTimeout: 'Expiration de session',
        sessionTimeoutDesc: 'Se déconnecter automatiquement après inactivité',
        loginHistory: 'Historique de connexion',
        loginHistoryDesc: 'Voir les tentatives de connexion récentes',
        deviceManagement: 'Gestion des appareils',
        deviceManagementDesc: 'Gérer les appareils connectés',
        options: {
          sessionTimeout: {
            fifteenMinutes: '15 minutes',
            thirtyMinutes: '30 minutes',
            oneHour: '1 heure',
            fourHours: '4 heures',
            oneDay: '1 jour',
            never: 'Jamais',
          },
        },
      },

      // Display Section
      display: {
        title: 'Affichage',
        description: "Personnalisez vos paramètres d'affichage",
        theme: 'Thème',
        themeDesc: 'Choisissez votre thème préféré',
        brightness: 'Luminosité',
        brightnessDesc: "Ajuster la luminosité de l'écran",
        autoBrightness: 'Luminosité automatique',
        autoBrightnessDesc: 'Ajuster automatiquement la luminosité',
        nightMode: 'Mode nuit',
        nightModeDesc: 'Activer le mode sombre la nuit',
        colorScheme: 'Schéma de couleurs',
        colorSchemeDesc: 'Choisissez votre schéma de couleurs',
        options: {
          theme: {
            light: 'Clair',
            dark: 'Sombre',
            auto: 'Automatique',
            custom: 'Personnalisé',
          },
          colorScheme: {
            blue: 'Bleu',
            green: 'Vert',
            purple: 'Violet',
            orange: 'Orange',
            red: 'Rouge',
            custom: 'Personnalisé',
          },
        },
      },

      // Performance Section
      performance: {
        title: 'Performance',
        description: "Optimiser les performances de l'app",
        cache: 'Gestion du cache',
        cacheDesc: "Gérer le cache de l'app",
        clearCache: 'Vider le cache',
        clearCacheDesc: 'Vider toutes les données en cache',
        dataUsage: 'Utilisation des données',
        dataUsageDesc: 'Surveiller la consommation de données',
        batteryOptimization: 'Optimisation batterie',
        batteryOptimizationDesc:
          'Optimiser pour la durée de vie de la batterie',
        backgroundSync: 'Synchronisation en arrière-plan',
        backgroundSyncDesc: 'Synchroniser les données en arrière-plan',
        autoUpdate: 'Mise à jour automatique',
        autoUpdateDesc: "Mettre à jour automatiquement l'app",
      },

      // Help and Support
      help: {
        title: 'Aide & Support',
        description: "Obtenir de l'aide et du support",
        faq: 'FAQ',
        faqDesc: 'Questions fréquemment posées',
        contact: 'Contacter le support',
        contactDesc: 'Entrer en contact avec le support',
        feedback: 'Envoyer un commentaire',
        feedbackDesc: 'Partager votre avis',
        about: 'À propos',
        aboutDesc: "Informations et version de l'app",
        terms: "Conditions d'utilisation",
        termsDesc: "Lire les conditions d'utilisation",
        privacy: 'Politique de confidentialité',
        privacyDesc: 'Lire la politique de confidentialité',
        licenses: 'Licences',
        licensesDesc: 'Licences tierces',
      },

      // Success and Error Messages
      messages: {
        success: {
          settingsSaved: 'Paramètres sauvegardés avec succès !',
          settingsUpdated: 'Paramètres mis à jour avec succès !',
          changesApplied: 'Modifications appliquées avec succès !',
          cacheCleared: 'Cache vidé avec succès !',
          passwordChanged: 'Mot de passe changé avec succès !',
        },
        error: {
          saveFailed:
            'Échec de la sauvegarde des paramètres. Veuillez réessayer.',
          loadFailed:
            'Échec du chargement des paramètres. Veuillez actualiser la page.',
          validationFailed:
            'Veuillez corriger les erreurs de validation avant de sauvegarder.',
          networkError: 'Erreur réseau. Veuillez vérifier votre connexion.',
          permissionDenied:
            'Permission refusée. Veuillez vérifier vos paramètres.',
        },
        info: {
          loading: 'Chargement des paramètres...',
          saving: 'Sauvegarde de vos paramètres...',
          processing: 'Traitement de vos modifications...',
          noChanges: 'Aucune modification à sauvegarder',
        },
        warning: {
          unsavedChanges:
            'Vous avez des modifications non sauvegardées. Êtes-vous sûr de vouloir partir ?',
          dataLoss:
            'Cette action peut entraîner une perte de données. Êtes-vous sûr ?',
          permissionRequired:
            'Cette fonctionnalité nécessite des permissions supplémentaires.',
        },
      },

      // Tooltips and Help
      tooltips: {
        save: 'Sauvegarder vos paramètres actuels',
        reset: 'Réinitialiser tous les paramètres aux valeurs par défaut',
        discard: 'Annuler les modifications non sauvegardées',
        language: "Changer la langue de l'application",
        theme: 'Basculer entre les thèmes clair et sombre',
        notifications: 'Configurer les préférences de notifications',
        privacy: 'Gérer vos paramètres de confidentialité',
        accessibility: "Personnaliser les options d'accessibilité",
        units: 'Choisir vos unités de mesure préférées',
        security: 'Gérer les paramètres de sécurité',
        display: "Personnaliser les paramètres d'affichage",
        performance: "Optimiser les performances de l'app",
        help: "Obtenir de l'aide et du support",
      },
    },
  },
};
