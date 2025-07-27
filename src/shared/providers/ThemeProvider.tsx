'use client';

import React, { useEffect } from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { appTheme } from '../config/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Gestion de l'accessibilité et des préférences utilisateur
  useEffect(() => {
    // Détection automatique des préférences d'accessibilité
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const prefersHighContrast = window.matchMedia(
      '(prefers-contrast: high)'
    ).matches;

    // Application des préférences d'accessibilité
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty(
        '--mantine-transition-duration',
        '0.1s'
      );
    }

    if (prefersHighContrast) {
      document.documentElement.style.setProperty(
        '--mantine-color-gray-1',
        '#f8f9fa'
      );
      document.documentElement.style.setProperty(
        '--mantine-color-gray-2',
        '#e9ecef'
      );
      document.documentElement.style.setProperty(
        '--mantine-color-gray-3',
        '#dee2e6'
      );
    }

    // Focus visible pour l'accessibilité clavier
    const handleFocusVisible = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleFocusVisible);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleFocusVisible);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <>
      <ColorSchemeScript />
      <MantineProvider theme={appTheme} defaultColorScheme="light">
        {children}
      </MantineProvider>
    </>
  );
};
