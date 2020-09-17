import axios from 'axios'
import strategyMaps from './strategies'
import mapJsonToToggles from './helpers/mapper'

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
      this.toggles = mapJsonToToggles((await axios.get(this.url)).data.toggles)
    } catch (error) {
      // empty block
    }
  }
}
