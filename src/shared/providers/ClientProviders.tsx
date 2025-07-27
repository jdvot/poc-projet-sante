'use client';

import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import i18n from '../i18n/config';
import { ThemeProvider } from './ThemeProvider';
import { I18nProvider } from '../i18n/I18nProvider';
import { HydrationWrapper } from '../ui/HydrationWrapper';
import { NotificationContainer } from '../ui/NotificationContainer';
import { useAccessibilitySettings } from '../hooks/useAccessibilitySettings';

interface ClientProvidersProps {
  children: ReactNode;
}

// Création d'un QueryClient avec configuration par défaut
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export function ClientProviders({ children }: ClientProvidersProps) {
  // Apply accessibility settings globally
  useAccessibilitySettings();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <I18nProvider>
          <ThemeProvider>
            <NotificationContainer />
            <HydrationWrapper>{children}</HydrationWrapper>
          </ThemeProvider>
        </I18nProvider>
      </I18nextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
