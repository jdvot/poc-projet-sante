'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Stack, Group, Title, Text, Button } from '@mantine/core';
import { IconSparkles, IconDashboard } from '@tabler/icons-react';
import Link from 'next/link';

interface HeroSectionProps {
  colorScheme: 'light' | 'dark' | 'auto';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ colorScheme }) => {
  const { t } = useTranslation();

  return (
    <Paper
      p="xl"
      radius="lg"
      style={{
        background:
          colorScheme === 'dark'
            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
            : 'linear-gradient(135deg, var(--mantine-color-blue-0) 0%, var(--mantine-color-cyan-0) 100%)',
        border:
          colorScheme === 'dark'
            ? '1px solid var(--mantine-color-gray-6)'
            : '1px solid var(--mantine-color-blue-2)',
        textAlign: 'center',
      }}
    >
      <Stack gap="lg" align="center">
        <Group gap="xs" justify="center">
          <IconSparkles
            size={32}
            style={{ color: 'var(--mantine-color-blue-6)' }}
          />
          <Title
            order={1}
            size="h1"
            style={{ color: 'var(--mantine-color-text)' }}
          >
            {t('home.hero.title')}
          </Title>
          <IconSparkles
            size={32}
            style={{ color: 'var(--mantine-color-blue-6)' }}
          />
        </Group>

        <Text
          size="xl"
          ta="center"
          style={{ color: 'var(--mantine-color-text)', maxWidth: 600 }}
        >
          {t('home.hero.subtitle')}
        </Text>

        <Text
          size="lg"
          ta="center"
          c="dimmed"
          style={{ color: 'var(--mantine-color-dimmed)' }}
        >
          {t('home.hero.description')}
        </Text>

        <Button
          size="lg"
          component={Link}
          href="/dashboard"
          leftSection={<IconDashboard size={20} />}
          style={{
            background: 'var(--mantine-color-blue-6)',
            color: 'white',
            fontWeight: 600,
          }}
        >
          {t('home.hero.startExperience')}
        </Button>
      </Stack>
    </Paper>
  );
};
