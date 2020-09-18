import { Togglee } from '../lib/togglee'
// @ts-ignore
import simulado from 'simulado'

describe('Toggle', () => {
  beforeEach(async () => {
    await simulado.start()
  })

  afterEach(async () => {
    await simulado.stop()
  })

  it('should use default value', async () => {
    const expectedResult = {
      propTrue: {
        type: 'release',
        value: true,
      },
      propFalse: {
        type: 'release',
        value: false,
      },
    }

    const subject = new Togglee('http://localhost:7001/somepath', 1000, expectedResult)

    expect(subject.isEnabled('propTrue')).toBeTruthy()
    expect(subject.isEnabled('propFalse')).toBeFalsy()
  })

  it('should return false as default', async () => {
    const subject = new Togglee('http://localhost:7001/somepath', 1000, {})

    expect(subject.isEnabled('somerandom')).toBeFalsy()
  })

  it('should return false if no defaults', async () => {
    const subject = new Togglee('http://localhost:7001/somepath', 1000)

    expect(subject.isEnabled('somerandom')).toBeFalsy()
  })

  it('should refresh cache in rate', async () => {
    const sleeper = new Promise((resolve) => setTimeout(resolve, 1000))
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

    await sleeper
    expect(subject.isEnabled('propTrue')).toBeTruthy()
    expect(subject.isEnabled('propFalse')).toBeFalsy()
  })
})
