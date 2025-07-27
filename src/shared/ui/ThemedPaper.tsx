'use client';

import React from 'react';
import { Paper, PaperProps } from '@mantine/core';
import { useAppTheme } from '../hooks/useAppTheme';

interface ThemedPaperProps extends PaperProps {
  children?: React.ReactNode;
  variant?: 'default' | 'gradient' | 'elevated';
  gradientType?: 'primary' | 'secondary' | 'accent' | 'health' | 'medical';
}

export const ThemedPaper: React.FC<ThemedPaperProps> = ({
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
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-1px)',
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
    <Paper
      {...props}
      style={getVariantStyle()}
      p={spacing.card}
      radius={radius.card}
    >
      {children}
    </Paper>
  );
};
