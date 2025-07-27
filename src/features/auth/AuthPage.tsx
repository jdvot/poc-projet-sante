'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Card,
  Text,
  Button,
  Alert,
  Group,
  Stack,
  Loader,
  Avatar,
  Divider,
  Box,
  Badge,
  Paper,
  Modal,
  Progress,
  RingProgress,
  Center,
} from '@mantine/core';
import classes from './AuthPage.module.css';
import {
  IconBrandGoogle,
  IconAlertCircle,
  IconHeartbeat,
  IconCheck,
  IconX,
  IconShield,
  IconLock,
  IconUser,
  IconDeviceMobile,
  IconDeviceDesktop,
  IconArrowRight,
  IconRefresh,
  IconWifi,
  IconWifiOff,
  IconExternalLink,
  IconBug,
} from '@tabler/icons-react';
import { useFirebaseAuth } from '../../shared/hooks/useFirebaseAuth';
import { useAuthStore } from '../../shared/stores/authStore';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../../shared/ui/LanguageSwitcher';
import { ThemeSwitcher } from '../../shared/ui/ThemeSwitcher';
import { useAppTheme } from '../../shared/hooks/useAppTheme';
import { useIsMobile } from '../../shared/hooks/useDeviceDetection';
import { AuthDiagnostic } from './components/AuthDiagnostic';

