'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Stack, Group, Title, Text, Button, Box } from '@mantine/core';
import {
  IconSparkles,
  IconDashboard,
  IconArrowRight,
} from '@tabler/icons-react';
import Link from 'next/link';

interface HeroSectionProps {
  colorScheme: 'light' | 'dark' | 'auto';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ colorScheme }) => {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      role="banner"
      aria-labelledby="hero-title"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Paper
        p="xl"
        radius="xl"
        style={{
          background:
            colorScheme === 'dark'
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)'
              : 'linear-gradient(135deg, rgba(239, 246, 255, 0.95) 0%, rgba(207, 250, 254, 0.95) 100%)',
          border:
            colorScheme === 'dark'
              ? '1px solid var(--mantine-color-gray-6)'
              : '1px solid var(--mantine-color-blue-2)',
          textAlign: 'center',
          position: 'relative',
          backdropFilter: 'blur(10px)',
          boxShadow:
            colorScheme === 'dark'
              ? '0 20px 40px rgba(0, 0, 0, 0.3)'
              : '0 20px 40px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Éléments décoratifs de fond */}
        <Box
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background:
              colorScheme === 'dark'
                ? 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        <Stack
          gap="xl"
          align="center"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <Group gap="xs" justify="center">
            <IconSparkles
              size={32}
              style={{
                color: 'var(--mantine-color-blue-6)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
              aria-hidden="true"
            />
            <Title
              id="hero-title"
              order={1}
              size="h1"
              style={{
                color: 'var(--mantine-color-text)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
              }}
            >
              {t('home.hero.title')}
            </Title>
            <IconSparkles
              size={32}
              style={{
                color: 'var(--mantine-color-blue-6)',
                animation: 'pulse 2s ease-in-out infinite 1s',
              }}
              aria-hidden="true"
            />
          </Group>

          <Text
            size="xl"
            ta="center"
            style={{
              color: 'var(--mantine-color-text)',
              maxWidth: 700,
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {t('home.hero.subtitle')}
          </Text>

          <Text
            size="lg"
            ta="center"
            c="dimmed"
            style={{
              color: 'var(--mantine-color-dimmed)',
              maxWidth: 600,
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: 1.7,
            }}
          >
            {t('home.hero.description')}
          </Text>

          <Button
            size="lg"
            component={Link}
            href="/dashboard"
            leftSection={<IconDashboard size={20} />}
            rightSection={<IconArrowRight size={16} />}
            style={{
              background:
                'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-cyan-6) 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '1.125rem',
              padding: '0.875rem 2rem',
              borderRadius: '0.75rem',
              border: 'none',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 8px 25px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow =
                '0 4px 15px rgba(59, 130, 246, 0.3)';
            }}
          >
            {t('home.hero.startExperience')}
          </Button>
        </Stack>
      </Paper>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
      `}</style>
    </Box>
  );
};
