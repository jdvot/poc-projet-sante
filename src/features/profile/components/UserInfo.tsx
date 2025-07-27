'use client';

import React from 'react';
import {
  Group,
  Text,
  Avatar,
  Stack,
  Badge,
  Box,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconUser,
  IconMail,
  IconShieldCheck,
  IconClock,
  IconCrown,
} from '@tabler/icons-react';
import { useProfileTranslations } from '../hooks/useProfileTranslations';

interface UserInfoProps {
  user: { name: string; email: string } | null;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { profileT } = useProfileTranslations();
  const { colorScheme } = useMantineColorScheme();

  if (!user) return null;

  return (
    <Stack gap="xl" data-testid="user-info">
      {/* Header */}
      <Group gap="sm">
        <Box
          p="xs"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: '50%',
          }}
        >
          <IconUser size={20} style={{ color: 'white' }} />
        </Box>
        <Stack gap={4}>
          <Title order={3} size="h4">
            {profileT.userInfo.title}
          </Title>
          <Text size="sm" c="dimmed">
            {profileT.userInfo.subtitle}
          </Text>
        </Stack>
      </Group>

      {/* User Profile Card */}
      <Box
        p="lg"
        style={{
          background:
            colorScheme === 'dark'
              ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          border:
            colorScheme === 'dark' ? '1px solid #475569' : '1px solid #cbd5e1',
          borderRadius: '1rem',
        }}
      >
        <Group gap="lg" align="flex-start">
          {/* Avatar Section */}
          <Box>
            <Avatar
              size="xl"
              radius="xl"
              color="blue"
              style={{
                background:
                  'linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                border: '3px solid white',
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </Box>

          {/* User Details Section */}
          <Stack gap="md" style={{ flex: 1 }}>
            <Box>
              <Group gap="xs" align="center" mb="xs">
                <IconUser
                  size={18}
                  style={{ color: 'var(--mantine-color-blue-6)' }}
                />
                <Text fw={700} size="lg" c="blue.6">
                  {user.name}
                </Text>
                <Badge
                  variant="light"
                  color="green"
                  leftSection={<IconShieldCheck size={12} />}
                  size="sm"
                >
                  Connecté
                </Badge>
              </Group>

              <Group gap="xs" align="center">
                <IconMail
                  size={16}
                  style={{ color: 'var(--mantine-color-dimmed)' }}
                />
                <Text size="sm" c="dimmed">
                  {user.email}
                </Text>
              </Group>
            </Box>

            {/* Status Information */}
            <Group gap="md">
              <Badge
                variant="light"
                color="blue"
                leftSection={<IconCrown size={12} />}
                size="sm"
              >
                Membre actif
              </Badge>

              <Badge variant="light" color="grape" size="sm">
                Profil en cours
              </Badge>
            </Group>

            {/* Quick Stats */}
            <Group gap="lg" mt="xs">
              <Box>
                <Text size="xs" c="dimmed" mb={2}>
                  Dernière connexion
                </Text>
                <Text size="sm" fw={500}>
                  Aujourd&apos;hui
                </Text>
              </Box>

              <Box>
                <Text size="xs" c="dimmed" mb={2}>
                  Statut du profil
                </Text>
                <Text size="sm" fw={500} c="blue.6">
                  En cours de complétion
                </Text>
              </Box>
            </Group>
          </Stack>
        </Group>
      </Box>
    </Stack>
  );
};
