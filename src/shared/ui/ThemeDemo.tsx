'use client';

import React from 'react';
import {
  Box,
  Card,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Badge,
  ThemeIcon,
  Paper,
  Container,
  Grid,
  Switch,
  Select,
  Divider,
} from '@mantine/core';
import {
  IconSparkles,
  IconAccessible,
  IconPalette,
  IconEye,
  IconTypography,
  IconSettings,
} from '@tabler/icons-react';
import { useAccessibilitySettings } from '../hooks/useAccessibilitySettings';

export const ThemeDemo: React.FC = () => {
  const {
    settings,
    updateFontSize,
    updateLineHeight,
    getAccessibilityClasses,
    getAccessibilityStyles,
  } = useAccessibilitySettings();

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* En-tête de démonstration */}
        <Paper
          p="xl"
          radius="xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            textAlign: 'center',
          }}
        >
          <Group justify="center" gap="xs" mb="md">
            <IconSparkles
              size={32}
              style={{ color: 'var(--mantine-color-blue-6)' }}
            />
            <Title order={1} size="h2">
              Démonstration du Thème Élégant
            </Title>
            <IconSparkles
              size={32}
              style={{ color: 'var(--mantine-color-blue-6)' }}
            />
          </Group>
          <Text size="lg" c="dimmed">
            Testez les améliorations d'accessibilité et d'élégance du thème
          </Text>
        </Paper>

        {/* Contrôles d'accessibilité */}
        <Card p="xl" radius="lg" withBorder>
          <Group gap="xs" mb="lg">
            <IconAccessible size={24} />
            <Title order={3}>Paramètres d'Accessibilité</Title>
          </Group>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <Group justify="space-between">
                  <Text>Taille de police</Text>
                  <Select
                    value={settings.fontSize}
                    onChange={(value) => updateFontSize(value as any)}
                    data={[
                      { value: 'small', label: 'Petite' },
                      { value: 'medium', label: 'Moyenne' },
                      { value: 'large', label: 'Grande' },
                    ]}
                    size="sm"
                  />
                </Group>

                <Group justify="space-between">
                  <Text>Hauteur de ligne</Text>
                  <Select
                    value={settings.lineHeight}
                    onChange={(value) => updateLineHeight(value as any)}
                    data={[
                      { value: 'tight', label: 'Serrée' },
                      { value: 'normal', label: 'Normale' },
                      { value: 'relaxed', label: 'Relâchée' },
                    ]}
                    size="sm"
                  />
                </Group>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <Group justify="space-between">
                  <Text>Mouvement réduit</Text>
                  <Badge
                    color={settings.prefersReducedMotion ? 'green' : 'gray'}
                    variant="light"
                  >
                    {settings.prefersReducedMotion ? 'Activé' : 'Désactivé'}
                  </Badge>
                </Group>

                <Group justify="space-between">
                  <Text>Contraste élevé</Text>
                  <Badge
                    color={settings.prefersHighContrast ? 'green' : 'gray'}
                    variant="light"
                  >
                    {settings.prefersHighContrast ? 'Activé' : 'Désactivé'}
                  </Badge>
                </Group>

                <Group justify="space-between">
                  <Text>Mode sombre</Text>
                  <Badge
                    color={settings.prefersDarkMode ? 'blue' : 'gray'}
                    variant="light"
                  >
                    {settings.prefersDarkMode ? 'Activé' : 'Désactivé'}
                  </Badge>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Démonstration des composants */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card p="xl" radius="xl" withBorder className="elegant-card">
              <Stack gap="md">
                <Group gap="xs">
                  <ThemeIcon size={40} radius="xl" color="blue">
                    <IconPalette size={20} />
                  </ThemeIcon>
                  <Title order={4}>Carte Élégante</Title>
                </Group>
                <Text size="sm" c="dimmed">
                  Cette carte utilise les nouvelles classes CSS élégantes avec
                  des transitions fluides et des effets de survol.
                </Text>
                <Button
                  variant="light"
                  color="blue"
                  size="sm"
                  className="elegant-button"
                >
                  Action Élégante
                </Button>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card
              p="xl"
              radius="xl"
              withBorder
              style={getAccessibilityStyles()}
            >
              <Stack gap="md">
                <Group gap="xs">
                  <ThemeIcon size={40} radius="xl" color="green">
                    <IconAccessible size={20} />
                  </ThemeIcon>
                  <Title order={4}>Carte Accessible</Title>
                </Group>
                <Text size="sm" c="dimmed">
                  Cette carte applique automatiquement les paramètres
                  d'accessibilité utilisateur.
                </Text>
                <Button
                  variant="light"
                  color="green"
                  size="sm"
                  className={getAccessibilityClasses()}
                >
                  Action Accessible
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Démonstration des animations */}
        <Card p="xl" radius="lg" withBorder>
          <Group gap="xs" mb="lg">
            <IconEye size={24} />
            <Title order={3}>Animations et Transitions</Title>
          </Group>

          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Box className="animate-fade-in-up">
                <Card p="md" radius="md" withBorder>
                  <Stack gap="xs" align="center">
                    <ThemeIcon
                      size={50}
                      radius="xl"
                      color="blue"
                      className="animate-pulse"
                    >
                      <IconSparkles size={25} />
                    </ThemeIcon>
                    <Text size="sm" ta="center">
                      Animation Pulse
                    </Text>
                  </Stack>
                </Card>
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Box className="animate-fade-in-scale">
                <Card p="md" radius="md" withBorder>
                  <Stack gap="xs" align="center">
                    <ThemeIcon
                      size={50}
                      radius="xl"
                      color="green"
                      className="animate-float"
                    >
                      <IconSparkles size={25} />
                    </ThemeIcon>
                    <Text size="sm" ta="center">
                      Animation Float
                    </Text>
                  </Stack>
                </Card>
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Box className="hover-lift">
                <Card p="md" radius="md" withBorder>
                  <Stack gap="xs" align="center">
                    <ThemeIcon
                      size={50}
                      radius="xl"
                      color="orange"
                      className="animated-icon"
                    >
                      <IconSparkles size={25} />
                    </ThemeIcon>
                    <Text size="sm" ta="center">
                      Hover Lift
                    </Text>
                  </Stack>
                </Card>
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Box className="shine-effect">
                <Card p="md" radius="md" withBorder>
                  <Stack gap="xs" align="center">
                    <ThemeIcon size={50} radius="xl" color="purple">
                      <IconSparkles size={25} />
                    </ThemeIcon>
                    <Text size="sm" ta="center">
                      Shine Effect
                    </Text>
                  </Stack>
                </Card>
              </Box>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Démonstration des boutons */}
        <Card p="xl" radius="lg" withBorder>
          <Group gap="xs" mb="lg">
            <IconSettings size={24} />
            <Title order={3}>Boutons et Interactions</Title>
          </Group>

          <Stack gap="md">
            <Group gap="md" wrap="wrap">
              <Button className="elegant-button">Bouton Élégant</Button>
              <Button variant="light" color="blue" className="hover-scale">
                Hover Scale
              </Button>
              <Button variant="outline" color="green" className="active-scale">
                Active Scale
              </Button>
              <Button
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
              >
                Gradient
              </Button>
            </Group>

            <Group gap="md" wrap="wrap">
              <Badge size="lg" variant="light" color="blue">
                Badge Élégant
              </Badge>
              <Badge size="lg" variant="filled" color="green">
                Badge Filled
              </Badge>
              <Badge size="lg" variant="outline" color="orange">
                Badge Outline
              </Badge>
            </Group>
          </Stack>
        </Card>

        {/* Informations sur l'accessibilité */}
        <Paper
          p="xl"
          radius="lg"
          withBorder
          style={{ background: 'var(--mantine-color-blue-0)' }}
        >
          <Stack gap="md">
            <Group gap="xs">
              <IconAccessible size={24} color="var(--mantine-color-blue-6)" />
              <Title order={3} c="blue">
                Fonctionnalités d'Accessibilité
              </Title>
            </Group>

            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="xs">
                  <Text size="sm" fw={500}>
                    ✓ Navigation clavier améliorée
                  </Text>
                  <Text size="sm" fw={500}>
                    ✓ Focus visible avec anneaux colorés
                  </Text>
                  <Text size="sm" fw={500}>
                    ✓ Contraste WCAG AA/AAA
                  </Text>
                  <Text size="sm" fw={500}>
                    ✓ Support des préférences système
                  </Text>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="xs">
                  <Text size="sm" fw={500}>
                    ✓ Réduction des animations
                  </Text>
                  <Text size="sm" fw={500}>
                    ✓ Taille de police ajustable
                  </Text>
                  <Text size="sm" fw={500}>
                    ✓ Hauteur de ligne personnalisable
                  </Text>
                  <Text size="sm" fw={500}>
                    ✓ Mode contraste élevé
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};
