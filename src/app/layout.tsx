import './globals.css';
import '@mantine/core/styles.css';
import type { ReactNode } from 'react';
import { Box } from '@mantine/core';
import { AppNavbar } from '../shared/ui/AppNavbar';
import { ClientProviders } from '../shared/providers/ClientProviders';
import { AuthNavbarWrapper } from '../shared/components/AuthNavbarWrapper';

export const metadata = {
  title: 'Limitless Health',
  description:
    'POC HealthTech - Dashboard santé, AI doctor, multi-langue, dark mode, etc.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ClientProviders>
          <AuthNavbarWrapper />
          <Box
            style={{
              display: 'flex',
              height: '100vh',
              width: '100vw',
              overflow: 'hidden',
              background: 'var(--mantine-color-body)',
            }}
          >
            <AppNavbar />
            <Box
              style={{
                flex: 1,
                padding: 'var(--mantine-spacing-md)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                overflow: 'auto',
                height: '100vh',
                background: 'var(--mantine-color-body)',
              }}
            >
              {children}
            </Box>
          </Box>
        </ClientProviders>
      </body>
    </html>
  );
}
