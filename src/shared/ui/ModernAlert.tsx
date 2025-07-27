'use client';

import React, { ReactNode } from 'react';
import { Box, Text, Group, useMantineColorScheme } from '@mantine/core';

interface ModernAlertProps {
  children: ReactNode;
  title?: string;
  icon?: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'neutral';
  className?: string;
}

export function ModernAlert({
  children,
  title,
  icon,
  variant = 'info',
  className,
}: ModernAlertProps) {
  const { colorScheme } = useMantineColorScheme();

  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: '1rem',
      padding: '1rem',
      border: '1px solid',
      transition: 'all 0.3s ease',
    };

    switch (variant) {
      case 'success':
        return {
          ...baseStyles,
          background:
            colorScheme === 'dark'
              ? 'rgba(34, 197, 94, 0.1)'
              : 'rgba(34, 197, 94, 0.05)',
          borderColor:
            colorScheme === 'dark'
              ? 'rgba(34, 197, 94, 0.3)'
              : 'rgba(34, 197, 94, 0.2)',
          color: 'var(--mantine-color-green-6)',
        };
      case 'warning':
        return {
          ...baseStyles,
          background:
            colorScheme === 'dark'
              ? 'rgba(251, 191, 36, 0.1)'
              : 'rgba(251, 191, 36, 0.05)',
          borderColor:
            colorScheme === 'dark'
              ? 'rgba(251, 191, 36, 0.3)'
              : 'rgba(251, 191, 36, 0.2)',
          color: 'var(--mantine-color-yellow-6)',
        };
      case 'error':
        return {
          ...baseStyles,
          background:
            colorScheme === 'dark'
              ? 'rgba(239, 68, 68, 0.1)'
              : 'rgba(239, 68, 68, 0.05)',
          borderColor:
            colorScheme === 'dark'
              ? 'rgba(239, 68, 68, 0.3)'
              : 'rgba(239, 68, 68, 0.2)',
          color: 'var(--mantine-color-red-6)',
        };
      case 'neutral':
        return {
          ...baseStyles,
          background:
            colorScheme === 'dark'
              ? 'rgba(255, 255, 255, 0.02)'
              : 'rgba(0, 0, 0, 0.02)',
          borderColor:
            colorScheme === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)',
          color: 'var(--mantine-color-dimmed)',
        };
      default: // info
        return {
          ...baseStyles,
          background:
            colorScheme === 'dark'
              ? 'rgba(59, 130, 246, 0.1)'
              : 'rgba(59, 130, 246, 0.05)',
          borderColor:
            colorScheme === 'dark'
              ? 'rgba(59, 130, 246, 0.3)'
              : 'rgba(59, 130, 246, 0.2)',
          color: 'var(--mantine-color-blue-6)',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Box className={`hover:shadow-md ${className || ''}`} style={styles}>
      <Group gap="sm" align="flex-start">
        {icon && (
          <Box
            style={{
              padding: '0.25rem',
              borderRadius: '50%',
              background:
                colorScheme === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        )}

        <Box style={{ flex: 1 }}>
          {title && (
            <Text fw={600} size="sm" mb={4} style={{ color: styles.color }}>
              {title}
            </Text>
          )}
          <Text size="sm" style={{ color: 'var(--mantine-color-text)' }}>
            {children}
          </Text>
        </Box>
      </Group>
    </Box>
  );
}
