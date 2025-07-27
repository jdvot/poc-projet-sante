'use client';

import React, { useMemo, useState, useEffect } from 'react';
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
  useMantineTheme,
  Transition,
  ScrollArea,
  Tooltip,
  ActionIcon,
  Menu,
  Divider,
  Modal,
  LoadingOverlay,
  Notification,
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
  IconDownload,
  IconShare,
  IconPrinter,
  IconSettings,
  IconHelp,
  IconAccessible,
  IconPalette,
  IconSun,
  IconMoon,
  IconDeviceMobile,
  IconDeviceDesktop,
  IconEye,
  IconEyeOff,
  IconFilter,
  IconSearch,
  IconZoomIn,
  IconZoomOut,
  IconArrowsMaximize,
  IconArrowsMinimize,
} from '@tabler/icons-react';
import { useDashboard } from '../../shared/hooks/useDashboard';
import { ModernCard } from '../../shared/ui/ModernCard';
import { ModernBadge } from '../../shared/ui/ModernBadge';
import { useTranslation } from 'react-i18next';
import { BloodTestChart } from './components/BloodTestChart';
import { MultiBiomarkerChart } from './components/MultiBiomarkerChart';
import { mockBloodTestData } from '../../shared/api/mockApi';
import { useNotification } from '../../shared/hooks/useNotification';

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

// Fonction utilitaire pour traduire les noms de biomarqueurs
const getBiomarkerTranslationKey = (name: string): string => {
  const normalizedName = name
    .toLowerCase()
    .replace('é', 'e')
    .replace('è', 'e')
    .replace('à', 'a')
    .replace('ç', 'c');

  // Mapping spécifique pour les cas particuliers
  const mapping: Record<string, string> = {
    cholesterole: 'cholesterol',
    triglycerides: 'triglycerides',
    hdl: 'hdl',
    ldl: 'ldl',
    glucose: 'glucose',
  };

  return mapping[normalizedName] || normalizedName;
};

// Utilitaires optimisés avec useMemo utilisant le thème Mantine et couleurs accessibles
const useStatusConfig = (status: BiomarkerData['status']) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return useMemo(() => {
    const isDark = colorScheme === 'dark';
    const accessible = theme.other?.accessible;

    const configs = {
      normal: {
        color: 'wellness',
        icon: IconCheck,
        gradient:
          theme.other?.gradients?.health ||
          'linear-gradient(135deg, var(--mantine-color-wellness-6) 0%, var(--mantine-color-wellness-7) 100%)',
        bgGradient: isDark
          ? 'linear-gradient(135deg, var(--mantine-color-wellness-9) 0%, var(--mantine-color-wellness-8) 100%)'
          : 'linear-gradient(135deg, var(--mantine-color-wellness-0) 0%, var(--mantine-color-wellness-1) 100%)',
        textColor: isDark
          ? accessible?.text?.inverse
          : accessible?.status?.success,
        ariaLabel: 'Normal health status',
      },
      elevated: {
        color: 'yellow',
        icon: IconExclamationCircle,
        gradient:
          'linear-gradient(135deg, var(--mantine-color-yellow-6) 0%, var(--mantine-color-yellow-7) 100%)',
        bgGradient: isDark
          ? 'linear-gradient(135deg, var(--mantine-color-yellow-9) 0%, var(--mantine-color-yellow-8) 100%)'
          : 'linear-gradient(135deg, var(--mantine-color-yellow-0) 0%, var(--mantine-color-yellow-1) 100%)',
        textColor: isDark
          ? accessible?.text?.inverse
          : accessible?.status?.warning,
        ariaLabel: 'Elevated health status - requires attention',
      },
      high: {
        color: 'orange',
        icon: IconAlertCircle,
        gradient:
          'linear-gradient(135deg, var(--mantine-color-orange-6) 0%, var(--mantine-color-orange-7) 100%)',
        bgGradient: isDark
          ? 'linear-gradient(135deg, var(--mantine-color-orange-9) 0%, var(--mantine-color-orange-8) 100%)'
          : 'linear-gradient(135deg, var(--mantine-color-orange-0) 0%, var(--mantine-color-orange-1) 100%)',
        textColor: isDark
          ? accessible?.text?.inverse
          : accessible?.status?.error,
        ariaLabel: 'High health status - requires monitoring',
      },
      critical: {
        color: 'medical',
        icon: IconAlertCircle,
        gradient:
          theme.other?.gradients?.medical ||
          'linear-gradient(135deg, var(--mantine-color-medical-6) 0%, var(--mantine-color-medical-7) 100%)',
        bgGradient: isDark
          ? 'linear-gradient(135deg, var(--mantine-color-medical-9) 0%, var(--mantine-color-medical-8) 100%)'
          : 'linear-gradient(135deg, var(--mantine-color-medical-0) 0%, var(--mantine-color-medical-1) 100%)',
        textColor: isDark
          ? accessible?.text?.inverse
          : accessible?.status?.error,
        ariaLabel: 'Critical health status - immediate attention required',
      },
    };
    return configs[status];
  }, [status, colorScheme, theme]);
};

