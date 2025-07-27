'use client';

import React, { useMemo, useEffect, useState } from 'react';
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
  Badge,
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
  IconTestPipe,
  IconPalette,
} from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup';
import { UserButton } from './UserButton';
import { Logo } from './NavbarLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useAppTheme } from '../hooks/useAppTheme';
import { useAuthStore } from '../stores/authStore';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import classes from './AppNavbar.module.css';

// Données de navigation avec indicateurs d'accessibilité
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
  {
    label: 'Test Layout',
    icon: IconTestPipe,
    href: '/test-layout',
    description: 'Page de test pour la mise en page',
  },
  {
    label: 'Test Theme',
    icon: IconPalette,
    href: '/test-theme',
    description: 'Page de test pour les thèmes',
  },
];

const AppNavbarComponent = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { isDark, transitions } = useAppTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpened, setMobileOpened] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { signOutUser } = useFirebaseAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const { getCardStyle } = useAppTheme();

  const controlPaperStyles = useMemo(
    () => ({
      ...getCardStyle(),
      borderRadius: 'var(--mantine-radius-lg)',
      padding: 'var(--mantine-spacing-sm)',
      // Amélioration du contraste pour l'accessibilité
      border: isDark
        ? '2px solid var(--mantine-color-dark-3)'
        : '2px solid var(--mantine-color-gray-4)',
    }),
    [isDark] // getCardStyle is now memoized with useCallback
  );

  if (!mounted) {
    return null;
  }

  // Ne pas afficher la navbar si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
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
            <Code
              fw={700}
              style={{
                color: isDark
                  ? 'var(--mantine-color-gray-2)'
                  : 'var(--mantine-color-gray-8)',
                backgroundColor: isDark
                  ? 'var(--mantine-color-dark-6)'
                  : 'var(--mantine-color-gray-1)',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--mantine-radius-sm)',
                border: isDark
                  ? '1px solid var(--mantine-color-dark-3)'
                  : '1px solid var(--mantine-color-gray-3)',
              }}
            >
              v1.0.0
            </Code>
          </Group>
        </div>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner} role="menu">
            {links}
          </div>
        </ScrollArea>

        <div className={classes.footer}>
          <UserButton />

          {/* Contrôles avec accessibilité améliorée */}
          <Stack gap="sm" mt="md">
            <Paper
              style={controlPaperStyles}
              withBorder
              role="group"
              aria-label="Contrôles de langue et thème"
            >
              <LanguageSwitcher />
            </Paper>
            <Paper
              style={controlPaperStyles}
              withBorder
              role="group"
              aria-label="Sélecteur de thème"
            >
              <ThemeSwitcher />
            </Paper>
          </Stack>
        </div>
      </nav>

      {/* Bouton mobile avec accessibilité améliorée */}
      <Box visibleFrom="md" hiddenFrom="lg" className={classes.burgerButton}>
        <Burger
          opened={mobileOpened}
          onClick={() => setMobileOpened(!mobileOpened)}
          size="sm"
          color={
            isDark
              ? 'var(--mantine-color-gray-2)'
              : 'var(--mantine-color-gray-8)'
          }
          aria-label={mobileOpened ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpened}
          aria-controls="mobile-menu"
        />
      </Box>

      {/* Menu mobile avec accessibilité améliorée */}
      <Drawer
        id="mobile-menu"
        opened={mobileOpened}
        onClose={() => setMobileOpened(false)}
        size="100%"
        padding="md"
        zIndex={300}
        title={
          <Group gap="sm">
            <IconHeart
              size={24}
              style={{
                color: 'var(--mantine-color-blue-6)',
                filter: isDark ? 'brightness(1.2)' : 'brightness(0.9)',
              }}
              aria-hidden="true"
            />
            <Logo />
          </Group>
        }
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: 4,
          onClick: () => setMobileOpened(false),
        }}
        styles={{
          header: {
            background: isDark
              ? 'var(--mantine-color-dark-7)'
              : 'var(--mantine-color-white)',
            borderBottom: `2px solid ${isDark ? 'var(--mantine-color-dark-3)' : 'var(--mantine-color-gray-4)'}`,
          },
          content: {
            background: isDark
              ? 'var(--mantine-color-dark-8)'
              : 'var(--mantine-color-gray-0)',
          },
          title: {
            color: isDark
              ? 'var(--mantine-color-gray-1)'
              : 'var(--mantine-color-gray-9)',
            fontWeight: 600,
          },
        }}
        closeButtonProps={{
          'aria-label': 'Fermer le menu',
          style: {
            color: isDark
              ? 'var(--mantine-color-gray-2)'
              : 'var(--mantine-color-gray-8)',
            backgroundColor: isDark
              ? 'var(--mantine-color-dark-6)'
              : 'var(--mantine-color-gray-1)',
            border: isDark
              ? '1px solid var(--mantine-color-dark-3)'
              : '1px solid var(--mantine-color-gray-3)',
          },
        }}
      >
        <ScrollArea h="calc(100vh - 80px)">
          <Stack gap="md" mt="xl" role="menu">
            {links}

            <Divider
              my="md"
              style={{
                borderColor: isDark
                  ? 'var(--mantine-color-dark-3)'
                  : 'var(--mantine-color-gray-4)',
                borderWidth: '2px',
              }}
            />

            <Group justify="center" gap="md">
              <Paper
                style={controlPaperStyles}
                withBorder
                role="group"
                aria-label="Contrôles de langue et thème"
              >
                <LanguageSwitcher />
              </Paper>
              <Paper
                style={controlPaperStyles}
                withBorder
                role="group"
                aria-label="Sélecteur de thème"
              >
                <ThemeSwitcher />
              </Paper>
            </Group>
          </Stack>
        </ScrollArea>
      </Drawer>
    </>
  );
};

AppNavbarComponent.displayName = 'AppNavbar';

export const AppNavbar = React.memo(AppNavbarComponent);
