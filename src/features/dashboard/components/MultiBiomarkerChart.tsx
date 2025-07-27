'use client';

import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
} from 'recharts';
import {
  Card,
  Text,
  Group,
  Stack,
  Badge,
  MultiSelect,
  Box,
  Paper,
  Title,
  Switch,
  Divider,
  Button,
  ActionIcon,
} from '@mantine/core';
import {
  IconChartLine,
  IconTrendingUp,
  IconTrendingDown,
  IconActivity,
  IconCalendar,
  IconEye,
  IconEyeOff,
  IconPalette,
  IconDownload,
  IconRefresh,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';

import {
  type BloodTestData,
  mockBloodTestData,
} from '../../../shared/api/mockApi';

interface MultiBiomarkerChartProps {
  data: BloodTestData[];
  selectedBiomarkers?: string[];
  showReferenceLines?: boolean;
  showBrush?: boolean;
}

// Configuration des biomarqueurs avec support du thème
const getBiomarkerConfig = (colorScheme: 'light' | 'dark' | 'auto') => ({
  glucose: {
    name: 'bloodTest.biomarkers.glucose',
    unit: 'mmol/L',
    normalRange: [3.9, 6.1],
    color: '#3b82f6',
    strokeWidth: 3,
  },
  cholesterol: {
    name: 'bloodTest.biomarkers.cholesterol',
    unit: 'mmol/L',
    normalRange: [3.5, 5.2],
    color: '#ef4444',
    strokeWidth: 3,
  },
  triglycerides: {
    name: 'bloodTest.biomarkers.triglycerides',
    unit: 'mmol/L',
    normalRange: [0.5, 1.7],
    color: '#f59e0b',
    strokeWidth: 3,
  },
  hdl: {
    name: 'bloodTest.biomarkers.hdl',
    unit: 'mmol/L',
    normalRange: [1.0, 2.0],
    color: '#10b981',
    strokeWidth: 3,
  },
  ldl: {
    name: 'bloodTest.biomarkers.ldl',
    unit: 'mmol/L',
    normalRange: [1.5, 3.0],
    color: '#8b5cf6',
    strokeWidth: 3,
  },
  creatinine: {
    name: 'bloodTest.biomarkers.creatinine',
    unit: 'μmol/L',
    normalRange: [60, 110],
    color: '#06b6d4',
    strokeWidth: 3,
  },
  hemoglobin: {
    name: 'bloodTest.biomarkers.hemoglobin',
    unit: 'g/dL',
    normalRange: [12.0, 16.0],
    color: '#ec4899',
    strokeWidth: 3,
  },
});

export const MultiBiomarkerChart: React.FC<MultiBiomarkerChartProps> = ({
  data = mockBloodTestData,
  selectedBiomarkers = ['glucose', 'cholesterol'],
  showReferenceLines = true,
  showBrush = true,
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const [visibleBiomarkers, setVisibleBiomarkers] =
    useState<string[]>(selectedBiomarkers);
  const [showRefs, setShowRefs] = useState(showReferenceLines);
  const [showBrushTool, setShowBrushTool] = useState(showBrush);

  const biomarkerConfig = getBiomarkerConfig(colorScheme);

  // Préparer les données pour le graphique
  const chartData = useMemo(() => {
    return data.map((test: BloodTestData) => {
      const chartPoint: any = {
        date: new Date(test.date).toLocaleDateString('fr-FR', {
          month: 'short',
          year: 'numeric',
        }),
        fullDate: test.date,
        overallScore: test.overallScore,
        status: test.status,
      };

      // Ajouter les valeurs des biomarqueurs
      Object.entries(test.biomarkers).forEach(([key, value]) => {
        chartPoint[key] = value;
      });

      return chartPoint;
    });
  }, [data]);

  // État pour la sélection du Brush
  const [brushRange, setBrushRange] = useState<[number, number]>([
    0,
    chartData.length - 1,
  ]);

  // Calculer les tendances pour chaque biomarqueur visible
  const trends = useMemo(() => {
    const trendsData: Record<
      string,
      { direction: string; percentage: number }
    > = {};

    visibleBiomarkers.forEach((biomarker) => {
      const values = chartData
        .map((point: any) => point[biomarker])
        .filter(Boolean);
      if (values.length >= 2) {
        const firstValue = values[0];
        const lastValue = values[values.length - 1];
        const percentage = ((lastValue - firstValue) / firstValue) * 100;

        trendsData[biomarker] = {
          direction:
            percentage > 2 ? 'up' : percentage < -2 ? 'down' : 'stable',
          percentage: Math.abs(percentage),
        };
      }
    });

    return trendsData;
  }, [chartData, visibleBiomarkers]);

  // Composant de tooltip personnalisé
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isDark = colorScheme === 'dark';

      return (
        <Paper
          p="md"
          radius="lg"
          withBorder
          style={{
            background: isDark ? '#1a1b1e' : 'white',
            border: isDark ? '1px solid #373a40' : '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <Stack gap="xs">
            <Text fw={600} size="sm" c={isDark ? 'white' : 'dark'}>
              {label}
            </Text>
            {payload.map((entry: any, index: number) => (
              <Group key={index} gap="xs">
                <Box
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: entry.color,
                    borderRadius: 2,
                  }}
                />
                <Text size="sm" c="dimmed">
                  {t(
                    biomarkerConfig[
                      entry.dataKey as keyof typeof biomarkerConfig
                    ]?.name || entry.dataKey
                  )}
                  : {entry.value}{' '}
                  {
                    biomarkerConfig[
                      entry.dataKey as keyof typeof biomarkerConfig
                    ]?.unit
                  }
                </Text>
              </Group>
            ))}
            <Divider />
            <Text size="sm" c="dimmed">
              {t('bloodTest.chart.tooltip.overallScore')}:{' '}
              {payload[0]?.payload?.overallScore}%
            </Text>
          </Stack>
        </Paper>
      );
    }
    return null;
  };

  // Composant de légende personnalisé
  const CustomLegend = () => (
    <Stack gap="md" mt="lg">
      <Group gap="md" justify="space-between" wrap="wrap">
        <Group gap="md" wrap="wrap">
          {visibleBiomarkers.map((biomarker) => {
            const config =
              biomarkerConfig[biomarker as keyof typeof biomarkerConfig];
            const trend = trends[biomarker];

            return (
              <Group key={biomarker} gap="xs">
                <Box
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: config.color,
                    borderRadius: 2,
                  }}
                />
                <Text size="sm" fw={500}>
                  {t(config.name)}
                </Text>
                {trend && (
                  <Badge
                    variant="light"
                    color={
                      trend.direction === 'up'
                        ? 'red'
                        : trend.direction === 'down'
                          ? 'green'
                          : 'blue'
                    }
                    size="xs"
                    leftSection={
                      trend.direction === 'up' ? (
                        <IconTrendingUp size={10} />
                      ) : trend.direction === 'down' ? (
                        <IconTrendingDown size={10} />
                      ) : (
                        <IconActivity size={10} />
                      )
                    }
                  >
                    {trend.direction === 'up' && '+'}
                    {trend.percentage.toFixed(1)}%
                  </Badge>
                )}
              </Group>
            );
          })}
        </Group>

        <Group gap="sm">
          <Switch
            size="sm"
            label={t('bloodTest.chart.showReferenceLines')}
            checked={showRefs}
            onChange={(event) => setShowRefs(event.currentTarget.checked)}
          />
          <Switch
            size="sm"
            label={t('bloodTest.chart.showBrush')}
            checked={showBrushTool}
            onChange={(event) => setShowBrushTool(event.currentTarget.checked)}
          />
        </Group>
      </Group>
    </Stack>
  );

  // Lignes de référence pour les plages normales
  const referenceLines = useMemo(() => {
    if (!showRefs) return [];

    return visibleBiomarkers.flatMap((biomarker) => {
      const config = biomarkerConfig[biomarker as keyof typeof biomarkerConfig];
      return [
        {
          y: config.normalRange[0],
          stroke: config.color,
          strokeDasharray: '3 3',
          strokeOpacity: 0.5,
          label: `${t(config.name)} - ${t('bloodTest.chart.normalRange')} min`,
        },
        {
          y: config.normalRange[1],
          stroke: config.color,
          strokeDasharray: '3 3',
          strokeOpacity: 0.5,
          label: `${t(config.name)} - ${t('bloodTest.chart.normalRange')} max`,
        },
      ];
    });
  }, [visibleBiomarkers, showRefs, biomarkerConfig, t]);

  return (
    <Card
      p="xl"
      radius="lg"
      withBorder
      shadow="sm"
      data-testid="multi-biomarker-chart"
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
              <Title
                order={3}
                size="h4"
                c={colorScheme === 'dark' ? 'white' : 'dark'}
              >
                {t('bloodTest.title')}
              </Title>
              <Text size="sm" c="dimmed">
                {t('bloodTest.subtitle')}
              </Text>
            </Stack>
          </Group>

          <Group gap="sm">
            <MultiSelect
              size="sm"
              radius="lg"
              data={Object.entries(biomarkerConfig).map(([key, config]) => ({
                value: key,
                label: t(config.name),
              }))}
              value={visibleBiomarkers}
              onChange={setVisibleBiomarkers}
              placeholder={t('bloodTest.chart.selectBiomarker')}
              style={{ minWidth: 200 }}
            />

            <ActionIcon
              variant="light"
              size="md"
              radius="lg"
              onClick={() => {
                // Fonctionnalité d'export (à implémenter)
                console.log('Export chart');
              }}
            >
              <IconDownload size={16} />
            </ActionIcon>
          </Group>
        </Group>

        {/* Graphique */}
        <Box style={{ height: 500, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colorScheme === 'dark' ? '#373a40' : '#e2e8f0'}
              />
              <XAxis
                dataKey="date"
                stroke={colorScheme === 'dark' ? '#c1c2c5' : '#64748b'}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={colorScheme === 'dark' ? '#c1c2c5' : '#64748b'}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Lignes de référence */}
              {referenceLines.map((ref, index) => (
                <ReferenceLine
                  key={index}
                  y={ref.y}
                  stroke={ref.stroke}
                  strokeDasharray={ref.strokeDasharray}
                  strokeOpacity={ref.strokeOpacity}
                  label={ref.label}
                />
              ))}

              {/* Lignes des biomarqueurs */}
              {visibleBiomarkers.map((biomarker) => {
                const config =
                  biomarkerConfig[biomarker as keyof typeof biomarkerConfig];
                return (
                  <Line
                    key={biomarker}
                    type="monotone"
                    dataKey={biomarker}
                    stroke={config.color}
                    strokeWidth={config.strokeWidth}
                    dot={{
                      fill: config.color,
                      strokeWidth: 2,
                      r: 4,
                      stroke: colorScheme === 'dark' ? '#1a1b1e' : 'white',
                    }}
                    activeDot={{
                      r: 6,
                      stroke: config.color,
                      strokeWidth: 2,
                      fill: colorScheme === 'dark' ? '#1a1b1e' : 'white',
                    }}
                    name={t(config.name)}
                  />
                );
              })}

              {/* Brush pour la sélection de période */}
              {showBrushTool && (
                <Brush
                  dataKey="fullDate"
                  height={40}
                  stroke={colorScheme === 'dark' ? '#373a40' : '#e2e8f0'}
                  fill={colorScheme === 'dark' ? '#25262b' : '#f8fafc'}
                  startIndex={brushRange[0]}
                  endIndex={brushRange[1]}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('fr-FR', {
                      month: 'short',
                      year: 'numeric',
                    });
                  }}
                  alwaysShowText={true}
                  onChange={(brushData) => {
                    if (
                      brushData &&
                      brushData.startIndex !== undefined &&
                      brushData.endIndex !== undefined
                    ) {
                      setBrushRange([brushData.startIndex, brushData.endIndex]);
                    }
                  }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Légende et contrôles */}
        <CustomLegend />

        {/* Informations supplémentaires */}
        <Group gap="lg" justify="space-between" wrap="wrap">
          <Group gap="md" wrap="wrap">
            <Box>
              <Text size="xs" c="dimmed" mb={2}>
                {t('bloodTest.chart.bloodTests')}
              </Text>
              <Text size="sm" fw={500} data-testid="chart-data-count">
                {chartData.length}
              </Text>
            </Box>
            <Box>
              <Text size="xs" c="dimmed" mb={2}>
                {t('bloodTest.chart.biomarkersShown')}
              </Text>
              <Text size="sm" fw={500} data-testid="selected-biomarkers">
                {visibleBiomarkers.join(', ')}
              </Text>
            </Box>
            {showBrushTool &&
              (brushRange[0] !== 0 ||
                brushRange[1] !== chartData.length - 1) && (
                <Button
                  size="xs"
                  variant="light"
                  onClick={() => setBrushRange([0, chartData.length - 1])}
                  leftSection={<IconRefresh size={12} />}
                >
                  Réinitialiser la sélection
                </Button>
              )}
          </Group>

          <Group gap="xs">
            <IconCalendar
              size={16}
              style={{ color: 'var(--mantine-color-dimmed)' }}
            />
            <Text size="sm" c="dimmed">
              {chartData.length > 0
                ? showBrushTool &&
                  brushRange[0] !== 0 &&
                  brushRange[1] !== chartData.length - 1
                  ? `${new Date(chartData[brushRange[0]]?.fullDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })} - ${new Date(chartData[brushRange[1]]?.fullDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}`
                  : `${new Date(chartData[0]?.fullDate).getFullYear()} - ${new Date(chartData[chartData.length - 1]?.fullDate).getFullYear()}`
                : ''}
            </Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};
