'use client';

import React from 'react';
import {
  Alert,
  Text,
  Group,
  Box,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { AtomicAlertProps } from '../types/dashboard';

export const AtomicAlert: React.FC<AtomicAlertProps> = ({
  title,
  message,
  type = 'info',
  variant = 'light',
  icon,
  closable = false,
  onClose,
  className,
  style,
}) => {
  const { colorScheme } = useMantineColorScheme();

  // Configuration des couleurs selon le type
  const getAlertColor = () => {
    switch (type) {
      case 'success':
        return 'green';
      case 'warning':
        return 'yellow';
      case 'error':
        return 'red';
      default:
        return 'blue';
    }
  };

  // Configuration des variants
  const getVariantConfig = () => {
    const alertColor = getAlertColor();
    const isDark = colorScheme === 'dark';

    switch (variant) {
      case 'filled':
        return {
          variant: 'filled' as const,
          color: alertColor,
          style: {
            background: `var(--mantine-color-${alertColor}-6)`,
            color: 'white',
            border: 'none',
          },
        };
      case 'outline':
        return {
          variant: 'outline' as const,
          color: alertColor,
          style: {
            borderColor: `var(--mantine-color-${alertColor}-6)`,
            color: `var(--mantine-color-${alertColor}-6)`,
            background: 'transparent',
          },
        };
      default: // light
        return {
          variant: 'light' as const,
          color: alertColor,
          style: {
            backgroundColor: isDark
              ? `var(--mantine-color-${alertColor}-9)`
              : `var(--mantine-color-${alertColor}-0)`,
            color: isDark
              ? `var(--mantine-color-${alertColor}-1)`
              : `var(--mantine-color-${alertColor}-7)`,
            borderColor: isDark
              ? `var(--mantine-color-${alertColor}-8)`
              : `var(--mantine-color-${alertColor}-3)`,
          },
        };
    }
  };

  const variantConfig = getVariantConfig();

  return (
    <Alert
      className={className}
      style={{
        ...variantConfig.style,
        transition: 'all 0.2s ease',
        ...style,
      }}
      variant={variantConfig.variant}
      color={variantConfig.color}
      icon={icon}
      title={title}
      withCloseButton={closable}
      onClose={onClose}
    >
      <Box>
        {message && (
          <Text size="sm" style={{ color: 'inherit' }}>
            {message}
          </Text>
        )}

        {closable && onClose && (
          <ActionIcon
            variant="subtle"
            color={getAlertColor()}
            size="sm"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 'var(--mantine-spacing-xs)',
              right: 'var(--mantine-spacing-xs)',
            }}
          >
            <IconX size={16} />
          </ActionIcon>
        )}
      </Box>
    </Alert>
  );
};
