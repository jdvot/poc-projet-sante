'use client';

import {
  UnstyledButton,
  Text,
  Group,
  Avatar,
  rem,
  Menu,
  Box,
  Badge,
  Divider,
} from '@mantine/core';
import {
  IconChevronRight,
  IconUser,
  IconSettings,
  IconLogout,
  IconCrown,
  IconShield,
  IconHeart,
} from '@tabler/icons-react';
import { useAuthStore } from '../stores/authStore';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { useAppTheme } from '../hooks/useAppTheme';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import classes from './UserButton.module.css';

export function UserButton() {
  const { user, isAuthenticated } = useAuthStore();
  const { signOutUser } = useFirebaseAuth();
  const { isDark, colors, transitions } = useAppTheme();
  const { t } = useTranslation();

  if (!isAuthenticated || !user) {
    return null;
  }

  // Styles pour le bouton utilisateur
  const userButtonStyles = {
    background: isDark
      ? 'linear-gradient(135deg, var(--mantine-color-dark-5), var(--mantine-color-dark-4))'
      : 'linear-gradient(135deg, var(--mantine-color-white), var(--mantine-color-gray-0))',
    border: `1.5px solid ${isDark ? 'var(--mantine-color-dark-3)' : 'var(--mantine-color-gray-2)'}`,
    borderRadius: '1rem',
    padding: '0.875rem',
    transition: transitions.normal,
    boxShadow: isDark
      ? '0 2px 8px rgba(0, 0, 0, 0.2)'
      : '0 2px 8px rgba(0, 0, 0, 0.06)',
    '&:hover': {
      background: isDark
        ? 'linear-gradient(135deg, var(--mantine-color-dark-4), var(--mantine-color-dark-3))'
        : 'linear-gradient(135deg, var(--mantine-color-gray-0), var(--mantine-color-gray-1))',
      transform: 'translateY(-1px)',
      boxShadow: isDark
        ? '0 4px 12px rgba(0, 0, 0, 0.3)'
        : '0 4px 12px rgba(0, 0, 0, 0.1)',
      border: `1.5px solid ${isDark ? 'var(--mantine-color-dark-2)' : 'var(--mantine-color-gray-1)'}`,
    },
  };

  // Styles pour le dropdown
  const dropdownStyles = {
    background: isDark
      ? 'var(--mantine-color-dark-6)'
      : 'var(--mantine-color-white)',
    border: `1.5px solid ${isDark ? 'var(--mantine-color-dark-3)' : 'var(--mantine-color-gray-2)'}`,
    borderRadius: '1rem',
    boxShadow: isDark
      ? '0 8px 25px rgba(0, 0, 0, 0.4)'
      : '0 8px 25px rgba(0, 0, 0, 0.15)',
    padding: '0.5rem',
    backdropFilter: 'blur(10px)',
  };

  // Styles pour les items du menu
  const menuItemStyles = {
    borderRadius: '0.75rem',
    margin: '0.125rem',
    padding: '0.75rem 1rem',
    transition: transitions.normal,
    fontWeight: 600,
    fontSize: '0.875rem',
    '&:hover': {
      background: isDark
        ? 'var(--mantine-color-dark-4)'
        : 'var(--mantine-color-gray-0)',
      transform: 'translateX(2px)',
    },
  };

  return (
    <Menu shadow="md" width={240} position="bottom-end" zIndex={200}>
      <Menu.Target>
        <UnstyledButton style={userButtonStyles} className={classes.user}>
          <Group gap="sm">
            <Avatar
              src={null}
              size="lg"
              radius="xl"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.info})`,
                boxShadow: `0 2px 8px rgba(59, 130, 246, 0.3)`,
                border: `2px solid ${isDark ? 'var(--mantine-color-dark-2)' : 'white'}`,
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>

            <div style={{ flex: 1, minWidth: 0 }}>
              <Group gap="xs" align="center" mb={4} wrap="nowrap">
                <Text
                  size="sm"
                  fw={700}
                  style={{
                    color: isDark
                      ? 'var(--mantine-color-gray-1)'
                      : 'var(--mantine-color-gray-9)',
                  }}
                  truncate
                >
                  {user.name}
                </Text>
                <Badge
                  size="xs"
                  variant="filled"
                  color="yellow"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.75rem',
                    background: isDark
                      ? 'var(--mantine-color-yellow-6)'
                      : 'var(--mantine-color-yellow-5)',
                    color: isDark
                      ? 'var(--mantine-color-dark-9)'
                      : 'var(--mantine-color-white)',
                    border: `1px solid ${
                      isDark
                        ? 'var(--mantine-color-yellow-5)'
                        : 'var(--mantine-color-yellow-6)'
                    }`,
                    boxShadow: isDark
                      ? '0 2px 4px rgba(0, 0, 0, 0.2)'
                      : '0 2px 4px rgba(0, 0, 0, 0.1)',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    lineHeight: 1,
                    minHeight: '1.5rem',
                  }}
                >
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <IconCrown size={12} />
                    <Text size="xs" fw={700} style={{ marginLeft: '0.25rem' }}>
                      PRO
                    </Text>
                  </Box>
                </Badge>
              </Group>

              <Text
                c="dimmed"
                size="xs"
                style={{
                  opacity: 0.8,
                  fontWeight: 500,
                }}
                truncate
              >
                {user.email}
              </Text>
            </div>

            <IconChevronRight
              style={{
                width: rem(16),
                height: rem(16),
                color: isDark
                  ? 'var(--mantine-color-gray-4)'
                  : 'var(--mantine-color-gray-6)',
                transition: transitions.normal,
                flexShrink: 0,
              }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown style={dropdownStyles}>
        {/* Header du menu */}
        <Box p="md" style={{ textAlign: 'center' }}>
          <Text
            size="xs"
            c="dimmed"
            fw={600}
            style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            {t('user.account', 'Compte utilisateur')}
          </Text>
        </Box>

        <Divider
          my="xs"
          color={
            isDark
              ? 'var(--mantine-color-dark-3)'
              : 'var(--mantine-color-gray-3)'
          }
          opacity={0.5}
        />

        {/* Menu items */}
        <Menu.Item
          leftSection={<IconUser size={16} style={{ color: colors.primary }} />}
          component={Link}
          href="/profile"
          style={menuItemStyles}
        >
          <Group gap="sm" align="center" justify="space-between">
            <Text size="sm" fw={600}>
              {t('user.profile', 'Mon profil')}
            </Text>
            <Badge
              size="xs"
              variant="light"
              color="blue"
              style={{
                fontSize: '0.625rem',
                fontWeight: 600,
                padding: '0.125rem 0.375rem',
                borderRadius: '0.5rem',
                flexShrink: 0,
              }}
            >
              {t('user.manage', 'Gérer')}
            </Badge>
          </Group>
        </Menu.Item>

        <Menu.Item
          leftSection={
            <IconSettings size={16} style={{ color: colors.info }} />
          }
          component={Link}
          href="/settings"
          style={menuItemStyles}
        >
          <Group gap="sm" align="center" justify="space-between">
            <Text size="sm" fw={600}>
              {t('user.settings', 'Paramètres')}
            </Text>
            <Badge
              size="xs"
              variant="light"
              color="grape"
              style={{
                fontSize: '0.625rem',
                fontWeight: 600,
                padding: '0.125rem 0.375rem',
                borderRadius: '0.5rem',
                flexShrink: 0,
              }}
            >
              {t('user.configure', 'Configurer')}
            </Badge>
          </Group>
        </Menu.Item>

        <Divider
          my="xs"
          color={
            isDark
              ? 'var(--mantine-color-dark-3)'
              : 'var(--mantine-color-gray-3)'
          }
          opacity={0.5}
        />

        <Menu.Item
          leftSection={
            <IconLogout
              size={16}
              style={{ color: 'var(--mantine-color-red-6)' }}
            />
          }
          color="red"
          onClick={signOutUser}
          style={{
            ...menuItemStyles,
            '&:hover': {
              background: 'var(--mantine-color-red-0)',
              transform: 'translateX(2px)',
            },
          }}
        >
          <Group gap="sm" align="center" justify="space-between">
            <Text size="sm" fw={600} c="red">
              {t('user.logout', 'Se déconnecter')}
            </Text>
            <Badge
              size="xs"
              variant="light"
              color="red"
              style={{
                fontSize: '0.625rem',
                fontWeight: 600,
                padding: '0.125rem 0.375rem',
                borderRadius: '0.5rem',
                flexShrink: 0,
              }}
            >
              {t('user.exit', 'Quitter')}
            </Badge>
          </Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
