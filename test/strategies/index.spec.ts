const mockRelease = jest.fn()
const mockContext = jest.fn()
jest.mock('../../lib/strategies/release', () => ({
  __esModule: true,
  default: mockRelease,
}))
jest.mock('../../lib/strategies/context', () => ({
  __esModule: true,
  default: mockContext,
}))

import release from '../../lib/strategies/release'
import context from '../../lib/strategies/context'
import index from '../../lib/strategies'
describe('index', () => {
  it('should have release strategy', () => {
    expect(index.release).toEqual(mockRelease)
  })
  it('should have context strategy', () => {
    expect(index.context).toEqual(mockContext)
  })
})
