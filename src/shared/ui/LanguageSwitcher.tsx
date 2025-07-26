'use client';

import { Menu, Button, Group, Text, Box } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconLanguage, IconChevronDown } from '@tabler/icons-react';
import { useLanguageStore } from '../stores/languageStore';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

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

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <Button
          variant="light"
          size="sm"
          leftSection={<IconLanguage size={16} />}
          rightSection={<IconChevronDown size={14} />}
          style={{
            background: 'var(--mantine-color-gray-0)',
            border: '1px solid var(--mantine-color-gray-3)',
            color: 'var(--mantine-color-gray-7)',
            fontWeight: 500,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--mantine-color-gray-1)';
            e.currentTarget.style.borderColor = 'var(--mantine-color-gray-4)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--mantine-color-gray-0)';
            e.currentTarget.style.borderColor = 'var(--mantine-color-gray-3)';
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

      <Menu.Dropdown
        style={{
          border: '1px solid var(--mantine-color-gray-3)',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
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
                  : 'var(--mantine-color-gray-7)',
              background:
                language === lang.code
                  ? 'var(--mantine-color-blue-0)'
                  : 'transparent',
            }}
            onMouseEnter={(e) => {
              if (language !== lang.code) {
                e.currentTarget.style.background =
                  'var(--mantine-color-gray-0)';
                e.currentTarget.style.color = 'var(--mantine-color-gray-9)';
              }
            }}
            onMouseLeave={(e) => {
              if (language !== lang.code) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--mantine-color-gray-7)';
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
