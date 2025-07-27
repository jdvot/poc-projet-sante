'use client';

import React, { useMemo } from 'react';
import {
  Container,
  Title,
  Card,
  Text,
  Stack,
  Badge,
  Alert,
  Group,
  Button,
  Skeleton,
  Progress,
  SimpleGrid,
  Box,
  RingProgress,
  Paper,
  Grid,
  Flex,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconRefresh,
  IconChartLine,
  IconHeart,
  IconActivity,
  IconTrendingUp,
  IconTrendingDown,
  IconTarget,
  IconBrain,
  IconFlame,
  IconScale,
  IconRuler,
  IconSparkles,
  IconClock,
  IconCheck,
  IconExclamationCircle,
  IconInfoCircle,
} from '@tabler/icons-react';
import { useDashboard } from '../../shared/hooks/useDashboard';
import { ModernCard } from '../../shared/ui/ModernCard';
import { ModernBadge } from '../../shared/ui/ModernBadge';
import { useTranslation } from 'react-i18next';
import { BloodTestChart } from './components/BloodTestChart';
import { MultiBiomarkerChart } from './components/MultiBiomarkerChart';
import { mockBloodTestData } from '../../shared/api/mockApi';

// Types pour une meilleure type safety
interface BloodTestData {
  id: string;
  date: string;
  biomarkers: {
    glucose: number;
    cholesterol: number;
    triglycerides: number;
    hdl: number;
    ldl: number;
    creatinine: number;
    hemoglobin: number;
  };
  overallScore: number;
  status: 'normal' | 'elevated' | 'high' | 'critical';
}

interface BiomarkerData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'elevated' | 'high' | 'critical';
  trend?: 'up' | 'down' | 'stable';
  lastUpdate?: string;
}

interface DashboardStatistics {
  healthScore: number;
  normal: number;
  elevated: number;
  high: number;
  critical: number;
  total?: number;
}

// Utilitaires optimisés avec useMemo
const useStatusConfig = (status: BiomarkerData['status']) => {
  const { colorScheme } = useMantineColorScheme();

  return useMemo(() => {
    const isDark = colorScheme === 'dark';

    const configs = {
      normal: {
        color: 'green',
        icon: IconCheck,
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        bgGradient: isDark
          ? 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)'
          : 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      },
      elevated: {
        color: 'yellow',
        icon: IconExclamationCircle,
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        bgGradient: isDark
          ? 'linear-gradient(135deg, #451a03 0%, #78350f 100%)'
          : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
      },
      high: {
        color: 'orange',
        icon: IconAlertCircle,
        gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        bgGradient: isDark
          ? 'linear-gradient(135deg, #451a03 0%, #7c2d12 100%)'
          : 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
      },
      critical: {
        color: 'red',
        icon: IconAlertCircle,
        gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        bgGradient: isDark
          ? 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)'
          : 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
      },
    };
    return configs[status];
  }, [status, colorScheme]);
};

// Composant BiomarkerItem amélioré
interface BiomarkerItemProps {
  biomarker: BiomarkerData;
}

const BiomarkerItem: React.FC<BiomarkerItemProps> = ({ biomarker }) => {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const statusConfig = useStatusConfig(biomarker.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card
      p="lg"
      radius="lg"
      withBorder
      shadow="sm"
      style={{
        background: statusConfig.bgGradient,
        border: `1px solid var(--mantine-color-${statusConfig.color}-3)`,
        transition: 'all 0.3s ease',
      }}
      className="hover:scale-105 hover:shadow-lg"
    >
      <Stack gap="md">
        {/* Header avec icône et statut */}
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <Box
              p="xs"
              style={{
                background: statusConfig.gradient,
                borderRadius: '50%',
              }}
            >
              <StatusIcon size={20} style={{ color: 'white' }} />
            </Box>
            <Stack gap={2}>
              <Text fw={600} size="sm">
                {biomarker.name}
              </Text>
              {biomarker.lastUpdate && (
                <Text size="xs" c="dimmed">
                  Mis à jour {biomarker.lastUpdate}
                </Text>
              )}
            </Stack>
          </Group>

          <ModernBadge
            variant="light"
            color={statusConfig.color}
            size="sm"
            style={{ fontWeight: 600 }}
          >
            {t(`dashboard.status.${biomarker.status}`)}
          </ModernBadge>
        </Group>

        {/* Valeur principale */}
        <Box ta="center">
          <Text
            fw={800}
            size="xl"
            style={{ color: `var(--mantine-color-${statusConfig.color}-7)` }}
          >
            {biomarker.value} {biomarker.unit}
          </Text>
        </Box>

        {/* Indicateur de tendance */}
        {biomarker.trend && (
          <Group justify="center" gap="xs">
            {biomarker.trend === 'up' && (
              <IconTrendingUp
                size={16}
                style={{ color: 'var(--mantine-color-green-6)' }}
              />
            )}
            {biomarker.trend === 'down' && (
              <IconTrendingDown
                size={16}
                style={{ color: 'var(--mantine-color-red-6)' }}
              />
            )}
            {biomarker.trend === 'stable' && (
              <IconActivity
                size={16}
                style={{ color: 'var(--mantine-color-blue-6)' }}
              />
            )}
            <Text size="xs" c="dimmed">
              {biomarker.trend === 'up' && 'En hausse'}
              {biomarker.trend === 'down' && 'En baisse'}
              {biomarker.trend === 'stable' && 'Stable'}
            </Text>
          </Group>
        )}
      </Stack>
    </Card>
  );
};

