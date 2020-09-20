import { ContextToggle } from '../models/ContextToggle'
import { operations } from '../helpers/operations'

const context = (toggle: ContextToggle, currentContext: any) => {
  for (const condition of toggle.conditions) {
    const value = currentContext[condition.field]
    const expectedValue = condition.value
    const operation = condition.operation
    if (!operations[operation](expectedValue, value)) return false
  }
  return true
}

export default context
