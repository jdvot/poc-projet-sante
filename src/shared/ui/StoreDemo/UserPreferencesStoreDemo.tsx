"use client";

import React from 'react';
import { Card, Title, Group, Switch, Select, Stack, Text } from '@mantine/core';
import { useUserPreferencesStore } from '../../stores/userPreferencesStore';

export function UserPreferencesStoreDemo() {
  const { preferences, updatePreferences } = useUserPreferencesStore();

  const handleToggleEmailNotification = (enabled: boolean) => {
    updatePreferences({ 
      notifications: { 
        ...preferences.notifications, 
        email: enabled 
      } 
    });
  };

  const handleTogglePushNotification = (enabled: boolean) => {
    updatePreferences({ 
      notifications: { 
        ...preferences.notifications, 
        push: enabled 
      } 
    });
  };

  const handleToggleHighContrast = (enabled: boolean) => {
    updatePreferences({ 
      accessibility: { 
        ...preferences.accessibility, 
        highContrast: enabled 
      } 
    });
  };

  return (
    <Card 
      shadow="lg" 
      padding="xl" 
      radius="lg" 
      withBorder
      style={{
        background: 'var(--mantine-color-body)',
        border: '1px solid var(--mantine-color-gray-3)',
      }}
    >
      <Title order={3} mb="lg" style={{ color: 'var(--mantine-color-pink-6)' }}>
        User Preferences Store
      </Title>
      
      <Stack gap="md">
        <Group gap="lg" align="center" justify="space-between">
          <Text>Email Notifications</Text>
          <Switch
            checked={preferences.notifications.email}
            onChange={(event) => handleToggleEmailNotification(event.currentTarget.checked)}
            size="md"
          />
        </Group>
        
        <Group gap="lg" align="center" justify="space-between">
          <Text>Push Notifications</Text>
          <Switch
            checked={preferences.notifications.push}
            onChange={(event) => handleTogglePushNotification(event.currentTarget.checked)}
            size="md"
          />
        </Group>
        
        <Group gap="lg" align="center" justify="space-between">
          <Text>High Contrast</Text>
          <Switch
            checked={preferences.accessibility.highContrast}
            onChange={(event) => handleToggleHighContrast(event.currentTarget.checked)}
            size="md"
          />
        </Group>
      </Stack>
    </Card>
  );
} 