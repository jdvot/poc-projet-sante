'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Title, Grid } from '@mantine/core';
import {
  IconDashboard,
  IconRobot,
  IconUser,
  IconSettings,
} from '@tabler/icons-react';
import { FeatureCard } from './FeatureCard';

interface FeaturesGridProps {
  colorScheme: 'light' | 'dark' | 'auto';
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ colorScheme }) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <IconDashboard size={30} />,
      title: t('home.features.dashboard.title'),
      description: t('home.features.dashboard.description'),
      href: '/dashboard',
      color: 'blue',
    },
    {
      icon: <IconRobot size={30} />,
      title: t('home.features.aiDoctor.title'),
      description: t('home.features.aiDoctor.description'),
      href: '/ai-doctor',
      color: 'green',
    },
    {
      icon: <IconUser size={30} />,
      title: t('home.features.profile.title'),
      description: t('home.features.profile.description'),
      href: '/profile',
      color: 'orange',
    },
    {
      icon: <IconSettings size={30} />,
      title: t('home.features.settings.title'),
      description: t('home.features.settings.description'),
      href: '/settings',
      color: 'grape',
    },
  ];

  return (
    <Box>
      <Title
        order={2}
        ta="center"
        mb="xl"
        style={{ color: 'var(--mantine-color-text)' }}
      >
        {t('home.mainFeatures')}
      </Title>
      <Grid>
        {features.map((feature) => (
          <Grid.Col key={feature.href} span={{ base: 12, sm: 6, lg: 3 }}>
            <FeatureCard {...feature} colorScheme={colorScheme} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};
