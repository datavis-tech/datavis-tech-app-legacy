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
  collaborators,
  forkedFrom,
  profile,
  files,
  isContentOp,
  viewCount
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
    it('should return true if no references defined', () => {
      expect(allReferencesLoaded([])).toEqual(true)
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

  describe('forkedFrom', () => {
    it('should return undefined if null passed as document', () => {
      expect(forkedFrom(null)).toBeUndefined()
    })
    it('should return undefined if no forkedFrom defined', () => {
      expect(forkedFrom({})).toBeUndefined()
    })
    it('should return forkedFrom if forkedFrom defined', () => {
      expect(forkedFrom({ data: { forkedFrom: 'foo' } })).toEqual('foo')
    })
  })

  describe('files', () => {
    it('should construct the "files" object expected by MagicSandbox.js', () => {
      const references = [
        { id: 'foo', fileName: 'foo' },
        { id: 'bar', fileName: 'bar' }
      ]
      const docs = [
        { id: 'foo', content: 'fooContent' },
        { id: 'bar', content: 'barContent' }
      ]
      expect(files(references, docs)).toMatchObject({
        foo: { content: 'fooContent' },
        bar: { content: 'barContent' }
      })
    })
  })

  describe('profile', () => {

    it('should return nothing if nothing was passed', () => {
      expect(profile()).toBeNull()
    })

    it('should return nothing if profile doc does not contain data', () => {
      expect(profile({})).toBeNull()
    })

    it('should return profile data', () => {
      const data = Symbol('data')
      expect(profile({data})).toEqual(data)
    })
  })

  describe('isContentOp', () => {

    it('should return false if nothing was passed', () => {
      expect(isContentOp()).toEqual(false)
    })

    it('should return false if create op was passed', () => {
      expect(isContentOp({
        create: {
          type: 'http://sharejs.org/types/JSONv0',
          data: { title: 'Fork of Fork of Iris Scatter Plot' }
        }
      })).toEqual(false)
    })

    it('should return false if content modifying op was passed', () => {
      expect(isContentOp({
        op: [ { p: [ 'type' ], oi: 'vis', od: 'data' } ]
      })).toEqual(false)
    })

    it('should return true if content modifying op was passed', () => {
      expect(isContentOp({
        op: [ { p: [ 'content', 365 ], si: 'h' } ]
      })).toEqual(true)
    })
  })

  describe('viewCount', () => {
    it('should return zero if null passed as document', () => {
      expect(viewCount(null)).toEqual(0)
    })
    it('should return zero no viewCount defined', () => {
      expect(viewCount({})).toEqual(0)
    })
    it('should return viewCount if viewCount defined', () => {
      expect(viewCount({ data: { viewCount: 25 } })).toEqual(25)
    })
  })
})
