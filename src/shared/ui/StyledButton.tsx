"use client";

import { Button, ButtonProps } from '@mantine/core';
import { ReactNode } from 'react';

interface StyledButtonProps extends ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export function StyledButton({ 
  children, 
  variant = 'primary', 
  style, 
  ...props 
}: StyledButtonProps) {
  const baseStyles = {
    transition: 'all 0.2s ease',
    fontWeight: 500,
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-blue-7))',
      color: 'white',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
    },
    secondary: {
      background: 'var(--mantine-color-gray-0)',
      color: 'var(--mantine-color-gray-7)',
      border: '1px solid var(--mantine-color-gray-3)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--mantine-color-blue-6)',
      border: '2px solid var(--mantine-color-blue-6)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--mantine-color-gray-7)',
      border: '1px solid transparent',
    },
  };

  const hoverStyles = {
    primary: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
    },
    secondary: {
      background: 'var(--mantine-color-gray-1)',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    outline: {
      background: 'var(--mantine-color-blue-6)',
      color: 'white',
      transform: 'translateY(-1px)',
    },
    ghost: {
      background: 'var(--mantine-color-gray-0)',
      transform: 'translateY(-1px)',
    },
  };

  return (
    <Button
      variant="unstyled"
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        const hoverStyle = hoverStyles[variant];
        Object.assign(e.currentTarget.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        const baseStyle = { ...baseStyles, ...variantStyles[variant] };
        Object.assign(e.currentTarget.style, baseStyle);
      }}
      {...props}
    >
      {children}
    </Button>
  );
} 