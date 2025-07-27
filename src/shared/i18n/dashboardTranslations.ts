export const dashboardTranslations = {
  en: {
    dashboard: {
      // Titres et en-têtes
      title: 'Health Dashboard',
      subtitle: 'Overview of your health data and trends',
      healthOverview: 'Health Overview',
      statistics: 'Health Statistics',
      globalHealth: 'Global Health',
      welcomeMessage: 'Welcome to your health dashboard',
      lastUpdated: 'Last updated',

      // Actions et boutons
      refresh: 'Refresh',
      retry: 'Retry',
      update: 'Update',
      viewDetails: 'View Details',
      exportData: 'Export Data',
      shareReport: 'Share Report',
      downloadPDF: 'Download PDF',
      printReport: 'Print Report',

      // États et statuts
      status: {
        normal: 'Normal',
        elevated: 'Elevated',
        high: 'High',
        critical: 'Critical',
        excellent: 'Excellent',
        good: 'Good',
        fair: 'Fair',
        poor: 'Poor',
        optimal: 'Optimal',
        suboptimal: 'Suboptimal',
        concerning: 'Concerning',
        urgent: 'Requires Attention',
      },

      // Scores et métriques
      healthScore: 'Health Score',
      overallScore: 'Overall Score',
      bmiScore: 'BMI Score',
      riskScore: 'Risk Score',
      wellnessIndex: 'Wellness Index',
      vitalityScore: 'Vitality Score',

      // Messages d'erreur et de chargement
      loadingError: 'Loading Error',
      loadingErrorDescription:
        'Unable to load dashboard data. Please check your connection and try again.',
      noDataAvailable: 'No data available',
      noDataDescription:
        'No health data has been recorded yet. Start by adding your first health measurements.',
      connectionError: 'Connection Error',
      connectionErrorDescription:
        'Unable to connect to the health data service. Please check your internet connection.',
      dataSyncError: 'Data Synchronization Error',
      dataSyncErrorDescription:
        'There was an issue syncing your health data. Some information may be outdated.',

      // Informations temporelles
      lastCheck: 'Last check',
      lastUpdate: 'Last update',
      lastMeasurement: 'Last measurement',
      nextCheck: 'Next check',
      updated: 'Updated',
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This week',
      thisMonth: 'This month',

      // Sections et composants
      recentActivity: 'Recent Activity',
      trends: 'Trends',
      insights: 'Insights',
      summary: 'Summary',
      biomarkers: 'Biomarkers',
      healthMetrics: 'Health Metrics',
      vitalSigns: 'Vital Signs',
      notifications: 'Notifications',

      // Biomarqueurs spécifiques
      biomarkerNames: {
        title: 'Biomarkers',
        glucose: 'Glucose',
        cholesterol: 'Cholesterol',
        triglycerides: 'Triglycerides',
        hdl: 'HDL Cholesterol',
        ldl: 'LDL Cholesterol',
        creatinine: 'Creatinine',
        hemoglobin: 'Hemoglobin',
        bloodPressure: 'Blood Pressure',
        heartRate: 'Heart Rate',
        bmi: 'BMI',
        weight: 'Weight',
        height: 'Height',
        temperature: 'Temperature',
        oxygenSaturation: 'Oxygen Saturation',
        bloodSugar: 'Blood Sugar',
        totalCholesterol: 'Total Cholesterol',
        goodCholesterol: 'Good Cholesterol',
        badCholesterol: 'Bad Cholesterol',
        bloodFat: 'Blood Fat',
        kidneyFunction: 'Kidney Function',
        redBloodCells: 'Red Blood Cells',
      },

      // Unités de mesure
      units: {
        mgdl: 'mg/dL',
        mmol: 'mmol/L',
        percent: '%',
        bpm: 'bpm',
        mmHg: 'mmHg',
        kg: 'kg',
        cm: 'cm',
        celsius: '°C',
        fahrenheit: '°F',
        umol: 'μmol/L',
        gdl: 'g/dL',
        mmolL: 'mmol/L',
      },

      // Messages d'information
      info: {
        dataSource: 'Data Source',
        dataSourceDescription:
          'Data from your latest health check and continuous monitoring',
        trendDescription: 'Trend analysis over the last 30 days',
        normalRange: 'Normal Range',
        targetRange: 'Target Range',
        riskLevel: 'Risk Level',
        improvement: 'Improvement',
        deterioration: 'Deterioration',
        stable: 'Stable',
        updated: 'Updated',
        loading: 'Loading your health data...',
        processing: 'Processing your data...',
        analyzing: 'Analyzing trends...',
        calculating: 'Calculating scores...',
        syncing: 'Syncing with health devices...',
      },

      // Recommandations
      recommendations: {
        title: 'Health Recommendations',
        subtitle: 'Personalized suggestions based on your data',
        exercise: 'Exercise regularly',
        diet: 'Maintain a balanced diet',
        sleep: 'Get adequate sleep',
        stress: 'Manage stress levels',
        checkup: 'Schedule regular checkups',
        medication: 'Take medications as prescribed',
        lifestyle: 'Adopt healthy lifestyle habits',
        hydration: 'Stay hydrated',
        monitoring: 'Continue monitoring your health',
        consultation: 'Consider consulting a healthcare provider',
        prevention: 'Focus on preventive measures',
        wellness: 'Prioritize mental wellness',
      },

      // Alertes
      alerts: {
        title: 'Health Alerts',
        subtitle: 'Important notifications about your health',
        critical: 'Critical values detected',
        elevated: 'Elevated values detected',
        improvement: 'Significant improvement detected',
        trend: 'Trend analysis available',
        reminder: 'Health check reminder',
        noAlerts: 'No alerts at this time',
        attention: 'Requires attention',
        monitoring: 'Continue monitoring',
        consultation: 'Consider consultation',
        emergency: 'Seek immediate medical attention',
      },

      // Graphiques et visualisations
      charts: {
        title: 'Health Trends',
        subtitle: 'Visual representation of your health data',
        period: 'Period',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        yearly: 'Yearly',
        custom: 'Custom',
        zoom: 'Zoom',
        reset: 'Reset',
        export: 'Export',
        compare: 'Compare',
        filter: 'Filter',
        legend: 'Legend',
        tooltip: 'Tooltip',
        dataPoints: 'Data Points',
        trendLine: 'Trend Line',
        referenceLine: 'Reference Line',
      },

      // Filtres et recherche
      filters: {
        title: 'Filters',
        subtitle: 'Customize your dashboard view',
        dateRange: 'Date Range',
        biomarker: 'Biomarker',
        status: 'Status',
        all: 'All',
        apply: 'Apply',
        clear: 'Clear',
        search: 'Search',
        sortBy: 'Sort by',
        groupBy: 'Group by',
        showOnly: 'Show only',
        hide: 'Hide',
        show: 'Show',
      },

      // Accessibilité
      accessibility: {
        loadingScreen: 'Loading dashboard data',
        errorScreen: 'Error loading dashboard',
        noDataScreen: 'No health data available',
        chartDescription:
          'Health trends chart showing biomarker values over time',
        biomarkerCard: 'Biomarker card showing current value and status',
        statusIndicator: 'Status indicator showing health level',
        progressBar: 'Progress bar showing health score',
        refreshButton: 'Refresh dashboard data',
        exportButton: 'Export health data',
        filterButton: 'Filter dashboard data',
        zoomButton: 'Zoom chart view',
        resetButton: 'Reset chart view',
        tooltipContent: 'Detailed information about this data point',
        legendItem: 'Legend item for chart data',
        navigationHint: 'Use arrow keys to navigate between sections',
        keyboardShortcuts: 'Keyboard shortcuts available',
        highContrast: 'High contrast',
        largeText: 'Large text',
        reducedMotion: 'Reduced motion',
        focusIndicators: 'Focus indicators',
        focusIndicatorsDescription:
          'Visual indicators show which element has keyboard focus',
        screenReader: 'Screen reader support',
        keyboardNavigation: 'Keyboard navigation',
      },

      // Messages de succès
      success: {
        dataUpdated: 'Health data updated successfully',
        exportComplete: 'Data export completed',
        settingsSaved: 'Dashboard settings saved',
        refreshComplete: 'Dashboard refreshed successfully',
        syncComplete: 'Data synchronization completed',
      },

      // Messages d'aide
      help: {
        dashboardOverview:
          'This dashboard provides an overview of your health metrics and trends',
        biomarkerExplanation:
          'Biomarkers are measurable indicators of your health status',
        scoreExplanation:
          'Health scores are calculated based on your biomarker values',
        trendExplanation:
          'Trends show how your health metrics change over time',
        alertExplanation:
          'Alerts notify you of important changes in your health data',
        chartExplanation:
          'Charts visualize your health data for easier understanding',
      },
    },
  },
  fr: {
    dashboard: {
      // Titres et en-têtes
      title: 'Tableau de bord santé',
      subtitle: "Vue d'ensemble de vos données de santé et tendances",
      healthOverview: 'Aperçu de la santé',
      statistics: 'Statistiques de santé',
      globalHealth: 'Santé globale',
      welcomeMessage: 'Bienvenue sur votre tableau de bord santé',
      lastUpdated: 'Dernière mise à jour',

      // Actions et boutons
      refresh: 'Actualiser',
      retry: 'Réessayer',
      update: 'Mettre à jour',
      viewDetails: 'Voir les détails',
      exportData: 'Exporter les données',
      shareReport: 'Partager le rapport',
      downloadPDF: 'Télécharger PDF',
      printReport: 'Imprimer le rapport',

      // États et statuts
      status: {
        normal: 'Normal',
        elevated: 'Élevé',
        high: 'Haut',
        critical: 'Critique',
        excellent: 'Excellent',
        good: 'Bon',
        fair: 'Moyen',
        poor: 'Mauvais',
        optimal: 'Optimal',
        suboptimal: 'Suboptimal',
        concerning: 'Préoccupant',
        urgent: 'Nécessite attention',
      },

      // Scores et métriques
      healthScore: 'Score de santé',
      overallScore: 'Score global',
      bmiScore: 'Score IMC',
      riskScore: 'Score de risque',
      wellnessIndex: 'Indice de bien-être',
      vitalityScore: 'Score de vitalité',

      // Messages d'erreur et de chargement
      loadingError: 'Erreur de chargement',
      loadingErrorDescription:
        'Impossible de charger les données du tableau de bord. Veuillez vérifier votre connexion et réessayer.',
      noDataAvailable: 'Aucune donnée disponible',
      noDataDescription:
        'Aucune donnée de santé enregistrée pour le moment. Commencez par ajouter vos premières mesures de santé.',
      connectionError: 'Erreur de connexion',
      connectionErrorDescription:
        'Impossible de se connecter au service de données de santé. Veuillez vérifier votre connexion internet.',
      dataSyncError: 'Erreur de synchronisation des données',
      dataSyncErrorDescription:
        'Il y a eu un problème lors de la synchronisation de vos données de santé. Certaines informations peuvent être obsolètes.',

      // Informations temporelles
      lastCheck: 'Dernier contrôle',
      lastUpdate: 'Dernière mise à jour',
      lastMeasurement: 'Dernière mesure',
      nextCheck: 'Prochain contrôle',
      updated: 'Mis à jour',
      today: "Aujourd'hui",
      yesterday: 'Hier',
      thisWeek: 'Cette semaine',
      thisMonth: 'Ce mois',

      // Sections et composants
      recentActivity: 'Activité récente',
      trends: 'Tendances',
      insights: 'Analyses',
      summary: 'Résumé',
      biomarkers: 'Biomarqueurs',
      healthMetrics: 'Métriques de santé',
      vitalSigns: 'Signes vitaux',
      notifications: 'Notifications',

      // Biomarqueurs spécifiques
      biomarkerNames: {
        title: 'Biomarqueurs',
        glucose: 'Glucose',
        cholesterol: 'Cholestérol',
        cholesterole: 'Cholestérol',
        triglycerides: 'Triglycérides',
        hdl: 'Cholestérol HDL',
        ldl: 'Cholestérol LDL',
        creatinine: 'Créatinine',
        hemoglobin: 'Hémoglobine',
        bloodPressure: 'Tension artérielle',
        heartRate: 'Fréquence cardiaque',
        bmi: 'IMC',
        weight: 'Poids',
        height: 'Taille',
        temperature: 'Température',
        oxygenSaturation: 'Saturation en oxygène',
        bloodSugar: 'Glycémie',
        totalCholesterol: 'Cholestérol total',
        goodCholesterol: 'Bon cholestérol',
        badCholesterol: 'Mauvais cholestérol',
        bloodFat: 'Graisses sanguines',
        kidneyFunction: 'Fonction rénale',
        redBloodCells: 'Globules rouges',
      },

      // Unités de mesure
      units: {
        mgdl: 'mg/dL',
        mmol: 'mmol/L',
        percent: '%',
        bpm: 'bpm',
        mmHg: 'mmHg',
        kg: 'kg',
        cm: 'cm',
        celsius: '°C',
        fahrenheit: '°F',
        umol: 'μmol/L',
        gdl: 'g/dL',
        mmolL: 'mmol/L',
      },

      // Messages d'information
      info: {
        dataSource: 'Source de données',
        dataSourceDescription:
          'Données de votre dernier contrôle de santé et surveillance continue',
        trendDescription: 'Analyse des tendances sur les 30 derniers jours',
        normalRange: 'Plage normale',
        targetRange: 'Plage cible',
        riskLevel: 'Niveau de risque',
        improvement: 'Amélioration',
        deterioration: 'Détérioration',
        stable: 'Stable',
        updated: 'Mis à jour',
        loading: 'Chargement de vos données de santé...',
        processing: 'Traitement de vos données...',
        analyzing: 'Analyse des tendances...',
        calculating: 'Calcul des scores...',
        syncing: 'Synchronisation avec les appareils de santé...',
      },

      // Recommandations
      recommendations: {
        title: 'Recommandations de santé',
        subtitle: 'Suggestions personnalisées basées sur vos données',
        exercise: "Faites de l'exercice régulièrement",
        diet: 'Maintenez une alimentation équilibrée',
        sleep: 'Dormez suffisamment',
        stress: 'Gérez votre niveau de stress',
        checkup: 'Planifiez des contrôles réguliers',
        medication: 'Prenez vos médicaments selon les prescriptions',
        lifestyle: 'Adoptez des habitudes de vie saines',
        hydration: 'Restez hydraté',
        monitoring: 'Continuez à surveiller votre santé',
        consultation: 'Envisagez de consulter un professionnel de santé',
        prevention: 'Concentrez-vous sur les mesures préventives',
        wellness: 'Priorisez le bien-être mental',
      },

      // Alertes
      alerts: {
        title: 'Alertes de santé',
        subtitle: 'Notifications importantes concernant votre santé',
        critical: 'Valeurs critiques détectées',
        elevated: 'Valeurs élevées détectées',
        improvement: 'Amélioration significative détectée',
        trend: 'Analyse de tendance disponible',
        reminder: 'Rappel de contrôle de santé',
        noAlerts: 'Aucune alerte à ce moment',
        attention: 'Nécessite attention',
        monitoring: 'Continuer la surveillance',
        consultation: 'Envisager une consultation',
        emergency: 'Consulter immédiatement un médecin',
      },

      // Graphiques et visualisations
      charts: {
        title: 'Tendances de santé',
        subtitle: 'Représentation visuelle de vos données de santé',
        period: 'Période',
        daily: 'Quotidien',
        weekly: 'Hebdomadaire',
        monthly: 'Mensuel',
        yearly: 'Annuel',
        custom: 'Personnalisé',
        zoom: 'Zoom',
        reset: 'Réinitialiser',
        export: 'Exporter',
        compare: 'Comparer',
        filter: 'Filtrer',
        legend: 'Légende',
        tooltip: 'Info-bulle',
        dataPoints: 'Points de données',
        trendLine: 'Ligne de tendance',
        referenceLine: 'Ligne de référence',
      },

      // Filtres et recherche
      filters: {
        title: 'Filtres',
        subtitle: 'Personnalisez votre vue du tableau de bord',
        dateRange: 'Plage de dates',
        biomarker: 'Biomarqueur',
        status: 'Statut',
        all: 'Tous',
        apply: 'Appliquer',
        clear: 'Effacer',
        search: 'Rechercher',
        sortBy: 'Trier par',
        groupBy: 'Grouper par',
        showOnly: 'Afficher seulement',
        hide: 'Masquer',
        show: 'Afficher',
      },

      // Accessibilité
      accessibility: {
        loadingScreen: 'Chargement des données du tableau de bord',
        errorScreen: 'Erreur de chargement du tableau de bord',
        noDataScreen: 'Aucune donnée de santé disponible',
        chartDescription:
          'Graphique des tendances de santé montrant les valeurs des biomarqueurs dans le temps',
        biomarkerCard:
          'Carte de biomarqueur montrant la valeur actuelle et le statut',
        statusIndicator: 'Indicateur de statut montrant le niveau de santé',
        progressBar: 'Barre de progression montrant le score de santé',
        refreshButton: 'Actualiser les données du tableau de bord',
        exportButton: 'Exporter les données de santé',
        filterButton: 'Filtrer les données du tableau de bord',
        zoomButton: 'Zoomer la vue du graphique',
        resetButton: 'Réinitialiser la vue du graphique',
        tooltipContent: 'Informations détaillées sur ce point de données',
        legendItem: 'Élément de légende pour les données du graphique',
        navigationHint:
          'Utilisez les touches fléchées pour naviguer entre les sections',
        keyboardShortcuts: 'Raccourcis clavier disponibles',
        highContrast: 'Contraste élevé',
        largeText: 'Texte agrandi',
        reducedMotion: 'Mouvement réduit',
        focusIndicators: 'Indicateurs de focus',
        focusIndicatorsDescription:
          'Les indicateurs visuels montrent quel élément a le focus clavier',
        screenReader: "Support lecteur d'écran",
        keyboardNavigation: 'Navigation clavier',
      },

      // Messages de succès
      success: {
        dataUpdated: 'Données de santé mises à jour avec succès',
        exportComplete: 'Export des données terminé',
        settingsSaved: 'Paramètres du tableau de bord sauvegardés',
        refreshComplete: 'Tableau de bord actualisé avec succès',
        syncComplete: 'Synchronisation des données terminée',
      },

      // Messages d'aide
      help: {
        dashboardOverview:
          'Ce tableau de bord fournit un aperçu de vos métriques de santé et tendances',
        biomarkerExplanation:
          'Les biomarqueurs sont des indicateurs mesurables de votre état de santé',
        scoreExplanation:
          'Les scores de santé sont calculés sur la base de vos valeurs de biomarqueurs',
        trendExplanation:
          'Les tendances montrent comment vos métriques de santé changent dans le temps',
        alertExplanation:
          'Les alertes vous informent des changements importants dans vos données de santé',
        chartExplanation:
          'Les graphiques visualisent vos données de santé pour une meilleure compréhension',
      },
    },
  },
};
