import { Togglee } from '../lib/togglee'
// @ts-ignore
import simulado from 'simulado'
import { Toggle } from '../lib/models/Toggle'
import { ReleaseToggle } from '../lib/models/ReleaseToggle'

describe('Toggle', () => {
  const sleeper = (time: number) => new Promise((resolve) => setTimeout(resolve, time))
  beforeEach(async () => {
    await simulado.start()
  })

  afterEach(async () => {
    await simulado.stop()
  })

  it('should use default value', async () => {
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

    const subject = new Togglee('http://localhost:7001/somepath', 1000, defaultToggles)

    expect(subject.isEnabled('propTrue')).toBeTruthy()
    expect(subject.isEnabled('propFalse')).toBeFalsy()
  })

  it('should return false if no defaults', async () => {
    const subject = new Togglee('http://localhost:7001/somepath', 1000)

    expect(subject.isEnabled('somerandom')).toBeFalsy()
  })

  it('should refresh cache in rate', async () => {
    const expectedResult = {
      toggles: [
        {
          name: 'propTrue',
          type: 'release',
          value: true,
        },
        {
          name: 'propFalse',
          type: 'release',
          value: false,
        },
      ],
    }

    await simulado.setMock({
      path: '/somepath',
      body: expectedResult,
    })

    const subject = new Togglee('http://localhost:7001/somepath', 0.1)

    await sleeper(1000)
    expect(subject.isEnabled('propTrue')).toBeTruthy()
    expect(subject.isEnabled('propFalse')).toBeFalsy()
  })

  it('should call onReady callback after resolving the remote content for first time', async () => {
    const expectedResult = {
      toggles: [
        {
          name: 'propTrue',
          type: 'release',
          value: true,
        },
        {
          name: 'propFalse',
          type: 'release',
          value: false,
        },
      ],
    }
    await simulado.setMock({
      path: '/somepath',
      body: expectedResult,
    })
    const subject = new Togglee('http://localhost:7001/somepath', 1000)

    await subject.onReady()
  })
})
