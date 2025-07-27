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
  const { getPaperStyle, getGradientStyle, spacing, radius } = useAppTheme();

  const getVariantStyle = () => {
    switch (variant) {
      case 'gradient':
        return getGradientStyle(gradientType);
      case 'elevated':
        return {
          ...getPaperStyle(),
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-1px)',
        };
      default:
        return getPaperStyle();
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
