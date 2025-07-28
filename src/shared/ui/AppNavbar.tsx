'use client';

import React, { useMemo, useEffect, useState, useCallback } from 'react';
import {
  Group,
  Code,
  ScrollArea,
  Paper,
  Box,
  Burger,
  Drawer,
  Stack,
  Divider,
  Text,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import {
  IconHome,
  IconDashboard,
  IconBrain,
  IconMessage,
  IconUser,
  IconSettings,
  IconHeart,
  IconLanguage,
  IconPalette as IconTheme,
} from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup';
import { UserButton } from './UserButton';
import { Logo } from './NavbarLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useAppTheme } from '../hooks/useAppTheme';
import classes from './AppNavbar.module.css';

// Move mockdata outside component to prevent recreation
const mockdata = [
  {
    label: 'navigation.home',
    icon: IconHome,
    href: '/',
    description: "Accéder à la page d'accueil",
  },
  {
    label: 'navigation.dashboard',
    icon: IconDashboard,
    href: '/dashboard',
    description: 'Voir votre tableau de bord de santé',
  },
  {
    label: 'navigation.aiDoctor',
    icon: IconBrain,
    href: '/ai-doctor',
    badge: 'IA',
    description: "Consulter l'assistant IA santé",
    badgeColor: 'blue',
  },
  {
    label: 'navigation.aiChat',
    icon: IconMessage,
    href: '/ai-chat',
    badge: 'Chat',
    description: "Discuter avec l'IA santé",
    badgeColor: 'green',
  },
  {
    label: 'navigation.profile',
    icon: IconUser,
    href: '/profile',
    description: 'Gérer votre profil utilisateur',
  },
  {
    label: 'settings.title',
    icon: IconSettings,
    href: '/settings',
    description: 'Configurer vos paramètres',
  },
] as const;

const AppNavbarComponent = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { isDark, colors, transitions } = useAppTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpened, setMobileOpened] = useState(false);

  // Memoize the links - mockdata is constant, so no dependencies needed
  const links = useMemo(
    () => mockdata.map((item) => <LinksGroup {...item} key={item.label} />),
    [] // mockdata is constant, no dependencies needed
  );

  // Handle mobile menu toggle
  const handleMobileToggle = useCallback(() => {
    setMobileOpened((prev) => !prev);
  }, []);

  // Handle mobile menu close
  const handleMobileClose = useCallback(() => {
    setMobileOpened(false);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileOpened(false);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Styles pour les contrôles améliorés
  const controlsContainerStyles = useMemo(
    () => ({
      background: isDark
        ? 'linear-gradient(135deg, var(--mantine-color-dark-6), var(--mantine-color-dark-5))'
        : 'linear-gradient(135deg, var(--mantine-color-gray-0), var(--mantine-color-gray-1))',
      border: `1px solid ${isDark ? 'var(--mantine-color-dark-3)' : 'var(--mantine-color-gray-3)'}`,
      borderRadius: '1rem',
      padding: '1rem',
      boxShadow: isDark
        ? '0 4px 20px rgba(0, 0, 0, 0.2)'
        : '0 4px 20px rgba(0, 0, 0, 0.08)',
      backdropFilter: 'blur(10px)',
    }),
    [isDark]
  );

  const sectionTitleStyles = useMemo(
    () => ({
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      color: isDark
        ? 'var(--mantine-color-gray-4)'
        : 'var(--mantine-color-gray-6)',
      marginBottom: '0.75rem',
      textAlign: 'center' as const,
    }),
    [isDark]
  );

  // Early return for hydration
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Navbar Desktop */}
      <nav
        className={classes.navbar}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className={classes.header}>
          <Group justify="space-between" style={{ padding: '0 0.5rem' }}>
            <Logo style={{ width: 'auto' }} />
            <Code fw={700}>v1.0.0</Code>
          </Group>
        </div>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner} role="menu">
            {links}
          </div>
        </ScrollArea>

        <div className={classes.footer}>
          {/* Section utilisateur améliorée */}
          <Box
            style={{
              background: isDark
                ? 'linear-gradient(135deg, var(--mantine-color-dark-6), var(--mantine-color-dark-5))'
                : 'linear-gradient(135deg, var(--mantine-color-gray-0), var(--mantine-color-gray-1))',
              border: `1px solid ${isDark ? 'var(--mantine-color-dark-3)' : 'var(--mantine-color-gray-3)'}`,
              borderRadius: '1rem',
              padding: '0.5rem',
              marginBottom: '1rem',
              boxShadow: isDark
                ? '0 2px 8px rgba(0, 0, 0, 0.15)'
                : '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <UserButton />
          </Box>

          {/* Contrôles améliorés avec design moderne */}
          <Box style={controlsContainerStyles}>
            {/* Section Langue */}
            <Box mb="lg">
              <Text style={sectionTitleStyles}>
                <IconLanguage size={12} style={{ marginRight: '0.5rem' }} />
                {t('settings.language', 'Langue')}
              </Text>
              <LanguageSwitcher />
            </Box>

            <Divider
              my="md"
              color={
                isDark
                  ? 'var(--mantine-color-dark-3)'
                  : 'var(--mantine-color-gray-3)'
              }
              opacity={0.5}
            />

            {/* Section Thème */}
            <Box>
              <Text style={sectionTitleStyles}>
                <IconTheme size={12} style={{ marginRight: '0.5rem' }} />
                {t('settings.theme', 'Thème')}
              </Text>
              <ThemeSwitcher />
            </Box>
          </Box>
        </div>
      </nav>

      {/* Bouton mobile avec accessibilité améliorée */}
      <Box visibleFrom="md" hiddenFrom="lg" className={classes.burgerButton}>
        <Burger
          opened={mobileOpened}
          onClick={handleMobileToggle}
          size="sm"
          aria-label={mobileOpened ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpened}
          aria-controls="mobile-menu"
        />
      </Box>

      {/* Menu mobile avec accessibilité améliorée */}
      <Drawer
        id="mobile-menu"
        opened={mobileOpened}
        onClose={handleMobileClose}
        size="100%"
        padding="md"
        zIndex={300}
        title={
          <Group gap="sm">
            <IconHeart size={24} aria-hidden="true" />
            <Logo />
          </Group>
        }
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: 4,
          onClick: handleMobileClose,
        }}
      >
        <ScrollArea h="calc(100vh - 80px)">
          <Stack gap="md" mt="xl" role="menu">
            {links}

            <Divider my="md" />

            {/* Section utilisateur mobile améliorée */}
            <Box
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, var(--mantine-color-dark-6), var(--mantine-color-dark-5))'
                  : 'linear-gradient(135deg, var(--mantine-color-gray-0), var(--mantine-color-gray-1))',
                border: `1px solid ${isDark ? 'var(--mantine-color-dark-3)' : 'var(--mantine-color-gray-3)'}`,
                borderRadius: '1rem',
                padding: '0.5rem',
                marginBottom: '1rem',
                boxShadow: isDark
                  ? '0 2px 8px rgba(0, 0, 0, 0.15)'
                  : '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <UserButton />
            </Box>

            {/* Contrôles mobiles améliorés */}
            <Box style={controlsContainerStyles}>
              {/* Section Langue */}
              <Box mb="lg">
                <Text style={sectionTitleStyles}>
                  <IconLanguage size={12} style={{ marginRight: '0.5rem' }} />
                  {t('settings.language', 'Langue')}
                </Text>
                <LanguageSwitcher />
              </Box>

              <Divider
                my="md"
                color={
                  isDark
                    ? 'var(--mantine-color-dark-3)'
                    : 'var(--mantine-color-gray-3)'
                }
                opacity={0.5}
              />

              {/* Section Thème */}
              <Box>
                <Text style={sectionTitleStyles}>
                  <IconTheme size={12} style={{ marginRight: '0.5rem' }} />
                  {t('settings.theme', 'Thème')}
                </Text>
                <ThemeSwitcher />
              </Box>
            </Box>
          </Stack>
        </ScrollArea>
      </Drawer>
    </>
  );
};

AppNavbarComponent.displayName = 'AppNavbar';

export const AppNavbar = React.memo(AppNavbarComponent);
