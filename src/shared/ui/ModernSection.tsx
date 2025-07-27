'use client';

import React, { ReactNode } from 'react';
import { Box, Text, Group, useMantineColorScheme } from '@mantine/core';

interface ModernSectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  variant?: 'default' | 'highlighted' | 'subtle';
  className?: string;
}

export function ModernSection({
  children,
  title,
  subtitle,
  icon,
  variant = 'default',
  className,
}: ModernSectionProps) {
  const { colorScheme } = useMantineColorScheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'highlighted':
        return {
          background:
            colorScheme === 'dark'
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 197, 94, 0.1))'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(34, 197, 94, 0.05))',
          border: `1px solid ${
            colorScheme === 'dark'
              ? 'rgba(59, 130, 246, 0.2)'
              : 'rgba(59, 130, 246, 0.15)'
          }`,
          borderRadius: '1rem',
          padding: '1.5rem',
        };
      case 'subtle':
        return {
          background:
            colorScheme === 'dark'
              ? 'rgba(255, 255, 255, 0.02)'
              : 'rgba(0, 0, 0, 0.02)',
          border: `1px solid ${
            colorScheme === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.05)'
          }`,
          borderRadius: '0.75rem',
          padding: '1rem',
        };
      default:
        return {
          background: 'transparent',
          border: 'none',
          padding: '0',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Box
      className={`transition-all duration-300 ${className || ''}`}
      style={styles}
    >
      {(title || subtitle || icon) && (
        <Group justify="space-between" align="center" mb="lg">
          <Box>
            {title && (
              <Text
                fw={600}
                size="lg"
                style={{
                  color: 'var(--mantine-color-text)',
                  marginBottom: subtitle ? '0.25rem' : '0',
                }}
              >
                {title}
              </Text>
            )}
            {subtitle && (
              <Text size="sm" c="dimmed" className="font-medium">
                {subtitle}
              </Text>
            )}
          </Box>
          {icon && (
            <Box
              style={{
                padding: '0.75rem',
                background:
                  colorScheme === 'dark'
                    ? 'var(--mantine-color-blue-9)'
                    : 'var(--mantine-color-blue-100)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Box>
          )}
        </Group>
      )}
      {children}
    </Box>
  );
}
