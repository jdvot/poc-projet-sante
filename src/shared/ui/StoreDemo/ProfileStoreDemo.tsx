'use client';

import React from 'react';
import { Card, Title, Group, Button, Text, Badge, Stack } from '@mantine/core';
import { useProfileStore } from '../../stores/profileStore';

export function ProfileStoreDemo() {
  const { profile, setProfile, updateProfile, clearProfile } =
    useProfileStore();

  const handleCreateProfile = () => {
    setProfile({
      age: 30,
      height: 175,
      weight: 70,
      gender: 'male',
      activityLevel: 'moderate',
      medicalConditions: [],
      allergies: [],
      medications: [],
    });
  };

  const handleUpdateProfile = () => {
    updateProfile({ age: 31 });
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
      <Title
        order={3}
        mb="lg"
        style={{ color: 'var(--mantine-color-purple-6)' }}
      >
        Profile Store
      </Title>

      {profile ? (
        <Stack gap="md">
          <Group gap="md" wrap="wrap">
            <Badge color="blue" size="lg">
              Age: {profile.age} ans
            </Badge>
            <Badge color="green" size="lg">
              Height: {profile.height} cm
            </Badge>
            <Badge color="orange" size="lg">
              Weight: {profile.weight} kg
            </Badge>
            <Badge color="purple" size="lg">
              Gender: {profile.gender}
            </Badge>
            <Badge color="cyan" size="lg">
              Activity: {profile.activityLevel}
            </Badge>
          </Group>

          <Group gap="sm">
            <Button
              onClick={handleUpdateProfile}
              variant="outline"
              color="purple"
              size="sm"
            >
              Update Age
            </Button>
            <Button
              onClick={clearProfile}
              variant="outline"
              color="red"
              size="sm"
            >
              Clear Profile
            </Button>
          </Group>
        </Stack>
      ) : (
        <Group gap="sm">
          <Text c="dimmed">No profile data</Text>
          <Button
            onClick={handleCreateProfile}
            variant="filled"
            color="purple"
            size="sm"
          >
            Create Profile
          </Button>
        </Group>
      )}
    </Card>
  );
}
