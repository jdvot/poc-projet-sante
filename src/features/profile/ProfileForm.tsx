'use client';

import React from 'react';
import {
  Container,
  Title,
  Stack,
  Group,
  Text,
  Loader,
  Button,
  Badge,
  Divider,
  Paper,
  Box,
  Grid,
  Transition,
  Progress,
  Tooltip,
  Card,
  Flex,
  rem,
  useMantineColorScheme,
  useMantineTheme,
  Alert,
} from '@mantine/core';
import {
  IconUser,
  IconDeviceFloppy,
  IconX,
  IconHeart,
  IconScale,
  IconRuler,
  IconUserCheck,
  IconEdit,
  IconCheck,
  IconAlertCircle,
  IconInfoCircle,
  IconSparkles,
  IconTarget,
  IconBrain,
  IconFlame,
  IconShieldCheck,
  IconClock,
  IconTrash,
} from '@tabler/icons-react';
import { useAuthStore } from '../../shared/stores/authStore';
import { ProfileFormProps } from '../../shared/types/profile';
import { ValidationErrors } from './components/ValidationErrors';
import { UserInfo } from './components/UserInfo';
import { ProfileFormFields } from './components/ProfileFormFields';
import { HealthStats } from './components/HealthStats';
import { useProfileForm } from './hooks/useProfileForm';
import { useProfileTranslations } from './hooks/useProfileTranslations';
import { ModernCard } from '../../shared/ui/ModernCard';
import { ModernSection } from '../../shared/ui/ModernSection';
import { ModernAlert } from '../../shared/ui/ModernAlert';

