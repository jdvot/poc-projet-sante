import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock pour window.matchMedia (nécessaire pour Mantine)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Add a mock for ResizeObserver, which is not available in JSDOM environment
// This is required for Mantine components that use use-resize-observer hook
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
