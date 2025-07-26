"use client";

import React from 'react';
import { Card, Title, Group, Badge, Button, Text, Box } from '@mantine/core';
import { useAuthStore } from '../../stores/authStore';

export function AuthStoreDemo() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  const handleLogin = () => {
    login({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    });
  };

  return (
    <Card 
      shadow="lg" 
      padding="xl" 
      radius="lg" 
      withBorder
      style={{
        background: 'var(--mantine-color-body)',
        border: '1px solid var(--mantine-color-gray-3)',
      }}
    >
      <Title order={3} mb="lg" style={{ color: 'var(--mantine-color-blue-6)' }}>
        Authentication Store
      </Title>
      <Group gap="lg" align="center" justify="space-between">
        <Group gap="md" align="center">
          <Box>
            Status: <Badge 
              color={isAuthenticated ? 'green' : 'red'}
              size="lg"
              style={{ fontWeight: 600 }}
            >
              {isAuthenticated ? 'Connected' : 'Disconnected'}
            </Badge>
          </Box>
          {user && (
            <Text style={{ fontWeight: 500 }}>
              User: {user.name} ({user.email})
            </Text>
          )}
        </Group>
        <Group gap="sm">
          {!isAuthenticated ? (
            <Button 
              onClick={handleLogin}
              variant="filled"
              color="blue"
              size="sm"
            >
              Login
            </Button>
          ) : (
            <Button 
              onClick={logout}
              variant="outline"
              color="red"
              size="sm"
            >
              Logout
            </Button>
          )}
        </Group>
      </Group>
    </Card>
  );
} 