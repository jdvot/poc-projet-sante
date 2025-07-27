'use client';

import React from 'react';
import { Button, ButtonProps, useMantineColorScheme } from '@mantine/core';

interface StyledButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
}

export function StyledButton({
  children,
  variant = 'primary',
  style,
  ...props
}: StyledButtonProps) {
  const { colorScheme } = useMantineColorScheme();

  const baseStyles = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: 600,
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    fontSize: '0.875rem',
    letterSpacing: '0.025em',
  };

  const variantStyles = {
    primary: {
      background:
        'linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-blue-7))',
      color: 'white',
      boxShadow: '0 4px 14px rgba(59, 130, 246, 0.25)',
    },
    secondary: {
      background: colorScheme === 'dark' 
        ? 'var(--mantine-color-dark-4)' 
        : 'var(--mantine-color-gray-0)',
      color: colorScheme === 'dark' 
        ? 'var(--mantine-color-gray-1)' 
        : 'var(--mantine-color-gray-8)',
      border: `2px solid ${colorScheme === 'dark' 
        ? 'var(--mantine-color-dark-3)' 
        : 'var(--mantine-color-gray-3)'}`,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--mantine-color-blue-6)',
      border: '2px solid var(--mantine-color-blue-6)',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)',
    },
    ghost: {
      background: 'transparent',
      color: colorScheme === 'dark' 
        ? 'var(--mantine-color-gray-3)' 
        : 'var(--mantine-color-gray-7)',
      border: '2px solid transparent',
    },
    gradient: {
      background:
        'linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))',
      color: 'white',
      boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
    },
  };

  const hoverStyles = {
    primary: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.35)',
      background:
        'linear-gradient(135deg, var(--mantine-color-blue-7), var(--mantine-color-blue-8))',
    },
    secondary: {
      background: colorScheme === 'dark' 
        ? 'var(--mantine-color-dark-3)' 
        : 'var(--mantine-color-gray-1)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      border: `2px solid ${colorScheme === 'dark' 
        ? 'var(--mantine-color-dark-2)' 
        : 'var(--mantine-color-gray-4)'}`,
    },
    outline: {
      background: 'var(--mantine-color-blue-6)',
      color: 'white',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
    },
    ghost: {
      background: colorScheme === 'dark' 
        ? 'var(--mantine-color-dark-4)' 
        : 'var(--mantine-color-gray-0)',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    },
    gradient: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
      background:
        'linear-gradient(135deg, var(--mantine-color-blue-7), var(--mantine-color-cyan-7))',
    },
  };

  const activeStyles = {
    primary: {
      transform: 'translateY(0px)',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
    },
    secondary: {
      transform: 'translateY(0px)',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
    },
    outline: {
      transform: 'translateY(0px)',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.15)',
    },
    ghost: {
      transform: 'translateY(0px)',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
    },
    gradient: {
      transform: 'translateY(0px)',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.25)',
    },
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const hoverStyle = hoverStyles[variant];
    Object.assign(e.currentTarget.style, hoverStyle);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const variantStyle = variantStyles[variant];
    Object.assign(e.currentTarget.style, {
      ...variantStyle,
      transform: 'translateY(0px)',
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const activeStyle = activeStyles[variant];
    Object.assign(e.currentTarget.style, activeStyle);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const hoverStyle = hoverStyles[variant];
    Object.assign(e.currentTarget.style, hoverStyle);
  };

  return (
    <Button
      variant="unstyled"
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {children}
    </Button>
  );
}
