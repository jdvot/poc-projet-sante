'use client';

import React from 'react';
import { Card, Title, Text, Group, Badge, Stack } from '@mantine/core';
import { IconRuler, IconScale, IconThermometer } from '@tabler/icons-react';
import { useUnitConversion } from '../hooks/useUnitConversion';

export function UnitConversionDemo() {
  const unitConversion = useUnitConversion();

  // Example values in metric units
  const exampleWeight = 70; // kg
  const exampleHeight = 175; // cm
  const exampleTemperature = 37; // celsius

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} mb="md" style={{ color: 'var(--mantine-color-blue-6)' }}>
        Démonstration des Unités de Conversion
      </Title>

      <Text size="sm" c="dimmed" mb="lg">
        Ces valeurs sont automatiquement converties selon vos préférences dans
        les paramètres.
      </Text>

      <Stack gap="md">
        {/* Weight Conversion */}
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <IconScale
              size={20}
              style={{ color: 'var(--mantine-color-green-6)' }}
            />
            <div>
              <Text size="sm" fw={500}>
                Poids
              </Text>
              <Text size="xs" c="dimmed">
                {exampleWeight} kg →{' '}
                {unitConversion.weight.toDisplay(exampleWeight)}{' '}
                {unitConversion.weight.unit}
              </Text>
            </div>
          </Group>
          <Badge variant="light" color="green">
            {unitConversion.weight.unit}
          </Badge>
        </Group>

        {/* Height Conversion */}
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <IconRuler
              size={20}
              style={{ color: 'var(--mantine-color-blue-6)' }}
            />
            <div>
              <Text size="sm" fw={500}>
                Taille
              </Text>
              <Text size="xs" c="dimmed">
                {exampleHeight} cm →{' '}
                {unitConversion.height.toDisplay(exampleHeight).toFixed(1)}{' '}
                {unitConversion.height.unit}
              </Text>
            </div>
          </Group>
          <Badge variant="light" color="blue">
            {unitConversion.height.unit}
          </Badge>
        </Group>

        {/* Temperature Conversion */}
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <IconThermometer
              size={20}
              style={{ color: 'var(--mantine-color-red-6)' }}
            />
            <div>
              <Text size="sm" fw={500}>
                Température
              </Text>
              <Text size="xs" c="dimmed">
                {exampleTemperature}°C →{' '}
                {unitConversion.temperature.toDisplay(exampleTemperature)}
                {unitConversion.temperature.unit}
              </Text>
            </div>
          </Group>
          <Badge variant="light" color="red">
            {unitConversion.temperature.unit}
          </Badge>
        </Group>
      </Stack>

      <Text size="xs" c="dimmed" mt="md" ta="center">
        Modifiez vos unités dans les paramètres pour voir les changements en
        temps réel !
      </Text>
    </Card>
  );
}
