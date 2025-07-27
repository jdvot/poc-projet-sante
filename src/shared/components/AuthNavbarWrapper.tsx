'use client';

import { usePathname } from 'next/navigation';
import { useAuthStore } from '../stores/authStore';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { useMemo } from 'react';
import { Box } from '@mantine/core';
import { AppNavbar } from '../ui/AppNavbar';

export const AuthNavbarWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const { loading } = useFirebaseAuth();

  // Memoize the conditions to prevent unnecessary re-renders
  const shouldShowNavbar = useMemo(() => {
    // Ne pas afficher la navbar sur la page d'authentification
    if (pathname === '/auth') {
      return false;
    }

    // Ne pas afficher la navbar pendant le chargement de l'authentification
    if (loading) {
      return false;
    }

    // Ne pas afficher la navbar si l'utilisateur n'est pas connecté
    if (!isAuthenticated) {
      return false;
    }

    return true;
  }, [pathname, loading, isAuthenticated]);

  // Styles conditionnels pour le layout
  const bodyStyle = {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    background: 'var(--mantine-color-body)',
  } as const;

  const contentStyle = {
    flex: 1,
    padding: 'var(--mantine-spacing-md)',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: 0,
    overflow: 'auto',
    height: '100vh',
    background: 'var(--mantine-color-body)',
  } as const;

  return (
    <Box style={bodyStyle}>
      {shouldShowNavbar && <AppNavbar />}
      <Box style={contentStyle} component="main">
        {children}
      </Box>
    </Box>
  );
};
