import {
  references,
  referenceIds,
  allReferencesLoaded
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

  // allReferencesLoaded
  it('allReferencesLoaded should return true if null passed as document', () => {
    expect(allReferencesLoaded(null)).toEqual(true)
  })
  it('allReferencesLoaded should return true if no references defined', () => {
    expect(allReferencesLoaded({})).toEqual(true)
  })
  it('allReferencesLoaded should return true if references and referenceDocs defined', () => {
    const doc = { data: { references: [{ id: '1' }, { id: '2' }]}}
    const referenceDocs = [{}, {}]
    expect(allReferencesLoaded(doc, referenceDocs)).toEqual(true)
  })
  it('allReferencesLoaded should return false if references and referenceDocs is []', () => {
    const doc = { data: { references: [{ id: '1' }, { id: '2' }]}}
    const referenceDocs = []
    expect(allReferencesLoaded(doc, referenceDocs)).toEqual(false)
  })
  it('allReferencesLoaded should return false if references and referenceDocs is null', () => {
    const doc = { data: { references: [{ id: '1' }, { id: '2' }]}}
    const referenceDocs = null
    expect(allReferencesLoaded(doc, referenceDocs)).toBeFalsy()
  })

})
