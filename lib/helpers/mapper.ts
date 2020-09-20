import { Toggle } from '../models/Toggle'

const reduceJsonArrayToToggle = (accumulator: any, toggle: Toggle): any => {
  accumulator[toggle.name] = toggle
  return accumulator
}

const mapArrayofToggles = (jsonToggles: Toggle[]): any => jsonToggles.reduce(reduceJsonArrayToToggle, {})

export default mapArrayofToggles
