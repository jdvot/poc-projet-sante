'use client';

import React, { ReactNode } from 'react';
import { Card, CardProps, Group, Text, Box, useMantineColorScheme } from '@mantine/core';

interface ModernCardProps extends Omit<CardProps, 'children'> {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  variant?: 'default' | 'gradient' | 'elevated' | 'glass';
  gradient?: { from: string; to: string };
}

export function ModernCard({
  children,
  title,
  subtitle,
  icon,
  variant = 'default',
  gradient,
  className,
  ...props
}: ModernCardProps) {
  const { colorScheme } = useMantineColorScheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        return {
          background: gradient 
            ? `linear-gradient(135deg, var(--mantine-color-${gradient.from}-50), var(--mantine-color-${gradient.to}-50))`
            : 'linear-gradient(135deg, var(--mantine-color-blue-50), var(--mantine-color-cyan-50))',
          border: `1px solid var(--mantine-color-${gradient?.from || 'blue'}-200)`,
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
        };
      case 'elevated':
        return {
          background: 'var(--mantine-color-body)',
          border: colorScheme === 'dark' 
            ? '1px solid var(--mantine-color-dark-4)' 
            : '1px solid var(--mantine-color-gray-200)',
          boxShadow: colorScheme === 'dark' 
            ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
            : '0 8px 32px rgba(0, 0, 0, 0.12)',
        };
      case 'glass':
        return {
          background: colorScheme === 'dark' 
            ? 'rgba(26, 27, 30, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)',
          border: colorScheme === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: colorScheme === 'dark' 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
        };
      default:
        return {
          background: 'var(--mantine-color-body)',
          border: colorScheme === 'dark' 
            ? '1px solid var(--mantine-color-dark-4)' 
            : '1px solid var(--mantine-color-gray-200)',
          boxShadow: colorScheme === 'dark' 
            ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
            : '0 2px 8px rgba(0, 0, 0, 0.05)',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Card
      className={`transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${className || ''}`}
      style={{
        ...styles,
        borderRadius: '1rem',
        overflow: 'hidden',
      }}
      {...props}
    >
      {(title || subtitle || icon) && (
        <Group justify="space-between" align="center" mb="md">
          <Box>
            {title && (
              <Text fw={600} size="lg" style={{ color: 'var(--mantine-color-text)' }}>
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
                padding: '0.5rem',
                background: colorScheme === 'dark' 
                  ? 'var(--mantine-color-blue-9)' 
                  : 'var(--mantine-color-blue-100)',
                borderRadius: '50%',
              }}
            >
              {icon}
            </Box>
          )}
        </Group>
      )}
      {children}
    </Card>
  );
} 