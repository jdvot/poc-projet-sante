/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';

declare module 'vitest' {
  interface Assertion<T = any> {
    toBeInTheDocument(): T;
    toHaveAttribute(attr: string, value?: string): T;
    toHaveBeenCalledWith(...args: any[]): T;
    toHaveClass(className: string): T;
    toHaveTextContent(text: string): T;
    toBeVisible(): T;
    toBeDisabled(): T;
    toBeEnabled(): T;
    toHaveValue(value: string | number | string[]): T;
    toBeChecked(): T;
    toHaveFocus(): T;
    toHaveStyle(css: string | Record<string, any>): T;
  }
}
export {};
