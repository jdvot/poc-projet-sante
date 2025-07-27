'use client';

import React, { useMemo, useCallback, useEffect, useState } from 'react';
import {
  Group,
  Anchor,
  Stack,
  Container,
  Box,
  Transition,
  Paper,
  Badge,
  ActionIcon,
  Tooltip,
  Divider,
  Text,
  Avatar,
  Menu,
  Burger,
  Drawer,
  ScrollArea,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconBrain,
  IconHeart,
  IconUser,
  IconSettings,
  IconHome,
  IconDashboard,
  IconChevronDown,
  IconSun,
  IconMoon,
  IconDeviceDesktop,
  IconGlobe,
  IconMenu2,
} from '@tabler/icons-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useAppTheme } from '../hooks/useAppTheme';

// Types pour une meilleure type safety
interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  badge?: string;
}

// Composant pour un élément de navigation individuel
interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, isActive, onClick }) => {
  const { t } = useTranslation();
  const { isDark, colors, transitions } = useAppTheme();

  const linkStyles = useMemo(
    () => ({
      padding: '0.75rem 1.25rem',
      borderRadius: '1rem',
      textDecoration: 'none',
      fontWeight: 600,
      transition: transitions.normal,
      position: 'relative' as const,
      color: isActive
        ? 'white'
        : isDark
          ? 'var(--mantine-color-gray-3)'
          : 'var(--mantine-color-gray-7)',
      background: isActive
        ? `linear-gradient(135deg, ${colors.primary}, ${colors.info})`
        : 'transparent',
      border: isActive
        ? 'none'
        : `2px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-2)'}`,
      boxShadow: isActive ? '0 8px 25px rgba(59, 130, 246, 0.25)' : 'none',
      transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    }),
    [isActive, isDark, colors, transitions]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isActive) {
        e.currentTarget.style.background = isDark
          ? 'var(--mantine-color-dark-4)'
          : 'var(--mantine-color-gray-0)';
        e.currentTarget.style.color = isDark
          ? 'var(--mantine-color-gray-1)'
          : 'var(--mantine-color-gray-9)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }
    },
    [isActive, isDark]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isActive) {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = isDark
          ? 'var(--mantine-color-gray-3)'
          : 'var(--mantine-color-gray-7)';
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = 'none';
      }
    },
    [isActive, isDark]
  );

  return (
    <Anchor
      component={Link}
      href={item.href}
      style={linkStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="font-medium"
    >
      {item.icon}
      <span>{t(item.label)}</span>
      {item.badge && (
        <Badge
          size="xs"
          color="red"
          variant="filled"
          style={{ marginLeft: 'auto' }}
        >
          {item.badge}
        </Badge>
      )}
    </Anchor>
  );
};

// Composant Logo amélioré avec animation
const Logo: React.FC = () => {
  const { isDark, gradients, transitions } = useAppTheme();
  const [isHovered, setIsHovered] = useState(false);

  const logoStyles = useMemo(
    () => ({
      fontSize: '1.75rem',
      fontWeight: 800,
      background: isHovered
        ? gradients.health
        : 'linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textDecoration: 'none',
      transition: transitions.normal,
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    }),
    [isHovered, gradients, transitions]
  );

  return (
    <Anchor
      component={Link}
      href="/"
      style={logoStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="font-extrabold"
    >
      <IconHeart
        size={28}
        style={{
          color: isHovered
            ? 'var(--mantine-color-green-6)'
            : 'var(--mantine-color-blue-6)',
          transition: transitions.normal,
        }}
      />
      <span>Limitless Health</span>
    </Anchor>
  );
};

// Composant pour le menu mobile
const MobileMenu: React.FC<{
  opened: boolean;
  onClose: () => void;
  navItems: NavItem[];
  pathname: string;
}> = ({ opened, onClose, navItems, pathname }) => {
  const { t } = useTranslation();
  const { isDark, colors } = useAppTheme();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      size="100%"
      padding="md"
      title={
        <Group gap="sm">
          <IconHeart size={24} style={{ color: colors.primary }} />
          <Text fw={700} size="lg">
            Limitless Health
          </Text>
        </Group>
      }
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      styles={{
        header: {
          background: isDark ? 'var(--mantine-color-dark-7)' : 'white',
          borderBottom: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-2)'}`,
        },
        content: {
          background: isDark
            ? 'var(--mantine-color-dark-8)'
            : 'var(--mantine-color-gray-0)',
        },
      }}
    >
      <ScrollArea h="calc(100vh - 80px)">
        <Stack gap="md" mt="xl">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              onClick={onClose}
            />
          ))}

          <Divider my="md" />

          <Group justify="center" gap="md">
            <Paper p="xs" withBorder radius="md">
              <LanguageSwitcher />
            </Paper>
            <Paper p="xs" withBorder radius="md">
              <ThemeSwitcher />
            </Paper>
          </Group>
        </Stack>
      </ScrollArea>
    </Drawer>
  );
};

