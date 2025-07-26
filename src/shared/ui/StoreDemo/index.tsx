"use client";

import React from 'react';
import { Stack, Title } from '@mantine/core';
import { AuthStoreDemo } from './AuthStoreDemo';
import { ProfileStoreDemo } from './ProfileStoreDemo';
import { ThemeStoreDemo } from './ThemeStoreDemo';
import { LanguageStoreDemo } from './LanguageStoreDemo';
import { UserPreferencesStoreDemo } from './UserPreferencesStoreDemo';
import DashboardDemo from './DashboardDemo';

export function StoreDemo() {
  return (
    <Stack gap="xl">
      <Title order={2} style={{ 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-purple-6))',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2rem',
        fontWeight: 700,
      }}>
        Zustand Stores Demo
      </Title>
      
      <AuthStoreDemo />
      <ProfileStoreDemo />
      <ThemeStoreDemo />
      <LanguageStoreDemo />
      <UserPreferencesStoreDemo />
      <DashboardDemo />
    </Stack>
  );
} 