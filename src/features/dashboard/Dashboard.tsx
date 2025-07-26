"use client";

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
  SimpleGrid
} from '@mantine/core';
import { IconAlertCircle, IconRefresh, IconChartLine } from '@tabler/icons-react';
import { useDashboard } from '../../shared/hooks/useDashboard';

// Styles extraits pour éviter les recréations d'objets (optimisation perf)
const biomarkerItemStyles = {
  container: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    padding: '0.75rem 0',
    borderBottom: '1px solid var(--mantine-color-gray-3)',
  },
  valueContainer: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '12px',
  },
};

// Extraction de la logique métier dans des fonctions utilitaires
const getStatusColor = (status: 'normal' | 'elevated' | 'high' | 'critical'): string => {
  const statusColors: Record<string, string> = {
    normal: 'green',
    elevated: 'yellow',
    high: 'orange',
    critical: 'red',
  };
  return statusColors[status] || 'gray';
};

const getStatusLabel = (status: 'normal' | 'elevated' | 'high' | 'critical'): string => {
  const statusLabels: Record<string, string> = {
    normal: 'Normal',
    elevated: 'Élevé',
    high: 'Haut',
    critical: 'Critique',
  };
  return statusLabels[status] || 'Inconnu';
};

// Composant pour un biomarker individuel (séparation des responsabilités)
interface BiomarkerItemProps {
  biomarker: {
    id: string;
    name: string;
    value: number;
    unit: string;
    status: 'normal' | 'elevated' | 'high' | 'critical';
  };
}

const BiomarkerItem: React.FC<BiomarkerItemProps> = ({ biomarker }) => {
  // Optimisation perf : mémorisation des calculs coûteux
  const statusColor = useMemo(() => getStatusColor(biomarker.status), [biomarker.status]);
  const statusLabel = useMemo(() => getStatusLabel(biomarker.status), [biomarker.status]);

  return (
    <div 
      role="listitem"
      style={biomarkerItemStyles.container}
    >
      <Text component="span" aria-label={`Biomarker: ${biomarker.name}`}>
        {biomarker.name}
      </Text>
      <div 
        style={biomarkerItemStyles.valueContainer}
        aria-label={`Valeur: ${biomarker.value} ${biomarker.unit}, Statut: ${statusLabel}`}
      >
        <Text fw={500} component="span">
          {biomarker.value} {biomarker.unit}
        </Text>
        <Badge 
          color={statusColor} 
          size="sm"
          aria-label={`Statut: ${statusLabel}`}
        >
          {statusLabel}
        </Badge>
      </div>
    </div>
  );
};

// Composant de chargement
const DashboardSkeleton: React.FC = () => (
  <Stack gap="md">
    <Skeleton height={32} width="60%" />
    <Skeleton height={24} width="40%" />
    <Stack gap="sm">
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} height={48} />
      ))}
    </Stack>
  </Stack>
);

// Composant de statistiques
const DashboardStats: React.FC<{ statistics: any }> = ({ statistics }) => (
  <Card withBorder p="md" mb="md">
    <Group justify="space-between" align="center" mb="sm">
      <Title order={4}>📈 Statistiques</Title>
      <Badge size="lg" variant="light">
        Score: {statistics.healthScore}%
      </Badge>
    </Group>
    
    <SimpleGrid cols={2} spacing="md">
      <Stack gap="xs">
        <Text size="sm" c="dimmed">Normal</Text>
        <Text fw={600} size="lg" c="green">{statistics.normal}</Text>
      </Stack>
      <Stack gap="xs">
        <Text size="sm" c="dimmed">Élevé</Text>
        <Text fw={600} size="lg" c="yellow">{statistics.elevated}</Text>
      </Stack>
      <Stack gap="xs">
        <Text size="sm" c="dimmed">Haut</Text>
        <Text fw={600} size="lg" c="orange">{statistics.high}</Text>
      </Stack>
      <Stack gap="xs">
        <Text size="sm" c="dimmed">Critique</Text>
        <Text fw={600} size="lg" c="red">{statistics.critical}</Text>
      </Stack>
    </SimpleGrid>
    
    <Progress 
      value={statistics.healthScore} 
      color="green" 
      size="sm" 
      mt="sm"
    />
    <Text size="xs" c="dimmed" ta="center" mt="xs">
      {statistics.healthScore}% de santé
    </Text>
  </Card>
);

// Composant principal Dashboard
const Dashboard: React.FC = () => {
  const {
    dashboardData,
    biomarkersWithStatus,
    statistics,
    isLoading,
    error,
    refetch,
    isRefetching
  } = useDashboard();

  // Gestion des erreurs
  if (error) {
    return (
      <Container size="lg" py="xl">
        <Stack gap="xl">
          <Title order={1} id="dashboard-title">📊 Dashboard Santé</Title>
          
          <Alert 
            icon={<IconAlertCircle size="1rem" />} 
            title="Erreur de chargement" 
            color="red"
            variant="light"
          >
            <Text size="sm" mb="md">
              Impossible de charger les données du dashboard. Veuillez réessayer.
            </Text>
            <Button 
              leftSection={<IconRefresh size="1rem" />}
              onClick={() => refetch()}
              loading={isRefetching}
              size="sm"
            >
              Réessayer
            </Button>
          </Alert>
        </Stack>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title order={1} id="dashboard-title">📊 Dashboard Santé</Title>
          <Button 
            leftSection={<IconRefresh size="1rem" />}
            onClick={() => refetch()}
            loading={isRefetching}
            size="sm"
            variant="light"
            aria-label="Actualiser les données"
          >
            Actualiser
          </Button>
        </Group>
        
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            {statistics && <DashboardStats statistics={statistics} />}
            
            <Card withBorder p="xl" role="region" aria-labelledby="dashboard-title">
              <Stack gap="md">
                <Title order={2} size="h3" id="biomarkers-title">Biomarkers</Title>
                
                <Stack 
                  gap="sm" 
                  role="list" 
                  aria-labelledby="biomarkers-title"
                  aria-describedby="last-check-info"
                >
                  {biomarkersWithStatus.map((biomarker) => (
                    <BiomarkerItem 
                      key={biomarker.id} 
                      biomarker={biomarker} 
                    />
                  ))}
                </Stack>
                
                {dashboardData?.lastCheck && (
                  <Text 
                    size="sm" 
                    c="dimmed" 
                    id="last-check-info"
                    aria-label={`Dernier contrôle effectué le ${dashboardData.lastCheck}`}
                  >
                    Dernier check: {dashboardData.lastCheck}
                  </Text>
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
