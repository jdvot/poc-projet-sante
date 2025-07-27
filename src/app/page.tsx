'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Loader, Text, Center } from '@mantine/core';
import { useAuthStore } from '../shared/stores/authStore';
import { useFirebaseAuth } from '../shared/hooks/useFirebaseAuth';
import { useAppTheme } from '../shared/hooks/useAppTheme';
import Home from '../features/home/Home';

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const { loading } = useFirebaseAuth();
  const { isDark, colors, transitions } = useAppTheme();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <Center
        style={{
          minHeight: '100vh',
          background: isDark
            ? 'var(--mantine-color-dark-8)'
            : 'var(--mantine-color-gray-0)',
          transition: transitions.normal,
        }}
      >
        <Box ta="center">
          <Loader
            size="lg"
            color={colors.primary}
            style={{ marginBottom: 'var(--mantine-spacing-md)' }}
          />
          <Text c="dimmed" style={{ transition: transitions.normal }}>
            Chargement...
          </Text>
        </Box>
      </Center>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirection en cours
  }

  return (
    <Box>
      <Home />
    </Box>
  );
}
