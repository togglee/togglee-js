import { describe, it, expect } from 'vitest'
import { operations } from './operations'

describe('operations', () => {
  it('eq should return true if first equal second operation', () => {
    expect(operations['eq'](1, 1)).toBeTruthy()
  })
  it('eq should return false if first not equal second operation', () => {
    expect(operations['eq'](1, 2)).toBeFalsy()
  })
  it('ne should return true if first different second operation', () => {
    expect(operations['ne'](1, 2)).toBeTruthy()
  })
  it('ne should return false if first not different second operation', () => {
    expect(operations['ne'](1, 1)).toBeFalsy()
  })
  it('gt should return true if first greater than second operation', () => {
    expect(operations['gt'](2, 1)).toBeTruthy()
  })
  it('gt should return false if first not greater than second operation', () => {
    expect(operations['gt'](1, 1)).toBeFalsy()
  })
  it('ge should return true if first greater equal second operation', () => {
    expect(operations['ge'](1, 1)).toBeTruthy()
  })
  it('ge should return false if first not greater equal second operation', () => {
    expect(operations['ge'](1, 2)).toBeFalsy()
  })
  it('lt should return true if first lesser than second operation', () => {
    expect(operations['lt'](0, 1)).toBeTruthy()
  })
  it('lt should return false if first not lesser than second operation', () => {
    expect(operations['lt'](1, 1)).toBeFalsy()
  })
  it('le should return true if first lesser equal second operation', () => {
    expect(operations['le'](1, 1)).toBeTruthy()
  })
  it('le should return false if first not equal than second operation', () => {
    expect(operations['le'](2, 1)).toBeFalsy()
  })
})
