import mapArrayofToggles from "../../lib/helpers/mapper";
import { ReleaseToggle } from "../../lib/models/ReleaseToggle";
import { Toggle } from "../../lib/models/Toggle";

describe('mapper', () => {

    it('should map', () => {
        const propTrue: ReleaseToggle = {
            name: 'propTrue',
            type: 'release',
            value: true,
          }    
          const propFalse: ReleaseToggle =  {
            name: 'propFalse',
            type: 'release',
            value: false,
          }
          const defaultToggles: Toggle[] = [
            propTrue,
            propFalse,
          ]
        expect(mapArrayofToggles(defaultToggles)).toEqual({
            propTrue,
            propFalse
        })
    });
});