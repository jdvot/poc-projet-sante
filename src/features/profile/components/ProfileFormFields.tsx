'use client';

import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import {
  Stack,
  TextInput,
  NumberInput,
  Select,
  Group,
  Text,
  Badge,
  Tooltip,
  Box,
  Paper,
  Divider,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconUser,
  IconMail,
  IconCalendar,
  IconGenderMale,
  IconRuler,
  IconScale,
  IconInfoCircle,
} from '@tabler/icons-react';
import { GENDER_OPTIONS } from '../../../shared/types/profile';
import { useUnitConversion } from '../../../shared/hooks/useUnitConversion';
import { useProfileTranslations } from '../hooks/useProfileTranslations';

interface ProfileFormFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  isLoading?: boolean;
}

export const ProfileFormFields: React.FC<ProfileFormFieldsProps> = ({
  control,
  errors,
  isLoading = false,
}) => {
  const { profileT } = useProfileTranslations();
  const unitConversion = useUnitConversion();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Stack gap="xl">
      {/* Personal Information Section */}
      <Box>
        <Group gap="xs" mb="md">
          <IconUser size={20} color="var(--mantine-color-blue-6)" />
          <Text fw={600} size="lg">
            {profileT.personalInfo.title}
          </Text>
        </Group>

        <Stack gap="md">
          <Group grow>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  label={
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        {profileT.form.fields.name}
                      </Text>
                      <Badge size="xs" variant="light" color="blue">
                        {profileT.personalInfo.required}
                      </Badge>
                    </Group>
                  }
                  placeholder={profileT.form.placeholders.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.name?.message as string}
                  required
                  disabled={isLoading}
                  leftSection={<IconUser size={16} />}
                  radius="md"
                  description={profileT.form.descriptions.name}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  label={
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        {profileT.form.fields.email}
                      </Text>
                      <Badge size="xs" variant="light" color="blue">
                        {profileT.personalInfo.required}
                      </Badge>
                    </Group>
                  }
                  placeholder={profileT.form.placeholders.email}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.email?.message as string}
                  required
                  disabled={isLoading}
                  leftSection={<IconMail size={16} />}
                  radius="md"
                  description={profileT.form.descriptions.email}
                />
              )}
            />
          </Group>

          <Group grow>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <NumberInput
                  label={
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        {profileT.form.fields.age}
                      </Text>
                      <Badge size="xs" variant="light" color="blue">
                        {profileT.personalInfo.required}
                      </Badge>
                    </Group>
                  }
                  placeholder={profileT.form.placeholders.age}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.age?.message as string}
                  min={0}
                  max={150}
                  required
                  disabled={isLoading}
                  leftSection={<IconCalendar size={16} />}
                  radius="md"
                  description={profileT.form.descriptions.age}
                />
              )}
            />

            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  label={
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        {profileT.form.fields.gender}
                      </Text>
                      <Badge size="xs" variant="light" color="blue">
                        {profileT.personalInfo.required}
                      </Badge>
                    </Group>
                  }
                  placeholder="Sélectionnez votre genre"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  data={GENDER_OPTIONS}
                  required
                  disabled={isLoading}
                  leftSection={<IconGenderMale size={16} />}
                  radius="md"
                  description="Utilisé pour les calculs de santé personnalisés"
                />
              )}
            />
          </Group>
        </Stack>
      </Box>

      <Divider />

      {/* Physical Measurements Section */}
      <Box>
        <Group gap="xs" mb="md">
          <IconRuler size={20} color="var(--mantine-color-green-6)" />
          <Text fw={600} size="lg">
            Mesures physiques
          </Text>
          <Tooltip label="Ces mesures sont utilisées pour calculer votre IMC et vos besoins caloriques">
            <IconInfoCircle size={16} color="var(--mantine-color-dimmed)" />
          </Tooltip>
        </Group>

        <Stack gap="md">
          <Group grow>
            <Controller
              name="height"
              control={control}
              render={({ field }) => (
                <NumberInput
                  label={
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        Taille
                      </Text>
                      <Badge size="xs" variant="light" color="green">
                        {unitConversion.height.unit === 'ft'
                          ? 'Pieds'
                          : 'Centimètres'}
                      </Badge>
                    </Group>
                  }
                  placeholder={
                    unitConversion.height.unit === 'ft' ? '5.7' : '170'
                  }
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.height?.message as string}
                  min={unitConversion.height.unit === 'ft' ? 1.5 : 50}
                  max={unitConversion.height.unit === 'ft' ? 10 : 300}
                  required
                  disabled={isLoading}
                  leftSection={<IconRuler size={16} />}
                  radius="md"
                  description={
                    unitConversion.height.unit === 'ft'
                      ? 'Votre taille en pieds (ex: 5.7 pour 5 pieds 7 pouces)'
                      : 'Votre taille en centimètres'
                  }
                />
              )}
            />

            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <NumberInput
                  label={
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        Poids
                      </Text>
                      <Badge size="xs" variant="light" color="green">
                        {unitConversion.weight.unit === 'lbs'
                          ? 'Livres'
                          : 'Kilogrammes'}
                      </Badge>
                    </Group>
                  }
                  placeholder={
                    unitConversion.weight.unit === 'lbs' ? '154' : '70'
                  }
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.weight?.message as string}
                  min={unitConversion.weight.unit === 'lbs' ? 44 : 20}
                  max={unitConversion.weight.unit === 'lbs' ? 661 : 300}
                  required
                  disabled={isLoading}
                  leftSection={<IconScale size={16} />}
                  radius="md"
                  description={
                    unitConversion.weight.unit === 'lbs'
                      ? 'Votre poids en livres'
                      : 'Votre poids en kilogrammes'
                  }
                />
              )}
            />
          </Group>
        </Stack>
      </Box>

      {/* Information Box */}
      <Paper
        p="md"
        radius="md"
        withBorder
        style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        }}
      >
        <Group gap="xs" mb="xs">
          <IconInfoCircle size={16} color="var(--mantine-color-blue-6)" />
          <Text size="sm" fw={600} c="blue.6">
            Informations importantes
          </Text>
        </Group>
        <Text size="sm" c="dimmed">
          Vos mesures sont utilisées pour calculer votre Indice de Masse
          Corporelle (IMC), votre poids idéal et vos besoins caloriques
          quotidiens. Ces informations restent confidentielles et ne sont
          partagées qu&apos;avec votre consentement.
        </Text>
      </Paper>
    </Stack>
  );
};
