import { useEffect } from 'react';
import { useUserPreferencesStore } from '../stores/userPreferencesStore';

export function useAccessibilitySettings() {
  const { preferences } = useUserPreferencesStore();

  useEffect(() => {
    // Apply font size
    const root = document.documentElement;
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };

    root.style.fontSize = fontSizeMap[preferences.accessibility.fontSize];

    // Apply high contrast
    if (preferences.accessibility.highContrast) {
      root.style.setProperty('--mantine-color-text', '#000000');
      root.style.setProperty('--mantine-color-body', '#ffffff');
      root.style.setProperty('--mantine-color-gray-0', '#ffffff');
      root.style.setProperty('--mantine-color-gray-9', '#000000');
    } else {
      // Reset to default values
      root.style.removeProperty('--mantine-color-text');
      root.style.removeProperty('--mantine-color-body');
      root.style.removeProperty('--mantine-color-gray-0');
      root.style.removeProperty('--mantine-color-gray-9');
    }

    // Apply reduced motion
    if (preferences.accessibility.reducedMotion) {
      root.style.setProperty('--mantine-transition-duration', '0.1s');
      root.style.setProperty(
        '--mantine-transition-timing-function',
        'ease-out'
      );
    } else {
      root.style.removeProperty('--mantine-transition-duration');
      root.style.removeProperty('--mantine-transition-timing-function');
    }
  }, [preferences.accessibility]);

  return preferences.accessibility;
}
