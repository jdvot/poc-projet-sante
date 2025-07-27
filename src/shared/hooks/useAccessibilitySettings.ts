import { useState, useEffect } from 'react';

interface AccessibilitySettings {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersDarkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  lineHeight: 'tight' | 'normal' | 'relaxed';
}

export const useAccessibilitySettings = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersDarkMode: false,
    fontSize: 'medium',
    lineHeight: 'normal',
  });

  useEffect(() => {
    // Détection des préférences système
    const mediaQueries = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      highContrast: window.matchMedia('(prefers-contrast: high)'),
      darkMode: window.matchMedia('(prefers-color-scheme: dark)'),
    };

    // Fonction de mise à jour des paramètres
    const updateSettings = () => {
      setSettings((prev) => ({
        ...prev,
        prefersReducedMotion: mediaQueries.reducedMotion.matches,
        prefersHighContrast: mediaQueries.highContrast.matches,
        prefersDarkMode: mediaQueries.darkMode.matches,
      }));
    };

    // Initialisation
    updateSettings();

    // Ajout des écouteurs
    mediaQueries.reducedMotion.addEventListener('change', updateSettings);
    mediaQueries.highContrast.addEventListener('change', updateSettings);
    mediaQueries.darkMode.addEventListener('change', updateSettings);

    // Nettoyage
    return () => {
      mediaQueries.reducedMotion.removeEventListener('change', updateSettings);
      mediaQueries.highContrast.removeEventListener('change', updateSettings);
      mediaQueries.darkMode.removeEventListener('change', updateSettings);
    };
  }, []);

  // Application des paramètres d'accessibilité au DOM
  useEffect(() => {
    const root = document.documentElement;

    // Application des préférences de mouvement réduit
    if (settings.prefersReducedMotion) {
      root.style.setProperty('--transition-duration', '0.1s');
      root.style.setProperty('--animation-duration', '0.1s');
    } else {
      root.style.setProperty('--transition-duration', '0.3s');
      root.style.setProperty('--animation-duration', '0.3s');
    }

    // Application des préférences de contraste élevé
    if (settings.prefersHighContrast) {
      root.style.setProperty('--mantine-color-gray-1', '#f8f9fa');
      root.style.setProperty('--mantine-color-gray-2', '#e9ecef');
      root.style.setProperty('--mantine-color-gray-3', '#dee2e6');
      root.style.setProperty('--mantine-color-gray-4', '#ced4da');
      root.style.setProperty('--mantine-color-gray-5', '#adb5bd');
    }

    // Application des préférences de taille de police
    const fontSizeMap = {
      small: '0.875rem',
      medium: '1rem',
      large: '1.125rem',
    };

    const lineHeightMap = {
      tight: '1.4',
      normal: '1.6',
      relaxed: '1.8',
    };

    root.style.setProperty('--base-font-size', fontSizeMap[settings.fontSize]);
    root.style.setProperty(
      '--base-line-height',
      lineHeightMap[settings.lineHeight]
    );
  }, [settings]);

  // Fonctions pour modifier les paramètres
  const updateFontSize = (size: AccessibilitySettings['fontSize']) => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
  };

  const updateLineHeight = (height: AccessibilitySettings['lineHeight']) => {
    setSettings((prev) => ({ ...prev, lineHeight: height }));
  };

  return {
    settings,
    updateFontSize,
    updateLineHeight,
  };
};
