const operations_maps: any = {
    'eq': (first: any, second: any) => first == second,
    'ne': (first: any, second: any) => first != second,
    'gt': (first: any, second: any) => first > second,
    'ge': (first: any, second: any) => first >= second,
    'lt': (first: any, second: any) => first < second,
    'le': (first: any, second: any) => first <= second,
}

const context = (toggle: any, context: any) => {
    for (const condition of toggle.conditions) {
        const value = context[condition['field']]
        const expected_value = condition['value']
        const operation = condition['operation']
        if(!operations_maps[operation](expected_value, value))
            return false
    }
    return true
}

export default context