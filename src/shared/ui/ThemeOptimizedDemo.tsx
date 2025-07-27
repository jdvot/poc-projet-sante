'use client';

import React from 'react';
import {
  Box,
  Title,
  Text,
  Stack,
  Group,
  Grid,
  Badge,
  Divider,
  Container,
} from '@mantine/core';
import {
  IconPalette,
  IconCheck,
  IconX,
  IconInfoCircle,
  IconSparkles,
} from '@tabler/icons-react';
import { useAppTheme } from '../hooks/useAppTheme';
import { ThemedCard } from './ThemedCard';
import { ThemedButton } from './ThemedButton';
import { ThemedPaper } from './ThemedPaper';

export const ThemeOptimizedDemo: React.FC = () => {
  const { isDark, colors, gradients, spacing, radius, transitions } =
    useAppTheme();

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* En-tête avec gradient thématisé */}
        <ThemedPaper variant="gradient" gradientType="health">
          <Stack gap="md" align="center">
            <Group gap="xs">
              <IconSparkles size={32} style={{ color: 'white' }} />
              <Title order={1} c="white">
                Démonstration du Thème Optimisé
              </Title>
              <IconSparkles size={32} style={{ color: 'white' }} />
            </Group>
            <Text size="lg" c="white" opacity={0.9}>
              Exemples des meilleures pratiques d&apos;utilisation du thème
            </Text>
            <Badge size="lg" variant="white" color="white">
              Thème actuel : {isDark ? '🌙 Sombre' : '☀️ Clair'}
            </Badge>
          </Stack>
        </ThemedPaper>

        {/* Section des composants thématisés */}
        <ThemedCard variant="elevated">
          <Stack gap="lg">
            <Title order={2} c="blue">
              <IconPalette size={24} style={{ marginRight: '0.5rem' }} />
              Composants Thématisés
            </Title>

            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="md">
                  <Text fw={600}>ThemedCard</Text>
                  <ThemedCard>
                    <Text>Carte avec style adaptatif automatique</Text>
                  </ThemedCard>

                  <Text fw={600}>ThemedButton</Text>
                  <Group>
                    <ThemedButton variant="primary">Primaire</ThemedButton>
                    <ThemedButton variant="health">Santé</ThemedButton>
                    <ThemedButton variant="medical">Médical</ThemedButton>
                  </Group>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="md">
                  <Text fw={600}>ThemedPaper</Text>
                  <ThemedPaper variant="gradient" gradientType="accent">
                    <Text c="white">Papier avec gradient</Text>
                  </ThemedPaper>

                  <Text fw={600}>Styles conditionnels</Text>
                  <Box
                    style={{
                      background: isDark
                        ? 'var(--mantine-color-dark-7)'
                        : 'white',
                      border: isDark
                        ? '1px solid var(--mantine-color-dark-4)'
                        : '1px solid var(--mantine-color-gray-3)',
                      borderRadius: 'var(--mantine-radius-lg)',
                      boxShadow: 'var(--mantine-shadow-sm)',
                      transition: 'all 0.2s ease',
                      padding: 'var(--mantine-spacing-md)',
                    }}
                  >
                    <Text>Style généré par getCardStyle()</Text>
                  </Box>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </ThemedCard>

        {/* Section des couleurs et gradients */}
        <ThemedCard>
          <Stack gap="lg">
            <Title order={2} c="green">
              Couleurs et Gradients
            </Title>

            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="sm">
                  <Text fw={600}>Couleurs sémantiques</Text>
                  <Group>
                    <Badge
                      color="green"
                      style={{ backgroundColor: colors.success }}
                    >
                      Succès
                    </Badge>
                    <Badge
                      color="yellow"
                      style={{ backgroundColor: colors.warning }}
                    >
                      Avertissement
                    </Badge>
                    <Badge
                      color="red"
                      style={{ backgroundColor: colors.error }}
                    >
                      Erreur
                    </Badge>
                  </Group>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="sm">
                  <Text fw={600}>Gradients disponibles</Text>
                  <Box
                    style={{
                      background: gradients.primary,
                      borderRadius: 'var(--mantine-radius-lg)',
                      transition: 'all 0.2s ease',
                      padding: 'var(--mantine-spacing-sm)',
                    }}
                    p="sm"
                  >
                    <Text c="white" size="sm">
                      Primary
                    </Text>
                  </Box>
                  <Box
                    style={{
                      background: gradients.health,
                      borderRadius: 'var(--mantine-radius-lg)',
                      transition: 'all 0.2s ease',
                      padding: 'var(--mantine-spacing-sm)',
                    }}
                    p="sm"
                  >
                    <Text c="white" size="sm">
                      Health
                    </Text>
                  </Box>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="sm">
                  <Text fw={600}>Variables CSS Mantine</Text>
                  <Box
                    style={{
                      background: 'var(--mantine-color-blue-6)',
                      color: 'white',
                      padding: 'var(--mantine-spacing-sm)',
                      borderRadius: 'var(--mantine-radius-md)',
                    }}
                  >
                    <Text size="sm">Variable CSS</Text>
                  </Box>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </ThemedCard>

        {/* Section des bonnes pratiques */}
        <ThemedCard>
          <Stack gap="lg">
            <Title order={2} c="purple">
              Bonnes Pratiques
            </Title>

            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="md">
                  <Group gap="xs">
                    <IconCheck size={20} style={{ color: colors.success }} />
                    <Text fw={600}>✅ À faire</Text>
                  </Group>
                  <Stack gap="xs" pl="md">
                    <Text size="sm">• Utiliser useAppTheme()</Text>
                    <Text size="sm">• Utiliser les composants thématisés</Text>
                    <Text size="sm">• Utiliser les variables CSS Mantine</Text>
                    <Text size="sm">• Utiliser les fonctions utilitaires</Text>
                    <Text size="sm">• Éviter les couleurs hardcodées</Text>
                  </Stack>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="md">
                  <Group gap="xs">
                    <IconX size={20} style={{ color: colors.error }} />
                    <Text fw={600}>❌ À éviter</Text>
                  </Group>
                  <Stack gap="xs" pl="md">
                    <Text size="sm">• useMantineColorScheme() directement</Text>
                    <Text size="sm">• Couleurs hardcodées (#fff, #000)</Text>
                    <Text size="sm">• Styles inline complexes</Text>
                    <Text size="sm">• Logique dupliquée</Text>
                    <Text size="sm">• Classes CSS personnalisées</Text>
                  </Stack>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </ThemedCard>

        {/* Section des transitions */}
        <ThemedCard>
          <Stack gap="lg">
            <Title order={2} c="orange">
              Transitions et Animations
            </Title>

            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box
                  style={{
                    background: colors.primary,
                    color: 'white',
                    padding: 'var(--mantine-spacing-md)',
                    borderRadius: radius.card,
                    transition: transitions.fast,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Text>Transition rapide</Text>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box
                  style={{
                    background: colors.success,
                    color: 'white',
                    padding: 'var(--mantine-spacing-md)',
                    borderRadius: radius.card,
                    transition: transitions.normal,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Text>Transition normale</Text>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box
                  style={{
                    background: colors.warning,
                    color: 'white',
                    padding: 'var(--mantine-spacing-md)',
                    borderRadius: radius.card,
                    transition: transitions.slow,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <Text>Transition lente</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Stack>
        </ThemedCard>

        {/* Section d'information */}
        <ThemedPaper variant="gradient" gradientType="secondary">
          <Group gap="md">
            <IconInfoCircle size={24} style={{ color: 'white' }} />
            <Box>
              <Text c="white" fw={600}>
                Informations sur l&apos;optimisation
              </Text>
              <Text c="white" size="sm" opacity={0.9}>
                Ce composant démontre les meilleures pratiques
                d&apos;utilisation du thème. Tous les styles s&apos;adaptent
                automatiquement au thème clair/sombre.
              </Text>
            </Box>
          </Group>
        </ThemedPaper>
      </Stack>
    </Container>
  );
};
