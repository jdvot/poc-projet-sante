'use client';

import React from 'react';
import { Card, Text, Stack } from '@mantine/core';

interface ValidationErrorsProps {
  errors: string[];
}

export const ValidationErrors: React.FC<ValidationErrorsProps> = ({
  errors,
}) => {
  if (errors.length === 0) return null;

  return (
    <Card
      withBorder
      p="md"
      style={{ borderColor: 'var(--mantine-color-red-6)' }}
    >
      <Stack gap="xs">
        <Text size="sm" c="red" fw={500}>
          Erreurs de validation:
        </Text>
        {errors.map((error, index) => (
          <Text key={index} size="sm" c="red">
            • {error}
          </Text>
        ))}
      </Stack>
    </Card>
  );
};
