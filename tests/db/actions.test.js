import ShareDB from 'sharedb'

// Connect to an in-memory ShareDB instance (without query support)
const mockConnection = (new ShareDB()).connect()
jest.mock('../../src/db/connection', () => ({
  get: (collection, id) => mockConnection.get(collection, id)
}))

import {
  createDocument
  // deleteDocument,
  // createFeedbackEntry,
  // addCollaborator,
  // removeCollaborator,
  // addReference,
  // removeReference
} from '../../src/db/actions'

describe('actions', () => {

  describe('createDocument', () => {
    it('should initialize a document', () => {
      const doc = createDocument({
        title: 'My Title',
        description: 'Some description',
        owner: '78943278'
      })
      expect(doc.data).toMatchObject({
        schemaVersion: 1,
        title: 'My Title',
        description: 'Some description',
        owner: '78943278',
        content: ''
      })
    })
  })

})
