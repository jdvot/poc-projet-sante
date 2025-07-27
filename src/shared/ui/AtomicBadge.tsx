'use client';

import React from 'react';
import { Badge, Group, Text, Box, useMantineColorScheme } from '@mantine/core';
import { AtomicBadgeProps, HealthStatus } from '../types/dashboard';

export const AtomicBadge: React.FC<AtomicBadgeProps> = ({
  label,
  status,
  variant = 'light',
  size = 'md',
  color,
  icon,
  rightSection,
  fullWidth = false,
  className,
  style,
}) => {
  const { colorScheme } = useMantineColorScheme();

  // Configuration des couleurs selon le statut
  const getStatusColor = (status?: HealthStatus) => {
    if (color) return color;

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

  // Configuration des variants
  const getVariantConfig = () => {
    const badgeColor = getStatusColor(status);
    const isDark = colorScheme === 'dark';

    switch (variant) {
      case 'filled':
        return {
          variant: 'filled' as const,
          color: badgeColor,
          style: {
            background: `var(--mantine-color-${badgeColor}-6)`,
            color: 'white',
            fontWeight: 600,
          },
        };
      case 'outline':
        return {
          variant: 'outline' as const,
          color: badgeColor,
          style: {
            borderColor: `var(--mantine-color-${badgeColor}-6)`,
            color: `var(--mantine-color-${badgeColor}-6)`,
            fontWeight: 500,
          },
        };
      case 'dot':
        return {
          variant: 'light' as const,
          color: badgeColor,
          style: {
            position: 'relative',
            paddingLeft: 'var(--mantine-spacing-md)',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 'var(--mantine-spacing-xs)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: `var(--mantine-color-${badgeColor}-6)`,
            },
          },
        };
      case 'gradient':
        return {
          variant: 'gradient' as const,
          gradient: {
            from: `var(--mantine-color-${badgeColor}-6)`,
            to: `var(--mantine-color-${badgeColor}-8)`,
            deg: 45,
          },
          style: {
            color: 'white',
            fontWeight: 600,
          },
        };
      default: // light
        return {
          variant: 'light' as const,
          color: badgeColor,
          style: {
            backgroundColor: isDark
              ? `var(--mantine-color-${badgeColor}-9)`
              : `var(--mantine-color-${badgeColor}-0)`,
            color: isDark
              ? `var(--mantine-color-${badgeColor}-1)`
              : `var(--mantine-color-${badgeColor}-7)`,
            fontWeight: 500,
          },
        };
    }
  };

  const variantConfig = getVariantConfig();

  return (
    <Badge
      className={className}
      style={{
        ...variantConfig.style,
        width: fullWidth ? '100%' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--mantine-spacing-xs)',
        transition: 'all 0.2s ease',
        ...style,
      }}
      variant={variantConfig.variant}
      color={variantConfig.color}
      size={size}
      fullWidth={fullWidth}
      {...(variantConfig.gradient && { gradient: variantConfig.gradient })}
    >
      <Group gap="xs" align="center" wrap="nowrap">
        {icon && (
          <Box style={{ display: 'flex', alignItems: 'center' }}>{icon}</Box>
        )}
        <Text size={size} style={{ fontWeight: 'inherit' }}>
          {label}
        </Text>
        {rightSection && (
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            {rightSection}
          </Box>
        )}
      </Group>
    </Badge>
  );
};
