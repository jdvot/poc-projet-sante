'use client';

import {
  Menu,
  Button,
  Group,
  Text,
  Box,
  useMantineColorScheme,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconLanguage, IconChevronDown } from '@tabler/icons-react';
import { useLanguageStore } from '../stores/languageStore';
import { useEffect, useState, useMemo } from 'react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const { colorScheme } = useMantineColorScheme();
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

  const handleLanguageChange = (newLanguage: 'en' | 'fr') => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  const buttonStyles = {
    background:
      actualTheme === 'dark'
        ? 'var(--mantine-color-dark-4)'
        : 'var(--mantine-color-gray-0)',
    border: `1px solid ${
      actualTheme === 'dark'
        ? 'var(--mantine-color-dark-3)'
        : 'var(--mantine-color-gray-3)'
    }`,
    color:
      actualTheme === 'dark'
        ? 'var(--mantine-color-gray-3)'
        : 'var(--mantine-color-gray-7)',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  };

  const dropdownStyles = {
    border: `1px solid ${
      actualTheme === 'dark'
        ? 'var(--mantine-color-dark-4)'
        : 'var(--mantine-color-gray-3)'
    }`,
    borderRadius: '0.75rem',
    boxShadow:
      actualTheme === 'dark'
        ? '0 4px 12px rgba(0, 0, 0, 0.3)'
        : '0 4px 12px rgba(0, 0, 0, 0.15)',
    background:
      actualTheme === 'dark'
        ? 'var(--mantine-color-dark-6)'
        : 'var(--mantine-color-body)',
  };

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <Button
          variant="light"
          size="sm"
          leftSection={<IconLanguage size={16} />}
          rightSection={<IconChevronDown size={14} />}
          style={buttonStyles}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              actualTheme === 'dark'
                ? 'var(--mantine-color-dark-3)'
                : 'var(--mantine-color-gray-1)';
            e.currentTarget.style.borderColor =
              actualTheme === 'dark'
                ? 'var(--mantine-color-dark-2)'
                : 'var(--mantine-color-gray-4)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              actualTheme === 'dark'
                ? 'var(--mantine-color-dark-4)'
                : 'var(--mantine-color-gray-0)';
            e.currentTarget.style.borderColor =
              actualTheme === 'dark'
                ? 'var(--mantine-color-dark-3)'
                : 'var(--mantine-color-gray-3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Group gap="xs" align="center">
            <Text size="lg">{currentLanguage.flag}</Text>
            <Text size="sm" fw={500}>
              {currentLanguage.name}
            </Text>
          </Group>
        </Button>
      </Menu.Target>

      <Menu.Dropdown style={dropdownStyles}>
        {languages.map((lang) => (
          <Menu.Item
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code as 'en' | 'fr')}
            style={{
              padding: '0.75rem 1rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              color:
                language === lang.code
                  ? 'var(--mantine-color-blue-6)'
                  : actualTheme === 'dark'
                    ? 'var(--mantine-color-gray-3)'
                    : 'var(--mantine-color-gray-7)',
              background:
                language === lang.code
                  ? actualTheme === 'dark'
                    ? 'var(--mantine-color-blue-9)'
                    : 'var(--mantine-color-blue-0)'
                  : 'transparent',
            }}
            onMouseEnter={(e) => {
              if (language !== lang.code) {
                e.currentTarget.style.background =
                  actualTheme === 'dark'
                    ? 'var(--mantine-color-dark-4)'
                    : 'var(--mantine-color-gray-0)';
                e.currentTarget.style.color =
                  actualTheme === 'dark'
                    ? 'var(--mantine-color-gray-1)'
                    : 'var(--mantine-color-gray-9)';
              }
            }}
            onMouseLeave={(e) => {
              if (language !== lang.code) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color =
                  actualTheme === 'dark'
                    ? 'var(--mantine-color-gray-3)'
                    : 'var(--mantine-color-gray-7)';
              }
            }}
          >
            <Group gap="sm" align="center">
              <Text size="lg">{lang.flag}</Text>
              <Text size="sm" fw={500}>
                {lang.name}
              </Text>
              {language === lang.code && (
                <Box
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--mantine-color-blue-6)',
                    marginLeft: 'auto',
                  }}
                />
              )}
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
