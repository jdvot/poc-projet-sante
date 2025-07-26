import React from 'react';
import { Container, Title, Card, Text, Stack, Button } from '@mantine/core';

const Settings = () => {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={1}>⚙️ Paramètres</Title>

        <Card withBorder p="xl">
          <Stack gap="md">
            <Text size="lg" ta="center" c="dimmed">
              Paramètres utilisateur
            </Text>

            <Text size="md">
              ✅ Thème: Auto (Dark/Light)
              <br />
              ✅ Langue: Français
              <br />
              ✅ Notifications: Activées
              <br />✅ Confidentialité: Standard
            </Text>

            <Text size="sm" c="dimmed" ta="center">
              Switchers de thème et langue
              <br />
              Configuration i18next + Mantine
            </Text>

            <Button variant="outline" component="a" href="/dashboard">
              Retour au Dashboard
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export default Settings;
