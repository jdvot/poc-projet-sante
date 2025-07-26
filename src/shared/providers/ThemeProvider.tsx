"use client";

import { MantineProvider, createTheme } from '@mantine/core';
import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, sans-serif',
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MantineProvider 
      theme={theme}
      defaultColorScheme="auto"
    >
      {children}
    </MantineProvider>
  );
} 