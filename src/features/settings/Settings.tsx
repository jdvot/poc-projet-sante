'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Title,
  Card,
  Text,
  Stack,
  Button,
  Switch,
  Select,
  Divider,
  Group,
  Badge,
  Alert,
  Box,
  Grid,
  Paper,
  Affix,
  Transition,
} from '@mantine/core';
import {
  IconSettings,
  IconBell,
  IconShield,
  IconAccessible,
  IconRuler,
  IconCheck,
  IconDeviceFloppy,
} from '@tabler/icons-react';
import { ThemeSwitcher } from '../../shared/ui/ThemeSwitcher';
import { LanguageSwitcher } from '../../shared/ui/LanguageSwitcher';
import { useNotificationStore } from '../../shared/stores/notificationStore';
import { useSettings } from './hooks/useSettings';
import { UnitConversionDemo } from '../../shared/ui/UnitConversionDemo';

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  icon,
  children,
}) => (
  <Card withBorder p="xl" radius="md" h="100%">
    <Stack gap="lg" h="100%">
      <Group gap="md">
        <Box c="blue">{icon}</Box>
        <Box>
          <Text size="lg" fw={600}>
            {title}
          </Text>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </Box>
      </Group>
      <Divider />
      <Box style={{ flex: 1 }}>{children}</Box>
    </Stack>
  </Card>
);