// Composant de statistiques amélioré
const DashboardStats: React.FC<{ statistics: DashboardStatistics }> = ({
  statistics,
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    if (score >= 40) return 'orange';
    return 'red';
  };

  const scoreColor = getHealthScoreColor(statistics.healthScore);

  return (
    <Card
      p="xl"
      radius="xl"
      withBorder
      style={{
        background:
          colorScheme === 'dark'
            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Éléments décoratifs */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '150px',
          height: '150px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          transform: 'translate(50%, -50%)',
        }}
      />

      <Stack gap="lg" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Group gap="sm" align="center">
          <Box
            p="xs"
            style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
            }}
          >
            <IconHeart size={24} />
          </Box>
          <Stack gap={4}>
            <Title order={2} size="h3" style={{ color: 'white' }}>
              {t('dashboard.globalHealth')}
            </Title>
            <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {t('dashboard.info.trendDescription')}
            </Text>
          </Stack>
        </Group>

        {/* Score principal */}
        <Box ta="center">
          <Text fw={800} size="3rem" style={{ color: 'white', lineHeight: 1 }}>
            {statistics.healthScore}%
          </Text>
          <Text size="sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {t('dashboard.healthScore')}
          </Text>
        </Box>

        {/* Barre de progression */}
        <Box>
          <Progress
            value={statistics.healthScore}
            color={scoreColor}
            size="lg"
            radius="xl"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          />
        </Box>

        {/* Statistiques détaillées */}
        <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
          <Paper
            p="md"
            radius="lg"
            style={{
              background:
                colorScheme === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Stack gap="xs" align="center">
              <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {t('dashboard.status.normal')}
              </Text>
              <Text fw={700} size="xl" style={{ color: 'white' }}>
                {statistics.normal}
              </Text>
            </Stack>
          </Paper>

          <Paper
            p="md"
            radius="lg"
            style={{
              background:
                colorScheme === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Stack gap="xs" align="center">
              <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {t('dashboard.status.elevated')}
              </Text>
              <Text fw={700} size="xl" style={{ color: 'white' }}>
                {statistics.elevated}
              </Text>
            </Stack>
          </Paper>

          <Paper
            p="md"
            radius="lg"
            style={{
              background:
                colorScheme === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Stack gap="xs" align="center">
              <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {t('dashboard.status.high')}
              </Text>
              <Text fw={700} size="xl" style={{ color: 'white' }}>
                {statistics.high}
              </Text>
            </Stack>
          </Paper>

          <Paper
            p="md"
            radius="lg"
            style={{
              background:
                colorScheme === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Stack gap="xs" align="center">
              <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {t('dashboard.status.critical')}
              </Text>
              <Text fw={700} size="xl" style={{ color: 'white' }}>
                {statistics.critical}
              </Text>
            </Stack>
          </Paper>
        </SimpleGrid>
      </Stack>
    </Card>
  );
};

// Composant de chargement amélioré
const DashboardSkeleton: React.FC = () => (
  <Stack gap="xl">
    {/* Skeleton pour les statistiques */}
    <Skeleton height={200} radius="xl" />

    {/* Skeleton pour les biomarqueurs */}
    <Card p="xl" radius="lg" withBorder>
      <Stack gap="lg">
        <Group gap="sm">
          <Skeleton height={24} width={24} radius="50%" />
          <Skeleton height={28} width="30%" radius="md" />
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} height={140} radius="lg" />
          ))}
        </SimpleGrid>
      </Stack>
    </Card>
  </Stack>
);

// Composant principal Dashboard
const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const {
    dashboardData,
    biomarkersWithStatus,
    statistics,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useDashboard();

  // Gestion des erreurs
  if (error) {
    return (
      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Header */}
          <Group gap="sm">
            <Box
              p="xs"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
              }}
            >
              <IconChartLine size={24} style={{ color: 'white' }} />
            </Box>
            <Stack gap={4}>
              <Title order={1} size="h2">
                {t('dashboard.title')}
              </Title>
              <Text size="sm" c="dimmed">
                {t('dashboard.subtitle')}
              </Text>
            </Stack>
          </Group>

          {/* Message d'erreur */}
          <Card
            p="xl"
            radius="lg"
            withBorder
            style={{
              background:
                colorScheme === 'dark'
                  ? 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)'
                  : 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              border:
                colorScheme === 'dark'
                  ? '1px solid #dc2626'
                  : '1px solid #fecaca',
            }}
          >
            <Stack gap="md" align="center">
              <IconAlertCircle
                size={48}
                style={{ color: 'var(--mantine-color-red-6)' }}
              />
              <Stack gap="xs" ta="center">
                <Text fw={600} size="lg" c="red.6">
                  {t('dashboard.loadingError')}
                </Text>
                <Text size="sm" c="dimmed">
                  {t('dashboard.loadingErrorDescription')}
                </Text>
              </Stack>
              <Button
                leftSection={<IconRefresh size="1rem" />}
                onClick={() => refetch()}
                loading={isRefetching}
                size="md"
                variant="filled"
                color="red"
                radius="lg"
              >
                {t('dashboard.retry')}
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header amélioré */}
        <Card
          p="lg"
          radius="lg"
          withBorder
          style={{
            background:
              colorScheme === 'dark'
                ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          }}
        >
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <Box
                p="xs"
                style={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                }}
              >
                <IconChartLine size={24} style={{ color: 'white' }} />
              </Box>
              <Stack gap={4}>
                <Title order={1} size="h2">
                  {t('dashboard.title')}
                </Title>
                <Text size="sm" c="dimmed">
                  {t('dashboard.subtitle')}
                </Text>
              </Stack>
            </Group>

            <Button
              leftSection={<IconRefresh size="1rem" />}
              onClick={() => refetch()}
              loading={isRefetching}
              size="md"
              variant="filled"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              }}
              radius="lg"
            >
              {t('dashboard.refresh')}
            </Button>
          </Group>
        </Card>

        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            {/* Statistiques principales */}
            {statistics && <DashboardStats statistics={statistics} />}

            {/* Graphique multi-biomarqueurs */}
            <MultiBiomarkerChart
              data={mockBloodTestData}
              selectedBiomarkers={[
                'glucose',
                'cholesterol',
                'hdl',
                'ldl',
                'triglycerides',
              ]}
              showReferenceLines={true}
              showBrush={true}
            />

            {/* Biomarqueurs */}
            <Card
              p="xl"
              radius="lg"
              withBorder
              shadow="sm"
              style={{
                background: colorScheme === 'dark' ? '#1a1b1e' : 'white',
                border:
                  colorScheme === 'dark'
                    ? '1px solid #373a40'
                    : '1px solid #e2e8f0',
              }}
            >
              <Stack gap="lg">
                {/* Header des biomarqueurs */}
                <Group gap="sm" align="center">
                  <Box
                    p="xs"
                    style={{
                      background:
                        'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                      borderRadius: '50%',
                    }}
                  >
                    <IconActivity size={20} style={{ color: 'white' }} />
                  </Box>
                  <Stack gap={4}>
                    <Title order={3} size="h4">
                      {t('dashboard.biomarkers')}
                    </Title>
                    <Text size="sm" c="dimmed">
                      {t('dashboard.info.dataSourceDescription')}
                    </Text>
                  </Stack>
                </Group>

                {/* Grille des biomarqueurs */}
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                  {biomarkersWithStatus.map((biomarker) => (
                    <BiomarkerItem key={biomarker.id} biomarker={biomarker} />
                  ))}
                </SimpleGrid>

                {/* Informations de mise à jour */}
                {dashboardData?.lastCheck && (
                  <Paper
                    p="md"
                    radius="lg"
                    withBorder
                    style={{
                      background:
                        colorScheme === 'dark'
                          ? 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)'
                          : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                      border:
                        colorScheme === 'dark'
                          ? '1px solid #3b82f6'
                          : '1px solid #93c5fd',
                    }}
                  >
                    <Group gap="sm" justify="center">
                      <IconClock
                        size={16}
                        style={{ color: 'var(--mantine-color-blue-6)' }}
                      />
                      <Text size="sm" fw={500} c="blue.6">
                        {t('dashboard.lastCheck')}: {dashboardData.lastCheck}
                      </Text>
                    </Group>
                  </Paper>
                )}
              </Stack>
            </Card>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default Dashboard;
