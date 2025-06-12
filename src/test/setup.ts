import '@testing-library/jest-dom'

// Extend Jest's expect with testing-library matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveValue(value: string | number | string[]): R
      toHaveAttribute(attr: string, value?: string): R
      toBeInvalid(): R
    }
  }
} 