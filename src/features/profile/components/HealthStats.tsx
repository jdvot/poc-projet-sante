'use client';

import React from 'react';
import {
  Group,
  Stack,
  Text,
  Card,
  Box,
  Title,
  Progress,
  Badge,
  Grid,
  Paper,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {
  IconHeart,
  IconScale,
  IconRuler,
  IconBrain,
  IconFlame,
  IconStar,
  IconActivity,
  IconTrendingUp,
  IconTarget,
  IconChartBar,
  IconCalendar,
  IconGenderMale,
} from '@tabler/icons-react';
import { useHealthCalculations } from '../hooks/useHealthCalculations';
import { useProfileTranslations } from '../hooks/useProfileTranslations';
import { useUnitConversion } from '../../../shared/hooks/useUnitConversion';

interface HealthStatsProps {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female' | 'other';
}

export const HealthStats: React.FC<HealthStatsProps> = ({
  height,
  weight,
  age,
  gender,
}) => {
  const { profileT } = useProfileTranslations();
  const unitConversion = useUnitConversion();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  // Ensure values are numbers
  const heightNum =
    typeof height === 'string' ? parseFloat(height) || 0 : height;
  const weightNum =
    typeof weight === 'string' ? parseFloat(weight) || 0 : weight;
  const ageNum = typeof age === 'string' ? parseInt(age) || 0 : age;

  // Convert values to standard units for calculations
  const heightInCm = unitConversion.height.fromDisplay(heightNum);
  const weightInKg = unitConversion.weight.fromDisplay(weightNum);

  const stats = useHealthCalculations({
    height: heightInCm,
    weight: weightInKg,
    age: ageNum,
    gender,
  });

  if (!stats.bmi) {
    return null;
  }

  // Calculate BMI percentage for progress visualization
  const getBmiPercentage = (bmi: number) => {
    if (bmi < 18.5) return (bmi / 18.5) * 100;
    if (bmi < 25) return 100;
    if (bmi < 30) return Math.min(100 + ((bmi - 25) / 5) * 50, 150);
    return Math.min(150 + ((bmi - 30) / 10) * 50, 200);
  };

  const bmiPercentage = getBmiPercentage(parseFloat(stats.bmi || '0'));

  // Get recommendation based on BMI category
  const getRecommendation = (category: string) => {
    switch (category.toLowerCase()) {
      case 'underweight':
        return profileT.healthStats.recommendations.underweight;
      case 'normal weight':
        return profileT.healthStats.recommendations.normal;
      case 'overweight':
        return profileT.healthStats.recommendations.overweight;
      case 'obese':
        return profileT.healthStats.recommendations.obese;
      default:
        return profileT.healthStats.recommendations.normal;
    }
  };

  // Couleurs du thème pour l'accessibilité WCAG
  const getBmiColor = (bmi: number) => {
    if (bmi < 18.5) return theme.colors.blue[6]; // Underweight - blue
    if (bmi < 25) return theme.colors.green[6]; // Normal - green
    if (bmi < 30) return theme.colors.yellow[6]; // Overweight - yellow
    return theme.colors.red[6]; // Obese - red
  };

  const bmiColor = getBmiColor(parseFloat(stats.bmi || '0'));

  return (
    <Stack gap="xl" role="region" aria-labelledby="health-stats-title">
      {/* Header */}
      <Group gap="sm">
        <Box
          p="xs"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.health[6]} 0%, ${theme.colors.health[8]} 100%)`,
            borderRadius: '50%',
          }}
          aria-hidden="true"
        >
          <IconHeart size={20} style={{ color: 'white' }} />
        </Box>
        <Stack gap={4}>
          <Title
            id="health-stats-title"
            order={3}
            size="h4"
            style={{
              color: theme.colors.health[colorScheme === 'dark' ? 4 : 7],
            }}
          >
            {profileT.healthStats.title}
          </Title>
          <Text size="sm" c="dimmed">
            {profileT.healthStats.subtitle}
          </Text>
        </Stack>
      </Group>

      {/* BMI Overview Card */}
      <Card
        p="lg"
        radius="lg"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.health[0]} 0%, ${theme.colors.health[1]} 100%)`,
          border: `1px solid ${theme.colors.health[3]}`,
        }}
        role="article"
        aria-labelledby="bmi-overview-title"
      >
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title
              id="bmi-overview-title"
              order={4}
              size="h5"
              style={{
                color: theme.colors.health[colorScheme === 'dark' ? 4 : 7],
              }}
            >
              Indice de masse corporelle (IMC)
            </Title>
            <Badge
              variant="filled"
              style={{
                backgroundColor: bmiColor,
                color: 'white',
              }}
              aria-label={`IMC: ${stats.bmi} - ${stats.bmiCategory}`}
            >
              {stats.bmi}
            </Badge>
          </Group>

          <Progress
            value={Math.min(bmiPercentage, 100)}
            color={bmiColor}
            size="lg"
            radius="xl"
            aria-label={`Progression IMC: ${Math.round(bmiPercentage)}%`}
          />

          <Group justify="space-between" align="center">
            <Text
              size="sm"
              fw={600}
              style={{
                color: theme.colors.gray[colorScheme === 'dark' ? 3 : 7],
              }}
            >
              {stats.bmiCategory?.label || 'Normal'}
            </Text>
            <Text
              size="sm"
              style={{
                color: theme.colors.gray[colorScheme === 'dark' ? 4 : 6],
              }}
            >
              {getRecommendation(stats.bmiCategory?.label || 'normal weight')}
            </Text>
          </Group>
        </Stack>
      </Card>

      {/* Detailed Health Metrics */}
      <Grid gutter="md">
        {/* Height */}
        <Grid.Col span={6}>
          <Card
            p="md"
            radius="md"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.blue[0]} 0%, ${theme.colors.blue[1]} 100%)`,
              border: `1px solid ${theme.colors.blue[3]}`,
            }}
            role="article"
            aria-labelledby="height-metric"
          >
            <Stack gap="xs" align="center">
              <IconRuler
                size={24}
                style={{ color: theme.colors.blue[6] }}
                aria-hidden="true"
              />
              <Text
                id="height-metric"
                size="xs"
                fw={600}
                style={{
                  color: theme.colors.blue[colorScheme === 'dark' ? 4 : 7],
                }}
              >
                Taille
              </Text>
              <Text
                size="lg"
                fw={700}
                style={{
                  color: theme.colors.blue[colorScheme === 'dark' ? 3 : 8],
                }}
              >
                {heightNum
                  ? `${heightNum} ${unitConversion.height.unit}`
                  : 'Non renseigné'}
              </Text>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Weight */}
        <Grid.Col span={6}>
          <Card
            p="md"
            radius="md"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.green[0]} 0%, ${theme.colors.green[1]} 100%)`,
              border: `1px solid ${theme.colors.green[3]}`,
            }}
            role="article"
            aria-labelledby="weight-metric"
          >
            <Stack gap="xs" align="center">
              <IconScale
                size={24}
                style={{ color: theme.colors.green[6] }}
                aria-hidden="true"
              />
              <Text
                id="weight-metric"
                size="xs"
                fw={600}
                style={{
                  color: theme.colors.green[colorScheme === 'dark' ? 4 : 7],
                }}
              >
                Poids
              </Text>
              <Text
                size="lg"
                fw={700}
                style={{
                  color: theme.colors.green[colorScheme === 'dark' ? 3 : 8],
                }}
              >
                {weightNum
                  ? `${weightNum} ${unitConversion.weight.unit}`
                  : 'Non renseigné'}
              </Text>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Age */}
        <Grid.Col span={6}>
          <Card
            p="md"
            radius="md"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.purple[0]} 0%, ${theme.colors.purple[1]} 100%)`,
              border: `1px solid ${theme.colors.purple[3]}`,
            }}
            role="article"
            aria-labelledby="age-metric"
          >
            <Stack gap="xs" align="center">
              <IconCalendar
                size={24}
                style={{ color: theme.colors.purple[6] }}
                aria-hidden="true"
              />
              <Text
                id="age-metric"
                size="xs"
                fw={600}
                style={{
                  color: theme.colors.purple[colorScheme === 'dark' ? 4 : 7],
                }}
              >
                Âge
              </Text>
              <Text
                size="lg"
                fw={700}
                style={{
                  color: theme.colors.purple[colorScheme === 'dark' ? 3 : 8],
                }}
              >
                {ageNum ? `${ageNum} ans` : 'Non renseigné'}
              </Text>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Gender */}
        <Grid.Col span={6}>
          <Card
            p="md"
            radius="md"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.pink[0]} 0%, ${theme.colors.pink[1]} 100%)`,
              border: `1px solid ${theme.colors.pink[3]}`,
            }}
            role="article"
            aria-labelledby="gender-metric"
          >
            <Stack gap="xs" align="center">
              <IconGenderMale
                size={24}
                style={{ color: theme.colors.pink[6] }}
                aria-hidden="true"
              />
              <Text
                id="gender-metric"
                size="xs"
                fw={600}
                style={{
                  color: theme.colors.pink[colorScheme === 'dark' ? 4 : 7],
                }}
              >
                Genre
              </Text>
              <Text
                size="lg"
                fw={700}
                style={{
                  color: theme.colors.pink[colorScheme === 'dark' ? 3 : 8],
                }}
              >
                {gender === 'male'
                  ? 'Homme'
                  : gender === 'female'
                    ? 'Femme'
                    : 'Autre'}
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Health Recommendations */}
      <Card
        p="lg"
        radius="lg"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.yellow[0]} 0%, ${theme.colors.yellow[1]} 100%)`,
          border: `1px solid ${theme.colors.yellow[3]}`,
        }}
        role="article"
        aria-labelledby="health-recommendations-title"
      >
        <Stack gap="md">
          <Group gap="sm">
            <IconTarget
              size={20}
              style={{ color: theme.colors.yellow[7] }}
              aria-hidden="true"
            />
            <Title
              id="health-recommendations-title"
              order={4}
              size="h5"
              style={{
                color: theme.colors.yellow[colorScheme === 'dark' ? 4 : 7],
              }}
            >
              Recommandations de santé
            </Title>
          </Group>

          <Text
            size="sm"
            style={{ color: theme.colors.gray[colorScheme === 'dark' ? 3 : 7] }}
          >
            {getRecommendation(stats.bmiCategory?.label || 'normal weight')}
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
};
