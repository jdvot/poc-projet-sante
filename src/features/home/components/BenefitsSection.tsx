'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Card, Stack, Title, List, ThemeIcon } from '@mantine/core';
import { IconCheck, IconSparkles } from '@tabler/icons-react';

interface BenefitsSectionProps {
  colorScheme: 'light' | 'dark' | 'auto';
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  colorScheme,
}) => {
  const { t } = useTranslation();

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Card
          withBorder
          p="xl"
          radius="lg"
          style={{ background: 'var(--mantine-color-body)' }}
        >
          <Stack gap="md">
            <Title order={3} style={{ color: 'var(--mantine-color-text)' }}>
              <IconCheck
                size={24}
                style={{
                  marginRight: '8px',
                  color: 'var(--mantine-color-green-6)',
                }}
              />
              {t('home.benefits')}
            </Title>
            <List
              spacing="sm"
              icon={
                <ThemeIcon color="green" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item style={{ color: 'var(--mantine-color-text)' }}>
                {t('home.benefitsList.0')}
              </List.Item>
              <List.Item style={{ color: 'var(--mantine-color-text)' }}>
                {t('home.benefitsList.1')}
              </List.Item>
              <List.Item style={{ color: 'var(--mantine-color-text)' }}>
                {t('home.benefitsList.2')}
              </List.Item>
              <List.Item style={{ color: 'var(--mantine-color-text)' }}>
                {t('home.benefitsList.3')}
              </List.Item>
              <List.Item style={{ color: 'var(--mantine-color-text)' }}>
                {t('home.benefitsList.4')}
              </List.Item>
              <List.Item style={{ color: 'var(--mantine-color-text)' }}>
                {t('home.benefitsList.5')}
              </List.Item>
            </List>
          </Stack>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Card
          withBorder
          p="xl"
          radius="lg"
          style={{ background: 'var(--mantine-color-body)' }}
        >
          <Stack gap="md">
            <Title order={3} style={{ color: 'var(--mantine-color-text)' }}>
              <IconSparkles
                size={24}
                style={{
                  marginRight: '8px',
                  color: 'var(--mantine-color-blue-6)',
                }}
              />
              {t('home.quality')}
            </Title>
            <List
              spacing="sm"
              icon={
                <ThemeIcon color="blue" size={20} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item style={{ color: 'var(--mantine-color-text)' }}>
                {t('home.qualityList.0')}
              </List.Item>
              <List.Item style={{ color: 'var(--mantine-color-text)' }}>
                {t('home.qualityList.1')}
              </List.Item>
              <List.Item style={{ color: 'var(--mantine-color-text)' }}>
                {t('home.qualityList.2')}
              </List.Item>
              <List.Item style={{ color: 'var(--mantine-color-text)' }}>
                {t('home.qualityList.3')}
              </List.Item>
              <List.Item style={{ color: 'var(--mantine-color-text)' }}>
                {t('home.qualityList.4')}
              </List.Item>
              <List.Item style={{ color: 'var(--mantine-color-text)' }}>
                {t('home.qualityList.5')}
              </List.Item>
            </List>
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  );
};
