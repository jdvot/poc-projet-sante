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
  useMantineTheme,
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
  const theme = useMantineTheme();

  return (
    <Stack
      gap="xl"
      data-testid="profile-form-fields"
      role="group"
      aria-labelledby="form-fields-title"
    >
      {/* Personal Information Section */}
      <Box>
        <Group gap="xs" mb="md">
          <IconUser
            size={20}
            style={{ color: theme.colors.blue[6] }}
            aria-hidden="true"
          />
          <Text
            id="form-fields-title"
            fw={600}
            size="lg"
            style={{ color: theme.colors.blue[colorScheme === 'dark' ? 4 : 7] }}
          >
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
                  aria-describedby={
                    errors.name?.message ? 'name-error' : 'name-description'
                  }
                  aria-invalid={!!errors.name}
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
                  aria-describedby={
                    errors.email?.message ? 'email-error' : 'email-description'
                  }
                  aria-invalid={!!errors.email}
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
                  required
                  disabled={isLoading}
                  leftSection={<IconCalendar size={16} />}
                  radius="md"
                  min={1}
                  max={120}
                  description={profileT.form.descriptions.age}
                  aria-describedby={
                    errors.age?.message ? 'age-error' : 'age-description'
                  }
                  aria-invalid={!!errors.age}
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
                  error={errors.gender?.message as string}
                  required
                  disabled={isLoading}
                  leftSection={<IconGenderMale size={16} />}
                  radius="md"
                  data={GENDER_OPTIONS}
                  description="Utilisé pour les calculs de santé personnalisés"
                  aria-describedby={
                    errors.gender?.message
                      ? 'gender-error'
                      : 'gender-description'
                  }
                  aria-invalid={!!errors.gender}
                />
              )}
            />
          </Group>
        </Stack>
      </Box>

      {/* Physical Measurements Section */}
      <Box>
        <Group gap="xs" mb="md">
          <IconRuler
            size={20}
            style={{ color: theme.colors.green[6] }}
            aria-hidden="true"
          />
          <Text
            fw={600}
            size="lg"
            style={{
              color: theme.colors.green[colorScheme === 'dark' ? 4 : 7],
            }}
          >
            Mesures physiques
          </Text>
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
                        {profileT.form.fields.height}
                      </Text>
                      <Tooltip label="Informations sur la taille">
                        <IconInfoCircle
                          size={14}
                          style={{ color: theme.colors.gray[5] }}
                        />
                      </Tooltip>
                    </Group>
                  }
                  placeholder={profileT.form.placeholders.height}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.height?.message as string}
                  disabled={isLoading}
                  leftSection={<IconRuler size={16} />}
                  rightSection={
                    <Text
                      size="xs"
                      c="dimmed"
                      style={{ paddingRight: '0.5rem' }}
                    >
                      {unitConversion.height.unit}
                    </Text>
                  }
                  radius="md"
                  min={0}
                  max={300}
                  description={profileT.form.descriptions.height}
                  aria-describedby={
                    errors.height?.message
                      ? 'height-error'
                      : 'height-description'
                  }
                  aria-invalid={!!errors.height}
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
                        {profileT.form.fields.weight}
                      </Text>
                      <Tooltip label="Informations sur le poids">
                        <IconInfoCircle
                          size={14}
                          style={{ color: theme.colors.gray[5] }}
                        />
                      </Tooltip>
                    </Group>
                  }
                  placeholder={profileT.form.placeholders.weight}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.weight?.message as string}
                  disabled={isLoading}
                  leftSection={<IconScale size={16} />}
                  rightSection={
                    <Text
                      size="xs"
                      c="dimmed"
                      style={{ paddingRight: '0.5rem' }}
                    >
                      {unitConversion.weight.unit}
                    </Text>
                  }
                  radius="md"
                  min={0}
                  max={500}
                  description={profileT.form.descriptions.weight}
                  aria-describedby={
                    errors.weight?.message
                      ? 'weight-error'
                      : 'weight-description'
                  }
                  aria-invalid={!!errors.weight}
                />
              )}
            />
          </Group>
        </Stack>
      </Box>

      {/* Error Messages with proper ARIA */}
      {Object.keys(errors).length > 0 && (
        <Box role="alert" aria-live="polite">
          <Stack gap="xs">
            {errors.name && (
              <Text id="name-error" size="sm" c="red" fw={500}>
                {errors.name.message as string}
              </Text>
            )}
            {errors.email && (
              <Text id="email-error" size="sm" c="red" fw={500}>
                {errors.email.message as string}
              </Text>
            )}
            {errors.age && (
              <Text id="age-error" size="sm" c="red" fw={500}>
                {errors.age.message as string}
              </Text>
            )}
            {errors.gender && (
              <Text id="gender-error" size="sm" c="red" fw={500}>
                {errors.gender.message as string}
              </Text>
            )}
            {errors.height && (
              <Text id="height-error" size="sm" c="red" fw={500}>
                {errors.height.message as string}
              </Text>
            )}
            {errors.weight && (
              <Text id="weight-error" size="sm" c="red" fw={500}>
                {errors.weight.message as string}
              </Text>
            )}
          </Stack>
        </Box>
      )}

      {/* Descriptions with proper ARIA */}
      <Box aria-hidden="true">
        <Text
          id="name-description"
          size="xs"
          c="dimmed"
          style={{ display: 'none' }}
        >
          {profileT.form.descriptions.name}
        </Text>
        <Text
          id="email-description"
          size="xs"
          c="dimmed"
          style={{ display: 'none' }}
        >
          {profileT.form.descriptions.email}
        </Text>
        <Text
          id="age-description"
          size="xs"
          c="dimmed"
          style={{ display: 'none' }}
        >
          {profileT.form.descriptions.age}
        </Text>
        <Text
          id="gender-description"
          size="xs"
          c="dimmed"
          style={{ display: 'none' }}
        >
          Utilisé pour les calculs de santé personnalisés
        </Text>
        <Text
          id="height-description"
          size="xs"
          c="dimmed"
          style={{ display: 'none' }}
        >
          {profileT.form.descriptions.height}
        </Text>
        <Text
          id="weight-description"
          size="xs"
          c="dimmed"
          style={{ display: 'none' }}
        >
          {profileT.form.descriptions.weight}
        </Text>
      </Box>
    </Stack>
  );
};
