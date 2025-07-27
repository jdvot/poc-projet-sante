'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Stack,
  Title,
  Text,
  Button,
  ThemeIcon,
  Box,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
  colorScheme: 'light' | 'dark' | 'auto';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  href,
  color,
  colorScheme,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      component="article"
      role="article"
      aria-labelledby={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Card
        withBorder
        p="xl"
        radius="xl"
        component={Link}
        href={href}
        style={{
          background:
            colorScheme === 'dark'
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.8) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
          border: `1px solid var(--mantine-color-${color}-3)`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px var(--mantine-color-${color}-4)`;
          e.currentTarget.style.borderColor = `var(--mantine-color-${color}-5)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
          e.currentTarget.style.borderColor = `var(--mantine-color-${color}-3)`;
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline =
            '2px solid var(--mantine-color-blue-6)';
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
      >
        {/* Effet de brillance au survol */}
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)`,
            transition: 'left 0.5s ease',
            pointerEvents: 'none',
          }}
          className="shine-effect"
        />

        <Stack
          gap="lg"
          align="center"
          style={{ position: 'relative', zIndex: 1, flex: 1 }}
        >
          <ThemeIcon
            size={70}
            radius="xl"
            variant="light"
            color={color}
            style={{
              background: `linear-gradient(135deg, var(--mantine-color-${color}-0) 0%, var(--mantine-color-${color}-1) 100%)`,
              color: `var(--mantine-color-${color}-7)`,
              border: `2px solid var(--mantine-color-${color}-3)`,
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
              e.currentTarget.style.boxShadow = `0 8px 20px rgba(0, 0, 0, 0.15)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.1)`;
            }}
          >
            {icon}
          </ThemeIcon>

          <Title
            id={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
            order={3}
            size="h4"
            ta="center"
            style={{
              color: 'var(--mantine-color-text)',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
              fontWeight: 700,
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {title}
          </Title>

          <Text
            size="sm"
            ta="center"
            c="dimmed"
            style={{
              color: 'var(--mantine-color-dimmed)',
              lineHeight: 1.6,
              flex: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {description}
          </Text>

          <Button
            variant="light"
            color={color}
            size="md"
            rightSection={<IconArrowRight size={16} />}
            style={{
              background: `linear-gradient(135deg, var(--mantine-color-${color}-0) 0%, var(--mantine-color-${color}-1) 100%)`,
              color: `var(--mantine-color-${color}-7)`,
              border: `1px solid var(--mantine-color-${color}-3)`,
              fontWeight: 600,
              transition: 'all 0.2s ease',
              marginTop: 'auto',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `linear-gradient(135deg, var(--mantine-color-${color}-1) 0%, var(--mantine-color-${color}-2) 100%)`;
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `linear-gradient(135deg, var(--mantine-color-${color}-0) 0%, var(--mantine-color-${color}-1) 100%)`;
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            {t('home.featureCard.discover')}
          </Button>
        </Stack>
      </Card>

      <style jsx>{`
        .shine-effect {
          opacity: 0;
        }

        article:hover .shine-effect {
          opacity: 1;
          left: 100%;
        }
      `}</style>
    </Box>
  );
};
