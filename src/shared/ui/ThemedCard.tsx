'use client';

import React from 'react';
import { Card, CardProps } from '@mantine/core';
import { useAppTheme } from '../hooks/useAppTheme';

interface ThemedCardProps extends CardProps {
  variant?: 'default' | 'gradient' | 'elevated';
  gradientType?: 'primary' | 'secondary' | 'accent' | 'health' | 'medical';
}

export const ThemedCard: React.FC<ThemedCardProps> = ({
  children,
  variant = 'default',
  gradientType = 'primary',
  ...props
}) => {
  const { gradients, spacing, radius, isDark } = useAppTheme();

  const getVariantStyle = () => {
    const baseStyle = {
      borderRadius: radius.card,
      transition: 'all 0.2s ease',
    };

    switch (variant) {
      case 'gradient':
        return {
          ...baseStyle,
          background: gradients[gradientType],
          color: 'white',
        };
      case 'elevated':
        return {
          ...baseStyle,
          background: isDark ? 'var(--mantine-color-dark-7)' : 'white',
          border: isDark
            ? '1px solid var(--mantine-color-dark-4)'
            : '1px solid var(--mantine-color-gray-3)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)',
        };
      default:
        return {
          ...baseStyle,
          background: isDark ? 'var(--mantine-color-dark-7)' : 'white',
          border: isDark
            ? '1px solid var(--mantine-color-dark-4)'
            : '1px solid var(--mantine-color-gray-3)',
          boxShadow: 'var(--mantine-shadow-sm)',
        };
    }
  };

  return (
    <Card
      {...props}
      style={getVariantStyle()}
      p={spacing.card}
      radius={radius.card}
    >
      {children}
    </Card>
  );
};
