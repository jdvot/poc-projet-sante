import './globals.css';
import '@mantine/core/styles.css';
import type { ReactNode } from 'react';
import { AppNavbar } from '../shared/ui/AppNavbar';
import { ClientProviders } from '../shared/providers/ClientProviders';

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
          <AppNavbar />
          <main>{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
