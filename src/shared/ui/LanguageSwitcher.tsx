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
import { useAppTheme } from '../hooks/useAppTheme';
import { useEffect, useState, useMemo } from 'react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const { colorScheme } = useMantineColorScheme();
  const { isDark, colors, transitions } = useAppTheme();
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

  const buttonStyles = useMemo(
    () => ({
      background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      border: `1.5px solid ${
        isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)'
      }`,
      color: isDark
        ? 'rgba(255, 255, 255, 0.9)'
        : 'var(--mantine-color-gray-8)',
      fontWeight: 600,
      fontSize: '0.875rem',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.875rem',
      transition: transitions.normal,
      boxShadow: isDark
        ? '0 2px 8px rgba(0, 0, 0, 0.1)'
        : '0 2px 8px rgba(0, 0, 0, 0.05)',
      width: '100%',
      justifyContent: 'space-between',
    }),
    [transitions, isDark]
  );

  const dropdownStyles = useMemo(
    () => ({
      border: `1.5px solid ${
        isDark ? 'var(--mantine-color-dark-2)' : 'var(--mantine-color-gray-2)'
      }`,
      borderRadius: '0.875rem',
      boxShadow: isDark
        ? '0 8px 25px rgba(0, 0, 0, 0.4)'
        : '0 8px 25px rgba(0, 0, 0, 0.15)',
      background: isDark
        ? 'var(--mantine-color-dark-5)'
        : 'var(--mantine-color-white)',
      padding: '0.5rem',
      backdropFilter: 'blur(10px)',
    }),
    [isDark]
  );

  if (!mounted) {
    return null;
  }

  return (
    <Menu shadow="md" width={200} position="bottom-end" zIndex={1001}>
      <Menu.Target>
        <Button
          variant="light"
          size="sm"
          leftSection={<IconLanguage size={16} />}
          rightSection={<IconChevronDown size={14} />}
          style={buttonStyles}
          className="hover:no-underline"
        >
          <Group
            gap="xs"
            align="center"
            justify="space-between"
            style={{ width: '100%' }}
          >
            <Group gap="xs" align="center">
              <Text
                size="lg"
                style={{
                  filter: isDark
                    ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                    : 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                }}
              >
                {currentLanguage.flag}
              </Text>
              <Text size="sm" fw={600}>
                {currentLanguage.name}
              </Text>
            </Group>
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
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: transitions.normal,
              borderRadius: '0.75rem',
              margin: '0.125rem',
              color:
                language === lang.code
                  ? 'white'
                  : isDark
                    ? 'var(--mantine-color-gray-2)'
                    : 'var(--mantine-color-gray-8)',
              background:
                language === lang.code
                  ? `linear-gradient(135deg, ${colors.primary}, ${colors.info})`
                  : 'transparent',
            }}
            className="hover:no-underline"
          >
            <Group gap="sm" align="center" justify="space-between">
              <Group gap="sm" align="center">
                <Text
                  size="lg"
                  style={{
                    filter: isDark
                      ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                      : 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                  }}
                >
                  {lang.flag}
                </Text>
                <Text size="sm" fw={600}>
                  {lang.name}
                </Text>
              </Group>
              {language === lang.code && (
                <Box
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'white',
                    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.3)',
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