// Composant BiomarkerItem amélioré avec accessibilité utilisant le thème Mantine
interface BiomarkerItemProps {
  biomarker: BiomarkerData;
}

const BiomarkerItem: React.FC<BiomarkerItemProps> = ({ biomarker }) => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
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
        transition: theme.other?.transitions?.normal || 'all 0.3s ease',
      }}
      className="hover:scale-105 hover:shadow-lg"
      role="article"
      aria-labelledby={`biomarker-${biomarker.id}-title`}
      aria-describedby={`biomarker-${biomarker.id}-value`}
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
              role="img"
              aria-label={statusConfig.ariaLabel}
            >
              <StatusIcon size={20} style={{ color: 'white' }} />
            </Box>
            <Stack gap={2}>
              <Text fw={600} size="sm" id={`biomarker-${biomarker.id}-title`}>
                {t(
                  `dashboard.biomarkerNames.${getBiomarkerTranslationKey(biomarker.name)}`
                )}
              </Text>
              {biomarker.lastUpdate && (
                <Text size="xs" c="dimmed">
                  {t('dashboard.info.updated')} {biomarker.lastUpdate}
                </Text>
              )}
            </Stack>
          </Group>

          <ModernBadge
            variant="light"
            color={statusConfig.color}
            size="sm"
            style={{ fontWeight: 600 }}
            aria-label={`Status: ${t(`dashboard.status.${biomarker.status}`)}`}
          >
            {t(`dashboard.status.${biomarker.status}`)}
          </ModernBadge>
        </Group>

        {/* Valeur principale */}
        <Box ta="center">
          <Text
            fw={800}
            size="xl"
            id={`biomarker-${biomarker.id}-value`}
            style={{
              color:
                statusConfig.textColor ||
                `var(--mantine-color-${statusConfig.color}-7)`,
            }}
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
                style={{
                  color:
                    theme.other?.accessible?.status?.success ||
                    'var(--mantine-color-wellness-6)',
                }}
                aria-label={t('dashboard.info.improvement')}
              />
            )}
            {biomarker.trend === 'down' && (
              <IconTrendingDown
                size={16}
                style={{
                  color:
                    theme.other?.accessible?.status?.error ||
                    'var(--mantine-color-medical-6)',
                }}
                aria-label={t('dashboard.info.deterioration')}
              />
            )}
            {biomarker.trend === 'stable' && (
              <IconActivity
                size={16}
                style={{
                  color:
                    theme.other?.accessible?.status?.info ||
                    'var(--mantine-color-health-6)',
                }}
                aria-label={t('dashboard.info.stable')}
              />
            )}
            <Text
              size="xs"
              style={{
                color:
                  theme.other?.accessible?.text?.secondary ||
                  'var(--mantine-color-gray-6)',
              }}
            >
              {biomarker.trend === 'up' && t('dashboard.info.improvement')}
              {biomarker.trend === 'down' && t('dashboard.info.deterioration')}
              {biomarker.trend === 'stable' && t('dashboard.info.stable')}
            </Text>
          </Group>
        )}
      </Stack>
    </Card>
  );
};

