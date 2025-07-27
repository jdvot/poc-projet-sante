'use client';

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
} from 'recharts';
import {
  Card,
  Text,
  Group,
  Stack,
  Badge,
  Select,
  Box,
  Paper,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconChartLine,
  IconTrendingUp,
  IconTrendingDown,
  IconActivity,
  IconCalendar,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

// Types pour les données de prise de sang
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

interface BloodTestChartProps {
  data: BloodTestData[];
  selectedBiomarker?: string;
  chartType?: 'line' | 'area' | 'bar';
}

// Données mockées pour les prises de sang - 2 prises par an sur 2 ans
const mockBloodTestData: BloodTestData[] = [
  {
    id: '1',
    date: '2023-01-15',
    biomarkers: {
      glucose: 5.8,
      cholesterol: 5.5,
      triglycerides: 1.8,
      hdl: 1.2,
      ldl: 3.8,
      creatinine: 95,
      hemoglobin: 13.5,
    },
    overallScore: 68,
    status: 'elevated',
  },
  {
    id: '2',
    date: '2023-07-15',
    biomarkers: {
      glucose: 6.2,
      cholesterol: 5.8,
      triglycerides: 2.1,
      hdl: 1.1,
      ldl: 4.0,
      creatinine: 98,
      hemoglobin: 13.2,
    },
    overallScore: 62,
    status: 'high',
  },
  {
    id: '3',
    date: '2024-01-15',
    biomarkers: {
      glucose: 5.5,
      cholesterol: 5.0,
      triglycerides: 1.5,
      hdl: 1.4,
      ldl: 3.2,
      creatinine: 88,
      hemoglobin: 14.0,
    },
    overallScore: 78,
    status: 'normal',
  },
  {
    id: '4',
    date: '2024-07-15',
    biomarkers: {
      glucose: 5.2,
      cholesterol: 4.6,
      triglycerides: 1.2,
      hdl: 1.6,
      ldl: 2.8,
      creatinine: 82,
      hemoglobin: 14.5,
    },
    overallScore: 88,
    status: 'normal',
  },
];

// Configuration des biomarqueurs
const biomarkerConfig = {
  glucose: {
    name: 'Glucose',
    unit: 'mmol/L',
    normalRange: [3.9, 6.1],
    color: '#3b82f6',
  },
  cholesterol: {
    name: 'Cholestérol Total',
    unit: 'mmol/L',
    normalRange: [3.5, 5.2],
    color: '#ef4444',
  },
  triglycerides: {
    name: 'Triglycérides',
    unit: 'mmol/L',
    normalRange: [0.5, 1.7],
    color: '#f59e0b',
  },
  hdl: {
    name: 'HDL',
    unit: 'mmol/L',
    normalRange: [1.0, 2.0],
    color: '#10b981',
  },
  ldl: {
    name: 'LDL',
    unit: 'mmol/L',
    normalRange: [1.5, 3.0],
    color: '#8b5cf6',
  },
  creatinine: {
    name: 'Créatinine',
    unit: 'μmol/L',
    normalRange: [60, 110],
    color: '#06b6d4',
  },
  hemoglobin: {
    name: 'Hémoglobine',
    unit: 'g/dL',
    normalRange: [12.0, 16.0],
    color: '#ec4899',
  },
};

export const BloodTestChart: React.FC<BloodTestChartProps> = ({
  data = mockBloodTestData,
  selectedBiomarker = 'glucose',
  chartType = 'line',
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();

  // Préparer les données pour le graphique
  const chartData = useMemo(() => {
    return data.map((test) => ({
      date: new Date(test.date).toLocaleDateString('fr-FR', {
        month: 'short',
        year: '2-digit',
      }),
      fullDate: test.date,
      value: test.biomarkers[selectedBiomarker as keyof typeof test.biomarkers],
      overallScore: test.overallScore,
      status: test.status,
    }));
  }, [data, selectedBiomarker]);

  // Calculer les tendances
  const trends = useMemo(() => {
    if (chartData.length < 2) return { direction: 'stable', percentage: 0 };

    const firstValue = chartData[0].value;
    const lastValue = chartData[chartData.length - 1].value;
    const percentage = ((lastValue - firstValue) / firstValue) * 100;

    return {
      direction: percentage > 2 ? 'up' : percentage < -2 ? 'down' : 'stable',
      percentage: Math.abs(percentage),
    };
  }, [chartData]);

  // Obtenir la configuration du biomarqueur sélectionné
  const biomarker =
    biomarkerConfig[selectedBiomarker as keyof typeof biomarkerConfig];

  // Composant de tooltip personnalisé
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          p="md"
          radius="lg"
          withBorder
          style={{
            background: colorScheme === 'dark' ? '#1a1b1e' : 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border:
              colorScheme === 'dark'
                ? '1px solid #373a40'
                : '1px solid #e2e8f0',
          }}
        >
          <Stack gap="xs">
            <Text fw={600} size="sm">
              {label}
            </Text>
            <Text size="sm" c="dimmed">
              {biomarker.name}: {payload[0].value} {biomarker.unit}
            </Text>
            <Text size="sm" c="dimmed">
              Score global: {payload[0].payload.overallScore}%
            </Text>
          </Stack>
        </Paper>
      );
    }
    return null;
  };

  // Composant de légende personnalisé
  const CustomLegend = () => (
    <Group gap="md" justify="center" mt="md">
      <Group gap="xs">
        <Box
          style={{
            width: 12,
            height: 12,
            backgroundColor: biomarker.color,
            borderRadius: 2,
          }}
        />
        <Text size="sm" fw={500}>
          {biomarker.name}
        </Text>
      </Group>
      <Badge
        variant="light"
        color={
          trends.direction === 'up'
            ? 'red'
            : trends.direction === 'down'
              ? 'green'
              : 'blue'
        }
        leftSection={
          trends.direction === 'up' ? (
            <IconTrendingUp size={12} />
          ) : trends.direction === 'down' ? (
            <IconTrendingDown size={12} />
          ) : (
            <IconActivity size={12} />
          )
        }
      >
        {trends.direction === 'up' && '+'}
        {trends.percentage.toFixed(1)}%
      </Badge>
    </Group>
  );

  return (
    <Card
      p="xl"
      radius="lg"
      withBorder
      shadow="sm"
      style={{
        background: colorScheme === 'dark' ? '#1a1b1e' : 'white',
        border:
          colorScheme === 'dark' ? '1px solid #373a40' : '1px solid #e2e8f0',
      }}
    >
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <Box
              p="xs"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                borderRadius: '50%',
              }}
            >
              <IconChartLine size={20} style={{ color: 'white' }} />
            </Box>
            <Stack gap={4}>
              <Title order={3} size="h4">
                Évolution des Prises de Sang
              </Title>
              <Text size="sm" c="dimmed">
                Suivi de vos biomarqueurs dans le temps
              </Text>
            </Stack>
          </Group>

          <Group gap="sm">
            <Select
              size="sm"
              radius="lg"
              data={Object.entries(biomarkerConfig).map(([key, config]) => ({
                value: key,
                label: config.name,
              }))}
              value={selectedBiomarker}
              onChange={(value) => {
                // Gérer le changement de biomarqueur
                console.log('Selected biomarker:', value);
              }}
              style={{ minWidth: 150 }}
            />
          </Group>
        </Group>

        {/* Graphique */}
        <Box style={{ height: 400, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value} ${biomarker.unit}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={biomarker.color}
                  strokeWidth={3}
                  dot={{
                    fill: biomarker.color,
                    strokeWidth: 2,
                    r: 6,
                  }}
                  activeDot={{
                    r: 8,
                    stroke: biomarker.color,
                    strokeWidth: 2,
                    fill: 'white',
                  }}
                />
              </LineChart>
            ) : chartType === 'area' ? (
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value} ${biomarker.unit}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={biomarker.color}
                  fill={biomarker.color}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value} ${biomarker.unit}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  fill={biomarker.color}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </Box>

        {/* Légende et tendances */}
        <CustomLegend />

        {/* Informations supplémentaires */}
        <Group gap="lg" justify="space-between">
          <Group gap="md">
            <Box>
              <Text size="xs" c="dimmed" mb={2}>
                Plage normale
              </Text>
              <Text size="sm" fw={500}>
                {biomarker.normalRange[0]} - {biomarker.normalRange[1]}{' '}
                {biomarker.unit}
              </Text>
            </Box>
            <Box>
              <Text size="xs" c="dimmed" mb={2}>
                Dernière valeur
              </Text>
              <Text size="sm" fw={500}>
                {chartData[chartData.length - 1]?.value} {biomarker.unit}
              </Text>
            </Box>
          </Group>

          <Group gap="xs">
            <IconCalendar
              size={16}
              style={{ color: 'var(--mantine-color-dimmed)' }}
            />
            <Text size="sm" c="dimmed">
              {chartData.length > 0
                ? `${new Date(chartData[0]?.fullDate).getFullYear()} - ${new Date(chartData[chartData.length - 1]?.fullDate).getFullYear()}`
                : ''}
            </Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};
