'use client';

import React from 'react';
import {
  Box,
  Text,
  Group,
  RingProgress,
  useMantineColorScheme,
  Tooltip,
  Badge,
  Stack,
  Card,
} from '@mantine/core';

interface ModernProgressProps {
  value: number;
  label: string;
  unit?: string;
  color?: string;
  size?: number;
  thickness?: number;
  showValue?: boolean;
  description?: string;
  icon?: React.ReactNode;
  tooltip?: string;
}

export function ModernProgress({
  value,
  label,
  unit = '',
  color = 'blue',
  size = 80,
  thickness = 8,
  showValue = true,
  description,
  icon,
  tooltip,
}: ModernProgressProps) {
  const { colorScheme } = useMantineColorScheme();

  const getColorValue = () => {
    if (color === 'blue') return 'var(--mantine-color-blue-6)';
    if (color === 'green') return 'var(--mantine-color-green-6)';
    if (color === 'orange') return 'var(--mantine-color-orange-6)';
    if (color === 'red') return 'var(--mantine-color-red-6)';
    if (color === 'cyan') return 'var(--mantine-color-cyan-6)';
    return color;
  };

  const getGradient = () => {
    switch (color) {
      case 'blue':
        return 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
      case 'green':
        return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      case 'orange':
        return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      case 'red':
        return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      case 'cyan':
        return 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)';
      default:
        return 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
    }
  };

  const getBgGradient = () => {
    switch (color) {
      case 'blue':
        return 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)';
      case 'green':
        return 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)';
      case 'orange':
        return 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)';
      case 'red':
        return 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)';
      case 'cyan':
        return 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)';
      default:
        return 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)';
    }
  };

  const content = (
    <Card
      p="lg"
      radius="xl"
      withBorder
      shadow="sm"
      style={{
        background: getBgGradient(),
        border: `1px solid ${colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        minWidth: size + 60,
        minHeight: size + 80,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      className="hover:scale-105 hover:shadow-xl"
    >
      <Stack gap="md" align="center">
        {/* Ring Progress Container */}
        <Box
          style={{
            position: 'relative',
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Background Ring */}
          <RingProgress
            size={size}
            thickness={thickness + 2}
            sections={[{ value: 100, color: 'rgba(0,0,0,0.05)' }]}
            label={null}
            style={{ position: 'absolute' }}
          />

          {/* Main Progress Ring */}
          <RingProgress
            size={size}
            thickness={thickness}
            sections={[{ value, color: getColorValue() }]}
            label={null}
            style={{ position: 'absolute' }}
          />

          {/* Center Content */}
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            {icon && (
              <Box
                style={{
                  background: getGradient(),
                  borderRadius: '50%',
                  padding: size >= 120 ? '8px' : '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  marginBottom: '4px',
                }}
              >
                {icon}
              </Box>
            )}

            {showValue && (
              <Stack gap={2} align="center">
                <Text
                  size={size >= 120 ? 'xl' : 'lg'}
                  fw={800}
                  style={{
                    lineHeight: 1,
                    color: 'var(--mantine-color-text)',
                    textAlign: 'center',
                  }}
                >
                  {value}
                </Text>
                {unit && (
                  <Badge
                    size="xs"
                    variant="light"
                    style={{
                      background: getGradient(),
                      color: 'white',
                      fontSize: size >= 120 ? '0.7rem' : '0.6rem',
                      padding: size >= 120 ? '4px 8px' : '2px 6px',
                      fontWeight: 600,
                    }}
                  >
                    {unit}
                  </Badge>
                )}
              </Stack>
            )}
          </Box>
        </Box>

        {/* Label */}
        <Box ta="center">
          <Text
            size={size >= 120 ? 'md' : 'sm'}
            fw={600}
            style={{
              color: 'var(--mantine-color-text)',
              marginBottom: description ? '4px' : '0',
            }}
          >
            {label}
          </Text>
          {description && (
            <Text
              size="xs"
              c="dimmed"
              style={{
                lineHeight: 1.3,
                maxWidth: size + 40,
              }}
            >
              {description}
            </Text>
          )}
        </Box>
      </Stack>
    </Card>
  );

  return tooltip ? (
    <Tooltip label={tooltip} withArrow color={color} position="top" offset={8}>
      {content}
    </Tooltip>
  ) : (
    content
  );
}
