'use client';

import {
  Container,
  Title,
  Text,
  Card,
  Stack,
  Group,
  Divider,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';
import { useLanguageStore } from '../shared/stores/languageStore';
import { StoreDemo } from '../shared/ui/StoreDemo';

export default function HomePage() {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const { language } = useLanguageStore();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">
            {t('welcome')}
          </Title>
          <Text size="lg" c="dimmed">
            {t(
              'home.description',
              'A comprehensive health platform with AI-powered features'
            )}
          </Text>
        </div>

        <Group gap="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="sm">
              {t('home.currentSettings', 'Current Settings')}
            </Title>
            <Stack gap="xs">
              <Text>
                <strong>{t('language')}:</strong>{' '}
                {language === 'fr' ? 'Français' : 'English'}
              </Text>
              <Text>
                <strong>{t('theme.title', 'Theme')}:</strong> {colorScheme}
              </Text>
            </Stack>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="sm">
              {t('home.features', 'Features')}
            </Title>
            <Stack gap="xs">
              <Text>• {t('dashboard')}</Text>
              <Text>• {t('aiDoctor')}</Text>
              <Text>• {t('profile')}</Text>
              <Text>• {t('settings')}</Text>
            </Stack>
          </Card>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="sm">
            {t('home.instructions', 'How to use')}
          </Title>
          <Text>
            {t(
              'home.instructionsText',
              'Use the language and theme switchers in the navigation bar to change the interface language and appearance.'
            )}
          </Text>
        </Card>

        <Divider />

        {/* Zustand Stores Demo */}
        <StoreDemo />
      </Stack>
    </Container>
  );
}
