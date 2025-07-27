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
  useMantineTheme,
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
  const theme = useMantineTheme();

  if (!user) return null;

  // Couleurs du thème pour l'accessibilité WCAG
  const avatarGradient = `linear-gradient(135deg, ${theme.colors.blue[6]} 0%, ${theme.colors.blue[8]} 100%)`;
  const cardGradient =
    colorScheme === 'dark'
      ? `linear-gradient(135deg, ${theme.colors.gray[8]} 0%, ${theme.colors.gray[9]} 100%)`
      : `linear-gradient(135deg, ${theme.colors.gray[0]} 0%, ${theme.colors.gray[1]} 100%)`;

  return (
    <Stack
      gap="xl"
      data-testid="user-info"
      role="region"
      aria-labelledby="user-info-title"
    >
      {/* Header */}
      <Group gap="sm">
        <Box
          p="xs"
          style={{
            background: avatarGradient,
            borderRadius: '50%',
          }}
          aria-hidden="true"
        >
          <IconUser size={20} style={{ color: 'white' }} />
        </Box>
        <Stack gap={4}>
          <Title
            id="user-info-title"
            order={3}
            size="h4"
            style={{ color: theme.colors.blue[colorScheme === 'dark' ? 4 : 7] }}
          >
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
          background: cardGradient,
          border: `1px solid ${colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[3]}`,
          borderRadius: '1rem',
        }}
        role="article"
        aria-labelledby="user-profile-name"
      >
        <Group gap="lg" align="flex-start">
          {/* Avatar Section */}
          <Box>
            <Avatar
              size="xl"
              radius="xl"
              color="blue"
              style={{
                background: avatarGradient,
                boxShadow: `0 4px 12px ${theme.colors.blue[6]}40`,
                border: `3px solid ${colorScheme === 'dark' ? theme.colors.gray[8] : 'white'}`,
              }}
              aria-label={`Avatar de ${user.name}`}
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
                  style={{ color: theme.colors.blue[6] }}
                  aria-hidden="true"
                />
                <Text
                  id="user-profile-name"
                  fw={700}
                  size="lg"
                  style={{
                    color: theme.colors.blue[colorScheme === 'dark' ? 4 : 7],
                  }}
                >
                  {user.name}
                </Text>
                <Badge
                  variant="light"
                  color="green"
                  leftSection={<IconShieldCheck size={12} />}
                  aria-label="Compte vérifié"
                >
                  Vérifié
                </Badge>
              </Group>
              <Group gap="xs" align="center">
                <IconMail
                  size={16}
                  style={{
                    color: theme.colors.gray[colorScheme === 'dark' ? 4 : 6],
                  }}
                  aria-hidden="true"
                />
                <Text
                  size="sm"
                  style={{
                    color: theme.colors.gray[colorScheme === 'dark' ? 3 : 7],
                  }}
                >
                  {user.email}
                </Text>
              </Group>
            </Box>

            {/* User Status Indicators */}
            <Group gap="md" wrap="wrap">
              <Group gap="xs">
                <IconClock
                  size={16}
                  style={{ color: theme.colors.blue[6] }}
                  aria-hidden="true"
                />
                <Text
                  size="sm"
                  style={{
                    color: theme.colors.gray[colorScheme === 'dark' ? 3 : 7],
                  }}
                >
                  Membre depuis 2024
                </Text>
              </Group>
              <Group gap="xs">
                <IconCrown
                  size={16}
                  style={{ color: theme.colors.yellow[6] }}
                  aria-hidden="true"
                />
                <Text
                  size="sm"
                  style={{
                    color: theme.colors.gray[colorScheme === 'dark' ? 3 : 7],
                  }}
                >
                  Plan Premium
                </Text>
              </Group>
            </Group>
          </Stack>
        </Group>
      </Box>
    </Stack>
  );
};
