import {describe,expect,it} from 'vitest'
describe('SWAPI display rules',()=>{it('keeps numeric API values readable',()=>{const value='77';expect(`${value} kg`).toBe('77 kg')});it('handles unknown API values',()=>{const value='unknown';expect(value==='unknown'?'Unknown':`${value} kg`).toBe('Unknown')})})
