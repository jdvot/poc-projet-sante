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
import { useAppTheme } from '../hooks/useAppTheme';

// Types pour une meilleure type safety
type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeOption {
  mode: ThemeMode;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}

// Icônes pour chaque thème
const themeIcons = {
  light: IconSun,
  dark: IconMoon,
  auto: IconDeviceDesktop,
};

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
  const { isDark, colors, transitions } = useAppTheme();

  const getButtonStyles = useMemo(() => {
    const baseStyles = {
      transition: transitions.normal,
      borderRadius: '1rem',
      border: '1.5px solid transparent',
      padding: '0.5rem',
      width: '2.5rem',
      height: '2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    if (isActive) {
      return {
        ...baseStyles,
        border: `1.5px solid ${colors.primary}`,
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.info})`,
        color: 'white',
        boxShadow: `0 4px 15px rgba(59, 130, 246, 0.3)`,
        transform: 'translateY(-1px)',
      };
    }

    return {
      ...baseStyles,
      border: `1.5px solid ${
        isDark ? 'var(--mantine-color-dark-3)' : 'var(--mantine-color-gray-3)'
      }`,
      background: isDark
        ? 'var(--mantine-color-dark-5)'
        : 'var(--mantine-color-gray-0)',
      color: isDark
        ? 'var(--mantine-color-gray-2)'
        : 'var(--mantine-color-gray-8)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      '&:hover': {
        background: isDark
          ? 'var(--mantine-color-dark-4)'
          : 'var(--mantine-color-gray-1)',
        borderColor: isDark
          ? 'var(--mantine-color-dark-2)'
          : 'var(--mantine-color-gray-4)',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      },
    };
  }, [isActive, isDark, colors, transitions]);

  const handleClick = useCallback(() => {
    onThemeChange(theme.mode);
  }, [theme.mode, onThemeChange]);

  const Icon = theme.icon;

  return (
    <Tooltip label={theme.label} position="top">
      <ActionIcon
        variant="subtle"
        onClick={handleClick}
        style={getButtonStyles}
        aria-label={t(`theme.${theme.mode}`, theme.label)}
      >
        <Icon size={16} />
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

  if (!mounted) {
    return null;
  }

  return (
    <Box>
      <Group gap="xs" justify="center">
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
    </Box>
  );
}
