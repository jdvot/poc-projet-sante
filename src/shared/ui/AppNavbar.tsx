"use client";

import React, { useMemo, useCallback } from 'react';
import { Group, Anchor, Stack, Container, Box, Transition } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

// Types pour une meilleure type safety
interface NavItem {
  href: string;
  label: string;
  icon?: string;
}

// Styles extraits pour éviter les recréations d'objets
const navbarStyles = {
  nav: {
    position: 'sticky' as const,
    top: 0,
    zIndex: 99,
    background: 'var(--mantine-color-body)',
    borderBottom: '1px solid var(--mantine-color-gray-3)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--mantine-color-blue-6)',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  logoHover: {
    transform: 'scale(1.05)',
    color: 'var(--mantine-color-blue-7)',
  },
  logoNormal: {
    transform: 'scale(1)',
    color: 'var(--mantine-color-blue-6)',
  },
  navContainer: {
    flex: 1,
    justifyContent: 'center' as const,
  },
  controls: {
    flexShrink: 0,
  },
};

// Composant pour un élément de navigation individuel
interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ item, isActive }) => {
  const { t } = useTranslation();

  const linkStyles = useMemo(() => ({
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    position: 'relative' as const,
    color: isActive 
      ? 'var(--mantine-color-blue-6)' 
      : 'var(--mantine-color-gray-7)',
    background: isActive 
      ? 'var(--mantine-color-blue-0)' 
      : 'transparent',
    border: isActive 
      ? '1px solid var(--mantine-color-blue-3)' 
      : '1px solid transparent',
  }), [isActive]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isActive) {
      e.currentTarget.style.background = 'var(--mantine-color-gray-0)';
      e.currentTarget.style.color = 'var(--mantine-color-gray-9)';
      e.currentTarget.style.transform = 'translateY(-1px)';
    }
  }, [isActive]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isActive) {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.color = 'var(--mantine-color-gray-7)';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, [isActive]);

  return (
    <Anchor
      component={Link}
      href={item.href}
      style={linkStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-current={isActive ? 'page' : undefined}
      aria-label={`${item.label}${isActive ? ' (page actuelle)' : ''}`}
    >
      {item.label}
      {isActive && (
        <Box
          style={{
            position: 'absolute',
            bottom: '-1px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '20px',
            height: '2px',
            background: 'var(--mantine-color-blue-6)',
            borderRadius: '1px',
          }}
          aria-hidden="true"
        />
      )}
    </Anchor>
  );
};

// Composant pour le logo
const Logo: React.FC = () => {
  const { t } = useTranslation();

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = navbarStyles.logoHover.transform;
    e.currentTarget.style.color = navbarStyles.logoHover.color;
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = navbarStyles.logoNormal.transform;
    e.currentTarget.style.color = navbarStyles.logoNormal.color;
  }, []);

  return (
    <Anchor 
      component={Link} 
      href="/"
      style={navbarStyles.logo}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={t('navigation.home', 'Accueil - Limitless Health')}
    >
      🏥 Limitless Health
    </Anchor>
  );
};

export function AppNavbar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  // Utilisation de useMemo pour éviter les recalculs inutiles
  const navItems = useMemo<NavItem[]>(() => [
    { href: '/', label: t('welcome') },
    { href: '/dashboard', label: t('dashboard') },
    { href: '/ai-doctor', label: t('aiDoctor') },
    { href: '/profile', label: t('profile') },
    { href: '/settings', label: t('settings') },
    { href: '/auth', label: t('auth') },
  ], [t]);

  // Filtrage des éléments de navigation (exclure la page d'accueil de la navigation principale)
  const mainNavItems = useMemo(() => navItems.slice(1), [navItems]);

  return (
    <Box
      component="nav"
      aria-label={t('navigation.main', 'Navigation principale')}
      style={navbarStyles.nav}
    >
      <Container size="xl">
        <Group gap="lg" p="md" justify="space-between" align="center">
          {/* Logo/Brand */}
          <Logo />

          {/* Navigation Links */}
          <Group gap="xs" style={navbarStyles.navContainer}>
            {mainNavItems.map((item) => (
              <NavLink 
                key={item.href} 
                item={item} 
                isActive={pathname === item.href} 
              />
            ))}
          </Group>
          
          {/* Controls */}
          <Group gap="sm" style={navbarStyles.controls}>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
