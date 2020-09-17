import Toggle from '../models/toggles'

const reduceJsonArrayToToggle = (accumulator: any, toggle: Toggle): any => {
  accumulator[toggle.name] = toggle
  accumulator[toggle.name].name = undefined
  return accumulator
}

const mapJsonToToggles = (jsonToggles: [Toggle]): any => jsonToggles.reduce(reduceJsonArrayToToggle, {})

export default mapJsonToToggles
