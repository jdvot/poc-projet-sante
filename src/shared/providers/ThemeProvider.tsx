'use client';

import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { appTheme } from '../config/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <>
      <ColorSchemeScript />
      <MantineProvider theme={appTheme} defaultColorScheme="auto">
        {children}
      </MantineProvider>
    </>
  );
};
