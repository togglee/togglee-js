import { ReleaseToggle } from "../../lib/models/ReleaseToggle"
import release from "../../lib/strategies/release"

describe('Release strategy', () => {
  it('should return true of value true', async () => {
    const toggle: ReleaseToggle = {
        name: 'propTrue',
        type: 'release',
        value: true,
      }
    expect(release(toggle)).toBeTruthy()
  })

  it('should return false of value false', async () => {
      const toggle: ReleaseToggle =  {
        name: 'propFalse',
        type: 'release',
        value: false,
      }
    expect(release(toggle)).toBeFalsy()
  })
})