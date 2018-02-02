import ShareDB from 'sharedb'
import { DB_DOCUMENTS_COLLECTION, DB_FEEDBACK_COLLECTION } from '../../../src/constants'

// Connect to an in-memory ShareDB instance (without query support)
const mockConnection = (new ShareDB()).connect()
jest.mock('../../../src/db/connection', () => ({
  get: (collection, id) => mockConnection.get(collection, id)
}))

import {
  createDocument,
  deleteDocument,
  createFeedbackEntry,
  addCollaborator,
  removeCollaborator,
  addReference,
  removeReference,
  fork,
  incrementViewCount
} from '../../../src/db/actions/index'

import {
  push,
  listDelete,
  add
} from '../../../src/db/actions/primitives'

describe('[integration test] actions', () => {

  let doc

  beforeAll(() => {
    doc = createDocument({
      title: 'My Title',
      description: 'Some description',
      owner: '78943278'
    })
  })

  describe('createDocument', () => {
    it('should initialize a document', () => {
      expect(doc.data).toMatchObject({
        schemaVersion: 2,
        title: 'My Title',
        description: 'Some description',
        owner: '78943278',
        content: ''
      })
      expect(doc.collection).toEqual(DB_DOCUMENTS_COLLECTION)
      expect(doc.type.name).toEqual('json0')
    })
  })
  describe('push', () => {
    it('should initialize array and add one collaborator', () => {
      expect(doc.data.collaborators).toBeUndefined()
      push({
        shareDBDoc: doc,
        property: 'collaborators',
        item: {
          id: '007'
        }
      })
      expect(doc.data.collaborators).toMatchObject([{ id: '007' }])
    })
  })

  describe('addCollaborator', () => {
    it('should add a second collaborator', () => {
      addCollaborator(doc, '500')
      expect(doc.data.collaborators).toMatchObject([{ id: '007' }, { id: '500' }])
    })
    it('should add a third collaborator', () => {
      addCollaborator(doc, '999')
      expect(doc.data.collaborators).toMatchObject([{ id: '007' }, { id: '500' }, { id: '999' }])
    })
  })

  describe('addReference', () => {
    it('should initialize array and add one reference', () => {
      expect(doc.data.references).toBeUndefined()
      addReference(doc, 'data.csv', '1')
      expect(doc.data.references).toMatchObject([
        { fileName: 'data.csv', id: '1' }
      ])
    })
    it('should add a second reference, using default values', () => {
      addReference(doc)
      expect(doc.data.references).toMatchObject([
        { fileName: 'data.csv', id: '1' },
        { fileName: '', id: '' }
      ])
    })
    it('should add a third reference', () => {
      addReference(doc, 'shapes.json', '3')
      expect(doc.data.references).toMatchObject([
        { fileName: 'data.csv', id: '1' },
        { fileName: '', id: '' },
        { fileName: 'shapes.json', id: '3' }
      ])
    })
  })

  describe('fork', () => {
    it('should fork a document', () => {
      const forkedDoc = fork(doc, '007')
      expect(forkedDoc.data).toMatchObject({
        schemaVersion: 2,
        title: 'Fork of My Title',
        description: 'Some description',
        owner: '007',
        content: '',
        references: [
          { fileName: 'data.csv', id: '1' },
          { fileName: '', id: '' },
          { fileName: 'shapes.json', id: '3' }
        ],
        type: 'vis',
        forkedFrom: doc.id
      })
      expect(doc.collection).toEqual(DB_DOCUMENTS_COLLECTION)
      expect(doc.type.name).toEqual('json0')
    })
  })

  describe('listDelete', () => {
    it('should remove a collaborator', () => {
      listDelete({
        shareDBDoc: doc,
        property: 'collaborators',
        index: 1
      })
      expect(doc.data.collaborators).toMatchObject([{ id: '007' }, { id: '999' }])
    })
  })

  describe('removeCollaborator', () => {
    it('should remove a second collaborator', () => {
      removeCollaborator(doc, 1)
      expect(doc.data.collaborators).toMatchObject([{ id: '007' }])
    })
    it('should remove a third collaborator', () => {
      removeCollaborator(doc, 0)
      expect(doc.data.collaborators).toMatchObject([])
    })
  })

  describe('removeReference', () => {
    it('should remove a reference', () => {
      removeReference(doc, 1)
      expect(doc.data.references).toMatchObject([
        { fileName: 'data.csv', id: '1' },
        { fileName: 'shapes.json', id: '3' }
      ])
    })
    it('should remove a second reference', () => {
      removeReference(doc, 1)
      expect(doc.data.references).toMatchObject([
        { fileName: 'data.csv', id: '1' }
      ])
    })
    it('should remove a third reference', () => {
      removeReference(doc, 0)
      expect(doc.data.references).toMatchObject([])
    })
  })

  describe('add', () => {
    it('should add a number', () => {
      add({
        shareDBDoc: doc,
        property: 'viewCount',
        value: 3
      })
      expect(doc.data.viewCount).toEqual(3)
      add({
        shareDBDoc: doc,
        property: 'viewCount',
        value: 2
      })
      expect(doc.data.viewCount).toEqual(5)
    })
  })

  describe('incrementViewCount', () => {
    it('should increment view count', () => {
      incrementViewCount(doc)
      expect(doc.data.viewCount).toEqual(6)
    })
  })

  describe('deleteDocument', () => {
    it('should delete a document', () => {
      deleteDocument(doc)
      expect(doc.data).toBeUndefined()
      expect(doc.type).toBeNull()
    })
  })

  describe('createFeedbackEntry', () => {
    it('should initialize a feedback entry', () => {
      const doc = createFeedbackEntry({
        feedback: 'This is my feedback',
        user: '007'
      })
      expect(doc.data).toMatchObject({
        feedback: 'This is my feedback',
        user: '007'
      })
      expect(doc.collection).toEqual(DB_FEEDBACK_COLLECTION)
      expect(doc.type.name).toEqual('json0')
    })
  })
})