// Composant de statistiques amélioré avec accessibilité utilisant le thème Mantine
const DashboardStats: React.FC<{ statistics: DashboardStatistics }> = ({
  statistics,
}) => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'wellness';
    if (score >= 60) return 'yellow';
    if (score >= 40) return 'orange';
    return 'medical';
  };

  const getHealthScoreAccessibleColor = (score: number) => {
    if (score >= 80) return theme.other?.accessible?.status?.success;
    if (score >= 60) return theme.other?.accessible?.status?.warning;
    if (score >= 40) return theme.other?.accessible?.status?.error;
    return theme.other?.accessible?.status?.error;
  };

  const scoreColor = getHealthScoreColor(statistics.healthScore);

  return (
    <Card
      p="xl"
      radius="xl"
      withBorder
      style={{
        background:
          theme.other?.gradients?.health ||
          'linear-gradient(135deg, var(--mantine-color-health-6) 0%, var(--mantine-color-health-7) 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
      role="region"
      aria-labelledby="health-stats-title"
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
        aria-hidden="true"
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
            role="img"
            aria-label={t('dashboard.accessibility.statusIndicator')}
          >
            <IconHeart size={24} />
          </Box>
          <Stack gap={4}>
            <Title
              order={2}
              size="h3"
              style={{
                color: theme.other?.accessible?.text?.inverse || 'white',
              }}
              id="health-stats-title"
            >
              {t('dashboard.globalHealth')}
            </Title>
            <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {t('dashboard.info.trendDescription')}
            </Text>
          </Stack>
        </Group>

        {/* Score principal */}
        <Box ta="center">
          <Text
            fw={800}
            size="3rem"
            style={{
              color: theme.other?.accessible?.text?.inverse || 'white',
              lineHeight: 1,
            }}
            aria-label={`${t('dashboard.healthScore')}: ${statistics.healthScore}%`}
          >
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
            aria-label={`${t('dashboard.accessibility.progressBar')}: ${statistics.healthScore}%`}
          />
        </Box>

        {/* Statistiques détaillées */}
        <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
          <Paper
            p="md"
            radius="lg"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            role="article"
            aria-label={`${t('dashboard.status.normal')}: ${statistics.normal}`}
          >
            <Stack gap="xs" align="center">
              <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {t('dashboard.status.normal')}
              </Text>
              <Text
                fw={700}
                size="xl"
                style={{
                  color: theme.other?.accessible?.text?.inverse || 'white',
                }}
              >
                {statistics.normal}
              </Text>
            </Stack>
          </Paper>

          <Paper
            p="md"
            radius="lg"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            role="article"
            aria-label={`${t('dashboard.status.elevated')}: ${statistics.elevated}`}
          >
            <Stack gap="xs" align="center">
              <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {t('dashboard.status.elevated')}
              </Text>
              <Text
                fw={700}
                size="xl"
                style={{
                  color: theme.other?.accessible?.text?.inverse || 'white',
                }}
              >
                {statistics.elevated}
              </Text>
            </Stack>
          </Paper>

          <Paper
            p="md"
            radius="lg"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            role="article"
            aria-label={`${t('dashboard.status.high')}: ${statistics.high}`}
          >
            <Stack gap="xs" align="center">
              <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {t('dashboard.status.high')}
              </Text>
              <Text
                fw={700}
                size="xl"
                style={{
                  color: theme.other?.accessible?.text?.inverse || 'white',
                }}
              >
                {statistics.high}
              </Text>
            </Stack>
          </Paper>

          <Paper
            p="md"
            radius="lg"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            role="article"
            aria-label={`${t('dashboard.status.critical')}: ${statistics.critical}`}
          >
            <Stack gap="xs" align="center">
              <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {t('dashboard.status.critical')}
              </Text>
              <Text
                fw={700}
                size="xl"
                style={{
                  color: theme.other?.accessible?.text?.inverse || 'white',
                }}
              >
                {statistics.critical}
              </Text>
            </Stack>
          </Paper>
        </SimpleGrid>
      </Stack>
    </Card>
  );
};

// Composant de chargement amélioré avec accessibilité
const DashboardSkeleton: React.FC = () => (
  <Stack gap="xl" aria-label="Loading dashboard data">
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

// Composant principal Dashboard amélioré utilisant le thème Mantine
const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { showNotification } = useNotification();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const {
    dashboardData,
    biomarkersWithStatus,
    statistics,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useDashboard();

  // Effet pour les notifications de succès
  useEffect(() => {
    if (!isLoading && !error && dashboardData) {
      showNotification({
        title: t('dashboard.success.dataUpdated'),
        message: t('dashboard.success.refreshComplete'),
        type: 'success',
      });
    }
  }, [isLoading, error, dashboardData, showNotification, t]);

  // Gestion des erreurs avec accessibilité
  if (error) {
    return (
      <Box
        px="md"
        py="xl"
        style={{ width: '100%' }}
        role="alert"
        aria-live="assertive"
      >
        <Stack gap="xl">
          {/* Header */}
          <Group gap="sm">
            <Box
              p="xs"
              style={{
                background:
                  theme.other?.gradients?.health ||
                  'linear-gradient(135deg, var(--mantine-color-health-6) 0%, var(--mantine-color-health-7) 100%)',
                borderRadius: '50%',
              }}
              role="img"
              aria-label={t('dashboard.accessibility.errorScreen')}
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
                theme.other?.gradients?.medical ||
                'linear-gradient(135deg, var(--mantine-color-medical-6) 0%, var(--mantine-color-medical-7) 100%)',
              border: `1px solid var(--mantine-color-medical-3)`,
            }}
          >
            <Stack gap="md" align="center">
              <IconAlertCircle
                size={48}
                style={{ color: 'var(--mantine-color-medical-6)' }}
                aria-label="Error icon"
              />
              <Stack gap="xs" ta="center">
                <Text
                  fw={600}
                  size="lg"
                  style={{
                    color:
                      theme.other?.accessible?.status?.error ||
                      'var(--mantine-color-medical-6)',
                  }}
                >
                  {t('dashboard.loadingError')}
                </Text>
                <Text
                  size="sm"
                  style={{
                    color:
                      theme.other?.accessible?.text?.secondary ||
                      'var(--mantine-color-gray-6)',
                  }}
                >
                  {t('dashboard.loadingErrorDescription')}
                </Text>
              </Stack>
              <Button
                leftSection={<IconRefresh size="1rem" />}
                onClick={() => refetch()}
                loading={isRefetching}
                size="md"
                variant="filled"
                color="medical"
                radius="lg"
                aria-label={t('dashboard.accessibility.refreshButton')}
              >
                {t('dashboard.retry')}
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Box>
    );
  }

  return (
    <>
      <Box
        px="md"
        py="xl"
        style={{ width: '100%' }}
        role="main"
        aria-label={t('dashboard.accessibility.loadingScreen')}
      >
        <Stack gap="xl">
          {/* Header amélioré avec actions */}
          <Card
            p="lg"
            radius="lg"
            withBorder
            style={{
              background:
                colorScheme === 'dark'
                  ? 'linear-gradient(135deg, var(--mantine-color-dark-6) 0%, var(--mantine-color-dark-7) 100%)'
                  : 'linear-gradient(135deg, var(--mantine-color-gray-0) 0%, var(--mantine-color-gray-1) 100%)',
            }}
          >
            <Group justify="space-between" align="center">
              <Group gap="sm">
                <Box
                  p="xs"
                  style={{
                    background:
                      theme.other?.gradients?.health ||
                      'linear-gradient(135deg, var(--mantine-color-health-6) 0%, var(--mantine-color-health-7) 100%)',
                    borderRadius: '50%',
                  }}
                  role="img"
                  aria-label="Dashboard icon"
                >
                  <IconChartLine size={24} style={{ color: 'white' }} />
                </Box>
                <Stack gap={4}>
                  <Title order={1} size="h2">
                    {t('dashboard.title')}
                  </Title>
                  <Text
                    size="sm"
                    style={{
                      color:
                        theme.other?.accessible?.text?.secondary ||
                        'var(--mantine-color-gray-6)',
                    }}
                  >
                    {t('dashboard.subtitle')}
                  </Text>
                </Stack>
              </Group>

              <Group gap="sm">
                {/* Bouton d'aide */}
                <Tooltip label={t('dashboard.help.dashboardOverview')}>
                  <ActionIcon
                    variant="light"
                    size="lg"
                    onClick={() => setShowHelpModal(true)}
                    aria-label={t('dashboard.help.dashboardOverview')}
                  >
                    <IconHelp size="1.2rem" />
                  </ActionIcon>
                </Tooltip>

                {/* Menu d'actions */}
                <Menu shadow="md" width={200} position="bottom-end">
                  <Menu.Target>
                    <ActionIcon
                      variant="light"
                      size="lg"
                      aria-label="Dashboard actions"
                    >
                      <IconSettings size="1.2rem" />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconDownload size="1rem" />}
                      onClick={() => {
                        showNotification({
                          title: t('dashboard.success.exportComplete'),
                          message: t('dashboard.exportData'),
                          type: 'success',
                        });
                      }}
                    >
                      {t('dashboard.exportData')}
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconShare size="1rem" />}
                      onClick={() => {
                        showNotification({
                          title: t('dashboard.shareReport'),
                          message: 'Sharing feature coming soon',
                          type: 'info',
                        });
                      }}
                    >
                      {t('dashboard.shareReport')}
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconPrinter size="1rem" />}
                      onClick={() => {
                        showNotification({
                          title: t('dashboard.printReport'),
                          message: 'Print feature coming soon',
                          type: 'info',
                        });
                      }}
                    >
                      {t('dashboard.printReport')}
                    </Menu.Item>
                    <Divider />
                    <Menu.Item
                      leftSection={<IconAccessible size="1rem" />}
                      onClick={() => setShowSettingsModal(true)}
                    >
                      {t('dashboard.accessibility.keyboardShortcuts')}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                <Button
                  leftSection={<IconRefresh size="1rem" />}
                  onClick={() => refetch()}
                  loading={isRefetching}
                  size="md"
                  variant="filled"
                  style={{
                    background:
                      theme.other?.gradients?.primary ||
                      'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-blue-7) 100%)',
                  }}
                  radius="lg"
                  aria-label={t('dashboard.accessibility.refreshButton')}
                >
                  {t('dashboard.refresh')}
                </Button>
              </Group>
            </Group>
          </Card>

          <LoadingOverlay visible={isLoading} overlayProps={{ blur: 2 }} />

          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <Transition mounted={!isLoading} transition="fade" duration={400}>
              {(styles) => (
                <div style={styles}>
                  {dashboardData && (
                    <>
                      {/* Statistiques principales */}
                      {statistics && <DashboardStats statistics={statistics} />}

                      {/* Graphique multi-biomarqueurs */}
                      <Card
                        p="xl"
                        radius="lg"
                        withBorder
                        shadow="sm"
                        style={{
                          background:
                            colorScheme === 'dark'
                              ? 'var(--mantine-color-dark-6)'
                              : 'white',
                          border:
                            colorScheme === 'dark'
                              ? '1px solid var(--mantine-color-dark-4)'
                              : '1px solid var(--mantine-color-gray-2)',
                        }}
                      >
                        <Stack gap="lg">
                          <Group gap="sm" align="center">
                            <Box
                              p="xs"
                              style={{
                                background:
                                  theme.other?.gradients?.secondary ||
                                  'linear-gradient(135deg, var(--mantine-color-cyan-6) 0%, var(--mantine-color-cyan-7) 100%)',
                                borderRadius: '50%',
                              }}
                              role="img"
                              aria-label={t(
                                'dashboard.accessibility.chartDescription'
                              )}
                            >
                              <IconChartLine
                                size={20}
                                style={{ color: 'white' }}
                              />
                            </Box>
                            <Stack gap={4}>
                              <Title order={3} size="h4">
                                {t('dashboard.charts.title')}
                              </Title>
                              <Text
                                size="sm"
                                style={{
                                  color:
                                    theme.other?.accessible?.text?.secondary ||
                                    'var(--mantine-color-gray-6)',
                                }}
                              >
                                {t('dashboard.charts.subtitle')}
                              </Text>
                            </Stack>
                          </Group>

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
                        </Stack>
                      </Card>

                      {/* Biomarqueurs */}
                      <Card
                        p="xl"
                        radius="lg"
                        withBorder
                        shadow="sm"
                        style={{
                          background:
                            colorScheme === 'dark'
                              ? 'var(--mantine-color-dark-6)'
                              : 'white',
                          border:
                            colorScheme === 'dark'
                              ? '1px solid var(--mantine-color-dark-4)'
                              : '1px solid var(--mantine-color-gray-2)',
                        }}
                      >
                        <Stack gap="lg">
                          {/* Header des biomarqueurs */}
                          <Group gap="sm" align="center">
                            <Box
                              p="xs"
                              style={{
                                background:
                                  theme.other?.gradients?.secondary ||
                                  'linear-gradient(135deg, var(--mantine-color-cyan-6) 0%, var(--mantine-color-cyan-7) 100%)',
                                borderRadius: '50%',
                              }}
                              role="img"
                              aria-label={t(
                                'dashboard.accessibility.biomarkerCard'
                              )}
                            >
                              <IconActivity
                                size={20}
                                style={{ color: 'white' }}
                              />
                            </Box>
                            <Stack gap={4}>
                              <Title order={3} size="h4">
                                {t('dashboard.biomarkers')}
                              </Title>
                              <Text
                                size="sm"
                                style={{
                                  color:
                                    theme.other?.accessible?.text?.secondary ||
                                    'var(--mantine-color-gray-6)',
                                }}
                              >
                                {t('dashboard.info.dataSourceDescription')}
                              </Text>
                            </Stack>
                          </Group>

                          {/* Grille des biomarqueurs */}
                          <SimpleGrid
                            cols={{ base: 1, sm: 2, lg: 3 }}
                            spacing="lg"
                          >
                            {biomarkersWithStatus.map((biomarker) => (
                              <BiomarkerItem
                                key={biomarker.id}
                                biomarker={biomarker}
                              />
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
                                    ? 'linear-gradient(135deg, var(--mantine-color-blue-8) 0%, var(--mantine-color-blue-9) 100%)'
                                    : theme.other?.gradients?.primary ||
                                      'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-blue-7) 100%)',
                                border: `1px solid ${colorScheme === 'dark' ? 'var(--mantine-color-blue-5)' : 'var(--mantine-color-blue-3)'}`,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <Group gap="sm" justify="center">
                                <IconClock
                                  size={16}
                                  style={{
                                    color:
                                      theme.other?.accessible?.text?.inverse ||
                                      'white',
                                    filter:
                                      'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
                                  }}
                                  aria-label="Last update"
                                />
                                <Text
                                  size="sm"
                                  fw={500}
                                  style={{
                                    color:
                                      theme.other?.accessible?.text?.inverse ||
                                      'white',
                                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                  }}
                                >
                                  {t('dashboard.lastCheck')}:{' '}
                                  {dashboardData.lastCheck}
                                </Text>
                              </Group>
                            </Paper>
                          )}
                        </Stack>
                      </Card>
                    </>
                  )}
                </div>
              )}
            </Transition>
          )}
        </Stack>
      </Box>

      {/* Modal d'aide */}
      <Modal
        opened={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        title={t('dashboard.help.dashboardOverview')}
        size="lg"
        centered
      >
        <Stack gap="md">
          <Text>{t('dashboard.help.biomarkerExplanation')}</Text>
          <Text>{t('dashboard.help.scoreExplanation')}</Text>
          <Text>{t('dashboard.help.trendExplanation')}</Text>
          <Text>{t('dashboard.help.alertExplanation')}</Text>
          <Text>{t('dashboard.help.chartExplanation')}</Text>
        </Stack>
      </Modal>

      {/* Modal des paramètres d'accessibilité */}
      <Modal
        opened={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title={t('dashboard.accessibility.keyboardShortcuts')}
        size="md"
        centered
      >
        <Stack gap="md">
          <Text
            size="sm"
            style={{
              color:
                theme.other?.accessible?.text?.secondary ||
                'var(--mantine-color-gray-6)',
            }}
          >
            {t('dashboard.accessibility.navigationHint')}
          </Text>
          <Divider />
          <Group gap="sm">
            <Text size="sm" fw={500}>
              R:
            </Text>
            <Text size="sm">{t('dashboard.refresh')}</Text>
          </Group>
          <Group gap="sm">
            <Text size="sm" fw={500}>
              H:
            </Text>
            <Text size="sm">{t('dashboard.help.dashboardOverview')}</Text>
          </Group>
          <Group gap="sm">
            <Text size="sm" fw={500}>
              E:
            </Text>
            <Text size="sm">{t('dashboard.exportData')}</Text>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default Dashboard;
