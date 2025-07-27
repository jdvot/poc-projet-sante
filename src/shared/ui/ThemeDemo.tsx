'use client';

import React from 'react';
import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Grid,
  Badge,
} from '@mantine/core';
import { useAppTheme } from '../hooks/useAppTheme';
import { ThemedCard } from './ThemedCard';
import { ThemedButton } from './ThemedButton';
import { ThemedPaper } from './ThemedPaper';

export const ThemeDemo: React.FC = () => {
  const {
    colorScheme,
    toggleColorScheme,
    gradients,
    colors,
    spacing,
    radius,
    transitions,
    isDark,
    isLight,
  } = useAppTheme();

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <ThemedPaper variant="gradient" gradientType="primary">
          <Stack gap="md" align="center">
            <Title order={1} ta="center" c="white">
              🎨 Démonstration du Thème Partagé
            </Title>
            <Text ta="center" c="white" size="lg">
              Thème actuel : {colorScheme} {isDark ? '🌙' : '☀️'}
            </Text>
            <ThemedButton
              variant="outline"
              onClick={toggleColorScheme}
              style={{ color: 'white', borderColor: 'white' }}
            >
              Basculer le thème
            </ThemedButton>
          </Stack>
        </ThemedPaper>

        {/* Composants thématisés */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ThemedCard variant="default">
              <Stack gap="md">
                <Title order={3}>Carte par défaut</Title>
                <Text>
                  Cette carte utilise le style par défaut du thème avec des
                  couleurs adaptatives selon le mode clair/sombre.
                </Text>
                <Group>
                  <ThemedButton variant="primary">Primaire</ThemedButton>
                  <ThemedButton variant="secondary">Secondaire</ThemedButton>
                </Group>
              </Stack>
            </ThemedCard>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <ThemedCard variant="elevated">
              <Stack gap="md">
                <Title order={3}>Carte élevée</Title>
                <Text>
                  Cette carte a un effet d&apos;élévation avec ombre et
                  transformation.
                </Text>
                <Group>
                  <ThemedButton variant="health">Santé</ThemedButton>
                  <ThemedButton variant="medical">Médical</ThemedButton>
                </Group>
              </Stack>
            </ThemedCard>
          </Grid.Col>
        </Grid>

        {/* Gradients */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <ThemedPaper variant="gradient" gradientType="primary">
              <Stack gap="md" align="center">
                <Title order={3} c="white">
                  Gradient Primaire
                </Title>
                <Text c="white" ta="center">
                  Bleu vers Cyan
                </Text>
              </Stack>
            </ThemedPaper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <ThemedPaper variant="gradient" gradientType="health">
              <Stack gap="md" align="center">
                <Title order={3} c="white">
                  Gradient Santé
                </Title>
                <Text c="white" ta="center">
                  Santé vers Bien-être
                </Text>
              </Stack>
            </ThemedPaper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <ThemedPaper variant="gradient" gradientType="medical">
              <Stack gap="md" align="center">
                <Title order={3} c="white">
                  Gradient Médical
                </Title>
                <Text c="white" ta="center">
                  Médical vers Rouge
                </Text>
              </Stack>
            </ThemedPaper>
          </Grid.Col>
        </Grid>

        {/* Couleurs sémantiques */}
        <ThemedCard>
          <Stack gap="lg">
            <Title order={2}>Couleurs Sémantiques</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Stack gap="sm" align="center">
                  <Badge color="green" size="lg">
                    Succès
                  </Badge>
                  <Text size="sm" ta="center">
                    {colors.success}
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Stack gap="sm" align="center">
                  <Badge color="yellow" size="lg">
                    Avertissement
                  </Badge>
                  <Text size="sm" ta="center">
                    {colors.warning}
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Stack gap="sm" align="center">
                  <Badge color="red" size="lg">
                    Erreur
                  </Badge>
                  <Text size="sm" ta="center">
                    {colors.error}
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Stack gap="sm" align="center">
                  <Badge color="blue" size="lg">
                    Info
                  </Badge>
                  <Text size="sm" ta="center">
                    {colors.info}
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </ThemedCard>

        {/* Espacements et rayons */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ThemedCard>
              <Stack gap="md">
                <Title order={3}>Espacements</Title>
                <Stack gap="xs">
                  <Text>Section: {spacing.section}</Text>
                  <Text>Page: {spacing.page}</Text>
                  <Text>Carte: {spacing.card}</Text>
                </Stack>
              </Stack>
            </ThemedCard>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <ThemedCard>
              <Stack gap="md">
                <Title order={3}>Rayons</Title>
                <Stack gap="xs">
                  <Text>Carte: {radius.card}</Text>
                  <Text>Bouton: {radius.button}</Text>
                  <Text>Input: {radius.input}</Text>
                </Stack>
              </Stack>
            </ThemedCard>
          </Grid.Col>
        </Grid>

        {/* Transitions */}
        <ThemedCard>
          <Stack gap="lg">
            <Title order={2}>Transitions</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <ThemedButton
                  variant="primary"
                  fullWidth
                  style={{ transition: transitions.fast }}
                >
                  Rapide ({transitions.fast})
                </ThemedButton>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <ThemedButton
                  variant="secondary"
                  fullWidth
                  style={{ transition: transitions.normal }}
                >
                  Normal ({transitions.normal})
                </ThemedButton>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <ThemedButton
                  variant="accent"
                  fullWidth
                  style={{ transition: transitions.slow }}
                >
                  Lent ({transitions.slow})
                </ThemedButton>
              </Grid.Col>
            </Grid>
          </Stack>
        </ThemedCard>

        {/* Informations sur le thème */}
        <ThemedCard>
          <Stack gap="md">
            <Title order={2}>Informations sur le Thème</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="sm">
                  <Text>
                    <strong>Mode actuel:</strong> {colorScheme}
                  </Text>
                  <Text>
                    <strong>Est sombre:</strong> {isDark ? 'Oui' : 'Non'}
                  </Text>
                  <Text>
                    <strong>Est clair:</strong> {isLight ? 'Oui' : 'Non'}
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="sm">
                  <Text>
                    <strong>Gradients disponibles:</strong>
                  </Text>
                  <Text size="sm">• Primaire: {gradients.primary}</Text>
                  <Text size="sm">• Santé: {gradients.health}</Text>
                  <Text size="sm">• Médical: {gradients.medical}</Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </ThemedCard>
      </Stack>
    </Container>
  );
};
