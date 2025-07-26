'use client';

import React, { useState, useCallback } from 'react';
import {
  Container,
  Title,
  Card,
  Stack,
  Button,
  Group,
  Text,
} from '@mantine/core';
import { useAuthStore } from '../../shared/stores/authStore';
import {
  useFormValidation,
  ValidationSchema,
} from '../../shared/hooks/useFormValidation';
import { useProfileSave } from '../../shared/hooks/useApiCall';
import {
  ProfileData,
  ProfileFormProps,
  VALIDATION_LIMITS,
} from '../../shared/types/profile';
import { ValidationErrors } from './components/ValidationErrors';
import { UserInfo } from './components/UserInfo';
import { ProfileFormFields } from './components/ProfileFormFields';

// Schéma de validation pour le profil
const profileValidationSchema: ValidationSchema = {
  name: [
    {
      validate: (value: unknown, allValues: Record<string, unknown>) =>
        typeof value === 'string' &&
        value.trim().length >= VALIDATION_LIMITS.name.minLength,
      message: `Le nom doit contenir au moins ${VALIDATION_LIMITS.name.minLength} caractères`,
    },
  ],
  email: [
    {
      validate: (value: unknown, allValues: Record<string, unknown>) =>
        typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Veuillez entrer une adresse email valide',
    },
  ],
  age: [
    {
      validate: (value: unknown, allValues: Record<string, unknown>) =>
        typeof value === 'number' &&
        value >= VALIDATION_LIMITS.age.min &&
        value <= VALIDATION_LIMITS.age.max,
      message: `L'âge doit être entre ${VALIDATION_LIMITS.age.min} et ${VALIDATION_LIMITS.age.max} ans`,
    },
  ],
  height: [
    {
      validate: (value: unknown, allValues: Record<string, unknown>) =>
        typeof value === 'number' &&
        value >= VALIDATION_LIMITS.height.min &&
        value <= VALIDATION_LIMITS.height.max,
      message: `La taille doit être entre ${VALIDATION_LIMITS.height.min} et ${VALIDATION_LIMITS.height.max} cm`,
    },
  ],
  weight: [
    {
      validate: (value: unknown, allValues: Record<string, unknown>) =>
        typeof value === 'number' &&
        value >= VALIDATION_LIMITS.weight.min &&
        value <= VALIDATION_LIMITS.weight.max,
      message: `Le poids doit être entre ${VALIDATION_LIMITS.weight.min} et ${VALIDATION_LIMITS.weight.max} kg`,
    },
  ],
};

// Données initiales par défaut
const defaultProfileData: ProfileData = {
  age: 30,
  height: 170,
  weight: 70,
  gender: 'male',
  email: 'user@example.com',
  name: 'Utilisateur',
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  onSave,
  onCancel,
  initialData,
}) => {
  const { user } = useAuthStore();

  // État local du formulaire
  const [formData, setFormData] = useState<ProfileData>({
    ...defaultProfileData,
    ...initialData,
  });

  // Hook de validation personnalisé
  const {
    errors,
    fieldErrors,
    validateForm,
    validateFieldRealTime,
    clearErrors,
    clearFieldErrors,
  } = useFormValidation(
    profileValidationSchema,
    formData as unknown as Record<string, unknown>
  );

  // Hook pour la sauvegarde API
  const profileSaveMutation = useProfileSave();

  // Gestionnaire de changement de champ avec validation en temps réel
  const handleInputChange = useCallback(
    (field: keyof ProfileData, value: string | number) => {
      const newFormData = { ...formData, [field]: value };
      setFormData(newFormData);

      // Validation en temps réel
      validateFieldRealTime(field, value, newFormData);

      // Effacer les erreurs générales si l'utilisateur corrige
      if (errors.length > 0) {
        clearErrors();
      }
    },
    [formData, validateFieldRealTime, errors.length, clearErrors]
  );

  // Gestionnaire de soumission du formulaire
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validation complète
      const validationResult = validateForm(
        formData as unknown as Record<string, unknown>
      );
      if (!validationResult.isValid) {
        return;
      }

      try {
        // Appel API via TanStack Query
        await profileSaveMutation.mutateAsync(formData);

        // Callback de succès
        onSave?.(formData);

        // Réinitialiser les erreurs
        clearErrors();
      } catch (error) {
        // L'erreur est gérée par le hook useProfileSave
        console.error('Erreur lors de la sauvegarde:', error);
      }
    },
    [formData, validateForm, profileSaveMutation, onSave, clearErrors]
  );

  // Gestionnaire d'annulation
  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={1} id="profile-title">
          👤 Profil Santé
        </Title>

        <Card withBorder p="xl" role="region" aria-labelledby="profile-title">
          <form onSubmit={handleSubmit}>
            <Stack gap="lg">
              <Text size="lg" ta="center" c="dimmed">
                Formulaire de profil santé
              </Text>

              {/* Affichage des erreurs de validation */}
              <ValidationErrors errors={errors} />

              {/* Informations utilisateur */}
              <UserInfo user={user} />

              {/* Champs du formulaire */}
              <ProfileFormFields
                formData={formData}
                onFieldChange={handleInputChange}
                fieldErrors={fieldErrors}
              />

              {/* Boutons d'action */}
              <Group justify="space-between">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={profileSaveMutation.isPending}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  loading={profileSaveMutation.isPending}
                  disabled={profileSaveMutation.isPending}
                >
                  {profileSaveMutation.isPending
                    ? 'Sauvegarde...'
                    : 'Sauvegarder'}
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
};

export default ProfileForm;
