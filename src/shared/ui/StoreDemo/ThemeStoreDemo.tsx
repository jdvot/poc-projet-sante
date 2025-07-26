'use client';

import React from 'react';
import { Card, Title, Group, Button, Badge, Select } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';

export function ThemeStoreDemo() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

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
      <Title order={3} mb="lg" style={{ color: 'var(--mantine-color-teal-6)' }}>
        Theme Store (Mantine)
      </Title>

      <Group gap="lg" align="center" justify="space-between">
        <Group gap="md" align="center">
          <Badge
            color={colorScheme === 'dark' ? 'dark' : 'light'}
            size="lg"
            style={{ fontWeight: 600 }}
          >
            Current: {colorScheme || 'auto'}
          </Badge>
        </Group>

        <Group gap="sm">
          <Select
            value={colorScheme || 'auto'}
            onChange={(value) =>
              setColorScheme(value as 'light' | 'dark' | 'auto')
            }
            data={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'auto', label: 'Auto' },
            ]}
            size="sm"
            style={{ minWidth: '120px' }}
          />
        </Group>
      </Group>
    </Card>
  );
}
