'use client';

import { useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { useMemo } from 'react';

export const useAppTheme = () => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme, setColorScheme } =
    useMantineColorScheme();

  // Memoize isDark to prevent unnecessary re-renders
  const isDark = useMemo(() => colorScheme === 'dark', [colorScheme]);
  const isLight = useMemo(() => colorScheme === 'light', [colorScheme]);

  // Gradients personnalisés - memoized to prevent recreation
  const gradients = useMemo(
    () => ({
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
    }),
    []
  );

  // Couleurs sémantiques - memoized
  const colors = useMemo(
    () => ({
      success: 'var(--mantine-color-green-6)',
      warning: 'var(--mantine-color-yellow-6)',
      error: 'var(--mantine-color-red-6)',
      info: 'var(--mantine-color-blue-6)',
      primary: 'var(--mantine-color-blue-6)',
      secondary: 'var(--mantine-color-gray-6)',
    }),
    []
  );

  // Espacements personnalisés - memoized
  const spacing = useMemo(
    () => ({
      section: '3rem',
      page: '2rem',
      card: '1.5rem',
    }),
    []
  );

  // Rayons personnalisés - memoized
  const radius = useMemo(
    () => ({
      card: '1rem',
      button: '0.75rem',
      input: '0.5rem',
    }),
    []
  );

  // Transitions personnalisées - memoized
  const transitions = useMemo(
    () => ({
      fast: '0.15s ease',
      normal: '0.3s ease',
      slow: '0.5s ease',
    }),
    []
  );

  return {
    theme,
    colorScheme,
    toggleColorScheme,
    setColorScheme,
    gradients,
    colors,
    spacing,
    radius,
    transitions,
    isDark,
    isLight,
  };
};