const Settings = () => {
  const { t } = useTranslation();
  const {
    form,
    watchedValues,
    language,
    handleSaveSettings,
    handleResetSettings,
    handleDiscardChanges,
    handleSettingChange,
    getActiveNotificationsCount,
    hasUnsavedChanges,
  } = useSettings();

  const { register, handleSubmit, setValue } = form;

  return (
    <Box p="xl" style={{ minHeight: '100vh', width: '100%' }}>
      <Stack gap="xl" style={{ width: '100%' }}>
        {/* Header */}
        <Stack gap="md" style={{ width: '100%' }}>
          {/* Title and Controls Row */}
          <Group justify="space-between" align="center" wrap="nowrap">
            <Group gap="sm" wrap="nowrap" style={{ minWidth: 0, flex: 1 }}>
              <IconSettings size={28} style={{ flexShrink: 0 }} />
              <Title
                order={1}
                style={{ lineHeight: 1.2, wordBreak: 'keep-all' }}
              >
                {t('settings.title')}
              </Title>
            </Group>
            <Group gap="sm" style={{ flexShrink: 0 }}>
              <LanguageSwitcher />
              <ThemeSwitcher />
            </Group>
          </Group>
          {/* Description */}
          <Text c="dimmed" size="sm" style={{ maxWidth: '600px' }}>
            {t('settings.description')}
          </Text>
        </Stack>

        {/* Form */}
        <form
          id="settings-form"
          onSubmit={handleSubmit(handleSaveSettings)}
          style={{ width: '100%' }}
        >
          <Stack gap="xl" style={{ width: '100%' }}>
            {/* Main Settings Grid */}
            <Grid gutter="xl" style={{ width: '100%' }}>
              {/* Notifications Section */}
              <Grid.Col span={{ base: 12, lg: 6 }}>
                <SettingsSection
                  title={t('settings.notifications.title')}
                  description={t('settings.notifications.description')}
                  icon={<IconBell size={24} />}
                >
                  <Stack gap="lg">
                    <Switch
                      label={t('settings.notifications.email')}
                      description={t('settings.notifications.emailDesc')}
                      {...register('notifications.email')}
                      checked={watchedValues.notifications.email}
                      onChange={(e) => {
                        const checked = e.currentTarget.checked;
                        setValue('notifications.email', checked);
                        handleSettingChange('notifications', 'email', checked);
                      }}
                    />
                    <Switch
                      label={t(
                        'settings.notifications.push',
                        'Notifications push'
                      )}
                      description={t(
                        'settings.notifications.pushDesc',
                        'Recevoir des notifications push'
                      )}
                      {...register('notifications.push')}
                      checked={watchedValues.notifications.push}
                      onChange={(e) => {
                        const checked = e.currentTarget.checked;
                        setValue('notifications.push', checked);
                        handleSettingChange('notifications', 'push', checked);
                      }}
                    />
                    <Switch
                      label={t('settings.notifications.sms')}
                      description={t('settings.notifications.smsDesc')}
                      {...register('notifications.sms')}
                      checked={watchedValues.notifications.sms}
                      onChange={(e) => {
                        const checked = e.currentTarget.checked;
                        setValue('notifications.sms', checked);
                        handleSettingChange('notifications', 'sms', checked);
                      }}
                    />
                  </Stack>
                </SettingsSection>
              </Grid.Col>

              {/* Privacy Section */}
              <Grid.Col span={{ base: 12, lg: 6 }}>
                <SettingsSection
                  title={t('settings.privacy.title')}
                  description={t('settings.privacy.description')}
                  icon={<IconShield size={24} />}
                >
                  <Stack gap="lg">
                    <Switch
                      label={t('settings.privacy.shareData')}
                      description={t('settings.privacy.shareDataDesc')}
                      {...register('privacy.shareData')}
                      checked={watchedValues.privacy.shareData}
                      onChange={(e) => {
                        const checked = e.currentTarget.checked;
                        setValue('privacy.shareData', checked);
                        handleSettingChange('privacy', 'shareData', checked);
                      }}
                    />
                    <Switch
                      label={t('settings.privacy.analytics')}
                      description={t('settings.privacy.analyticsDesc')}
                      {...register('privacy.analytics')}
                      checked={watchedValues.privacy.analytics}
                      onChange={(e) => {
                        const checked = e.currentTarget.checked;
                        setValue('privacy.analytics', checked);
                        handleSettingChange('privacy', 'analytics', checked);
                      }}
                    />
                  </Stack>
                </SettingsSection>
              </Grid.Col>

              {/* Accessibility Section */}
              <Grid.Col span={{ base: 12, lg: 6 }}>
                <SettingsSection
                  title={t('settings.accessibility.title')}
                  description={t('settings.accessibility.description')}
                  icon={<IconAccessible size={24} />}
                >
                  <Stack gap="lg">
                    <Select
                      label={t('settings.accessibility.fontSize')}
                      description={t('settings.accessibility.fontSizeDesc')}
                      data={[
                        {
                          value: 'small',
                          label: t('settings.accessibility.small'),
                        },
                        {
                          value: 'medium',
                          label: t('settings.accessibility.medium'),
                        },
                        {
                          value: 'large',
                          label: t('settings.accessibility.large'),
                        },
                      ]}
                      value={watchedValues.accessibility.fontSize}
                      onChange={(value) => {
                        const fontSize = value as 'small' | 'medium' | 'large';
                        setValue('accessibility.fontSize', fontSize);
                        handleSettingChange(
                          'accessibility',
                          'fontSize',
                          fontSize
                        );
                      }}
                    />
                    <Switch
                      label={t('settings.accessibility.highContrast')}
                      description={t('settings.accessibility.highContrastDesc')}
                      {...register('accessibility.highContrast')}
                      checked={watchedValues.accessibility.highContrast}
                      onChange={(e) => {
                        const checked = e.currentTarget.checked;
                        setValue('accessibility.highContrast', checked);
                        handleSettingChange(
                          'accessibility',
                          'highContrast',
                          checked
                        );
                      }}
                    />
                    <Switch
                      label={t('settings.accessibility.reducedMotion')}
                      description={t(
                        'settings.accessibility.reducedMotionDesc'
                      )}
                      {...register('accessibility.reducedMotion')}
                      checked={watchedValues.accessibility.reducedMotion}
                      onChange={(e) => {
                        const checked = e.currentTarget.checked;
                        setValue('accessibility.reducedMotion', checked);
                        handleSettingChange(
                          'accessibility',
                          'reducedMotion',
                          checked
                        );
                      }}
                    />
                  </Stack>
                </SettingsSection>
              </Grid.Col>

              {/* Units Section */}
              <Grid.Col span={{ base: 12, lg: 6 }}>
                <SettingsSection
                  title={t('settings.units.title')}
                  description={t('settings.units.description')}
                  icon={<IconRuler size={24} />}
                >
                  <Stack gap="lg">
                    <Select
                      label={t('settings.units.weight')}
                      description={t('settings.units.weightDesc')}
                      data={[
                        { value: 'kg', label: 'Kilogrammes (kg)' },
                        { value: 'lbs', label: 'Livres (lbs)' },
                      ]}
                      value={watchedValues.units.weight}
                      onChange={(value) => {
                        const weight = value as 'kg' | 'lbs';
                        setValue('units.weight', weight);
                        handleSettingChange('units', 'weight', weight);
                      }}
                    />
                    <Select
                      label={t('settings.units.height')}
                      description={t('settings.units.heightDesc')}
                      data={[
                        { value: 'cm', label: 'Centimètres (cm)' },
                        { value: 'ft', label: 'Pieds (ft)' },
                      ]}
                      value={watchedValues.units.height}
                      onChange={(value) => {
                        const height = value as 'cm' | 'ft';
                        setValue('units.height', height);
                        handleSettingChange('units', 'height', height);
                      }}
                    />
                    <Select
                      label={t('settings.units.temperature')}
                      description={t('settings.units.temperatureDesc')}
                      data={[
                        { value: 'celsius', label: 'Celsius (°C)' },
                        { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
                      ]}
                      value={watchedValues.units.temperature}
                      onChange={(value) => {
                        const temperature = value as 'celsius' | 'fahrenheit';
                        setValue('units.temperature', temperature);
                        handleSettingChange(
                          'units',
                          'temperature',
                          temperature
                        );
                      }}
                    />
                  </Stack>
                </SettingsSection>
              </Grid.Col>
            </Grid>

            {/* Current Settings Summary */}
            <Paper withBorder p="md" radius="md">
              <Stack gap="sm">
                <Text size="sm" fw={600} c="dimmed">
                  {t('settings.currentSettings')}
                </Text>
                <Group gap="xs" wrap="wrap">
                  <Badge variant="light" color="blue">
                    {t('settings.language')}:{' '}
                    {language === 'fr' ? 'Français' : 'English'}
                  </Badge>
                  <Badge variant="light" color="green">
                    {t('settings.notifications.active')}:{' '}
                    {getActiveNotificationsCount()}
                  </Badge>
                  <Badge variant="light" color="orange">
                    {t('settings.units.weight')}:{' '}
                    {watchedValues.units.weight.toUpperCase()}
                  </Badge>
                </Group>
              </Stack>
            </Paper>

            {/* Unit Conversion Demo */}
            <UnitConversionDemo />

            {/* Action Buttons */}
            {hasUnsavedChanges && (
              <Alert
                variant="light"
                color="blue"
                icon={<IconCheck size={16} />}
              >
                <Text size="sm">{t('settings.changesDetected')}</Text>
              </Alert>
            )}

            <Group justify="space-between">
              <Group>
                {hasUnsavedChanges && (
                  <Button
                    variant="light"
                    color="gray"
                    onClick={handleDiscardChanges}
                  >
                    {t('settings.discard')}
                  </Button>
                )}
              </Group>
              <Button
                variant="outline"
                color="red"
                onClick={handleResetSettings}
              >
                {t('settings.reset')}
              </Button>
            </Group>
          </Stack>
        </form>

        {/* Floating Save Button - Bottom Right */}
        <Affix position={{ bottom: 20, right: 20 }} zIndex={1000}>
          <Transition
            mounted={hasUnsavedChanges}
            transition="slide-up"
            duration={400}
          >
            {(styles) => (
              <Button
                size="lg"
                variant="filled"
                color="green"
                leftSection={<IconDeviceFloppy size={20} />}
                style={{
                  ...styles,
                  borderRadius: '50px',
                  padding: '12px 24px',
                  boxShadow: '0 8px 25px rgba(34, 197, 94, 0.4)',
                  animation: hasUnsavedChanges ? 'pulse 2s infinite' : 'none',
                  zIndex: 1001,
                  position: 'fixed',
                  bottom: '20px',
                  right: '20px',
                }}
                onClick={() => {
                  // Trigger form submission
                  const form = document.getElementById(
                    'settings-form'
                  ) as HTMLFormElement;
                  if (form) {
                    form.requestSubmit();
                  }
                }}
              >
                {t('settings.saveChanges')}
              </Button>
            )}
          </Transition>
        </Affix>
      </Stack>
    </Box>
  );
};

export default Settings;
