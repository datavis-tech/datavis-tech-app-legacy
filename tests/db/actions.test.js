import ShareDB from 'sharedb'

// Connect to an in-memory ShareDB instance (without query support)
const mockConnection = (new ShareDB()).connect()
jest.mock('../../src/db/connection', () => ({
  get: (collection, id) => mockConnection.get(collection, id)
}))

import {
  createDocument,
  // deleteDocument,
  // createFeedbackEntry,
  addCollaborator,
  removeCollaborator
  // addReference,
  // removeReference
} from '../../src/db/actions'

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
        schemaVersion: 1,
        title: 'My Title',
        description: 'Some description',
        owner: '78943278',
        content: ''
      })
    })
  })

  describe('addCollaborator', () => {
    it('should initialize array and add one collaborator', () => {
      expect(doc.data.collaborators).toBeUndefined()
      addCollaborator(doc, '007')
      expect(doc.data.collaborators).toMatchObject([{ id: '007' }])
    })
    it('should add a second collaborator', () => {
      addCollaborator(doc, '500')
      expect(doc.data.collaborators).toMatchObject([{ id: '007' }, { id: '500' }])
    })
    it('should add a third collaborator', () => {
      addCollaborator(doc, '999')
      expect(doc.data.collaborators).toMatchObject([{ id: '007' }, { id: '500' }, { id: '999' }])
    })
  })

  describe('removeCollaborator', () => {
    it('should remove a collaborator', () => {
      removeCollaborator(doc, 1)
      expect(doc.data.collaborators).toMatchObject([{ id: '007' }, { id: '999' }])
    })
    it('should remove a second collaborator', () => {
      removeCollaborator(doc, 1)
      expect(doc.data.collaborators).toMatchObject([{ id: '007' }])
    })
    it('should remove a third collaborator', () => {
      removeCollaborator(doc, 0)
      expect(doc.data.collaborators).toMatchObject([])
    })
  })

})
