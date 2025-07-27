'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Text } from '@mantine/core';

interface HomeFooterProps {
  colorScheme: 'light' | 'dark' | 'auto';
}

export const HomeFooter: React.FC<HomeFooterProps> = ({ colorScheme }) => {
  const { t } = useTranslation();

  return (
    <Paper
      p="md"
      radius="md"
      style={{
        background: 'var(--mantine-color-gray-0)',
        border: '1px solid var(--mantine-color-gray-2)',
        textAlign: 'center',
      }}
    >
      <Text
        size="sm"
        c="dimmed"
        style={{ color: 'var(--mantine-color-dimmed)' }}
      >
        {t('home.footer.structure')} • {t('home.footer.ready')} •{' '}
        {t('home.footer.demo')}
      </Text>
    </Paper>
  );
};
