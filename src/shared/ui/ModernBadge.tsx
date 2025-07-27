'use client';

import React, { ReactNode } from 'react';
import { Badge, BadgeProps, useMantineColorScheme } from '@mantine/core';

interface ModernBadgeProps extends Omit<BadgeProps, 'variant'> {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'outline' | 'filled' | 'light';
  gradient?: { from: string; to: string };
}

export function ModernBadge({
  children,
  variant = 'default',
  gradient,
  className,
  ...props
}: ModernBadgeProps) {
  const { colorScheme } = useMantineColorScheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        return {
          background: gradient
            ? `linear-gradient(135deg, var(--mantine-color-${gradient.from}-6), var(--mantine-color-${gradient.to}-6))`
            : 'linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))',
          color: 'white',
          border: 'none',
          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
        };
      case 'outline':
        return {
          background: 'transparent',
          color: 'var(--mantine-color-blue-6)',
          border: '2px solid var(--mantine-color-blue-6)',
          boxShadow: '0 2px 4px rgba(59, 130, 246, 0.1)',
        };
      case 'filled':
        return {
          background: 'var(--mantine-color-blue-6)',
          color: 'white',
          border: 'none',
          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
        };
      case 'light':
        return {
          background:
            colorScheme === 'dark'
              ? 'var(--mantine-color-blue-9)'
              : 'var(--mantine-color-blue-0)',
          color:
            colorScheme === 'dark'
              ? 'var(--mantine-color-blue-1)'
              : 'var(--mantine-color-blue-7)',
          border: `1px solid ${
            colorScheme === 'dark'
              ? 'var(--mantine-color-blue-7)'
              : 'var(--mantine-color-blue-2)'
          }`,
          boxShadow: '0 1px 4px rgba(59, 130, 246, 0.1)',
        };
      default:
        return {
          background:
            colorScheme === 'dark'
              ? 'var(--mantine-color-dark-4)'
              : 'var(--mantine-color-gray-0)',
          color:
            colorScheme === 'dark'
              ? 'var(--mantine-color-gray-3)'
              : 'var(--mantine-color-gray-7)',
          border: `1px solid ${
            colorScheme === 'dark'
              ? 'var(--mantine-color-dark-3)'
              : 'var(--mantine-color-gray-3)'
          }`,
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Badge
      className={`font-semibold transition-all duration-200 hover:scale-105 ${className || ''}`}
      style={{
        ...styles,
        borderRadius: '0.75rem',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: 600,
      }}
      {...props}
    >
      {children}
    </Badge>
  );
}
