import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import {
  useUserPreferencesStore,
  UserPreferences,
} from '../../../shared/stores/userPreferencesStore';
import { useLanguageStore } from '../../../shared/stores/languageStore';
import { useNotificationStore } from '../../../shared/stores/notificationStore';
import { useTranslation } from 'react-i18next';

// Validation schema for settings form
const settingsSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }),
  privacy: z.object({
    shareData: z.boolean(),
    analytics: z.boolean(),
  }),
  accessibility: z.object({
    fontSize: z.enum(['small', 'medium', 'large']),
    highContrast: z.boolean(),
    reducedMotion: z.boolean(),
  }),
  units: z.object({
    weight: z.enum(['kg', 'lbs']),
    height: z.enum(['cm', 'ft']),
    temperature: z.enum(['celsius', 'fahrenheit']),
  }),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;

export const useSettings = () => {
  const { preferences, updatePreferences, resetPreferences } =
    useUserPreferencesStore();
  const { language } = useLanguageStore();
  const { showNotification } = useNotificationStore();
  const { t } = useTranslation();
  const [hasChanges, setHasChanges] = useState(false);

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: preferences,
  });

  const watchedValues = form.watch();

  // Enhanced change detection
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === 'change') {
        const isDirty = form.formState.isDirty;
        const hasFormChanges =
          JSON.stringify(value) !== JSON.stringify(preferences);
        const newHasChanges = isDirty || hasFormChanges;
        setHasChanges(newHasChanges);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, preferences]);

  // Force check for changes when preferences change
  useEffect(() => {
    const currentValues = form.getValues();
    const hasFormChanges =
      JSON.stringify(currentValues) !== JSON.stringify(preferences);
    const isDirty = form.formState.isDirty;
    const newHasChanges = isDirty || hasFormChanges;
    setHasChanges(newHasChanges);
  }, [preferences, form]);

  // Use both form state and our custom detection
  const hasUnsavedChanges = form.formState.isDirty || hasChanges;

  const handleSaveSettings = (data: SettingsFormData) => {
    try {
      // Get current preferences to detect what changed
      const currentPreferences = preferences;
      const changedSettings: string[] = [];

      // Check for changes in each section
      Object.entries(data).forEach(([section, sectionData]) => {
        Object.entries(sectionData).forEach(([key, value]) => {
          const currentSection = currentPreferences[
            section as keyof UserPreferences
          ] as any;
          if (currentSection && currentSection[key] !== value) {
            changedSettings.push(`${section}.${key}`);
          }
        });
      });

      // Update preferences
      updatePreferences(data);
      form.reset(data);
      setHasChanges(false);

      // Show success notification with details about what changed
      const changeCount = changedSettings.length;
      const changeText =
        changeCount === 1
          ? t(
              'settings.notifications.saved.singleChange',
              '1 paramètre modifié'
            )
          : t(
              'settings.notifications.saved.multipleChanges',
              '{{count}} paramètres modifiés',
              { count: changeCount }
            );

      showNotification({
        type: 'success',
        title: t(
          'settings.notifications.saved.title',
          'Paramètres sauvegardés'
        ),
        message: t(
          'settings.notifications.saved.message',
          'Vos paramètres ont été sauvegardés avec succès. {{changes}}',
          { changes: changeText }
        ),
        duration: 4000,
      });

      // Log changes for debugging
      console.log('Settings saved:', { changedSettings, changeCount });
    } catch (error) {
      showNotification({
        type: 'error',
        title: t('settings.notifications.error.title', 'Erreur de sauvegarde'),
        message: t(
          'settings.notifications.error.message',
          'Une erreur est survenue lors de la sauvegarde de vos paramètres.'
        ),
        duration: 6000,
      });
    }
  };

  const handleResetSettings = () => {
    try {
      resetPreferences();
      form.reset(preferences);
      setHasChanges(false);

      showNotification({
        type: 'warning',
        title: t(
          'settings.notifications.reset.title',
          'Paramètres réinitialisés'
        ),
        message: t(
          'settings.notifications.reset.message',
          'Tous vos paramètres ont été réinitialisés aux valeurs par défaut.'
        ),
        duration: 5000,
      });
    } catch (error) {
      showNotification({
        type: 'error',
        title: t(
          'settings.notifications.error.title',
          'Erreur de réinitialisation'
        ),
        message: t(
          'settings.notifications.error.message',
          'Une erreur est survenue lors de la réinitialisation de vos paramètres.'
        ),
        duration: 6000,
      });
    }
  };

  const handleDiscardChanges = () => {
    form.reset(preferences);
    setHasChanges(false);

    showNotification({
      type: 'info',
      title: t(
        'settings.notifications.discarded.title',
        'Modifications annulées'
      ),
      message: t(
        'settings.notifications.discarded.message',
        'Vos modifications ont été annulées.'
      ),
      duration: 3000,
    });
  };

  const handleSettingChange = (
    settingType: string,
    settingName: string,
    value: any
  ) => {
    // Force update hasChanges when a setting is manually changed
    setHasChanges(true);

    // Show notification for specific setting changes
    const settingLabels: Record<string, Record<string, string>> = {
      notifications: {
        email: t('settings.notifications.email', 'Notifications par email'),
        push: t('settings.notifications.push', 'Notifications push'),
        sms: t('settings.notifications.sms', 'Notifications SMS'),
      },
      privacy: {
        shareData: t('settings.privacy.shareData', 'Partager les données'),
        analytics: t('settings.privacy.analytics', 'Analytics'),
      },
      accessibility: {
        fontSize: t('settings.accessibility.fontSize', 'Taille de police'),
        highContrast: t(
          'settings.accessibility.highContrast',
          'Contraste élevé'
        ),
        reducedMotion: t(
          'settings.accessibility.reducedMotion',
          'Mouvement réduit'
        ),
      },
      units: {
        weight: t('settings.units.weight', 'Poids'),
        height: t('settings.units.height', 'Taille'),
        temperature: t('settings.units.temperature', 'Température'),
      },
    };

    const settingLabel =
      settingLabels[settingType]?.[settingName] || settingName;
    const action = value ? 'activé' : 'désactivé';

    showNotification({
      type: 'info',
      title: t(
        'settings.notifications.settingChanged.title',
        'Paramètre modifié'
      ),
      message: t(
        'settings.notifications.settingChanged.message',
        '{{setting}} a été {{action}}.',
        {
          setting: settingLabel,
          action: action,
        }
      ),
      duration: 2000,
    });
  };

  const getActiveNotificationsCount = () => {
    return Object.values(watchedValues.notifications).filter(Boolean).length;
  };

  return {
    form,
    watchedValues,
    language,
    handleSaveSettings,
    handleResetSettings,
    handleDiscardChanges,
    handleSettingChange,
    getActiveNotificationsCount,
    hasUnsavedChanges,
  };
};
