'use client';

import { useMantineTheme, useMantineColorScheme } from '@mantine/core';

export const useAppTheme = () => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  // Gradients personnalisés
  const gradients = {
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
  };

  // Couleurs sémantiques
  const colors = {
    success: 'var(--mantine-color-green-6)',
    warning: 'var(--mantine-color-yellow-6)',
    error: 'var(--mantine-color-red-6)',
    info: 'var(--mantine-color-blue-6)',
    primary: 'var(--mantine-color-blue-6)',
    secondary: 'var(--mantine-color-gray-6)',
  };

  // Espacements personnalisés
  const spacing = {
    section: '3rem',
    page: '2rem',
    card: '1.5rem',
  };

  // Rayons personnalisés
  const radius = {
    card: '1rem',
    button: '0.75rem',
    input: '0.5rem',
  };

  // Transitions personnalisées
  const transitions = {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  };

  // Fonctions utilitaires
  const isDark = colorScheme === 'dark';
  const isLight = colorScheme === 'light';

  // Styles conditionnels basés sur le thème
  const getCardStyle = () => ({
    background: isDark ? 'var(--mantine-color-dark-7)' : 'white',
    border: isDark
      ? '1px solid var(--mantine-color-dark-4)'
      : '1px solid var(--mantine-color-gray-3)',
  });

  const getPaperStyle = () => ({
    background: isDark ? 'var(--mantine-color-dark-7)' : 'white',
    border: isDark
      ? '1px solid var(--mantine-color-dark-4)'
      : '1px solid var(--mantine-color-gray-3)',
  });

  const getGradientStyle = (gradientType: keyof typeof gradients) => ({
    background: gradients[gradientType],
  });

  return {
    theme,
    colorScheme,
    toggleColorScheme,
    gradients,
    colors,
    spacing,
    radius,
    transitions,
    isDark,
    isLight,
    getCardStyle,
    getPaperStyle,
    getGradientStyle,
  };
};
