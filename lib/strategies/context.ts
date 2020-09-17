const operationsMaps: any = {
  eq: (first: any, second: any) => first === second,
  ne: (first: any, second: any) => first !== second,
  gt: (first: any, second: any) => first > second,
  ge: (first: any, second: any) => first >= second,
  lt: (first: any, second: any) => first < second,
  le: (first: any, second: any) => first <= second,
}

const context = (toggle: any, currentContext: any) => {
  for (const condition of toggle.conditions) {
    const value = currentContext[condition.field]
    const expectedValue = condition.value
    const operation = condition.operation
    if (!operationsMaps[operation](expectedValue, value)) return false
  }
  return true
}

export default context
