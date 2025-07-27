'use client';

import React from 'react';
import { Button, ButtonProps } from '@mantine/core';
import { useAppTheme } from '../hooks/useAppTheme';

interface ThemedButtonProps extends ButtonProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'health'
    | 'medical'
    | 'outline'
    | 'light';
  onClick?: () => void;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  const { colors, radius, transitions } = useAppTheme();

  const getVariantProps = (): ButtonProps => {
    switch (variant) {
      case 'primary':
        return {
          color: 'blue',
          variant: 'filled',
        };
      case 'secondary':
        return {
          color: 'gray',
          variant: 'filled',
        };
      case 'accent':
        return {
          color: 'purple',
          variant: 'filled',
        };
      case 'health':
        return {
          color: 'green',
          variant: 'filled',
        };
      case 'medical':
        return {
          color: 'red',
          variant: 'filled',
        };
      case 'outline':
        return {
          variant: 'outline',
        };
      case 'light':
        return {
          variant: 'light',
        };
      default:
        return {
          color: 'blue',
          variant: 'filled',
        };
    }
  };

  return (
    <Button
      {...props}
      {...getVariantProps()}
      radius={radius.button}
      styles={{
        root: {
          transition: transitions.normal,
          fontWeight: 600,
        },
      }}
    >
      {children}
    </Button>
  );
};