// Composant principal AppNavbar
export function AppNavbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { isDark, colors, transitions } = useAppTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpened, setMobileOpened] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems: NavItem[] = useMemo(
    () => [
      {
        href: '/',
        label: 'welcome',
        icon: <IconHome size={18} />,
        description: "Accueil de l'application",
      },
      {
        href: '/dashboard',
        label: 'dashboard.title',
        icon: <IconDashboard size={18} />,
        description: 'Tableau de bord santé',
      },
      {
        href: '/profile',
        label: 'navigation.profile',
        icon: <IconUser size={18} />,
        description: 'Profil utilisateur',
      },
      {
        href: '/ai-doctor',
        label: 'aiDoctor',
        icon: <IconBrain size={18} />,
        description: 'Assistant IA santé',
        badge: 'IA',
      },
      {
        href: '/settings',
        label: 'settings.title',
        icon: <IconSettings size={18} />,
        description: 'Paramètres',
      },
    ],
    []
  );

  const navbarStyles = useMemo(
    () => ({
      position: 'sticky' as const,
      top: 0,
      zIndex: 1000,
      background: isDark
        ? 'rgba(26, 27, 30, 0.95)'
        : 'rgba(255, 255, 255, 0.95)',
      borderBottom: isDark
        ? '1px solid var(--mantine-color-dark-4)'
        : '1px solid var(--mantine-color-gray-2)',
      backdropFilter: 'blur(20px)',
      boxShadow: isDark
        ? '0 8px 32px rgba(0, 0, 0, 0.3)'
        : '0 8px 32px rgba(0, 0, 0, 0.08)',
      transition: transitions.normal,
    }),
    [isDark, transitions]
  );

  const controlPaperStyles = useMemo(
    () => ({
      background: isDark
        ? 'var(--mantine-color-dark-5)'
        : 'var(--mantine-color-gray-0)',
      border: isDark
        ? '1px solid var(--mantine-color-dark-4)'
        : '1px solid var(--mantine-color-gray-2)',
      transition: transitions.normal,
    }),
    [isDark, transitions]
  );

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Box component="nav" style={navbarStyles}>
        <Container size="xl" py="md">
          <Group justify="space-between" align="center">
            <Logo />

            {/* Navigation desktop */}
            <Group
              style={{ flex: 1, justifyContent: 'center' }}
              gap="md"
              visibleFrom="md"
            >
              {navItems.map((item) => (
                <Tooltip
                  key={item.href}
                  label={item.description}
                  position="bottom"
                  withArrow
                  openDelay={500}
                >
                  <Box>
                    <NavLink item={item} isActive={pathname === item.href} />
                  </Box>
                </Tooltip>
              ))}
            </Group>

            {/* Contrôles desktop */}
            <Group style={{ flexShrink: 0 }} gap="sm" visibleFrom="md">
              <Paper p="xs" style={controlPaperStyles} withBorder radius="md">
                <LanguageSwitcher />
              </Paper>
              <Paper p="xs" style={controlPaperStyles} withBorder radius="md">
                <ThemeSwitcher />
              </Paper>
            </Group>

            {/* Bouton mobile */}
            <Burger
              opened={mobileOpened}
              onClick={() => setMobileOpened(!mobileOpened)}
              hiddenFrom="md"
              size="sm"
              color={
                isDark
                  ? 'var(--mantine-color-gray-3)'
                  : 'var(--mantine-color-gray-7)'
              }
            />
          </Group>
        </Container>
      </Box>

      {/* Menu mobile */}
      <MobileMenu
        opened={mobileOpened}
        onClose={() => setMobileOpened(false)}
        navItems={navItems}
        pathname={pathname}
      />
    </>
  );
}
