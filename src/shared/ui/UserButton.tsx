'use client';

import {
  UnstyledButton,
  Text,
  Group,
  Avatar,
  rem,
  Menu,
  Box,
} from '@mantine/core';
import {
  IconChevronRight,
  IconUser,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react';
import { useAuthStore } from '../stores/authStore';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { useAppTheme } from '../hooks/useAppTheme';
import Link from 'next/link';
import classes from './UserButton.module.css';

export function UserButton() {
  const { user, isAuthenticated } = useAuthStore();
  const { signOutUser } = useFirebaseAuth();
  const { isDark, colors, transitions } = useAppTheme();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Menu shadow="md" width={220} position="bottom-end" zIndex={200}>
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar
              src={null}
              size="md"
              radius="xl"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.info})`,
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>

            <div style={{ flex: 1 }}>
              <Text
                size="sm"
                fw={500}
                style={{
                  color: isDark
                    ? 'var(--mantine-color-gray-3)'
                    : 'var(--mantine-color-gray-7)',
                }}
              >
                {user.name}
              </Text>

              <Text c="dimmed" size="xs">
                {user.email}
              </Text>
            </div>

            <IconChevronRight
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown
        style={{
          borderRadius: '1rem',
          border: isDark
            ? '1px solid var(--mantine-color-dark-4)'
            : '1px solid var(--mantine-color-gray-2)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Menu.Item
          leftSection={<IconUser size={14} />}
          component={Link}
          href="/profile"
          style={{
            borderRadius: '0.75rem',
            margin: '0.125rem',
            transition: transitions.normal,
          }}
        >
          Mon profil
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSettings size={14} />}
          component={Link}
          href="/settings"
          style={{
            borderRadius: '0.75rem',
            margin: '0.125rem',
            transition: transitions.normal,
          }}
        >
          Paramètres
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          leftSection={<IconLogout size={14} />}
          color="red"
          onClick={signOutUser}
          style={{
            borderRadius: '0.75rem',
            margin: '0.125rem',
            transition: transitions.normal,
          }}
        >
          Se déconnecter
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
