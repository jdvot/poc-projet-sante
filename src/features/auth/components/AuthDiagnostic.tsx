'use client';

import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Stack,
  Text,
  Group,
  Badge,
  Code,
  Collapse,
  Box,
} from '@mantine/core';
import { IconBug, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../../shared/hooks/useDeviceDetection';
import { config } from '../../../shared/config';

interface AuthDiagnosticProps {
  isVisible?: boolean;
}

export const AuthDiagnostic: React.FC<AuthDiagnosticProps> = ({
  isVisible = false,
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState({
    userAgent: '',
    screenSize: { width: 0, height: 0 },
    touchSupport: false,
    online: true,
    firebaseConfig: {
      hasApiKey: false,
      hasAuthDomain: false,
      hasProjectId: false,
      isMock: false,
    },
    browserInfo: {
      name: '',
      version: '',
      supportsPopups: false,
      supportsRedirect: false,
    },
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Informations sur l'agent utilisateur
      const userAgent = navigator.userAgent;

      // Détection du navigateur
      let browserName = 'Unknown';
      let browserVersion = '';

      if (userAgent.includes('Chrome')) {
        browserName = 'Chrome';
        browserVersion = userAgent.match(/Chrome\/(\d+)/)?.[1] || '';
      } else if (userAgent.includes('Firefox')) {
        browserName = 'Firefox';
        browserVersion = userAgent.match(/Firefox\/(\d+)/)?.[1] || '';
      } else if (userAgent.includes('Safari')) {
        browserName = 'Safari';
        browserVersion = userAgent.match(/Version\/(\d+)/)?.[1] || '';
      } else if (userAgent.includes('Edge')) {
        browserName = 'Edge';
        browserVersion = userAgent.match(/Edge\/(\d+)/)?.[1] || '';
      }

      // Vérification des capacités
      const supportsPopups =
        !window.navigator.userAgent.includes('Instagram') &&
        !window.navigator.userAgent.includes('Facebook') &&
        !window.navigator.userAgent.includes('Line');

      const supportsRedirect = true; // La plupart des navigateurs supportent la redirection

      // Vérification de la configuration Firebase
      const firebaseConfig = {
        hasApiKey:
          !!config.firebase.apiKey && config.firebase.apiKey !== 'mock-api-key',
        hasAuthDomain:
          !!config.firebase.authDomain &&
          config.firebase.authDomain !== 'mock-project.firebaseapp.com',
        hasProjectId:
          !!config.firebase.projectId &&
          config.firebase.projectId !== 'mock-project-id',
        isMock:
          config.firebase.apiKey === 'mock-api-key' ||
          config.firebase.authDomain === 'mock-project.firebaseapp.com' ||
          config.firebase.projectId === 'mock-project-id',
      };

      setDiagnosticData({
        userAgent,
        screenSize: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        online: navigator.onLine,
        firebaseConfig,
        browserInfo: {
          name: browserName,
          version: browserVersion,
          supportsPopups,
          supportsRedirect,
        },
      });
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  const getStatusColor = (condition: boolean) => (condition ? 'green' : 'red');
  const getStatusText = (condition: boolean) => (condition ? 'OK' : 'Problème');

  return (
    <Alert
      icon={<IconBug size={16} />}
      title="Diagnostic d'authentification mobile"
      color="blue"
      variant="light"
      style={{ marginTop: '1rem' }}
    >
      <Stack gap="sm">
        <Group justify="space-between">
          <Text size="sm">Informations de diagnostic</Text>
          <Button
            variant="subtle"
            size="xs"
            onClick={() => setExpanded(!expanded)}
            leftSection={
              expanded ? (
                <IconChevronUp size={12} />
              ) : (
                <IconChevronDown size={12} />
              )
            }
          >
            {expanded ? 'Masquer' : 'Afficher'}
          </Button>
        </Group>

        <Collapse in={expanded}>
          <Stack gap="xs">
            {/* Détection mobile */}
            <Group gap="xs">
              <Text size="xs" fw={500}>
                Détection mobile:
              </Text>
              <Badge color={getStatusColor(isMobile)} size="xs">
                {isMobile ? 'Mobile détecté' : 'Desktop détecté'}
              </Badge>
            </Group>

            {/* Support tactile */}
            <Group gap="xs">
              <Text size="xs" fw={500}>
                Support tactile:
              </Text>
              <Badge
                color={getStatusColor(diagnosticData.touchSupport)}
                size="xs"
              >
                {diagnosticData.touchSupport ? 'Supporté' : 'Non supporté'}
              </Badge>
            </Group>

            {/* Connectivité */}
            <Group gap="xs">
              <Text size="xs" fw={500}>
                Connectivité:
              </Text>
              <Badge color={getStatusColor(diagnosticData.online)} size="xs">
                {diagnosticData.online ? 'En ligne' : 'Hors ligne'}
              </Badge>
            </Group>

            {/* Configuration Firebase */}
            <Group gap="xs">
              <Text size="xs" fw={500}>
                Configuration Firebase:
              </Text>
              <Badge
                color={getStatusColor(!diagnosticData.firebaseConfig.isMock)}
                size="xs"
              >
                {diagnosticData.firebaseConfig.isMock
                  ? 'Configuration mock'
                  : 'Configuration réelle'}
              </Badge>
            </Group>

            {/* Navigateur */}
            <Group gap="xs">
              <Text size="xs" fw={500}>
                Navigateur:
              </Text>
              <Badge color="blue" size="xs">
                {diagnosticData.browserInfo.name}{' '}
                {diagnosticData.browserInfo.version}
              </Badge>
            </Group>

            {/* Support des popups */}
            <Group gap="xs">
              <Text size="xs" fw={500}>
                Support popups:
              </Text>
              <Badge
                color={getStatusColor(
                  diagnosticData.browserInfo.supportsPopups
                )}
                size="xs"
              >
                {diagnosticData.browserInfo.supportsPopups
                  ? 'Supporté'
                  : 'Non supporté'}
              </Badge>
            </Group>

            {/* Taille d'écran */}
            <Group gap="xs">
              <Text size="xs" fw={500}>
                Taille écran:
              </Text>
              <Badge color="gray" size="xs">
                {diagnosticData.screenSize.width} x{' '}
                {diagnosticData.screenSize.height}
              </Badge>
            </Group>

            {/* Détails techniques */}
            <Box>
              <Text size="xs" fw={500} mb={4}>
                User Agent:
              </Text>
              <Code style={{ wordBreak: 'break-all', fontSize: '0.75rem' }}>
                {diagnosticData.userAgent.substring(0, 100)}...
              </Code>
            </Box>

            {/* Recommandations */}
            <Box>
              <Text size="xs" fw={500} mb={4}>
                Recommandations:
              </Text>
              <Stack gap={2}>
                {diagnosticData.firebaseConfig.isMock && (
                  <Text size="xs" c="red">
                    • Configuration Firebase mock détectée - authentification
                    non fonctionnelle
                  </Text>
                )}
                {!diagnosticData.online && (
                  <Text size="xs" c="red">
                    • Pas de connexion internet - vérifiez votre réseau
                  </Text>
                )}
                {!diagnosticData.browserInfo.supportsPopups && (
                  <Text size="xs" c="orange">
                    • Navigateur avec restrictions de popups - utilisez la
                    redirection
                  </Text>
                )}
                {isMobile && !diagnosticData.touchSupport && (
                  <Text size="xs" c="orange">
                    • Mode mobile sans support tactile - peut causer des
                    problèmes
                  </Text>
                )}
                {diagnosticData.browserInfo.name === 'Safari' && isMobile && (
                  <Text size="xs" c="blue">
                    • Safari mobile - vérifiez les paramètres de blocage de
                    popups
                  </Text>
                )}
              </Stack>
            </Box>
          </Stack>
        </Collapse>
      </Stack>
    </Alert>
  );
};
