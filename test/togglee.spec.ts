import { Togglee } from '../lib/togglee'
// @ts-ignore
import simulado from 'simulado'
import axios from 'axios'

describe('Toggle', () => {
  beforeEach(async () => {
    await simulado.start()
  })

  afterEach(async () => {
    await simulado.stop()
  })

  // it('should do stuff', async () => {
  //   const expectedResult = {
  //     prop1: 'awesome',
  //   }
  //   await simulado.setMock({
  //     path: '/somepath',
  //     body: expectedResult,
  //   })

  //   const response = await axios.get('http://localhost:7001/somepath')
  //   console.log(response)
  // })

  it('should use default value', async () => {
    const expectedResult = {
      "propTrue": {
          "type": "release",
          "value": true
      },
      "propFalse": {
          "type": "release",
          "value": false
      }
    }

    const subject = new Togglee('http://localhost:7001/somepath', 1000, expectedResult)

    expect(subject.isEnabled("propTrue")).toBeTruthy()
    expect(subject.isEnabled("propFalse")).toBeFalsy()
  })

  it('should return false as default', async () => {

    const subject = new Togglee('http://localhost:7001/somepath', 1000, {})

    expect(subject.isEnabled("somerandom")).toBeFalsy()
  })

  it('should return false if no defaults', async () => {

    const subject = new Togglee('http://localhost:7001/somepath', 1000)

    expect(subject.isEnabled("somerandom")).toBeFalsy()
  })

  it('should refresh cache in rate', async () => {
    const sleeper = new Promise(resolve => setTimeout(resolve, 5000))
    const expectedResult = {
      "propTrue": {
          "type": "release",
          "value": true
      },
      "propFalse": {
          "type": "release",
          "value": false
      }
    }

    await simulado.setMock({
      path: '/somepath',
      body: expectedResult,
    })

    const subject = new Togglee('http://localhost:7001/somepath', 1)

    await sleeper 
    expect(subject.isEnabled("propTrue")).toBeTruthy()
    expect(subject.isEnabled("propFalse")).toBeFalsy()
  })

})
