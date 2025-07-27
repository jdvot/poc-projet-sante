'use client';

import React from 'react';
import {
  Card,
  Text,
  Group,
  Stack,
  Box,
  useMantineColorScheme,
} from '@mantine/core';
import { AtomicCardProps } from '../types/dashboard';

export const AtomicCard: React.FC<AtomicCardProps> = ({
  title,
  subtitle,
  children,
  variant = 'default',
  size = 'md',
  padding = 'md',
  radius = 'md',
  shadow = 'sm',
  withBorder = true,
  className,
  style,
  icon,
  actions,
  footer,
  loading = false,
  hoverable = false,
}) => {
  const { colorScheme } = useMantineColorScheme();

  // Configuration des variants
  const getVariantStyles = () => {
    const isDark = colorScheme === 'dark';

    switch (variant) {
      case 'elevated':
        return {
          background: isDark
            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: isDark ? '1px solid #475569' : '1px solid #e2e8f0',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        };
      case 'outlined':
        return {
          background: 'transparent',
          border: isDark ? '2px solid #475569' : '2px solid #e2e8f0',
          boxShadow: 'none',
        };
      case 'gradient':
        return {
          background: isDark
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        };
      default:
        return {
          background: isDark ? '#1e293b' : '#ffffff',
          border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        };
    }
  };

  // Configuration des tailles
  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return {
          padding: 'sm',
          radius: 'sm',
          titleSize: 'sm',
          subtitleSize: 'xs',
        };
      case 'lg':
        return {
          padding: 'xl',
          radius: 'lg',
          titleSize: 'lg',
          subtitleSize: 'md',
        };
      default:
        return {
          padding,
          radius,
          titleSize: 'md',
          subtitleSize: 'sm',
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeConfig = getSizeConfig();

  return (
    <Card
      className={className}
      style={{
        ...variantStyles,
        transition: 'all 0.3s ease',
        ...style,
      }}
      padding={sizeConfig.padding}
      radius={sizeConfig.radius}
      withBorder={withBorder}
      shadow={shadow}
      {...(hoverable && {
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = variantStyles.boxShadow;
        },
      })}
    >
      <Stack gap="md">
        {/* Header avec titre, sous-titre et actions */}
        {(title || subtitle || icon || actions) && (
          <Group justify="space-between" align="flex-start">
            <Group gap="sm" align="flex-start">
              {icon && (
                <Box
                  style={{
                    color: 'var(--mantine-color-blue-6)',
                    marginTop: '2px',
                  }}
                >
                  {icon}
                </Box>
              )}
              <Box>
                {title && (
                  <Text
                    size={sizeConfig.titleSize}
                    fw={600}
                    style={{ color: 'var(--mantine-color-text)' }}
                  >
                    {title}
                  </Text>
                )}
                {subtitle && (
                  <Text
                    size={sizeConfig.subtitleSize}
                    c="dimmed"
                    style={{ color: 'var(--mantine-color-dimmed)' }}
                  >
                    {subtitle}
                  </Text>
                )}
              </Box>
            </Group>
            {actions && <Box>{actions}</Box>}
          </Group>
        )}

        {/* Contenu principal */}
        <Box>{children}</Box>

        {/* Footer */}
        {footer && (
          <Box
            style={{
              borderTop: '1px solid var(--mantine-color-gray-3)',
              paddingTop: 'var(--mantine-spacing-md)',
            }}
          >
            {footer}
          </Box>
        )}
      </Stack>
    </Card>
  );
};
