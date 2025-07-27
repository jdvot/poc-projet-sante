import './globals.css';
import '@mantine/core/styles.css';
import type { ReactNode } from 'react';
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
          <AuthNavbarWrapper>{children}</AuthNavbarWrapper>
        </ClientProviders>
      </body>
    </html>
  );
}
