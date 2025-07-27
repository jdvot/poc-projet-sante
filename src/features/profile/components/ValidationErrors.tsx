'use client';

import React from 'react';
import { Stack, Text } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { ModernAlert } from '../../../shared/ui/ModernAlert';
import { useProfileTranslations } from '../hooks/useProfileTranslations';

interface ValidationErrorsProps {
  errors: string[];
}

export const ValidationErrors: React.FC<ValidationErrorsProps> = ({
  errors,
}) => {
  const { profileT } = useProfileTranslations();

  if (errors.length === 0) return null;

  return (
    <ModernAlert
      variant="error"
      icon={<IconAlertTriangle size={16} />}
      title={profileT.validation.errorsFound.replace(
        '{{count}}',
        errors.length.toString()
      )}
    >
      <Stack gap="xs" mt="xs">
        {errors.map((error, index) => (
          <Text
            key={index}
            size="sm"
            style={{ color: 'var(--mantine-color-text)' }}
          >
            • {error}
          </Text>
        ))}
      </Stack>
    </ModernAlert>
  );
};