const ProfileForm: React.FC<ProfileFormProps> = ({
  onSave,
  onCancel,
  initialData,
}) => {
  const { user } = useAuthStore();
  const { profileT } = useProfileTranslations();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  // Utilisation du hook personnalisé pour la logique du formulaire
  const { form, isLoading, handleSubmit, handleCancel } = useProfileForm({
    onSave,
    onCancel,
    initialData,
  });

  const { errors, isValid, isDirty } = form.formState;
  const watchedValues = form.watch();

  // Calculate form completion percentage
  const formFields = [
    'name',
    'email',
    'age',
    'gender',
    'height',
    'weight',
  ] as const;
  const completedFields = formFields.filter((field) => {
    const value = watchedValues[field as keyof typeof watchedValues];
    return value && value !== '' && value !== 0;
  }).length;
  const completionPercentage = Math.round(
    (completedFields / formFields.length) * 100
  );

  // Couleurs du thème optimisées pour l'accessibilité WCAG AAA
  const heroGradient =
    colorScheme === 'dark'
      ? `linear-gradient(135deg, ${theme.colors.blue[8]} 0%, ${theme.colors.blue[9]} 100%)`
      : `linear-gradient(135deg, ${theme.colors.blue[6]} 0%, ${theme.colors.blue[7]} 100%)`;

  const cardGradient =
    colorScheme === 'dark'
      ? `linear-gradient(135deg, ${theme.colors.gray[8]} 0%, ${theme.colors.gray[9]} 100%)`
      : `linear-gradient(135deg, ${theme.colors.gray[0]} 0%, ${theme.colors.gray[1]} 100%)`;

  const healthGradient =
    colorScheme === 'dark'
      ? `linear-gradient(135deg, ${theme.colors.green[8]} 0%, ${theme.colors.green[9]} 100%)`
      : `linear-gradient(135deg, ${theme.colors.green[0]} 0%, ${theme.colors.green[1]} 100%)`;

  // Couleurs d'action avec contraste optimal
  const actionColors = {
    primary:
      colorScheme === 'dark' ? theme.colors.blue[4] : theme.colors.blue[6],
    success:
      colorScheme === 'dark' ? theme.colors.green[4] : theme.colors.green[6],
    warning:
      colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.yellow[6],
    danger: colorScheme === 'dark' ? theme.colors.red[4] : theme.colors.red[6],
    info: colorScheme === 'dark' ? theme.colors.cyan[4] : theme.colors.cyan[6],
  };

  // Couleurs de texte avec contraste élevé
  const textColors = {
    primary:
      colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[8],
    secondary:
      colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.gray[6],
    inverse: colorScheme === 'dark' ? theme.colors.gray[9] : theme.white,
  };

  return (
    <Box py="xl" px="md">
      <Stack gap="xl">
        {/* Hero Header Section - Amélioré pour l'accessibilité */}
        <Card
          p="xl"
          radius="xl"
          style={{
            background: heroGradient,
            position: 'relative',
            overflow: 'hidden',
          }}
          role="banner"
          aria-labelledby="profile-hero-title"
        >
          {/* Éléments décoratifs avec aria-hidden */}
          <Box
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '200px',
              height: '200px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              transform: 'translate(50%, -50%)',
            }}
          />
          <Box
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '150px',
              height: '150px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '50%',
              transform: 'translate(-50%, 50%)',
            }}
          />

          <Stack gap="lg" style={{ position: 'relative', zIndex: 1 }}>
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs">
                <Group gap="sm" align="center">
                  <Box
                    p="xs"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                    }}
                    aria-hidden="true"
                  >
                    <IconUser size={24} color="white" />
                  </Box>
                  <Title
                    id="profile-hero-title"
                    order={2}
                    size="h2"
                    style={{
                      color: 'white',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    {profileT.title}
                  </Title>
                </Group>
                <Text
                  size="lg"
                  style={{
                    color: 'rgba(255,255,255,0.95)',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  }}
                >
                  {profileT.description}
                </Text>
              </Stack>

              <Badge
                size="lg"
                variant="light"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
                leftSection={<IconSparkles size={16} />}
              >
                {profileT.header?.subtitle || 'Profil de Santé'}
              </Badge>
            </Group>

            {/* Enhanced Progress Bar - Amélioré pour l'accessibilité */}
            <Card
              p="md"
              radius="lg"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
              role="progressbar"
              aria-valuenow={completionPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-labelledby="progress-label"
            >
              <Group justify="space-between" mb="sm">
                <Group gap="xs">
                  <IconTarget size={18} color="white" />
                  <Text id="progress-label" fw={600} style={{ color: 'white' }}>
                    {profileT.progress?.title || 'Progression du profil'}
                  </Text>
                </Group>
                <Badge
                  variant="filled"
                  color={completionPercentage === 100 ? 'green' : 'blue'}
                  size="md"
                  aria-label={`${completionPercentage}% complété`}
                >
                  {completionPercentage}%
                </Badge>
              </Group>
              <Progress
                value={completionPercentage}
                color={completionPercentage === 100 ? 'green' : 'blue'}
                size="lg"
                radius="xl"
                style={{ background: 'rgba(255,255,255,0.2)' }}
                aria-describedby="progress-description"
              />
              <Text
                id="progress-description"
                size="sm"
                style={{ color: 'rgba(255,255,255,0.9)' }}
                mt="xs"
              >
                {completionPercentage === 100
                  ? profileT.progress?.completed || 'Profil complété !'
                  : `${completedFields} sur ${formFields.length} champs complétés`}
              </Text>
            </Card>
          </Stack>
        </Card>

        {/* Main Content Grid - Amélioré pour l'accessibilité */}
        <Grid gutter="xl">
          {/* Left Column - User Info & Health Stats */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Stack gap="xl">
              {/* User Information Card */}
              <ModernCard
                p="xl"
                radius="xl"
                style={{
                  background: cardGradient,
                }}
                title={profileT.userInfo?.title || 'Informations utilisateur'}
              >
                <UserInfo user={user} />
              </ModernCard>

              {/* Health Statistics Card */}
              <ModernCard
                p="xl"
                radius="xl"
                style={{
                  background: healthGradient,
                }}
                title={profileT.healthStats?.title || 'Statistiques de santé'}
              >
                <HealthStats
                  height={Number(watchedValues.height) || 0}
                  weight={Number(watchedValues.weight) || 0}
                  age={Number(watchedValues.age) || 0}
                  gender={watchedValues.gender}
                />
              </ModernCard>
            </Stack>
          </Grid.Col>

          {/* Right Column - Form */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card
              p="xl"
              radius="xl"
              style={{
                background: cardGradient,
              }}
              role="form"
              aria-labelledby="profile-form-title"
            >
              <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
                <Stack gap="xl">
                  {/* Enhanced validation errors */}
                  <Transition
                    mounted={Object.keys(errors).length > 0}
                    transition="slide-down"
                    duration={300}
                  >
                    {(styles) => (
                      <div style={styles} role="alert" aria-live="polite">
                        <ValidationErrors
                          errors={
                            Object.values(errors)
                              .map((error) => error?.message)
                              .filter(Boolean) as string[]
                          }
                        />
                      </div>
                    )}
                  </Transition>

                  {/* Form Fields Section */}
                  <ModernSection
                    title={profileT.personalInfo.title}
                    subtitle={profileT.personalInfo.subtitle}
                    icon={<IconEdit size={20} />}
                  >
                    <ProfileFormFields
                      control={form.control}
                      errors={errors}
                      isLoading={isLoading}
                    />
                  </ModernSection>

                  {/* Enhanced Action Buttons Section */}
                  <Card
                    p="lg"
                    radius="lg"
                    style={{
                      background: cardGradient,
                      border: `1px solid ${colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[3]}`,
                    }}
                    role="group"
                    aria-labelledby="action-buttons-title"
                  >
                    <Title
                      id="action-buttons-title"
                      order={4}
                      size="h5"
                      mb="md"
                      style={{
                        color: textColors.primary,
                      }}
                    >
                      {profileT.actions?.title || 'Actions'}
                    </Title>

                    <Stack gap="md">
                      {/* Status Indicators */}
                      <Group justify="space-between" wrap="wrap">
                        <Group gap="sm">
                          {isDirty && !isLoading && (
                            <Tooltip
                              label={
                                profileT.unsavedChanges?.message ||
                                'Vous avez des modifications non sauvegardées'
                              }
                              withArrow
                              position="top"
                            >
                              <Badge
                                variant="light"
                                color="yellow"
                                leftSection={<IconAlertCircle size={12} />}
                                aria-label={
                                  profileT.unsavedChanges?.title ||
                                  'Modifications non sauvegardées'
                                }
                                style={{
                                  backgroundColor:
                                    colorScheme === 'dark'
                                      ? theme.colors.yellow[9]
                                      : theme.colors.yellow[1],
                                  color:
                                    colorScheme === 'dark'
                                      ? theme.colors.yellow[1]
                                      : theme.colors.yellow[9],
                                }}
                              >
                                {profileT.unsavedChanges?.title ||
                                  'Modifications non sauvegardées'}
                              </Badge>
                            </Tooltip>
                          )}

                          {isValid && !isDirty && (
                            <Badge
                              variant="light"
                              color="green"
                              leftSection={<IconShieldCheck size={12} />}
                              aria-label="Formulaire valide"
                              style={{
                                backgroundColor:
                                  colorScheme === 'dark'
                                    ? theme.colors.green[9]
                                    : theme.colors.green[1],
                                color:
                                  colorScheme === 'dark'
                                    ? theme.colors.green[1]
                                    : theme.colors.green[9],
                              }}
                            >
                              {profileT.validation?.allValid ||
                                'Formulaire valide'}
                            </Badge>
                          )}
                        </Group>

                        {isLoading && (
                          <Group gap="xs" role="status" aria-live="polite">
                            <Loader size="sm" color={actionColors.primary} />
                            <Text size="sm" c="dimmed">
                              {profileT.actions?.saving || 'Sauvegarde...'}
                            </Text>
                          </Group>
                        )}
                      </Group>

                      {/* Simplified Action Buttons */}
                      <Group justify="flex-end" gap="md">
                        {/* Cancel Button */}
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          disabled={isLoading}
                          size="md"
                          leftSection={<IconX size={16} />}
                          radius="lg"
                          aria-label={profileT.actions?.cancel || 'Annuler'}
                          style={{
                            borderColor:
                              colorScheme === 'dark'
                                ? theme.colors.gray[6]
                                : theme.colors.gray[4],
                            color: textColors.primary,
                          }}
                        >
                          {profileT.actions?.cancel || 'Annuler'}
                        </Button>

                        {/* Save Button */}
                        <Button
                          type="submit"
                          loading={isLoading}
                          disabled={isLoading || !isValid}
                          size="md"
                          leftSection={
                            isLoading ? (
                              <Loader size="xs" />
                            ) : completionPercentage === 100 ? (
                              <IconCheck size={16} />
                            ) : (
                              <IconDeviceFloppy size={16} />
                            )
                          }
                          radius="lg"
                          variant="filled"
                          color={
                            completionPercentage === 100 ? 'green' : 'blue'
                          }
                          aria-label={
                            isLoading
                              ? profileT.actions?.saving || 'Sauvegarde...'
                              : completionPercentage === 100
                                ? `${profileT.actions?.save || 'Sauvegarder'} - Profil complet`
                                : profileT.actions?.save || 'Sauvegarder'
                          }
                          style={{
                            backgroundColor:
                              completionPercentage === 100
                                ? colorScheme === 'dark'
                                  ? theme.colors.green[9]
                                  : theme.colors.green[6]
                                : colorScheme === 'dark'
                                  ? theme.colors.blue[9]
                                  : theme.colors.blue[6],
                            color: 'white',
                            fontWeight: 600,
                          }}
                        >
                          {isLoading
                            ? profileT.actions?.saving || 'Sauvegarde...'
                            : completionPercentage === 100
                              ? `${profileT.actions?.save || 'Sauvegarder'} ✓`
                              : profileT.actions?.save || 'Sauvegarder'}
                        </Button>
                      </Group>

                      {/* Enhanced unsaved changes indicator */}
                      <Transition
                        mounted={isDirty && !isLoading}
                        transition="slide-up"
                        duration={300}
                      >
                        {(styles) => (
                          <div style={styles} role="alert" aria-live="polite">
                            <Alert
                              variant="light"
                              color="yellow"
                              icon={<IconClock size={16} />}
                              title={
                                profileT.unsavedChanges?.title ||
                                'Modifications non sauvegardées'
                              }
                              style={{
                                backgroundColor:
                                  colorScheme === 'dark'
                                    ? theme.colors.yellow[9]
                                    : theme.colors.yellow[1],
                                borderColor:
                                  colorScheme === 'dark'
                                    ? theme.colors.yellow[7]
                                    : theme.colors.yellow[4],
                              }}
                            >
                              <Text
                                size="sm"
                                style={{ color: textColors.secondary }}
                              >
                                {profileT.unsavedChanges?.message ||
                                  'Vous avez des modifications non sauvegardées.'}
                              </Text>
                              <Group gap="sm" mt="sm">
                                <Button
                                  size="xs"
                                  variant="filled"
                                  color="yellow"
                                  leftSection={<IconDeviceFloppy size={14} />}
                                  onClick={form.handleSubmit(handleSubmit)}
                                >
                                  {profileT.unsavedChanges?.saveNow ||
                                    'Sauvegarder maintenant'}
                                </Button>
                                <Button
                                  size="xs"
                                  variant="outline"
                                  color="gray"
                                  leftSection={<IconTrash size={14} />}
                                  onClick={() => form.reset()}
                                >
                                  {profileT.unsavedChanges?.discard ||
                                    'Annuler les modifications'}
                                </Button>
                              </Group>
                            </Alert>
                          </div>
                        )}
                      </Transition>

                      {/* Form Status Summary */}
                      <Card
                        p="sm"
                        radius="md"
                        style={{
                          backgroundColor:
                            colorScheme === 'dark'
                              ? theme.colors.gray[8]
                              : theme.colors.gray[1],
                          border: `1px solid ${
                            colorScheme === 'dark'
                              ? theme.colors.gray[7]
                              : theme.colors.gray[3]
                          }`,
                        }}
                      >
                        <Group justify="space-between" wrap="wrap">
                          <Text
                            size="sm"
                            style={{ color: textColors.secondary }}
                          >
                            {(
                              profileT.progress?.remaining ||
                              '{{count}} champs restants'
                            ).replace(
                              '{{count}}',
                              String(formFields.length - completedFields)
                            )}
                          </Text>
                          <Text
                            size="sm"
                            style={{ color: textColors.secondary }}
                          >
                            {Object.keys(errors).length > 0
                              ? (
                                  profileT.validation?.errorsFound ||
                                  '{{count}} erreurs trouvées'
                                ).replace(
                                  '{{count}}',
                                  String(Object.keys(errors).length)
                                )
                              : profileT.validation?.allValid ||
                                'Formulaire valide'}
                          </Text>
                        </Group>
                      </Card>
                    </Stack>
                  </Card>
                </Stack>
              </form>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </Box>
  );
};

export default ProfileForm;
