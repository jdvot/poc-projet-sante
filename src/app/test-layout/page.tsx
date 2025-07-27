'use client';

import { Box, Title, Text, Paper, Stack, Badge } from '@mantine/core';
import { IconCheck, IconLayout, IconArrowRight } from '@tabler/icons-react';

export default function TestLayoutPage() {
  return (
    <Box>
      <Stack gap="xl">
        {/* Header */}
        <Paper p="xl" withBorder>
          <Stack gap="md">
            <Title order={1} c="blue">
              🧪 Test de Layout - Navbar à Gauche
            </Title>
            <Text size="lg" c="dimmed">
              Cette page permet de vérifier que la navbar est correctement
              positionnée à gauche et que le contenu principal s&apos;affiche à
              droite.
            </Text>
          </Stack>
        </Paper>

        {/* Instructions */}
        <Paper p="xl" withBorder>
          <Stack gap="md">
            <Title order={2}>
              <IconLayout size={24} style={{ marginRight: 8 }} />
              Instructions de Test
            </Title>
            <Stack gap="sm">
              <Text>
                <IconCheck
                  size={16}
                  style={{ marginRight: 8, color: 'green' }}
                />
                <strong>Navbar à gauche :</strong> Vous devriez voir une navbar
                sombre de 300px de large à gauche
              </Text>
              <Text>
                <IconCheck
                  size={16}
                  style={{ marginRight: 8, color: 'green' }}
                />
                <strong>Contenu à droite :</strong> Ce contenu devrait
                s&apos;afficher dans l&apos;espace restant à droite
              </Text>
              <Text>
                <IconCheck
                  size={16}
                  style={{ marginRight: 8, color: 'green' }}
                />
                <strong>Responsive :</strong> Sur mobile, la navbar devrait se
                transformer en drawer
              </Text>
            </Stack>
          </Stack>
        </Paper>

        {/* Layout Info */}
        <Paper p="xl" withBorder>
          <Stack gap="md">
            <Title order={2}>📐 Informations de Layout</Title>
            <Stack gap="xs">
              <Text>
                <strong>Structure :</strong> Flexbox avec navbar fixe à gauche
              </Text>
              <Text>
                <strong>Largeur navbar :</strong> 300px (fixe)
              </Text>
              <Text>
                <strong>Contenu :</strong> Flex: 1 (espace restant)
              </Text>
              <Text>
                <strong>Breakpoint :</strong> 768px (responsive)
              </Text>
            </Stack>
          </Stack>
        </Paper>

        {/* Navigation Test */}
        <Paper p="xl" withBorder>
          <Stack gap="md">
            <Title order={2}>🧭 Test de Navigation</Title>
            <Text>
              Utilisez la navbar à gauche pour naviguer entre les différentes
              pages :
            </Text>
            <Stack gap="xs">
              <Text>
                <IconArrowRight size={16} style={{ marginRight: 8 }} />
                <strong>Accueil :</strong> Page principale de l&apos;application
              </Text>
              <Text>
                <IconArrowRight size={16} style={{ marginRight: 8 }} />
                <strong>Dashboard :</strong> Tableau de bord avec graphiques
              </Text>
              <Text>
                <IconArrowRight size={16} style={{ marginRight: 8 }} />
                <strong>AI Doctor :</strong> Assistant IA médical
                <Badge size="sm" ml="xs">
                  IA
                </Badge>
              </Text>
              <Text>
                <IconArrowRight size={16} style={{ marginRight: 8 }} />
                <strong>AI Chat :</strong> Chat avec l&apos;IA
                <Badge size="sm" ml="xs">
                  Chat
                </Badge>
              </Text>
              <Text>
                <IconArrowRight size={16} style={{ marginRight: 8 }} />
                <strong>Profil :</strong> Gestion du profil utilisateur
              </Text>
              <Text>
                <IconArrowRight size={16} style={{ marginRight: 8 }} />
                <strong>Paramètres :</strong> Configuration de
                l&apos;application
              </Text>
            </Stack>
          </Stack>
        </Paper>

        {/* Success Message */}
        <Paper p="xl" withBorder bg="green.0">
          <Stack gap="md" align="center">
            <Title order={2} c="green">
              ✅ Layout Réussi !
            </Title>
            <Text ta="center" size="lg">
              Si vous voyez cette page avec la navbar à gauche et le contenu à
              droite, alors la configuration est parfaite !
            </Text>
            <Badge size="lg" color="green">
              Navbar à Gauche + Contenu à Droite
            </Badge>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
