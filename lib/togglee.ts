import axios from 'axios'

const operations_maps: any = {
    'eq': (first: any, second: any) => first == second,
    'ne': (first: any, second: any) => first != second,
    'gt': (first: any, second: any) => first > second,
    'ge': (first: any, second: any) => first >= second,
    'lt': (first: any, second: any) => first < second,
    'le': (first: any, second: any) => first <= second,
}
const strategyMaps: any = {
    "release": (toggle: any) => toggle['value'],
    "context": (toggle: any, context: any) => {
        for (const condition of toggle.conditions) {
            const value = context[condition['field']]
            const expected_value = condition['value']
            const operation = condition['operation']
            if(!operations_maps[operation](expected_value, value))
                return false
        }
        return true
    },
}

export class Togglee {
  private toggles?: any
  private url: string

  constructor(url: string, refreshRate: number, defaults?: any) {
    this.toggles = defaults
    setInterval(this.refreshCache, refreshRate * 1000)
    this.url = url
  }

  public isEnabled(prop: string, context?: any) {
    return this.toggles !== undefined && this.toggles[prop] !== undefined ? this.getValue(prop, context) : false
  }

  private getValue(prop: string, context: any) {
    try {
      const toggle = this.toggles[prop]
      return strategyMaps[toggle.type](toggle, context)
    } catch (error) {
      return false
    }
  }

  private refreshCache = async () => {
      try {
        this.toggles = (await axios.get(this.url)).data
      } catch (error) {
      }
  }
}
