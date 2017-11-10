import {
  id,
  hasData,
  references,
  referenceIds,
  allReferencesLoaded,
  title,
  description,
  content,
  owner,
  collaborators
} from '../../src/db/accessors'

describe('accessors', () => {

  describe('id', () => {
    it('should return empty string if id not defined', () => {
      expect(id(null)).toEqual('')
    })
    it('should return id if id is defined', () => {
      expect(id({ id: 'foo' })).toEqual('foo')
    })
  })

  describe('hasData', () => {
    it('should return false if null passed as document', () => {
      expect(hasData(null)).toEqual(false)
    })
    it('should return false if no data defined', () => {
      expect(hasData({})).toEqual(false)
    })
    it('should return true if data defined', () => {
      expect(hasData({ data: {} })).toEqual(true)
    })
  })

  describe('references', () => {
    it('should return empty array if null passed as document', () => {
      expect(references(null)).toEqual([])
    })
    it('should return empty array if no references defined', () => {
      expect(references({})).toEqual([])
    })
    it('should return references if references defined', () => {
      expect(references({ data: { references: ['a', 'b'] } })).toEqual(['a', 'b'])
    })
  })

  describe('referencesIds', () => {
    it('should return empty array if null passed as document', () => {
      expect(referenceIds(null)).toEqual([])
    })
    it('should return empty array if no references defined', () => {
      expect(referenceIds({})).toEqual([])
    })
    it('should return ids of references if references defined', () => {
      const references = [{ id: '1' }, { id: '2' }]
      expect(referenceIds({ data: { references } })).toEqual(['1', '2'])
    })
  })

  describe('allReferencesLoaded', () => {
    it('should return true if null passed as document', () => {
      expect(allReferencesLoaded(null)).toEqual(true)
    })
    it('should return true if no references defined', () => {
      expect(allReferencesLoaded({})).toEqual(true)
    })
    it('should return true if references and referenceDocs defined', () => {
      const doc = { data: { references: [{ id: '1' }, { id: '2' }] } }
      const referenceDocs = [{}, {}]
      expect(allReferencesLoaded(doc, referenceDocs)).toEqual(true)
    })
    it('should return false if references and referenceDocs is []', () => {
      const doc = { data: { references: [{ id: '1' }, { id: '2' }] } }
      const referenceDocs = []
      expect(allReferencesLoaded(doc, referenceDocs)).toEqual(false)
    })
    it('should return false if references and referenceDocs is null', () => {
      const doc = { data: { references: [{ id: '1' }, { id: '2' }] } }
      const referenceDocs = null
      expect(allReferencesLoaded(doc, referenceDocs)).toBeFalsy()
    })
  })

  describe('title', () => {
    it('should return empty string if title not defined', () => {
      expect(title(null)).toEqual('')
    })
    it('should return title if title is defined', () => {
      expect(title({ data: { title: 'foo' } })).toEqual('foo')
    })
  })

  describe('description', () => {
    it('should return empty string if description not defined', () => {
      expect(description(null)).toEqual('')
    })
    it('should return description if description is defined', () => {
      expect(description({ data: { description: 'foo' } })).toEqual('foo')
    })
  })

  describe('content', () => {
    it('should return empty string if content not defined', () => {
      expect(content(null)).toEqual('')
    })
    it('should return content if content is defined', () => {
      expect(content({ data: { content: 'foo' } })).toEqual('foo')
    })
  })

  describe('owner', () => {
    it('should return empty string if owner not defined', () => {
      expect(owner(null)).toEqual('')
    })
    it('should return owner if owner is defined', () => {
      expect(owner({ data: { owner: 'foo' } })).toEqual('foo')
    })
  })

  describe('collaborators', () => {
    it('should return empty array if null passed as document', () => {
      expect(collaborators(null)).toEqual([])
    })
    it('should return empty array if no collaborators defined', () => {
      expect(collaborators({})).toEqual([])
    })
    it('should return collaborators if collaborators defined', () => {
      expect(collaborators({ data: { collaborators: ['a', 'b'] } })).toEqual(['a', 'b'])
    })
  })
})
