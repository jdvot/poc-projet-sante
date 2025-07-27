import ProfileForm from '../../features/profile/ProfileForm';
import { AuthGuard } from '../../shared/components/AuthGuard';
import { Container, Title, Text, Stack } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';

export default function ProfilePage() {
  return (
    <AuthGuard>
      <Container size="xl" py="xl">
        {/* En-tête sémantique avec navigation breadcrumb */}
        <Stack gap="md" mb="xl">
          <nav aria-label="Navigation du profil">
            <Text size="sm" c="dimmed">
              Accueil / Profil utilisateur
            </Text>
          </nav>

          <header>
            <Title
              order={1}
              size="h1"
              ta="center"
              style={{
                background:
                  'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-blue-8) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              }}
            >
              <IconUser
                size={32}
                style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}
              />
              Mon Profil Santé
            </Title>
            <Text
              size="lg"
              ta="center"
              c="dimmed"
              mt="sm"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              Gérez vos informations personnelles et suivez vos indicateurs de
              santé
            </Text>
          </header>
        </Stack>

        {/* Contenu principal avec rôle main */}
        <main role="main" aria-labelledby="profile-title">
          <ProfileForm />
        </main>
      </Container>
    </AuthGuard>
  );
}
