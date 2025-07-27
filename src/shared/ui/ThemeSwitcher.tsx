'use client';

import React, { useMemo, useCallback, useEffect, useState } from 'react';
import {
  ActionIcon,
  Group,
  Tooltip,
  Box,
  useMantineColorScheme,
} from '@mantine/core';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

// Types pour une meilleure type safety
type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeOption {
  mode: ThemeMode;
  icon: React.ReactNode;
  label: string;
}

// Icônes des thèmes
const themeIcons = {
  light: <IconSun size={18} />,
  dark: <IconMoon size={18} />,
  auto: <IconDeviceDesktop size={18} />,
};

// Composant pour un bouton de thème individuel
interface ThemeButtonProps {
  theme: ThemeOption;
  isActive: boolean;
  onThemeChange: (mode: ThemeMode) => void;
  actualTheme: 'light' | 'dark';
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  theme,
  isActive,
  onThemeChange,
  actualTheme,
}) => {
  const { t } = useTranslation();

  const getButtonStyles = useMemo(() => {
    const baseStyles = {
      transition: 'all 0.2s ease',
      borderRadius: '0.5rem',
      border: '2px solid transparent',
    };

    if (isActive) {
      return {
        ...baseStyles,
        border: '2px solid var(--mantine-color-blue-6)',
        background: 'var(--mantine-color-blue-6)',
        color: 'white',
      };
    }

    return {
      ...baseStyles,
      border: '2px solid transparent',
      background:
        actualTheme === 'dark'
          ? 'var(--mantine-color-dark-4)'
          : 'var(--mantine-color-gray-0)',
      color:
        actualTheme === 'dark'
          ? 'var(--mantine-color-gray-3)'
          : 'var(--mantine-color-gray-7)',
    };
  }, [isActive, actualTheme]);

  const handleClick = useCallback(() => {
    onThemeChange(theme.mode);
  }, [theme.mode, onThemeChange]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isActive) {
        e.currentTarget.style.background =
          actualTheme === 'dark'
            ? 'var(--mantine-color-dark-3)'
            : 'var(--mantine-color-gray-1)';
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
      }
    },
    [isActive, actualTheme]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isActive) {
        e.currentTarget.style.background =
          actualTheme === 'dark'
            ? 'var(--mantine-color-dark-4)'
            : 'var(--mantine-color-gray-0)';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }
    },
    [isActive, actualTheme]
  );

  return (
    <Tooltip label={theme.label} position="bottom" withArrow offset={8}>
      <ActionIcon
        variant="unstyled"
        size="md"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={getButtonStyles}
        aria-label={`${t('theme.switchTo', 'Passer au thème')} ${theme.label}`}
        aria-pressed={isActive}
        role="button"
        tabIndex={0}
      >
        {theme.icon}
      </ActionIcon>
    </Tooltip>
  );
};

export function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  // Détection du thème système
  useEffect(() => {
    setMounted(true);

    const getSystemTheme = () => {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      }
      return 'light';
    };

    setSystemTheme(getSystemTheme());

    // Écouteur pour les changements de thème système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setSystemTheme(getSystemTheme());

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Calcul du thème réel (système ou manuel)
  const actualTheme = useMemo(() => {
    if (colorScheme === 'auto') {
      return systemTheme;
    }
    return colorScheme;
  }, [colorScheme, systemTheme]);

  // Utilisation de useMemo pour éviter les recréations d'objets
  const themeOptions = useMemo<ThemeOption[]>(
    () => [
      {
        mode: 'light',
        icon: themeIcons.light,
        label: t('theme.light', 'Clair'),
      },
      {
        mode: 'dark',
        icon: themeIcons.dark,
        label: t('theme.dark', 'Sombre'),
      },
      {
        mode: 'auto',
        icon: themeIcons.auto,
        label: t('theme.auto', 'Automatique'),
      },
    ],
    [t]
  );

  const handleThemeChange = useCallback(
    (mode: ThemeMode) => {
      try {
        setColorScheme(mode);
      } catch (error) {
        console.error('Erreur lors du changement de thème:', error);
      }
    },
    [setColorScheme]
  );

  return (
    <Group
      gap="xs"
      role="group"
      aria-label={t('theme.switcher', 'Sélecteur de thème')}
    >
      {themeOptions.map((theme) => (
        <ThemeButton
          key={theme.mode}
          theme={theme}
          isActive={colorScheme === theme.mode}
          onThemeChange={handleThemeChange}
          actualTheme={actualTheme}
        />
      ))}
    </Group>
  );
}
