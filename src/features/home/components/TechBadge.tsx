'use client';

import React from 'react';
import { Badge } from '@mantine/core';

interface TechBadgeProps {
  children: React.ReactNode;
  color: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ children, color }) => (
  <Badge
    variant="light"
    color={color}
    size="lg"
    style={{
      background: `var(--mantine-color-${color}-0)`,
      color: `var(--mantine-color-${color}-6)`,
      border: `1px solid var(--mantine-color-${color}-3)`,
      fontWeight: 500,
    }}
  >
    {children}
  </Badge>
);
