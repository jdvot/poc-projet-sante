'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Title,
  Button,
  Alert,
  Stack,
  Loader,
  Box,
  Text,
  Transition,
} from '@mantine/core';
import {
  IconBrandGoogle,
  IconAlertCircle,
  IconHeartbeat,
  IconWifiOff,
} from '@tabler/icons-react';
import { useFirebaseAuth } from '../../shared/hooks/useFirebaseAuth';
import { useAuthStore } from '../../shared/stores/authStore';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../../shared/hooks/useAppTheme';
import { useIsMobile } from '../../shared/hooks/useDeviceDetection';

const AuthPageComponent = () => {
  const { t } = useTranslation();
  const { isDark, gradients } = useAppTheme();
  const {
    signInWithGoogle,
    loading,
    error,
    isAuthenticated,
    user,
    clearError,
  } = useFirebaseAuth();
  const { user: storeUser } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const isMobile = useIsMobile();

  const handleOnline = useCallback(() => setIsOnline(true), []);
  const handleOffline = useCallback(() => setIsOnline(false), []);
  const handleClearError = useCallback(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      if (!isOnline) {
        return;
      }
      await signInWithGoogle();
    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
    }
  }, [isOnline, signInWithGoogle]);

  if (!mounted) {
    return null;
  }

  return (
    <Box
      style={{
        minHeight: '100vh',
        backgroundImage: isDark ? gradients.health : gradients.primary,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Animated background elements */}
      <Box
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          backgroundImage: isDark
            ? 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          animation: 'float 20s ease-in-out infinite',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />

      <Container
        size="xs"
        style={{ position: 'relative', zIndex: 10, padding: '2rem 1rem' }}
      >
        <Stack
          gap="xl"
          align="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          {/* Logo et titre */}
          <Stack gap="lg" align="center">
            <Box
              style={{
                background: isDark
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                padding: '2rem',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconHeartbeat
                size={64}
                style={{
                  color: 'var(--mantine-color-white)',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                }}
              />
            </Box>

            <Stack gap="xs" align="center">
              <Title
                order={1}
                ta="center"
                size="h1"
                style={{
                  color: 'var(--mantine-color-white)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  fontSize: isMobile ? '2rem' : '2.5rem',
                }}
              >
                {t('auth.title')}
              </Title>
              <Text
                size="lg"
                ta="center"
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  lineHeight: 1.5,
                  maxWidth: '300px',
                }}
              >
                {t('auth.subtitle')}
              </Text>
            </Stack>
          </Stack>

          {/* Bouton Google centré */}
          <Box
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '3rem 2rem',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              minWidth: '320px',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <Stack gap="xl" align="center">
              {/* Indicateur de connectivité */}
              {!isOnline && (
                <Alert
                  icon={<IconWifiOff size={16} />}
                  title={t('auth.connectivity.noConnection')}
                  color="red"
                  variant="filled"
                  style={{
                    borderRadius: '12px',
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                >
                  <Text size="sm" style={{ color: 'white' }}>
                    {t('auth.connectivity.checkNetwork')}
                  </Text>
                </Alert>
              )}

              {/* Affichage des erreurs */}
              {error && (
                <Alert
                  icon={<IconAlertCircle size={16} />}
                  title={t('auth.error.title')}
                  color="red"
                  variant="filled"
                  withCloseButton
                  onClose={handleClearError}
                  style={{
                    borderRadius: '12px',
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                >
                  <Text size="sm" style={{ color: 'white' }}>
                    {error}
                  </Text>
                </Alert>
              )}

              {/* Bouton Google */}
              <Button
                variant="outline"
                size="xl"
                leftSection={
                  loading ? (
                    <Loader size="sm" color="blue" />
                  ) : (
                    <IconBrandGoogle size={24} />
                  )
                }
                onClick={handleGoogleSignIn}
                disabled={loading || !isOnline}
                fullWidth
                radius="lg"
                data-testid="google-signin-button"
                style={{
                  border: '2px solid var(--mantine-color-blue-6)',
                  color: 'var(--mantine-color-blue-6)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  minHeight: '64px',
                  padding: '0 2rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
                styles={{
                  root: {
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                {loading
                  ? t('auth.login.loading')
                  : t('auth.login.googleButton')}
              </Button>

              {/* Texte informatif */}
              <Text
                size="xs"
                ta="center"
                style={{
                  color: 'var(--mantine-color-gray-6)',
                  lineHeight: 1.4,
                  maxWidth: '280px',
                }}
              >
                {t('auth.features.secure')} • {t('auth.features.privacy')} •{' '}
                {t('auth.features.gdpr')}
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(1deg);
          }
          66% {
            transform: translateY(10px) rotate(-1deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </Box>
  );
};

AuthPageComponent.displayName = 'AuthPage';

export const AuthPage = React.memo(AuthPageComponent);
