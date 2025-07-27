import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../shared/i18n/config';
import { appTheme } from '../shared/config/theme';

// Configuration du client Query pour les tests
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

// Interface pour les options de test
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

// Wrapper personnalisé avec tous les providers nécessaires
function AllTheProviders({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient?: QueryClient;
}) {
  const testQueryClient = queryClient || createTestQueryClient();

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={testQueryClient}>
        <MantineProvider theme={appTheme}>{children}</MantineProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

// Fonction de rendu personnalisée
function customRender(ui: ReactElement, options: CustomRenderOptions = {}) {
  const { queryClient, ...renderOptions } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders queryClient={queryClient}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
}

// Ré-exporter tout depuis @testing-library/react
export * from '@testing-library/react';

// Exporter notre fonction de rendu personnalisée
export { customRender as render };
