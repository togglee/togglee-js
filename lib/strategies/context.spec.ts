import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../helpers/operations', () => ({
  __esModule: true,
  operations: {
    op1: vi.fn(),
    op2: vi.fn(),
  },
}))

import { operations } from '../helpers/operations'
import { ContextToggle } from '../models/ContextToggle'
import context from './context'

describe('Release strategy', () => {
  const condition1 = {
    field: 'a',
    value: '123',
    operation: 'op1',
  }
  const condition2 = {
    field: 'b',
    value: '1234',
    operation: 'op2',
  }
  const toggle: ContextToggle = {
    name: 'toggle',
    type: 'context',
    conditions: [condition1, condition2],
  }

  const currentContext = {
    a: '123',
    b: '1234',
  }

  beforeEach(async () => {
    operations.op1.mockReset()
    operations.op2.mockReset()
  })

  it('should return true if property all equal true', async () => {
    operations.op1.mockReturnValue(true)
    operations.op2.mockReturnValue(true)
    expect(context(toggle, currentContext)).toBeTruthy()
    expect(operations.op1).toHaveBeenLastCalledWith(condition1.value, currentContext.a)
    expect(operations.op2).toHaveBeenLastCalledWith(condition2.value, currentContext.b)
  })
  it('should return false if one property equal false', async () => {
    operations.op1.mockReturnValue(false)
    operations.op2.mockReturnValue(true)
    const currentContext = {
      a: '123',
      b: '1234',
    }
    expect(context(toggle, currentContext)).toBeFalsy()
    expect(operations.op1).toHaveBeenLastCalledWith(condition1.value, currentContext.a)
  })
})
