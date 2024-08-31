import { describe, it, expect } from 'vitest'
import mapArrayofToggles from './mapper'
import { ReleaseToggle } from '../models/ReleaseToggle'
import { Toggle } from '../models/Toggle'

describe('mapper', () => {
  it('should map', () => {
    const propTrue: ReleaseToggle = {
      name: 'propTrue',
      type: 'release',
      value: true,
    }
    const propFalse: ReleaseToggle = {
      name: 'propFalse',
      type: 'release',
      value: false,
    }
    const defaultToggles: Toggle[] = [propTrue, propFalse]
    expect(mapArrayofToggles(defaultToggles)).toEqual({
      propTrue,
      propFalse,
    })
  })
})
