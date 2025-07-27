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
  const { getCardStyle, getGradientStyle, spacing, radius } = useAppTheme();

  const getVariantStyle = () => {
    switch (variant) {
      case 'gradient':
        return getGradientStyle(gradientType);
      case 'elevated':
        return {
          ...getCardStyle(),
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)',
        };
      default:
        return getCardStyle();
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
