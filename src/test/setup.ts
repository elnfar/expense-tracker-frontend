import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Add vi to global scope with proper typing
declare global {
  var vi: typeof import('vitest').vi
}

Object.assign(globalThis, { vi })

// Mock CSS modules
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
