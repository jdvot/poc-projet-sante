'use client';

import React from 'react';
import {
  Progress,
  Text,
  Group,
  Box,
  useMantineColorScheme,
} from '@mantine/core';
import { AtomicProgressProps } from '../types/dashboard';

export const AtomicProgress: React.FC<AtomicProgressProps> = ({
  value,
  max = 100,
  label,
  size = 'md',
  variant = 'default',
  color,
  showValue = true,
  animated = false,
  className,
  style,
}) => {
  const { colorScheme } = useMantineColorScheme();

  // Calcul du pourcentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Configuration des couleurs selon la valeur
  const getProgressColor = () => {
    if (color) return color;

    if (percentage >= 80) return 'green';
    if (percentage >= 60) return 'blue';
    if (percentage >= 40) return 'yellow';
    if (percentage >= 20) return 'orange';
    return 'red';
  };

  // Configuration des variants
  const getVariantConfig = () => {
    const progressColor = getProgressColor();
    const isDark = colorScheme === 'dark';

    switch (variant) {
      case 'gradient':
        return {
          variant: 'gradient' as const,
          gradient: {
            from: `var(--mantine-color-${progressColor}-6)`,
            to: `var(--mantine-color-${progressColor}-8)`,
            deg: 45,
          },
          style: {
            backgroundColor: isDark
              ? `var(--mantine-color-${progressColor}-9)`
              : `var(--mantine-color-${progressColor}-0)`,
          },
        };
      case 'striped':
        return {
          variant: 'striped' as const,
          color: progressColor,
          style: {
            backgroundColor: isDark
              ? `var(--mantine-color-${progressColor}-9)`
              : `var(--mantine-color-${progressColor}-0)`,
          },
        };
      default:
        return {
          variant: 'default' as const,
          color: progressColor,
          style: {
            backgroundColor: isDark
              ? `var(--mantine-color-${progressColor}-9)`
              : `var(--mantine-color-${progressColor}-0)`,
          },
        };
    }
  };

  // Configuration des tailles
  const getSizeConfig = () => {
    switch (size) {
      case 'xs':
        return {
          height: 4,
          fontSize: 'xs',
          spacing: 'xs',
        };
      case 'sm':
        return {
          height: 6,
          fontSize: 'sm',
          spacing: 'sm',
        };
      case 'lg':
        return {
          height: 12,
          fontSize: 'md',
          spacing: 'md',
        };
      case 'xl':
        return {
          height: 16,
          fontSize: 'lg',
          spacing: 'lg',
        };
      default:
        return {
          height: 8,
          fontSize: 'sm',
          spacing: 'sm',
        };
    }
  };

  const variantConfig = getVariantConfig();
  const sizeConfig = getSizeConfig();

  return (
    <Box className={className} style={style}>
      <Group justify="space-between" gap={sizeConfig.spacing}>
        {label && (
          <Text size={sizeConfig.fontSize} fw={500}>
            {label}
          </Text>
        )}
        {showValue && (
          <Text size={sizeConfig.fontSize} c="dimmed">
            {Math.round(percentage)}%
          </Text>
        )}
      </Group>

      <Progress
        value={percentage}
        size={sizeConfig.height}
        variant={variantConfig.variant}
        color={variantConfig.color}
        striped={variant === 'striped'}
        animated={animated || variant === 'striped'}
        style={{
          ...variantConfig.style,
          marginTop: label || showValue ? 'var(--mantine-spacing-xs)' : 0,
        }}
      />
    </Box>
  );
};
