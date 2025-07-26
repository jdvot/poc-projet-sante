import React from 'react';
import { Container, Title, Card, Text, Stack, Button } from '@mantine/core';

const Auth = () => {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={1}>🔐 Authentification</Title>
        
        <Card withBorder p="xl">
          <Stack gap="md">
            <Text size="lg" ta="center" c="dimmed">
              Système d&apos;authentification
            </Text>
            
            <Text size="md">
              ✅ Mock authentication<br/>
              ✅ User session management<br/>
              ✅ Zustand auth store<br/>
              ✅ Protected routes
            </Text>
            
            <Text size="sm" c="dimmed" ta="center">
              Authentification mock pour POC<br/>
              Prêt pour intégration OAuth/SSO
            </Text>
            
            <Button variant="outline" component="a" href="/dashboard">
              Accéder au Dashboard
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export default Auth;
