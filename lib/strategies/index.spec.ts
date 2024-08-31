import { describe, it, expect, vi } from 'vitest'
import index from '.'

const { mockRelease, mockContext } = vi.hoisted(() => {
  return {
    mockRelease: vi.fn(),
    mockContext: vi.fn(),
  }
})
vi.mock('./release', () => ({
  __esModule: true,
  default: mockRelease,
}))
vi.mock('./context', () => ({
  __esModule: true,
  default: mockContext,
}))

describe('index', () => {
  it('should have release strategy', () => {
    expect(index.release).toEqual(mockRelease)
  })
  it('should have context strategy', () => {
    expect(index.context).toEqual(mockContext)
  })
})
