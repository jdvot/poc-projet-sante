import React from 'react';
import { Container, Title, Text, Button, Stack } from '@mantine/core';

const Home = () => {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl" align="center">
        <Title order={1} ta="center">
          🏥 Limitless Health
        </Title>
        
        <Text size="lg" ta="center" c="dimmed">
          POC HealthTech - Dashboard santé moderne avec toutes les technologies d&apos;entreprise
        </Text>

        <Stack gap="md" align="center">
          <Text size="md" ta="center">
            ✅ Next.js 15 + TypeScript + React 19<br/>
            ✅ Mantine UI + Dark/Light Mode<br/>
            ✅ i18next (FR/EN) + Zustand<br/>
            ✅ TanStack Query + React Hook Form<br/>
            ✅ Vitest + Cypress + Storybook<br/>
            ✅ ESLint + Prettier + Husky<br/>
            ✅ Sentry + Docker
          </Text>
        </Stack>

        <Stack gap="sm" align="center">
          <Button size="lg" component="a" href="/dashboard">
            Voir le Dashboard
          </Button>
          <Button variant="outline" size="md" component="a" href="/ai-doctor">
            AI Doctor
          </Button>
          <Button variant="outline" size="md" component="a" href="/profile">
            Profil Santé
          </Button>
        </Stack>

        <Text size="sm" c="dimmed" ta="center">
          Structure feature-based • Prêt pour scale-up • Démo-ready
        </Text>
      </Stack>
    </Container>
  );
};

export default Home;
