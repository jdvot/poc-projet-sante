'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Stack, Title, Text, Group } from '@mantine/core';
import { TechBadge } from './TechBadge';

interface TechStackSectionProps {
  colorScheme: 'light' | 'dark' | 'auto';
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({
  colorScheme,
}) => {
  const { t } = useTranslation();

  const technologies = [
    { name: 'Next.js 15', color: 'blue' },
    { name: 'React 19', color: 'cyan' },
    { name: 'TypeScript', color: 'indigo' },
    { name: 'Mantine UI', color: 'teal' },
    { name: 'Zustand', color: 'green' },
    { name: 'i18next', color: 'lime' },
    { name: 'TanStack Query', color: 'orange' },
    { name: 'React Hook Form', color: 'red' },
    { name: 'Vitest', color: 'yellow' },
    { name: 'Cypress', color: 'grape' },
    { name: 'Storybook', color: 'pink' },
    { name: 'Sentry', color: 'gray' },
  ];

  return (
    <Paper
      p="xl"
      radius="lg"
      style={{
        background: 'var(--mantine-color-body)',
        border: '1px solid var(--mantine-color-gray-3)',
      }}
    >
      <Stack gap="lg">
        <Title
          order={2}
          ta="center"
          style={{ color: 'var(--mantine-color-text)' }}
        >
          {t('home.techStack')}
        </Title>
        <Text
          size="md"
          ta="center"
          c="dimmed"
          style={{ color: 'var(--mantine-color-dimmed)' }}
        >
          {t('home.techStackDesc')}
        </Text>
        <Group gap="md" justify="center" wrap="wrap">
          {technologies.map((tech) => (
            <TechBadge key={tech.name} color={tech.color}>
              {tech.name}
            </TechBadge>
          ))}
        </Group>
      </Stack>
    </Paper>
  );
};
