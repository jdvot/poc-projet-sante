import React from 'react';
import { Card, Title, Text, Stack, Badge, Group, Button } from '@mantine/core';
import { IconRefresh, IconChartLine } from '@tabler/icons-react';
import { useApiCall } from '../../hooks/useApiCall';
import { fetchDashboardData } from '../../api/mockApi';

const DashboardDemo: React.FC = () => {
  const {
    data: dashboardData,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useApiCall(['dashboard-demo'], fetchDashboardData, {
    staleTime: 2 * 60 * 1000, // 2 minutes pour la démo
  });

  if (error) {
    return (
      <Card withBorder p="md">
        <Title order={3} mb="md">
          🚨 Erreur Dashboard
        </Title>
        <Text size="sm" c="red">
          Impossible de charger les données: {error.message}
        </Text>
        <Button
          mt="sm"
          size="xs"
          onClick={() => refetch()}
          loading={isRefetching}
        >
          Réessayer
        </Button>
      </Card>
    );
  }

  return (
    <Card withBorder p="md">
      <Group justify="space-between" align="center" mb="md">
        <Title order={3}>📊 Dashboard Demo</Title>
        <Button
          size="xs"
          variant="light"
          leftSection={<IconRefresh size="0.875rem" />}
          onClick={() => refetch()}
          loading={isRefetching}
        >
          Actualiser
        </Button>
      </Group>

      {isLoading ? (
        <Stack gap="sm">
          <Text size="sm" c="dimmed">
            Chargement des données...
          </Text>
          <Group gap="xs">
            <Badge size="sm" variant="light">
              Glucose: --
            </Badge>
            <Badge size="sm" variant="light">
              Cholestérol: --
            </Badge>
          </Group>
        </Stack>
      ) : (
        <Stack gap="sm">
          <Text size="sm" c="dimmed">
            Dernier check: {dashboardData?.lastCheck}
          </Text>
          <Group gap="xs" wrap="wrap">
            {dashboardData?.biomarkers.slice(0, 3).map((biomarker, index) => (
              <Badge
                key={`${biomarker.name}-${index}`}
                size="sm"
                variant="light"
                color={index === 2 ? 'yellow' : 'green'}
              >
                {biomarker.name}: {biomarker.value} {biomarker.unit}
              </Badge>
            ))}
          </Group>
          <Text size="xs" c="dimmed">
            TanStack Query + API Mock + État en temps réel
          </Text>
        </Stack>
      )}
    </Card>
  );
};

export default DashboardDemo;
