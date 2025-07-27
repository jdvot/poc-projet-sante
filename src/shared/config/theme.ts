import { MantineThemeOverride } from '@mantine/core';

export const appTheme: MantineThemeOverride = {
  // Configuration de base
  primaryColor: 'blue',
  primaryShade: { light: 6, dark: 4 },

  // Configuration des couleurs
  colors: {
    // Couleurs personnalisées pour l'application de santé
    health: [
      '#f0f9ff', // 0 - Très clair
      '#e0f2fe', // 1
      '#bae6fd', // 2
      '#7dd3fc', // 3
      '#38bdf8', // 4
      '#0ea5e9', // 5
      '#0284c7', // 6 - Primaire
      '#0369a1', // 7
      '#075985', // 8
      '#0c4a6e', // 9 - Très foncé
    ],
    wellness: [
      '#f0fdf4', // 0 - Très clair
      '#dcfce7', // 1
      '#bbf7d0', // 2
      '#86efac', // 3
      '#4ade80', // 4
      '#22c55e', // 5
      '#16a34a', // 6 - Primaire
      '#15803d', // 7
      '#166534', // 8
      '#14532d', // 9 - Très foncé
    ],
    medical: [
      '#fef2f2', // 0 - Très clair
      '#fee2e2', // 1
      '#fecaca', // 2
      '#fca5a5', // 3
      '#f87171', // 4
      '#ef4444', // 5
      '#dc2626', // 6 - Primaire
      '#b91c1c', // 7
      '#991b1b', // 8
      '#7f1d1d', // 9 - Très foncé
    ],
  },

  // Configuration des espacements
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },

  // Configuration des rayons de bordure
  radius: {
    xs: '0.25rem',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },

  // Configuration des ombres
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Configuration des polices
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontFamilyMonospace:
    'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',

  // Tailles de police
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },

  // Configuration des breakpoints
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
  },

  // Configuration des composants
  components: {
    // Configuration globale des boutons
    Button: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
    },

    // Configuration globale des cartes
    Card: {
      defaultProps: {
        radius: 'lg',
        withBorder: true,
        shadow: 'sm',
      },
    },

    // Configuration globale des inputs
    TextInput: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
    },

    // Configuration globale des selects
    Select: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
    },

    // Configuration globale des badges
    Badge: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
    },

    // Configuration globale des titres
    Title: {
      defaultProps: {
        fw: 700,
      },
    },

    // Configuration globale des textes
    Text: {
      defaultProps: {
        lh: 1.6,
      },
    },

    // Configuration globale des conteneurs
    Container: {
      defaultProps: {
        size: 'xl',
      },
    },

    // Configuration globale des papiers
    Paper: {
      defaultProps: {
        radius: 'lg',
        withBorder: true,
        shadow: 'sm',
      },
    },

    // Configuration globale des grilles
    Grid: {
      defaultProps: {
        gutter: 'lg',
      },
    },

    // Configuration globale des stacks
    Stack: {
      defaultProps: {
        gap: 'md',
      },
    },

    // Configuration globale des groupes
    Group: {
      defaultProps: {
        gap: 'md',
      },
    },
  },

  // Configuration des thèmes clair et sombre
  other: {
    // Gradients personnalisés
    gradients: {
      primary:
        'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-cyan-6) 100%)',
      secondary:
        'linear-gradient(135deg, var(--mantine-color-green-6) 0%, var(--mantine-color-teal-6) 100%)',
      accent:
        'linear-gradient(135deg, var(--mantine-color-purple-6) 0%, var(--mantine-color-pink-6) 100%)',
      health:
        'linear-gradient(135deg, var(--mantine-color-health-6) 0%, var(--mantine-color-wellness-6) 100%)',
      medical:
        'linear-gradient(135deg, var(--mantine-color-medical-6) 0%, var(--mantine-color-red-6) 100%)',
    },

    // Couleurs sémantiques
    colors: {
      success: 'var(--mantine-color-green-6)',
      warning: 'var(--mantine-color-yellow-6)',
      error: 'var(--mantine-color-red-6)',
      info: 'var(--mantine-color-blue-6)',
      primary: 'var(--mantine-color-blue-6)',
      secondary: 'var(--mantine-color-gray-6)',
    },

    // Espacements personnalisés
    spacing: {
      section: '3rem',
      page: '2rem',
      card: '1.5rem',
    },

    // Rayons personnalisés
    radius: {
      card: '1rem',
      button: '0.75rem',
      input: '0.5rem',
    },

    // Transitions personnalisées
    transitions: {
      fast: '0.15s ease',
      normal: '0.3s ease',
      slow: '0.5s ease',
    },
  },
};

// Fonction utilitaire pour obtenir le thème complet
export const getAppTheme = (
  colorScheme: 'light' | 'dark' | 'auto'
): MantineThemeOverride => {
  return appTheme;
};

// Export des types pour TypeScript
export type AppTheme = typeof appTheme;
