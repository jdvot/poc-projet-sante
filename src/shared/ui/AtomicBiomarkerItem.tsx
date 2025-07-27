'use client';

import React from 'react';
import {
  Group,
  Text,
  Box,
  Badge,
  Stack,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
  IconClock,
} from '@tabler/icons-react';
import { BiomarkerItemProps, BiomarkerData } from '../types/dashboard';

export const AtomicBiomarkerItem: React.FC<BiomarkerItemProps> = ({
  biomarker,
  showTrend = true,
  showLastUpdate = true,
  size = 'md',
  variant = 'default',
}) => {
  const { colorScheme } = useMantineColorScheme();

  // Configuration des tailles
  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return {
          fontSize: 'xs',
          iconSize: 14,
          spacing: 'xs',
          padding: 'xs',
        };
      case 'lg':
        return {
          fontSize: 'md',
          iconSize: 20,
          spacing: 'md',
          padding: 'md',
        };
      default:
        return {
          fontSize: 'sm',
          iconSize: 16,
          spacing: 'sm',
          padding: 'sm',
        };
    }
  };

  // Configuration des variants
  const getVariantConfig = () => {
    const isDark = colorScheme === 'dark';

    switch (variant) {
      case 'compact':
        return {
          layout: 'horizontal' as const,
          showDetails: false,
          style: {
            padding: 'var(--mantine-spacing-xs)',
            borderRadius: 'var(--mantine-radius-sm)',
            backgroundColor: isDark
              ? 'var(--mantine-color-dark-6)'
              : 'var(--mantine-color-gray-0)',
          },
        };
      case 'detailed':
        return {
          layout: 'vertical' as const,
          showDetails: true,
          style: {
            padding: 'var(--mantine-spacing-md)',
            borderRadius: 'var(--mantine-radius-md)',
            backgroundColor: isDark
              ? 'var(--mantine-color-dark-5)'
              : 'var(--mantine-color-gray-1)',
            border: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
          },
        };
      default:
        return {
          layout: 'horizontal' as const,
          showDetails: true,
          style: {
            padding: 'var(--mantine-spacing-sm)',
            borderRadius: 'var(--mantine-radius-sm)',
            backgroundColor: 'transparent',
          },
        };
    }
  };

  // Configuration des couleurs selon le statut
  const getStatusColor = (status: BiomarkerData['status']) => {
    switch (status) {
      case 'normal':
        return 'green';
      case 'elevated':
        return 'yellow';
      case 'high':
        return 'orange';
      case 'critical':
        return 'red';
      default:
        return 'blue';
    }
  };

  // Icône de tendance
  const getTrendIcon = (trend?: BiomarkerData['trend']) => {
    if (!trend) return null;

    const iconSize = getSizeConfig().iconSize;

    switch (trend) {
      case 'up':
        return (
          <IconTrendingUp size={iconSize} color="var(--mantine-color-red-6)" />
        );
      case 'down':
        return (
          <IconTrendingDown
            size={iconSize}
            color="var(--mantine-color-green-6)"
          />
        );
      case 'stable':
        return (
          <IconMinus size={iconSize} color="var(--mantine-color-gray-6)" />
        );
      default:
        return null;
    }
  };

  const sizeConfig = getSizeConfig();
  const variantConfig = getVariantConfig();
  const statusColor = getStatusColor(biomarker.status);

  if (variantConfig.layout === 'vertical') {
    return (
      <Box style={variantConfig.style}>
        <Stack gap={sizeConfig.spacing}>
          {/* En-tête avec nom et statut */}
          <Group justify="space-between" align="center">
            <Text size={sizeConfig.fontSize} fw={600}>
              {biomarker.name}
            </Text>
            <Badge
              variant="light"
              color={statusColor}
              size={size === 'sm' ? 'xs' : 'sm'}
            >
              {biomarker.status}
            </Badge>
          </Group>

          {/* Valeur et unité */}
          <Group gap="xs" align="baseline">
            <Text size={size === 'lg' ? 'xl' : 'lg'} fw={700}>
              {biomarker.value}
            </Text>
            <Text size={sizeConfig.fontSize} c="dimmed">
              {biomarker.unit}
            </Text>
            {showTrend && getTrendIcon(biomarker.trend)}
          </Group>

          {/* Détails supplémentaires */}
          {variantConfig.showDetails && (
            <Stack gap="xs">
              {biomarker.normalRange && (
                <Text size="xs" c="dimmed">
                  Normal: {biomarker.normalRange[0]} -{' '}
                  {biomarker.normalRange[1]} {biomarker.unit}
                </Text>
              )}
              {showLastUpdate && biomarker.lastUpdate && (
                <Group gap="xs" align="center">
                  <IconClock size={12} />
                  <Text size="xs" c="dimmed">
                    {biomarker.lastUpdate}
                  </Text>
                </Group>
              )}
            </Stack>
          )}
        </Stack>
      </Box>
    );
  }

  // Layout horizontal (par défaut et compact)
  return (
    <Box style={variantConfig.style}>
      <Group justify="space-between" align="center" gap={sizeConfig.spacing}>
        {/* Informations principales */}
        <Group gap={sizeConfig.spacing} align="center">
          <Box>
            <Text size={sizeConfig.fontSize} fw={500}>
              {biomarker.name}
            </Text>
            {variantConfig.showDetails && biomarker.normalRange && (
              <Text size="xs" c="dimmed">
                {biomarker.normalRange[0]} - {biomarker.normalRange[1]}{' '}
                {biomarker.unit}
              </Text>
            )}
          </Box>
        </Group>

        {/* Valeur et statut */}
        <Group gap="xs" align="center">
          <Text size={sizeConfig.fontSize} fw={600}>
            {biomarker.value} {biomarker.unit}
          </Text>
          <Badge
            variant="light"
            color={statusColor}
            size={size === 'sm' ? 'xs' : 'sm'}
          >
            {biomarker.status}
          </Badge>
          {showTrend && getTrendIcon(biomarker.trend)}
        </Group>

        {/* Dernière mise à jour */}
        {showLastUpdate &&
          biomarker.lastUpdate &&
          variantConfig.showDetails && (
            <Group gap="xs" align="center">
              <IconClock size={12} />
              <Text size="xs" c="dimmed">
                {biomarker.lastUpdate}
              </Text>
            </Group>
          )}
      </Group>
    </Box>
  );
};
