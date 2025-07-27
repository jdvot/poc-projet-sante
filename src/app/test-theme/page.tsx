'use client';

import {
  Box,
  Title,
  Text,
  Paper,
  Stack,
  Group,
  Grid,
  Badge,
  Button,
} from '@mantine/core';
import {
  IconCheck,
  IconPalette,
  IconSun,
  IconMoon,
  IconDeviceDesktop,
} from '@tabler/icons-react';
import { useAppTheme } from '../../shared/hooks/useAppTheme';
import { ThemeSwitcher } from '../../shared/ui/ThemeSwitcher';

export default function TestThemePage() {
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
    <Box p="md">
      <Stack gap="lg">
        {/* Header */}
        <Paper p="lg" withBorder>
          <Stack gap="md" align="center">
            <Title order={1} c="blue">
              🎨 Test de Gestion du Thème
            </Title>
            <Text size="lg" c="dimmed">
              Cette page permet de tester la gestion du thème et tous les
              composants thématisés.
            </Text>
            <Group>
              <Badge size="lg" color={isDark ? 'blue' : 'green'}>
                Thème actuel : {colorScheme}
              </Badge>
              <Badge size="lg" color={isDark ? 'dark' : 'gray'}>
                {isDark ? '🌙 Sombre' : '☀️ Clair'}
              </Badge>
            </Group>
          </Stack>
        </Paper>

        {/* Theme Switcher Test */}
        <Paper p="lg" withBorder>
          <Stack gap="md">
            <Title order={2}>
              <IconPalette size={24} style={{ marginRight: 8 }} />
              Test du Theme Switcher
            </Title>
            <Text>Utilisez les boutons ci-dessous pour changer de thème :</Text>
            <Group justify="center">
              <ThemeSwitcher />
            </Group>
            <Group justify="center">
              <Button onClick={toggleColorScheme} variant="outline">
                Basculer le thème
              </Button>
            </Group>
          </Stack>
        </Paper>

        {/* Gradients Test */}
        <Paper p="lg" withBorder>
          <Stack gap="md">
            <Title order={2}>🌈 Test des Gradients</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper
                  p="md"
                  style={{
                    background: gradients.primary,
                    borderRadius: 'var(--mantine-radius-lg)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Text c="white" ta="center" fw={600}>
                    Gradient Primaire
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper
                  p="md"
                  style={{
                    background: gradients.health,
                    borderRadius: 'var(--mantine-radius-lg)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Text c="white" ta="center" fw={600}>
                    Gradient Santé
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper
                  p="md"
                  style={{
                    background: gradients.medical,
                    borderRadius: 'var(--mantine-radius-lg)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Text c="white" ta="center" fw={600}>
                    Gradient Médical
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper
                  p="md"
                  style={{
                    background: gradients.accent,
                    borderRadius: 'var(--mantine-radius-lg)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Text c="white" ta="center" fw={600}>
                    Gradient Accent
                  </Text>
                </Paper>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>

        {/* Colors Test */}
        <Paper p="lg" withBorder>
          <Stack gap="md">
            <Title order={2}>🎨 Test des Couleurs</Title>
            <Grid>
              <Grid.Col span={{ base: 6, md: 3 }}>
                <Paper p="md" style={{ background: colors.success }}>
                  <Text c="white" ta="center" fw={600}>
                    Succès
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 3 }}>
                <Paper p="md" style={{ background: colors.warning }}>
                  <Text c="white" ta="center" fw={600}>
                    Avertissement
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 3 }}>
                <Paper p="md" style={{ background: colors.error }}>
                  <Text c="white" ta="center" fw={600}>
                    Erreur
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={{ base: 6, md: 3 }}>
                <Paper p="md" style={{ background: colors.info }}>
                  <Text c="white" ta="center" fw={600}>
                    Info
                  </Text>
                </Paper>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>

        {/* Buttons Test */}
        <Paper p="lg" withBorder>
          <Stack gap="md">
            <Title order={2}>🔘 Test des Boutons</Title>
            <Group>
              <Button
                style={{
                  background: gradients.primary,
                  borderRadius: 'var(--mantine-radius-md)',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  border: 'none',
                  color: 'white',
                }}
              >
                Bouton Primaire
              </Button>
              <Button
                style={{
                  background: gradients.health,
                  borderRadius: 'var(--mantine-radius-md)',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  border: 'none',
                  color: 'white',
                }}
              >
                Bouton Santé
              </Button>
              <Button
                style={{
                  background: gradients.medical,
                  borderRadius: 'var(--mantine-radius-md)',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  border: 'none',
                  color: 'white',
                }}
              >
                Bouton Médical
              </Button>
              <Button
                style={{
                  background: gradients.accent,
                  borderRadius: 'var(--mantine-radius-md)',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  border: 'none',
                  color: 'white',
                }}
              >
                Bouton Accent
              </Button>
            </Group>
          </Stack>
        </Paper>

        {/* Cards Test */}
        <Paper p="lg" withBorder>
          <Stack gap="md">
            <Title order={2}>🃏 Test des Cartes</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper
                  p="md"
                  withBorder
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
                  }}
                >
                  <Title order={3} mb="md">
                    Carte Standard
                  </Title>
                  <Text>
                    Cette carte utilise le style standard adaptatif au thème.
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper
                  p="md"
                  withBorder
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
                  }}
                >
                  <Title order={3} mb="md">
                    Carte avec Contenu
                  </Title>
                  <Text>
                    Une autre carte pour tester la cohérence visuelle.
                  </Text>
                </Paper>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>

        {/* Theme Info */}
        <Paper p="lg" withBorder>
          <Stack gap="md">
            <Title order={2}>📊 Informations du Thème</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="xs">
                  <Text>
                    <strong>Thème actuel :</strong> {colorScheme}
                  </Text>
                  <Text>
                    <strong>Mode sombre :</strong> {isDark ? 'Oui' : 'Non'}
                  </Text>
                  <Text>
                    <strong>Mode clair :</strong> {isLight ? 'Oui' : 'Non'}
                  </Text>
                  <Text>
                    <strong>Espacement section :</strong> {spacing.section}
                  </Text>
                  <Text>
                    <strong>Rayon carte :</strong> {radius.card}
                  </Text>
                  <Text>
                    <strong>Transition normale :</strong> {transitions.normal}
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="xs">
                  <Text>
                    <strong>Couleur primaire :</strong> {colors.primary}
                  </Text>
                  <Text>
                    <strong>Couleur succès :</strong> {colors.success}
                  </Text>
                  <Text>
                    <strong>Couleur erreur :</strong> {colors.error}
                  </Text>
                  <Text>
                    <strong>Couleur info :</strong> {colors.info}
                  </Text>
                  <Text>
                    <strong>Gradient santé :</strong>{' '}
                    {gradients.health.substring(0, 50)}...
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>

        {/* Success Message */}
        <Paper p="lg" withBorder bg="green.0">
          <Stack gap="md" align="center">
            <Title order={2} c="green">
              <IconCheck size={24} style={{ marginRight: 8 }} />
              Gestion du Thème Réussie !
            </Title>
            <Text ta="center" size="lg">
              Si vous voyez cette page avec des couleurs et styles cohérents qui
              changent selon le thème, alors la gestion du thème fonctionne
              parfaitement !
            </Text>
            <Group>
              <Badge size="lg" color="green">
                Thème {isDark ? 'Sombre' : 'Clair'}
              </Badge>
              <Badge size="lg" color="blue">
                {colorScheme}
              </Badge>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
