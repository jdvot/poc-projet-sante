'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Stack, Title, Text, Button, ThemeIcon } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
  colorScheme: 'light' | 'dark' | 'auto';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  href,
  color,
  colorScheme,
}) => {
  const { t } = useTranslation();

  return (
    <Card
      withBorder
      p="xl"
      radius="lg"
      style={{
        background: 'var(--mantine-color-body)',
        border: '1px solid var(--mantine-color-gray-3)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      component={Link}
      href={href}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        e.currentTarget.style.borderColor = `var(--mantine-color-${color}-4)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = 'var(--mantine-color-gray-3)';
      }}
    >
      <Stack gap="md" align="center">
        <ThemeIcon
          size={60}
          radius="xl"
          variant="light"
          color={color}
          style={{
            background: `var(--mantine-color-${color}-0)`,
            color: `var(--mantine-color-${color}-6)`,
          }}
        >
          {icon}
        </ThemeIcon>
        <Title
          order={3}
          size="h4"
          ta="center"
          style={{ color: 'var(--mantine-color-text)' }}
        >
          {title}
        </Title>
        <Text
          size="sm"
          ta="center"
          c="dimmed"
          style={{ color: 'var(--mantine-color-dimmed)' }}
        >
          {description}
        </Text>
        <Button
          variant="light"
          color={color}
          size="sm"
          rightSection={<IconArrowRight size={16} />}
          style={{
            background: `var(--mantine-color-${color}-0)`,
            color: `var(--mantine-color-${color}-6)`,
            border: `1px solid var(--mantine-color-${color}-3)`,
          }}
        >
          {t('home.featureCard.discover')}
        </Button>
      </Stack>
    </Card>
  );
};
