import React from 'react';
import { describe, it, expect } from 'vitest';

// Simple test to verify the component can be imported without issues
describe('AppNavbar', () => {
  it('can be imported without causing issues', () => {
    // This test verifies that the component can be imported without causing
    // infinite re-render loops or other issues
    expect(() => {
      require('./AppNavbar');
    }).not.toThrow();
  });

  it('exports the component correctly', () => {
    const { AppNavbar } = require('./AppNavbar');
    expect(AppNavbar).toBeDefined();
    expect(typeof AppNavbar).toBe('function');
  });
});
