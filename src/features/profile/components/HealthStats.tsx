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

  const getBmiColor = (bmi: number) => {
    if (bmi < 18.5) return 'blue';
    if (bmi < 25) return 'green';
    if (bmi < 30) return 'orange';
    return 'red';
  };

  return (
    <Stack gap="xl" data-testid="health-stats">
      {/* Header */}
      <Group gap="sm">
        <Box
          p="xs"
          style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            borderRadius: '50%',
          }}
        >
          <IconHeart size={20} style={{ color: 'white' }} />
        </Box>
        <Stack gap={4}>
          <Title order={3} size="h4">
            {profileT.healthStats.title}
          </Title>
          <Text size="sm" c="dimmed">
            {profileT.healthStats.subtitle}
          </Text>
        </Stack>
      </Group>

      {/* BMI Score Card - Main Focus */}
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
            colorScheme === 'dark' ? '1px solid #dc2626' : '1px solid #fecaca',
        }}
      >
        <Stack gap="lg">
          <Group gap="sm" align="center">
            <IconTarget
              size={24}
              style={{ color: 'var(--mantine-color-red-6)' }}
            />
            <Text fw={700} size="lg" c="red.6">
              Score BMI
            </Text>
            <Badge
              size="lg"
              variant="filled"
              color={getBmiColor(parseFloat(stats.bmi || '0'))}
            >
              {stats.bmi}
            </Badge>
          </Group>

          <Box>
            <Group justify="space-between" mb="xs">
              <Text size="sm" fw={500}>
                {stats.bmiCategory?.label || 'Normal'}
              </Text>
              <Text size="sm" c="dimmed">
                {Math.round(bmiPercentage)}%
              </Text>
            </Group>
            <Progress
              value={Math.min(bmiPercentage, 100)}
              color={getBmiColor(parseFloat(stats.bmi || '0'))}
              size="lg"
              radius="xl"
              style={{ background: 'rgba(0,0,0,0.1)' }}
            />
          </Box>

          <Text size="sm" c="dimmed" ta="center">
            {profileT.healthStats.bmiDescription}
          </Text>
        </Stack>
      </Card>

      {/* Key Metrics Grid */}
      <Card
        p="lg"
        radius="lg"
        withBorder
        style={{
          background: colorScheme === 'dark' ? '#1a1b1e' : 'white',
          border:
            colorScheme === 'dark' ? '1px solid #373a40' : '1px solid #e2e8f0',
        }}
      >
        <Stack gap="lg">
          <Group gap="xs" align="center">
            <IconChartBar
              size={18}
              style={{ color: 'var(--mantine-color-blue-6)' }}
            />
            <Text fw={600} size="sm">
              Mesures principales
            </Text>
          </Group>

          <Grid gutter="md">
            {/* Height */}
            <Grid.Col span={{ base: 6, sm: 3 }}>
              <Paper
                p="md"
                radius="md"
                withBorder
                style={{
                  background:
                    'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
                  border: '1px solid #a5f3fc',
                }}
              >
                <Stack gap="xs" align="center">
                  <Box
                    p="xs"
                    style={{
                      background:
                        'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                      borderRadius: '50%',
                    }}
                  >
                    <IconRuler size={20} style={{ color: 'white' }} />
                  </Box>
                  <Text fw={700} size="xl" data-testid="height">
                    {unitConversion.height.unit === 'ft'
                      ? Math.floor(heightNum)
                      : heightNum}
                  </Text>
                  <Badge size="xs" variant="light" color="cyan">
                    {unitConversion.height.unit}
                  </Badge>
                  <Text size="xs" c="dimmed" ta="center">
                    {profileT.healthStats.height}
                  </Text>
                </Stack>
              </Paper>
            </Grid.Col>

            {/* Weight */}
            <Grid.Col span={{ base: 6, sm: 3 }}>
              <Paper
                p="md"
                radius="md"
                withBorder
                style={{
                  background:
                    'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  border: '1px solid #93c5fd',
                }}
              >
                <Stack gap="xs" align="center">
                  <Box
                    p="xs"
                    style={{
                      background:
                        'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      borderRadius: '50%',
                    }}
                  >
                    <IconScale size={20} style={{ color: 'white' }} />
                  </Box>
                  <Text fw={700} size="xl" data-testid="weight">
                    {unitConversion.weight.unit === 'lbs'
                      ? Math.round(weightNum)
                      : weightNum}
                  </Text>
                  <Badge size="xs" variant="light" color="blue">
                    {unitConversion.weight.unit}
                  </Badge>
                  <Text size="xs" c="dimmed" ta="center">
                    {profileT.healthStats.weight}
                  </Text>
                </Stack>
              </Paper>
            </Grid.Col>

            {/* Ideal Weight */}
            {stats.idealWeight && (
              <Grid.Col span={{ base: 6, sm: 3 }}>
                <Paper
                  p="md"
                  radius="md"
                  withBorder
                  style={{
                    background:
                      'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                    border: '1px solid #86efac',
                  }}
                >
                  <Stack gap="xs" align="center">
                    <Box
                      p="xs"
                      style={{
                        background:
                          'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '50%',
                      }}
                    >
                      <IconStar size={20} style={{ color: 'white' }} />
                    </Box>
                    <Text fw={700} size="xl">
                      {unitConversion.weight.toDisplay(
                        parseFloat(stats.idealWeight || '0')
                      )}
                    </Text>
                    <Badge size="xs" variant="light" color="green">
                      {unitConversion.weight.unit}
                    </Badge>
                    <Text size="xs" c="dimmed" ta="center">
                      {profileT.healthStats.idealWeight}
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>
            )}

            {/* Age */}
            <Grid.Col span={{ base: 6, sm: 3 }}>
              <Paper
                p="md"
                radius="md"
                withBorder
                style={{
                  background:
                    'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
                  border: '1px solid #f9a8d4',
                }}
              >
                <Stack gap="xs" align="center">
                  <Box
                    p="xs"
                    style={{
                      background:
                        'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                      borderRadius: '50%',
                    }}
                  >
                    <IconCalendar size={20} style={{ color: 'white' }} />
                  </Box>
                  <Text fw={700} size="xl" data-testid="age">
                    {ageNum}
                  </Text>
                  <Badge size="xs" variant="light" color="pink">
                    ans
                  </Badge>
                  <Text size="xs" c="dimmed" ta="center">
                    Âge
                  </Text>
                </Stack>
              </Paper>
            </Grid.Col>

            {/* Gender */}
            <Grid.Col span={{ base: 6, sm: 3 }}>
              <Paper
                p="md"
                radius="md"
                withBorder
                style={{
                  background:
                    'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  border: '1px solid #7dd3fc',
                }}
              >
                <Stack gap="xs" align="center">
                  <Box
                    p="xs"
                    style={{
                      background:
                        'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                      borderRadius: '50%',
                    }}
                  >
                    <IconGenderMale size={20} style={{ color: 'white' }} />
                  </Box>
                  <Text fw={700} size="xl" data-testid="gender">
                    {gender}
                  </Text>
                  <Badge size="xs" variant="light" color="sky">
                    Genre
                  </Badge>
                  <Text size="xs" c="dimmed" ta="center">
                    Sexe
                  </Text>
                </Stack>
              </Paper>
            </Grid.Col>

            {/* BMR */}
            {stats.bmr && (
              <Grid.Col span={{ base: 6, sm: 3 }}>
                <Paper
                  p="md"
                  radius="md"
                  withBorder
                  style={{
                    background:
                      'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                    border: '1px solid #fcd34d',
                  }}
                >
                  <Stack gap="xs" align="center">
                    <Box
                      p="xs"
                      style={{
                        background:
                          'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        borderRadius: '50%',
                      }}
                    >
                      <IconFlame size={20} style={{ color: 'white' }} />
                    </Box>
                    <Text fw={700} size="xl">
                      {Math.round(stats.bmr)}
                    </Text>
                    <Badge size="xs" variant="light" color="orange">
                      kcal
                    </Badge>
                    <Text size="xs" c="dimmed" ta="center">
                      {profileT.healthStats.bmr}
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>
            )}
          </Grid>
        </Stack>
      </Card>

      {/* Health Recommendations */}
      {stats.bmiCategory && (
        <Card
          p="lg"
          radius="lg"
          withBorder
          style={{
            background:
              stats.bmiCategory.color === 'red'
                ? 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)'
                : 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            border:
              stats.bmiCategory.color === 'red'
                ? '1px solid #fecaca'
                : '1px solid #bbf7d0',
          }}
        >
          <Group gap="sm" mb="sm">
            <IconBrain
              size={18}
              style={{
                color:
                  stats.bmiCategory.color === 'red'
                    ? 'var(--mantine-color-red-6)'
                    : 'var(--mantine-color-green-6)',
              }}
            />
            <Text fw={600} size="sm">
              {profileT.healthStats.bmiCategory.replace(
                '{{category}}',
                stats.bmiCategory.label
              )}
            </Text>
          </Group>
          <Text size="sm" c="dimmed">
            {getRecommendation(stats.bmiCategory.label)}
          </Text>
        </Card>
      )}
    </Stack>
  );
};
