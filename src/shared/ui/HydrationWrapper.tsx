'use client';

import { ReactNode, useEffect, useState } from 'react';

interface HydrationWrapperProps {
  children: ReactNode;
}

export function HydrationWrapper({ children }: HydrationWrapperProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
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
          background: 'var(--mantine-color-body)',
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
