import { Toggle } from './Toggle'
import { Conditions } from './Conditions'

export type ContextToggle = Toggle & {
  conditions: Conditions[]
}
