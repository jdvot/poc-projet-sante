export const profileTranslations = {
  en: {
    profile: {
      // Main Profile Section
      title: '👤 Health Profile',
      subtitle:
        'Manage your personal health information and track your wellness journey',
      description:
        'Complete your health profile to get personalized insights and recommendations',

      // Header and Navigation
      header: {
        title: 'Health Profile',
        subtitle: 'Personal Health Management',
        breadcrumb: 'Profile',
        backToDashboard: 'Back to Dashboard',
      },

      // Personal Information Section
      personalInfo: {
        title: 'Personal Information',
        subtitle: 'Enter your health and personal details',
        description: 'Basic information about yourself and your health',
        required: 'Required',
        optional: 'Optional',
      },

      // User Information Section
      userInfo: {
        title: 'Connected User',
        subtitle: 'Your account information',
        connected: 'Connected',
        verified: 'Verified',
        memberSince: 'Member since',
        lastLogin: 'Last login',
        accountStatus: 'Account Status',
        premium: 'Premium',
        basic: 'Basic',
      },

      // Health Statistics Section
      healthStats: {
        title: 'Health Statistics',
        subtitle: 'Real-time health metrics based on your profile',
        bmiScore: 'BMI Score',
        idealWeight: 'Ideal Weight',
        bmr: 'BMR',
        height: 'Height',
        weight: 'Weight',
        aboutBmi: 'About Body Mass Index (BMI)',
        bmiDescription:
          "BMI is a body mass indicator that helps assess health risks. It's calculated by dividing weight (kg) by the square of height (m²). This metric provides a general health assessment but should be considered alongside other factors like muscle mass and body composition.",
        bmiCategory: 'BMI Category: {{category}}',
        bmiRange: 'BMI Range',
        healthScore: 'Health Score',
        metabolicRate: 'Metabolic Rate',
        bodyComposition: 'Body Composition',
        recommendations: {
          underweight:
            'Consider consulting with a healthcare provider about healthy weight gain strategies.',
          normal:
            'Great! Your BMI is within the healthy range. Maintain a balanced diet and regular exercise.',
          overweight:
            'Consider lifestyle changes including diet and exercise. Consult a healthcare provider for personalized advice.',
          obese:
            'We recommend consulting with a healthcare provider for a comprehensive health assessment and personalized plan.',
        },
        categories: {
          underweight: 'Underweight',
          normalWeight: 'Normal Weight',
          overweight: 'Overweight',
          obese: 'Obese',
        },
      },

      // Form Progress and Completion
      progress: {
        title: 'Profile Completion',
        subtitle: 'Complete your profile to unlock all features',
        percentage: '{{percentage}}% Complete',
        remaining: '{{count}} fields remaining',
        completed: 'Profile completed!',
        incomplete: 'Profile incomplete',
      },

      // Validation and Errors
      validation: {
        errorsFound: '{{count}} validation error{{plural}} found',
        errorsFound_plural: '{{count}} validation errors found',
        fixErrors: 'Please fix the errors below',
        allValid: 'All fields are valid',
      },

      // Unsaved Changes
      unsavedChanges: {
        title: 'Unsaved Changes',
        message:
          'You have unsaved changes to your profile. Please save your changes before leaving this page.',
        saveNow: 'Save Now',
        discard: 'Discard Changes',
        continueEditing: 'Continue Editing',
      },

      // Actions and Buttons
      actions: {
        cancel: 'Cancel',
        save: 'Save Profile',
        saving: 'Saving...',
        saved: 'Profile Saved',
        edit: 'Edit Profile',
        reset: 'Reset Form',
        clear: 'Clear All',
        submit: 'Submit',
        update: 'Update',
        delete: 'Delete',
        confirm: 'Confirm',
      },

      // Form Fields
      form: {
        fields: {
          name: 'Full Name',
          email: 'Email Address',
          age: 'Age',
          gender: 'Gender',
          height: 'Height (cm)',
          weight: 'Weight (kg)',
          activityLevel: 'Activity Level',
          medicalHistory: 'Medical History',
          allergies: 'Allergies',
          medications: 'Current Medications',
          goals: 'Health Goals',
          phone: 'Phone Number',
          address: 'Address',
          emergencyContact: 'Emergency Contact',
          bloodType: 'Blood Type',
          occupation: 'Occupation',
          lifestyle: 'Lifestyle',
        },
        placeholders: {
          name: 'Enter your full name',
          email: 'Enter your email address',
          age: 'Enter your age',
          height: 'Enter your height in centimeters',
          weight: 'Enter your weight in kilograms',
          medicalHistory: 'Describe your medical history',
          allergies: 'List any allergies',
          medications: 'List current medications',
          goals: 'Describe your health goals',
          phone: 'Enter your phone number',
          address: 'Enter your address',
          emergencyContact: 'Enter emergency contact information',
          occupation: 'Enter your occupation',
          lifestyle: 'Describe your lifestyle',
        },
        descriptions: {
          name: 'Your name as it will appear on your profile',
          email: 'Your email address for notifications and account recovery',
          age: 'Your current age for health calculations',
          height: 'Your height in centimeters for BMI calculations',
          weight: 'Your current weight in kilograms',
          medicalHistory: 'Any relevant medical history or conditions',
          allergies: 'Any allergies or sensitivities you have',
          medications: 'Current medications you are taking',
          goals: 'Your health and fitness goals',
        },
        options: {
          gender: {
            male: 'Male',
            female: 'Female',
            other: 'Other',
            preferNotToSay: 'Prefer not to say',
          },
          activityLevel: {
            sedentary: 'Sedentary (little or no exercise)',
            light: 'Lightly active (light exercise 1-3 days/week)',
            moderate: 'Moderately active (moderate exercise 3-5 days/week)',
            active: 'Very active (hard exercise 6-7 days/week)',
            veryActive: 'Extremely active (very hard exercise, physical job)',
          },
          bloodType: {
            aPositive: 'A+',
            aNegative: 'A-',
            bPositive: 'B+',
            bNegative: 'B-',
            abPositive: 'AB+',
            abNegative: 'AB-',
            oPositive: 'O+',
            oNegative: 'O-',
            unknown: 'Unknown',
          },
        },
        validation: {
          required: 'This field is required',
          invalidEmail: 'Please enter a valid email address',
          invalidAge: 'Age must be between 1 and 120',
          invalidHeight: 'Height must be between 50 and 300 cm',
          invalidWeight: 'Weight must be between 20 and 500 kg',
          invalidPhone: 'Please enter a valid phone number',
          minLength: 'This field must be at least {{min}} characters long',
          maxLength: 'This field must be no more than {{max}} characters long',
          invalidFormat: 'Invalid format',
          tooShort: 'Too short',
          tooLong: 'Too long',
          invalidValue: 'Invalid value',
        },
      },

      // Success and Error Messages
      messages: {
        success: {
          profileSaved: 'Profile saved successfully!',
          profileUpdated: 'Profile updated successfully!',
          changesApplied: 'Changes applied successfully!',
        },
        error: {
          saveFailed: 'Failed to save profile. Please try again.',
          loadFailed: 'Failed to load profile data. Please refresh the page.',
          validationFailed: 'Please fix the validation errors before saving.',
          networkError: 'Network error. Please check your connection.',
        },
        info: {
          loading: 'Loading profile data...',
          saving: 'Saving your profile...',
          processing: 'Processing your information...',
        },
      },

      // Tooltips and Help
      tooltips: {
        bmi: 'Body Mass Index - A measure of body fat based on height and weight',
        bmr: 'Basal Metabolic Rate - The number of calories your body burns at rest',
        idealWeight: 'Recommended weight range for your height and age',
        healthScore: 'Overall health assessment based on your profile data',
        required: 'This field is required to complete your profile',
        optional: 'This field is optional but recommended for better insights',
      },
    },
  },
  fr: {
    profile: {
      // Main Profile Section
      title: '👤 Profil de Santé',
      subtitle:
        'Gérez vos informations de santé personnelles et suivez votre parcours de bien-être',
      description:
        'Complétez votre profil de santé pour obtenir des insights personnalisés et des recommandations',

      // Header and Navigation
      header: {
        title: 'Profil de Santé',
        subtitle: 'Gestion de la Santé Personnelle',
        breadcrumb: 'Profil',
        backToDashboard: 'Retour au Tableau de Bord',
      },

      // Personal Information Section
      personalInfo: {
        title: 'Informations Personnelles',
        subtitle: 'Saisissez vos détails de santé et personnels',
        description: 'Informations de base sur vous et votre santé',
        required: 'Requis',
        optional: 'Optionnel',
      },

      // User Information Section
      userInfo: {
        title: 'Utilisateur Connecté',
        subtitle: 'Vos informations de compte',
        connected: 'Connecté',
        verified: 'Vérifié',
        memberSince: 'Membre depuis',
        lastLogin: 'Dernière connexion',
        accountStatus: 'Statut du Compte',
        premium: 'Premium',
        basic: 'Basique',
      },

      // Health Statistics Section
      healthStats: {
        title: 'Statistiques de Santé',
        subtitle: 'Métriques de santé en temps réel basées sur votre profil',
        bmiScore: 'Score IMC',
        idealWeight: 'Poids Idéal',
        bmr: 'MBR',
        height: 'Taille',
        weight: 'Poids',
        aboutBmi: "À propos de l'Indice de Masse Corporelle (IMC)",
        bmiDescription:
          "L'IMC est un indicateur de masse corporelle qui aide à évaluer les risques pour la santé. Il est calculé en divisant le poids (kg) par le carré de la taille (m²). Cette métrique fournit une évaluation générale de la santé mais doit être considérée avec d'autres facteurs comme la masse musculaire et la composition corporelle.",
        bmiCategory: 'Catégorie IMC : {{category}}',
        bmiRange: 'Fourchette IMC',
        healthScore: 'Score de Santé',
        metabolicRate: 'Taux Métabolique',
        bodyComposition: 'Composition Corporelle',
        recommendations: {
          underweight:
            'Considérez consulter un professionnel de santé pour des stratégies de prise de poids saine.',
          normal:
            "Excellent ! Votre IMC est dans la fourchette normale. Maintenez une alimentation équilibrée et faites de l'exercice régulièrement.",
          overweight:
            "Considérez des changements de mode de vie incluant l'alimentation et l'exercice. Consultez un professionnel de santé pour des conseils personnalisés.",
          obese:
            'Nous recommandons de consulter un professionnel de santé pour une évaluation complète de la santé et un plan personnalisé.',
        },
        categories: {
          underweight: 'Insuffisance pondérale',
          normalWeight: 'Poids normal',
          overweight: 'Surpoids',
          obese: 'Obésité',
        },
      },

      // Form Progress and Completion
      progress: {
        title: 'Complétion du Profil',
        subtitle:
          'Complétez votre profil pour débloquer toutes les fonctionnalités',
        percentage: '{{percentage}}% Complété',
        remaining: '{{count}} champs restants',
        completed: 'Profil complété !',
        incomplete: 'Profil incomplet',
      },

      // Validation and Errors
      validation: {
        errorsFound: '{{count}} erreur de validation trouvée',
        errorsFound_plural: '{{count}} erreurs de validation trouvées',
        fixErrors: 'Veuillez corriger les erreurs ci-dessous',
        allValid: 'Tous les champs sont valides',
      },

      // Unsaved Changes
      unsavedChanges: {
        title: 'Modifications Non Sauvegardées',
        message:
          'Vous avez des modifications non sauvegardées dans votre profil. Veuillez sauvegarder vos modifications avant de quitter cette page.',
        saveNow: 'Sauvegarder Maintenant',
        discard: 'Annuler les Modifications',
        continueEditing: "Continuer l'Édition",
      },

      // Actions and Buttons
      actions: {
        cancel: 'Annuler',
        save: 'Sauvegarder le Profil',
        saving: 'Sauvegarde...',
        saved: 'Profil Sauvegardé',
        edit: 'Modifier le Profil',
        reset: 'Réinitialiser le Formulaire',
        clear: 'Tout Effacer',
        submit: 'Soumettre',
        update: 'Mettre à Jour',
        delete: 'Supprimer',
        confirm: 'Confirmer',
      },

      // Form Fields
      form: {
        fields: {
          name: 'Nom Complet',
          email: 'Adresse Email',
          age: 'Âge',
          gender: 'Genre',
          height: 'Taille (cm)',
          weight: 'Poids (kg)',
          activityLevel: "Niveau d'Activité",
          medicalHistory: 'Antécédents Médicaux',
          allergies: 'Allergies',
          medications: 'Médicaments Actuels',
          goals: 'Objectifs de Santé',
          phone: 'Numéro de Téléphone',
          address: 'Adresse',
          emergencyContact: "Contact d'Urgence",
          bloodType: 'Groupe Sanguin',
          occupation: 'Profession',
          lifestyle: 'Mode de Vie',
        },
        placeholders: {
          name: 'Saisissez votre nom complet',
          email: 'Saisissez votre adresse email',
          age: 'Saisissez votre âge',
          height: 'Saisissez votre taille en centimètres',
          weight: 'Saisissez votre poids en kilogrammes',
          medicalHistory: 'Décrivez vos antécédents médicaux',
          allergies: 'Listez vos allergies',
          medications: 'Listez vos médicaments actuels',
          goals: 'Décrivez vos objectifs de santé',
          phone: 'Saisissez votre numéro de téléphone',
          address: 'Saisissez votre adresse',
          emergencyContact: "Saisissez les informations de contact d'urgence",
          occupation: 'Saisissez votre profession',
          lifestyle: 'Décrivez votre mode de vie',
        },
        descriptions: {
          name: "Votre nom tel qu'il apparaîtra sur votre profil",
          email:
            'Votre adresse email pour les notifications et la récupération de compte',
          age: 'Votre âge actuel pour les calculs de santé',
          height: "Votre taille en centimètres pour les calculs d'IMC",
          weight: 'Votre poids actuel en kilogrammes',
          medicalHistory: 'Tout antécédent médical ou condition pertinente',
          allergies: 'Toutes allergies ou sensibilités que vous avez',
          medications: 'Médicaments actuels que vous prenez',
          goals: 'Vos objectifs de santé et de forme physique',
        },
        options: {
          gender: {
            male: 'Homme',
            female: 'Femme',
            other: 'Autre',
            preferNotToSay: 'Préfère ne pas dire',
          },
          activityLevel: {
            sedentary: "Sédentaire (peu ou pas d'exercice)",
            light: 'Légèrement actif (exercice léger 1-3 jours/semaine)',
            moderate: 'Modérément actif (exercice modéré 3-5 jours/semaine)',
            active: 'Très actif (exercice intense 6-7 jours/semaine)',
            veryActive:
              'Extrêmement actif (exercice très intense, travail physique)',
          },
          bloodType: {
            aPositive: 'A+',
            aNegative: 'A-',
            bPositive: 'B+',
            bNegative: 'B-',
            abPositive: 'AB+',
            abNegative: 'AB-',
            oPositive: 'O+',
            oNegative: 'O-',
            unknown: 'Inconnu',
          },
        },
        validation: {
          required: 'Ce champ est requis',
          invalidEmail: 'Veuillez saisir une adresse email valide',
          invalidAge: "L'âge doit être entre 1 et 120",
          invalidHeight: 'La taille doit être entre 50 et 300 cm',
          invalidWeight: 'Le poids doit être entre 20 et 500 kg',
          invalidPhone: 'Veuillez saisir un numéro de téléphone valide',
          minLength: 'Ce champ doit contenir au moins {{min}} caractères',
          maxLength: 'Ce champ ne doit pas dépasser {{max}} caractères',
          invalidFormat: 'Format invalide',
          tooShort: 'Trop court',
          tooLong: 'Trop long',
          invalidValue: 'Valeur invalide',
        },
      },

      // Success and Error Messages
      messages: {
        success: {
          profileSaved: 'Profil sauvegardé avec succès !',
          profileUpdated: 'Profil mis à jour avec succès !',
          changesApplied: 'Modifications appliquées avec succès !',
        },
        error: {
          saveFailed: 'Échec de la sauvegarde du profil. Veuillez réessayer.',
          loadFailed:
            'Échec du chargement des données du profil. Veuillez actualiser la page.',
          validationFailed:
            'Veuillez corriger les erreurs de validation avant de sauvegarder.',
          networkError: 'Erreur réseau. Veuillez vérifier votre connexion.',
        },
        info: {
          loading: 'Chargement des données du profil...',
          saving: 'Sauvegarde de votre profil...',
          processing: 'Traitement de vos informations...',
        },
      },

      // Tooltips and Help
      tooltips: {
        bmi: 'Indice de Masse Corporelle - Une mesure de graisse corporelle basée sur la taille et le poids',
        bmr: 'Taux Métabolique de Base - Le nombre de calories que votre corps brûle au repos',
        idealWeight: 'Fourchette de poids recommandée pour votre taille et âge',
        healthScore:
          'Évaluation globale de la santé basée sur les données de votre profil',
        required: 'Ce champ est requis pour compléter votre profil',
        optional:
          'Ce champ est optionnel mais recommandé pour de meilleurs insights',
      },
    },
  },
};
