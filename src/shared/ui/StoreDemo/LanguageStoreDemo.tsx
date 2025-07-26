'use client';

import React from 'react';
import { Card, Title, Group, Badge, Select } from '@mantine/core';
import { useLanguageStore, Language } from '../../stores/languageStore';

export function LanguageStoreDemo() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <Card
      shadow="lg"
      padding="xl"
      radius="lg"
      withBorder
      style={{
        background: 'var(--mantine-color-body)',
        border: '1px solid var(--mantine-color-gray-3)',
      }}
    >
      <Title
        order={3}
        mb="lg"
        style={{ color: 'var(--mantine-color-indigo-6)' }}
      >
        Language Store
      </Title>

      <Group gap="lg" align="center" justify="space-between">
        <Group gap="md" align="center">
          <Badge color="indigo" size="lg" style={{ fontWeight: 600 }}>
            Current: {language}
          </Badge>
        </Group>

        <Group gap="sm">
          <Select
            value={language}
            onChange={(value) => setLanguage((value as Language) || 'fr')}
            data={[
              { value: 'fr', label: 'Français' },
              { value: 'en', label: 'English' },
            ]}
            size="sm"
            style={{ minWidth: '120px' }}
          />
        </Group>
      </Group>
    </Card>
  );
}
