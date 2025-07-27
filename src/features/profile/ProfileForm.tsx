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

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Hero Header Section */}
        <Card
          p="xl"
          radius="xl"
          withBorder
          style={{
            background:
              colorScheme === 'dark'
                ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
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
                  >
                    <IconUser size={24} />
                  </Box>
                  <Title order={1} size="h2" style={{ color: 'white' }}>
                    {profileT.title}
                  </Title>
                </Group>
                <Text size="lg" style={{ color: 'rgba(255,255,255,0.9)' }}>
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
                Profil Santé
              </Badge>
            </Group>

            {/* Enhanced Progress Bar */}
            <Card
              p="md"
              radius="lg"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <Group justify="space-between" mb="sm">
                <Group gap="xs">
                  <IconTarget size={18} />
                  <Text fw={600} style={{ color: 'white' }}>
                    Progression du profil
                  </Text>
                </Group>
                <Badge
                  variant="filled"
                  color={completionPercentage === 100 ? 'green' : 'blue'}
                  size="md"
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
              />
              <Text
                size="sm"
                style={{ color: 'rgba(255,255,255,0.8)' }}
                mt="xs"
              >
                {completedFields} sur {formFields.length} champs complétés
              </Text>
            </Card>
          </Stack>
        </Card>

        {/* Main Content Grid */}
        <Grid gutter="xl">
          {/* Left Column - User Info & Health Stats */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Stack gap="xl">
              {/* User Information Card */}
              <Card
                p="xl"
                radius="xl"
                withBorder
                shadow="sm"
                style={{
                  background:
                    colorScheme === 'dark'
                      ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                      : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                }}
              >
                <UserInfo user={user} />
              </Card>

              {/* Health Statistics Card */}
              <Card
                p="xl"
                radius="xl"
                withBorder
                shadow="sm"
                style={{
                  background:
                    colorScheme === 'dark'
                      ? 'linear-gradient(135deg, #0c4a6e 0%, #075985 100%)'
                      : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                }}
              >
                <HealthStats
                  height={Number(watchedValues.height) || 0}
                  weight={Number(watchedValues.weight) || 0}
                  age={Number(watchedValues.age) || 0}
                  gender={watchedValues.gender}
                />
              </Card>
            </Stack>
          </Grid.Col>

          {/* Right Column - Form */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card
              p="xl"
              radius="xl"
              withBorder
              shadow="sm"
              style={{
                background:
                  colorScheme === 'dark'
                    ? 'linear-gradient(135deg, #1a1b1e 0%, #25262b 100%)'
                    : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
              }}
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
                      <div style={styles}>
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
                  <Box>
                    <Group gap="sm" mb="lg">
                      <Box
                        p="xs"
                        style={{
                          background:
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '50%',
                        }}
                      >
                        <IconEdit size={20} style={{ color: 'white' }} />
                      </Box>
                      <Stack gap={4}>
                        <Title order={3} size="h4">
                          {profileT.personalInfo.title}
                        </Title>
                        <Text size="sm" c="dimmed">
                          {profileT.personalInfo.subtitle}
                        </Text>
                      </Stack>
                    </Group>

                    <Card
                      p="lg"
                      radius="lg"
                      withBorder
                      style={{
                        background:
                          colorScheme === 'dark' ? '#1a1b1e' : 'white',
                        border:
                          colorScheme === 'dark'
                            ? '1px solid #373a40'
                            : '1px solid #e2e8f0',
                      }}
                    >
                      <ProfileFormFields
                        control={form.control}
                        errors={errors}
                        isLoading={isLoading}
                      />
                    </Card>
                  </Box>

                  {/* Action Buttons Section */}
                  <Card
                    p="lg"
                    radius="lg"
                    withBorder
                    style={{
                      background:
                        colorScheme === 'dark'
                          ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    }}
                  >
                    <Stack gap="md">
                      {/* Status Indicators */}
                      <Group justify="space-between" wrap="wrap">
                        <Group gap="sm">
                          {isDirty && !isLoading && (
                            <Tooltip label="Vous avez des modifications non sauvegardées">
                              <Badge
                                variant="light"
                                color="yellow"
                                leftSection={<IconAlertCircle size={12} />}
                              >
                                Modifications en attente
                              </Badge>
                            </Tooltip>
                          )}
                        </Group>

                        {isLoading && (
                          <Group gap="xs">
                            <Loader size="sm" color="blue" />
                            <Text size="sm" c="dimmed">
                              Sauvegarde en cours...
                            </Text>
                          </Group>
                        )}
                      </Group>

                      {/* Action Buttons */}
                      <Group justify="space-between" wrap="wrap">
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          disabled={isLoading}
                          size="md"
                          leftSection={<IconX size={16} />}
                          radius="lg"
                          style={{
                            borderColor:
                              colorScheme === 'dark' ? '#475569' : '#cbd5e1',
                            color:
                              colorScheme === 'dark' ? '#94a3b8' : '#64748b',
                          }}
                        >
                          {profileT.actions.cancel}
                        </Button>

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
                          variant={
                            completionPercentage === 100 ? 'filled' : 'light'
                          }
                          color={
                            completionPercentage === 100 ? 'green' : 'blue'
                          }
                          style={{
                            background:
                              completionPercentage === 100
                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: 'white',
                            border: 'none',
                          }}
                        >
                          {isLoading
                            ? profileT.actions.saving
                            : completionPercentage === 100
                              ? `${profileT.actions.save} ✓`
                              : profileT.actions.save}
                        </Button>
                      </Group>

                      {/* Enhanced unsaved changes indicator */}
                      <Transition
                        mounted={isDirty && !isLoading}
                        transition="slide-up"
                        duration={300}
                      >
                        {(styles) => (
                          <div style={styles}>
                            <ModernAlert
                              variant="warning"
                              icon={<IconInfoCircle size={16} />}
                              title={profileT.unsavedChanges.title}
                            >
                              {profileT.unsavedChanges.message}
                            </ModernAlert>
                          </div>
                        )}
                      </Transition>
                    </Stack>
                  </Card>
                </Stack>
              </form>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};

export default ProfileForm;