const AuthPageComponent = () => {
  const { t } = useTranslation();
  const { isDark, colors, transitions } = useAppTheme();
  const {
    signInWithGoogle,
    signOutUser,
    loading,
    error,
    isAuthenticated,
    user,
    redirectPending,
    configError,
    mobileAuthError,
    clearError,
    clearRedirectPending,
    retryAuthentication,
    retryMobileAuth,
  } = useFirebaseAuth();
  const [localError, setLocalError] = useState<string | null>(null);
  const { user: storeUser } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  const [mobileRedirectProgress, setMobileRedirectProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  // Vérifier la connectivité réseau
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Animation de progression pour la redirection mobile
  useEffect(() => {
    if ((loading || redirectPending) && isMobile) {
      const interval = setInterval(() => {
        setMobileRedirectProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 500);

      return () => clearInterval(interval);
    } else {
      setMobileRedirectProgress(0);
    }
  }, [loading, redirectPending, isMobile]);

  // Effacer l'erreur après 5 secondes
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // Effacer l'erreur locale après 5 secondes
  useEffect(() => {
    if (localError) {
      const timer = setTimeout(() => {
        setLocalError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [localError]);

  if (!mounted) {
    return null;
  }

  const handleGoogleSignIn = async () => {
    try {
      // Vérifier la connectivité
      if (!isOnline) {
        setLocalError(t('auth.error.noInternet'));
        return;
      }

      // Afficher l'info mobile si nécessaire
      if (isMobile) {
        setShowMobileInfo(true);
        // Fermer automatiquement après 2 secondes
        setTimeout(() => setShowMobileInfo(false), 2000);
      }

      await signInWithGoogle();
    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
      setLocalError(t('auth.error.generic'));
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
  };

  // Fonction pour obtenir le message d'erreur approprié
  const getErrorMessage = (error: string) => {
    if (error.includes('popup-blocked') || error.includes('popup-closed')) {
      return isMobile
        ? t('auth.error.mobileRedirect')
        : t('auth.error.popupBlocked');
    }
    if (error.includes('network-request-failed')) {
      return t('auth.error.networkError');
    }
    if (error.includes('too-many-requests')) {
      return t('auth.error.tooManyRequests');
    }
    if (error.includes('unauthorized-domain')) {
      return t('auth.error.unauthorizedDomain');
    }
    return error;
  };

  // Fonction pour gérer l'annulation de la redirection
  const handleCancelRedirect = () => {
    clearRedirectPending();
    setMobileRedirectProgress(0);
  };

  // Fonction pour basculer le diagnostic
  const toggleDiagnostic = () => {
    setShowDiagnostic(!showDiagnostic);
  };

  return (
    <Box className={classes.authContainer}>
      {/* Animated background elements */}
      <Box className={classes.animatedBackground} />

      {/* Switchers container - corrige le chevauchement */}
      <Box className={classes.switchersContainer}>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </Box>

      <Container size="sm" py="xl" style={{ position: 'relative', zIndex: 10 }}>
        <Stack
          gap="xl"
          align="center"
          style={{ minHeight: '100vh', justifyContent: 'center' }}
        >
          {/* Header with enhanced styling */}
          <Stack gap="lg" align="center">
            <Box className={classes.headerIcon}>
              <IconHeartbeat size={48} />
            </Box>

            <Stack gap="xs" align="center">
              <Title
                order={1}
                ta="center"
                size="h1"
                className={classes.authTitle}
              >
                {t('auth.title')}
              </Title>
              <Text size="lg" ta="center" className={classes.authSubtitle}>
                {t('auth.subtitle')}
              </Text>
            </Stack>
          </Stack>

          {/* Enhanced main card */}
          <Card
            withBorder
            p="xl"
            radius="xl"
            shadow="xl"
            w="100%"
            className={classes.authCard}
            data-testid="auth-card"
          >
            <Stack gap="lg">
              {/* État de connexion */}
              {isAuthenticated && user && (
                <Alert
                  icon={<IconCheck size={16} />}
                  title={t('auth.connected')}
                  color="green"
                  variant="light"
                  style={{
                    borderRadius: '12px',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                  }}
                >
                  <Text size="sm">
                    {t('auth.user.welcome')}{' '}
                    <strong>{user.displayName || storeUser?.name}</strong> !
                  </Text>
                  <Text size="xs" c="dimmed" mt={4}>
                    {t('auth.user.email')} {user.email}
                  </Text>
                </Alert>
              )}

              {/* Indicateur de connectivité */}
              {!isOnline && (
                <Alert
                  icon={<IconWifiOff size={16} />}
                  title={t('auth.connectivity.noConnection')}
                  color="red"
                  variant="light"
                  data-testid="offline-alert"
                  style={{
                    borderRadius: '12px',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                  }}
                >
                  <Text size="sm">{t('auth.connectivity.checkNetwork')}</Text>
                </Alert>
              )}

              {/* Affichage des erreurs */}
              {(error || localError) && (
                <Alert
                  icon={<IconX size={16} />}
                  title={t('auth.error.title')}
                  color="red"
                  variant="light"
                  withCloseButton
                  onClose={() => {
                    clearError();
                    setLocalError(null);
                  }}
                  data-testid="error-message"
                  style={{
                    borderRadius: '12px',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                  }}
                >
                  <Stack gap="sm">
                    <Text size="sm">
                      {getErrorMessage(error || localError || '')}
                    </Text>
                    {configError && (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={retryAuthentication}
                        leftSection={<IconRefresh size={12} />}
                        data-testid="retry-button"
                      >
                        {t('auth.error.retry')}
                      </Button>
                    )}
                    {mobileAuthError && (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={retryMobileAuth}
                        leftSection={<IconRefresh size={12} />}
                        data-testid="retry-mobile-button"
                        color="blue"
                      >
                        {t('auth.error.retry')} Mobile
                      </Button>
                    )}
                  </Stack>
                </Alert>
              )}

              {/* Contenu principal */}
              {!isAuthenticated ? (
                <Stack gap="lg">
                  <Text size="md" ta="center" c="dimmed" fw={500}>
                    {t('auth.login.title')}
                  </Text>

                  {/* Device indicator avec connectivité */}
                  <Group
                    justify="center"
                    gap="xs"
                    className={classes.deviceIndicator}
                    data-testid="device-indicator"
                  >
                    {isMobile ? (
                      <>
                        <IconDeviceMobile
                          size={16}
                          style={{ color: colors.primary }}
                        />
                        <Text size="xs" c="dimmed">
                          {t('auth.mobile.deviceMode')}
                        </Text>
                      </>
                    ) : (
                      <>
                        <IconDeviceDesktop
                          size={16}
                          style={{ color: colors.primary }}
                        />
                        <Text size="xs" c="dimmed">
                          {t('auth.mobile.desktopMode')}
                        </Text>
                      </>
                    )}
                    {isOnline ? (
                      <IconWifi
                        size={12}
                        style={{ color: colors.success }}
                        data-testid="connectivity-indicator"
                      />
                    ) : (
                      <IconWifiOff
                        size={12}
                        style={{ color: colors.error }}
                        data-testid="connectivity-indicator"
                      />
                    )}
                  </Group>

                  {/* Progress indicator pour mobile */}
                  {(loading || redirectPending) && isMobile && (
                    <Center data-testid="mobile-loading">
                      <Stack gap="md" align="center">
                        <RingProgress
                          size={80}
                          thickness={4}
                          sections={[
                            {
                              value: mobileRedirectProgress,
                              color: colors.primary,
                            },
                          ]}
                          data-testid="ring-progress"
                          label={
                            <Center>
                              <IconRefresh
                                size={20}
                                className={classes.rotatingIcon}
                                data-testid="refresh-icon"
                              />
                            </Center>
                          }
                        />
                        <Text size="sm" c="dimmed" ta="center">
                          {redirectPending
                            ? t('auth.login.mobileRedirecting')
                            : t('auth.login.mobileLoading')}
                        </Text>
                        <Progress
                          value={mobileRedirectProgress}
                          size="sm"
                          w="100%"
                          color={colors.primary}
                          animated
                          data-testid="progress-bar"
                        />

                        {/* Bouton d'annulation pour la redirection */}
                        {redirectPending && (
                          <Button
                            variant="subtle"
                            size="xs"
                            onClick={handleCancelRedirect}
                            color="gray"
                            data-testid="cancel-redirect-button"
                          >
                            {t('auth.login.cancelRedirect')}
                          </Button>
                        )}
                      </Stack>
                    </Center>
                  )}

                  {/* Enhanced Google button */}
                  <Button
                    variant="outline"
                    size="lg"
                    leftSection={
                      loading || redirectPending ? (
                        <Loader size="sm" color="blue" />
                      ) : (
                        <IconBrandGoogle size={20} />
                      )
                    }
                    rightSection={
                      !(loading || redirectPending) && isMobile ? (
                        <IconArrowRight size={16} data-testid="arrow-icon" />
                      ) : null
                    }
                    onClick={handleGoogleSignIn}
                    disabled={loading || redirectPending || !isOnline}
                    fullWidth
                    radius="md"
                    className={classes.googleButton}
                    data-testid="google-signin-button"
                  >
                    {loading || redirectPending
                      ? isMobile
                        ? redirectPending
                          ? t('auth.login.mobileRedirecting')
                          : t('auth.login.mobileLoading')
                        : t('auth.login.loading')
                      : t('auth.login.googleButton')}
                  </Button>

                  <Divider
                    label={t('auth.login.or')}
                    labelPosition="center"
                    classNames={{
                      label: classes.dividerLabel,
                    }}
                  />

                  {/* Enhanced features list */}
                  <Stack gap="sm">
                    <Group gap="xs" justify="center">
                      <IconShield size={16} style={{ color: colors.success }} />
                      <Text size="sm" c="dimmed">
                        {t('auth.features.secure')}
                      </Text>
                    </Group>
                    <Group gap="xs" justify="center">
                      <IconLock size={16} style={{ color: colors.success }} />
                      <Text size="sm" c="dimmed">
                        {t('auth.features.privacy')}
                      </Text>
                    </Group>
                    <Group gap="xs" justify="center">
                      <IconUser size={16} style={{ color: colors.success }} />
                      <Text size="sm" c="dimmed">
                        {t('auth.features.gdpr')}
                      </Text>
                    </Group>
                  </Stack>

                  {/* Diagnostic button for mobile issues */}
                  {isMobile && (
                    <Button
                      variant="subtle"
                      size="xs"
                      onClick={toggleDiagnostic}
                      leftSection={<IconBug size={12} />}
                      data-testid="diagnostic-button"
                    >
                      Diagnostic mobile
                    </Button>
                  )}
                </Stack>
              ) : (
                <Stack gap="lg">
                  {/* Enhanced user profile */}
                  <Group justify="center">
                    <Avatar
                      src={user?.photoURL || undefined}
                      alt={user?.displayName || 'Utilisateur'}
                      size="xl"
                      radius="xl"
                      className={classes.userAvatar}
                    />
                    <Stack gap={4}>
                      <Text fw={700} size="lg">
                        {user?.displayName || storeUser?.name}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {user?.email}
                      </Text>
                      <Badge
                        color="green"
                        variant="light"
                        size="sm"
                        className={classes.connectedBadge}
                      >
                        {t('auth.connected')}
                      </Badge>
                    </Stack>
                  </Group>

                  {/* Enhanced action buttons */}
                  <Stack gap="md">
                    <Button
                      variant="filled"
                      size="lg"
                      onClick={() => router.push('/')}
                      fullWidth
                      radius="md"
                      className={classes.dashboardButton}
                      data-testid="home-button"
                    >
                      {t('auth.home.button')}
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={handleSignOut}
                      disabled={loading}
                      fullWidth
                      radius="md"
                      className={classes.signOutButton}
                      data-testid="signout-button"
                    >
                      {loading
                        ? t('auth.logout.loading')
                        : t('auth.logout.button')}
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Card>

          {/* Enhanced footer */}
          <Paper p="md" radius="md" className={classes.footer}>
            <Text size="xs" ta="center" className={classes.footerText}>
              {t('auth.footer.terms')}{' '}
              <Text component="span" className={classes.footerLink}>
                {t('auth.footer.termsLink')}
              </Text>{' '}
              {t('auth.footer.privacy')}{' '}
              <Text component="span" className={classes.footerLink}>
                {t('auth.footer.privacyLink')}
              </Text>
            </Text>
          </Paper>

          {/* Diagnostic component */}
          <AuthDiagnostic isVisible={showDiagnostic} />
        </Stack>
      </Container>

      {/* Modal d'information mobile améliorée */}
      <Modal
        opened={showMobileInfo}
        onClose={() => setShowMobileInfo(false)}
        title={
          <Group gap="xs">
            <IconDeviceMobile size={20} />
            <Text>{t('auth.mobile.title')}</Text>
          </Group>
        }
        centered
        size="sm"
        data-testid="mobile-modal"
        classNames={{
          title: classes.mobileModalTitle,
        }}
      >
        <Stack gap="md">
          <Alert
            icon={<IconExternalLink size={16} />}
            color="blue"
            variant="light"
            style={{ borderRadius: '8px' }}
          >
            <Text size="sm">{t('auth.mobile.info')}</Text>
          </Alert>

          <Group gap="xs" justify="center">
            <IconShield size={16} style={{ color: colors.success }} />
            <Text size="xs" c="dimmed">
              {t('auth.mobile.secure')}
            </Text>
          </Group>

          <Text size="xs" c="dimmed" ta="center">
            {t('auth.mobile.popupNote')}
          </Text>
        </Stack>
      </Modal>
    </Box>
  );
};

AuthPageComponent.displayName = 'AuthPage';

export const AuthPage = React.memo(AuthPageComponent);
