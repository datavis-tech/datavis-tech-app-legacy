import { references } from '../../src/db/accessors'

describe('db accessors', () => {

  it('references should return empty array if null passed as document', () => {
    expect(references(null)).toEqual([])
  })

  it('references should return empty array if no references defined', () => {
    expect(references({})).toEqual([])
  })

  it('references should return references if references defined', () => {
    expect(references({ data: { references: ['a', 'b'] }})).toEqual(['a', 'b'])
  })

})
