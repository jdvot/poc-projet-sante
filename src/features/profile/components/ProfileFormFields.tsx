'use client';

import React from 'react';
import { Stack, TextInput, NumberInput, Select, Group } from '@mantine/core';
import { ProfileData, GENDER_OPTIONS } from '../../../shared/types/profile';

interface ProfileFormFieldsProps {
  formData: ProfileData;
  onFieldChange: (
    field: keyof ProfileData,
    value: ProfileData[keyof ProfileData]
  ) => void;
  fieldErrors: Record<string, string[]>;
}

export const ProfileFormFields: React.FC<ProfileFormFieldsProps> = ({
  formData,
  onFieldChange,
  fieldErrors,
}) => {
  return (
    <Stack gap="md">
      <Group grow>
        <TextInput
          label="Nom"
          placeholder="Votre nom"
          value={formData.name}
          onChange={(e) => onFieldChange('name', e.target.value)}
          error={fieldErrors.name?.[0]}
          required
        />
        <TextInput
          label="Email"
          placeholder="votre@email.com"
          value={formData.email}
          onChange={(e) => onFieldChange('email', e.target.value)}
          error={fieldErrors.email?.[0]}
          required
        />
      </Group>

      <Group grow>
        <NumberInput
          label="Âge"
          placeholder="25"
          value={formData.age}
          onChange={(value) => onFieldChange('age', value || 0)}
          error={fieldErrors.age?.[0]}
          min={0}
          max={150}
          required
        />
        <Select
          label="Genre"
          placeholder="Sélectionnez votre genre"
          value={formData.gender}
          onChange={(value) =>
            onFieldChange('gender', value as ProfileData['gender'])
          }
          data={GENDER_OPTIONS}
          required
        />
      </Group>

      <Group grow>
        <NumberInput
          label="Taille (cm)"
          placeholder="170"
          value={formData.height}
          onChange={(value) => onFieldChange('height', value || 0)}
          error={fieldErrors.height?.[0]}
          min={50}
          max={300}
          required
        />
        <NumberInput
          label="Poids (kg)"
          placeholder="70"
          value={formData.weight}
          onChange={(value) => onFieldChange('weight', value || 0)}
          error={fieldErrors.weight?.[0]}
          min={20}
          max={300}
          required
        />
      </Group>
    </Stack>
  );
};
