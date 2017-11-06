import {
  references,
  referenceIds
} from '../../src/db/accessors'

describe('db accessors', () => {

  // references
  it('references should return empty array if null passed as document', () => {
    expect(references(null)).toEqual([])
  })
  it('references should return empty array if no references defined', () => {
    expect(references({})).toEqual([])
  })
  it('references should return references if references defined', () => {
    expect(references({ data: { references: ['a', 'b'] }})).toEqual(['a', 'b'])
  })

  // referenceIds
  it('referenceIds should return empty array if null passed as document', () => {
    expect(referenceIds(null)).toEqual([])
  })
  it('referenceIds should return empty array if no references defined', () => {
    expect(referenceIds({})).toEqual([])
  })
  it('referenceIds should return ids of references if references defined', () => {
    const references = [{ id: '1' }, { id: '2' }]
    expect(referenceIds({ data: { references }})).toEqual(['1', '2'])
  })

})
