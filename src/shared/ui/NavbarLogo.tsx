'use client';

import { Group, Box, Text } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useAppTheme } from '../hooks/useAppTheme';
import classes from './NavbarLogo.module.css';

interface LogoProps {
  style?: React.CSSProperties;
}

export function Logo({ style }: LogoProps) {
  const { isDark, transitions } = useAppTheme();

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: transitions.normal,
    textDecoration: 'none',
    ...style,
  };

  const iconStyles = {
    color: 'var(--mantine-color-blue-6)',
    transition: transitions.normal,
    filter: isDark ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))' : 'none',
  };

  const textStyles = {
    fontSize: '1.25rem',
    fontWeight: 800,
    background:
      'linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
    lineHeight: 1.2,
    letterSpacing: '-0.025em',
  };

  return (
    <Box style={logoStyles}>
      <IconHeart size={28} style={iconStyles} />
      <Text style={textStyles} className="font-extrabold">
        Limitless Health
      </Text>
    </Box>
  );
}
