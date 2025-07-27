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
      borderRadius: '0.75rem',
      border: '1.5px solid transparent',
      padding: '0.5rem',
      width: '2.75rem',
      height: '2.75rem',
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
        boxShadow: `0 4px 15px rgba(59, 130, 246, 0.4)`,
        transform: 'translateY(-1px) scale(1.05)',
      };
    }

    return {
      ...baseStyles,
      border: `1.5px solid ${
        isDark ? 'var(--mantine-color-dark-2)' : 'var(--mantine-color-gray-2)'
      }`,
      background: isDark
        ? 'var(--mantine-color-dark-4)'
        : 'var(--mantine-color-white)',
      color: isDark
        ? 'var(--mantine-color-gray-2)'
        : 'var(--mantine-color-gray-8)',
      boxShadow: isDark
        ? '0 2px 8px rgba(0, 0, 0, 0.2)'
        : '0 2px 8px rgba(0, 0, 0, 0.06)',
      '&:hover': {
        background: isDark
          ? 'var(--mantine-color-dark-3)'
          : 'var(--mantine-color-gray-0)',
        transform: 'translateY(-1px)',
        boxShadow: isDark
          ? '0 4px 12px rgba(0, 0, 0, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: `1.5px solid ${
          isDark ? 'var(--mantine-color-dark-1)' : 'var(--mantine-color-gray-1)'
        }`,
      },
    };
  }, [isActive, isDark, colors, transitions]);

  const handleClick = useCallback(() => {
    onThemeChange(theme.mode);
  }, [theme.mode, onThemeChange]);

  const Icon = theme.icon;

  return (
    <Tooltip
      label={theme.label}
      position="top"
      withArrow
      offset={8}
      styles={{
        tooltip: {
          background: isDark
            ? 'var(--mantine-color-dark-6)'
            : 'var(--mantine-color-gray-9)',
          color: isDark ? 'var(--mantine-color-gray-1)' : 'white',
          fontSize: '0.75rem',
          fontWeight: 600,
          borderRadius: '0.5rem',
          padding: '0.5rem 0.75rem',
          boxShadow: isDark
            ? '0 4px 12px rgba(0, 0, 0, 0.3)'
            : '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
        arrow: {
          background: isDark
            ? 'var(--mantine-color-dark-6)'
            : 'var(--mantine-color-gray-9)',
        },
      }}
    >
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
      <Group gap="xs" justify="center" style={{ width: '100%' }}>
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
