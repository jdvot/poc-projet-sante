'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useMantineColorScheme } from '@mantine/core';

interface HydrationWrapperProps {
  children: ReactNode;
}

export function HydrationWrapper({ children }: HydrationWrapperProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    // Délai pour s'assurer que le thème est bien appliqué
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Show a loading state or skeleton during hydration
  if (!isHydrated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: colorScheme === 'dark' 
            ? 'var(--mantine-color-dark-6)' 
            : 'var(--mantine-color-body)',
          color: colorScheme === 'dark' 
            ? 'var(--mantine-color-gray-3)' 
            : 'var(--mantine-color-text)',
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
