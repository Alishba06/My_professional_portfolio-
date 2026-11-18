import React from 'react';

export interface PortfolioSection {
  id: string;
  title: string;
  navLabel?: string;
  order: number;
  component: React.ComponentType<Record<string, unknown>>;
  enabled?: boolean;
}
