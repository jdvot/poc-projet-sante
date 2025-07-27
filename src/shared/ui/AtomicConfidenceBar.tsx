'use client';

import React from 'react';
import {
  Progress,
  Text,
  Group,
  Box,
  useMantineColorScheme,
  Stack,
} from '@mantine/core';
import { ConfidenceBarProps } from '../types/ai-doctor';

export const AtomicConfidenceBar: React.FC<ConfidenceBarProps> = ({
  confidence,
  variant = 'default',
  size = 'md',
  showLabel = true,
  showValue = true,
  showPercentage = true,
  color,
  animated = false,
  className,
  style,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  // Calcul du pourcentage
  const percentage = Math.min(Math.max(confidence * 100, 0), 100);

  // Configuration des tailles
  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return {
          height: 6,
          fontSize: 'xs',
          spacing: 'xs',
        };
      case 'lg':
        return {
          height: 12,
          fontSize: 'md',
          spacing: 'md',
        };
      default:
        return {
          height: 8,
          fontSize: 'sm',
          spacing: 'sm',
        };
    }
  };

  // Configuration des variants
  const getVariantConfig = () => {
    const confidenceColor = color || getConfidenceColor(percentage);
    const isDark = colorScheme === 'dark';

    switch (variant) {
      case 'gradient':
        return {
          variant: 'gradient' as const,
          gradient: {
            from: `var(--mantine-color-${confidenceColor}-6)`,
            to: `var(--mantine-color-${confidenceColor}-8)`,
            deg: 45,
          },
          style: {
            backgroundColor: isDark
              ? `var(--mantine-color-${confidenceColor}-9)`
              : `var(--mantine-color-${confidenceColor}-0)`,
          },
        };
      case 'animated':
        return {
          variant: 'default' as const,
          color: confidenceColor,
          animated: true,
          striped: true,
          style: {
            backgroundColor: isDark
              ? `var(--mantine-color-${confidenceColor}-9)`
              : `var(--mantine-color-${confidenceColor}-0)`,
          },
        };
      default:
        return {
          variant: 'default' as const,
          color: confidenceColor,
          style: {
            backgroundColor: isDark
              ? `var(--mantine-color-${confidenceColor}-9)`
              : `var(--mantine-color-${confidenceColor}-0)`,
          },
        };
    }
  };

  // Couleur selon le niveau de confiance
  const getConfidenceColor = (percentage: number) => {
    if (percentage >= 90) return 'green';
    if (percentage >= 70) return 'blue';
    if (percentage >= 50) return 'yellow';
    if (percentage >= 30) return 'orange';
    return 'red';
  };

  // Label de confiance
  const getConfidenceLabel = (percentage: number) => {
    if (percentage >= 90) return 'Très élevée';
    if (percentage >= 70) return 'Élevée';
    if (percentage >= 50) return 'Modérée';
    if (percentage >= 30) return 'Faible';
    return 'Très faible';
  };

  const sizeConfig = getSizeConfig();
  const variantConfig = getVariantConfig();

  return (
    <Box className={className} style={style}>
      <Stack gap={sizeConfig.spacing}>
        {/* Label et valeur */}
        {(showLabel || showValue) && (
          <Group justify="space-between" gap={sizeConfig.spacing}>
            {showLabel && (
              <Text size={sizeConfig.fontSize} c="dimmed">
                Confiance de l&apos;IA
              </Text>
            )}
            {showValue && (
              <Group gap="xs">
                {showPercentage && (
                  <Text size={sizeConfig.fontSize} fw={500}>
                    {Math.round(percentage)}%
                  </Text>
                )}
                <Text size={sizeConfig.fontSize} c="dimmed">
                  - {getConfidenceLabel(percentage)}
                </Text>
              </Group>
            )}
          </Group>
        )}

        {/* Barre de progression */}
        <Progress
          value={percentage}
          size={sizeConfig.height}
          variant={variantConfig.variant}
          color={variantConfig.color}
          animated={animated || variant === 'animated'}
          striped={variant === 'animated'}
          radius="xl"
          style={variantConfig.style}
        />
      </Stack>
    </Box>
  );
};
