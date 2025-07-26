"use client";

import React from 'react';
import { Card, Text, Stack } from '@mantine/core';

interface UserInfoProps {
  user: { name: string; email: string } | null;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  if (!user) return null;

  return (
    <Card withBorder p="md">
      <Stack gap="sm">
        <Text size="sm" fw={500}>Utilisateur connecté:</Text>
        <Text size="sm" c="dimmed">
          {user.name} ({user.email})
        </Text>
      </Stack>
    </Card>
  );
}; 