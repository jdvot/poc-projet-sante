'use client';

import React, { useMemo, useCallback } from 'react';
import { ActionIcon, Group, Tooltip, Box } from '@mantine/core';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';
import { useMantineColorScheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';

// Types pour une meilleure type safety
type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeOption {
  mode: ThemeMode;
  icon: React.ReactNode;
  label: string;
}

// Styles extraits pour éviter les recréations d'objets
const themeStyles = {
  active: {
    border: '2px solid var(--mantine-color-blue-6)',
    background: 'var(--mantine-color-blue-6)',
    color: 'white',
  },
  inactive: {
    border: '2px solid transparent',
    background: 'var(--mantine-color-gray-0)',
    color: 'var(--mantine-color-gray-7)',
  },
  hover: {
    background: 'var(--mantine-color-gray-1)',
    transform: 'scale(1.1)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  },
  base: {
    transition: 'all 0.2s ease',
  },
};

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
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  theme,
  isActive,
  onThemeChange,
}) => {
  const { t } = useTranslation();

  const buttonStyles = useMemo(
    () => ({
      ...themeStyles.base,
      ...(isActive ? themeStyles.active : themeStyles.inactive),
    }),
    [isActive]
  );

  const handleClick = useCallback(() => {
    onThemeChange(theme.mode);
  }, [theme.mode, onThemeChange]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isActive) {
        e.currentTarget.style.background = themeStyles.hover.background;
        e.currentTarget.style.transform = themeStyles.hover.transform;
        e.currentTarget.style.boxShadow = themeStyles.hover.boxShadow;
      }
    },
    [isActive]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isActive) {
        e.currentTarget.style.background = themeStyles.inactive.background;
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }
    },
    [isActive]
  );

  return (
    <Tooltip label={theme.label} position="bottom" withArrow offset={8}>
      <ActionIcon
        variant={isActive ? 'filled' : 'light'}
        color={theme.mode === 'dark' ? 'dark' : 'gray'}
        size="md"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={buttonStyles}
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
        // Ici on pourrait ajouter une notification d'erreur pour l'utilisateur
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
        />
      ))}
    </Group>
  );
}
