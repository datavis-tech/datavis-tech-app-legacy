import { DB_DOCUMENTS_COLLECTION } from '../../../src/constants'

jest.mock('../../../src/db/serializers', () => ({
  serializeDocument: document =>
    `serialized document ${document.data.id} ${document.data.title}`
}))

import fakeDocument from '../../utils/fakeDoc'
import { DocumentRepository } from '../../../src/server/repositories'

describe('document repository', () => {
  let sut
  let connection

  beforeEach(() => {
    connection = {
      get: jest.fn(),
      createFetchQuery: jest.fn()
    }
    sut = DocumentRepository(connection)
  })

  describe('get recent documents', () => {
    const query = {
      $or: [
        { type: 'vis', viewCount: { $gte: 20 } },
        { type: 'data', viewCount: { $gte: 3 } }
      ],
      $sort: { viewCount: -1 },
      isPrivate: { $ne: true }
    }

    describe('everything is going ok', () => {
      let recentDocuments
      let documents

      beforeEach(async done => {
        recentDocuments = [
          fakeDocument(),
          fakeDocument(),
          fakeDocument()
        ]
        connection.createFetchQuery.mockImplementation(
          (c, q, o, callback) => {
            callback(null, recentDocuments)
          }
        )
        documents = await sut.getRecentDocuments()
        done()
      })

      it('should fetch recent documents from db', () => {
        expect(connection.createFetchQuery).toHaveBeenCalledWith(
          DB_DOCUMENTS_COLLECTION,
          query,
          {},
          expect.any(Function)
        )
      })

      it('should provide recent documents', () => {
        expect(documents).toEqual(
          recentDocuments.map(
            rd =>
              `serialized document ${rd.data.id} ${rd.data.title}`
          )
        )
      })
    })

    it('should throw an error if something went wrong', async () => {
      connection.createFetchQuery.mockImplementation(
        (c, q, o, callback) => {
          callback(new Error('something bad happen'))
        }
      )

      try {
        await sut.getRecentDocuments()
      } catch (e) {
        expect(e).toEqual(Error('something bad happen'))
      }
    })
  })

  describe('subscribe and unsubscribe', () => {
    let document
    let id
    let title
    let callback

    beforeEach(() => {
      id = String(Math.random())
      title = String(Math.random())
      document = fakeDocument({ id, data: { title } })
      connection.get.mockReturnValue(document)

      callback = jest.fn()
      sut.subscribe(id, callback)
    })

    it('should get document', () => {
      expect(connection.get).toHaveBeenCalledWith(
        DB_DOCUMENTS_COLLECTION,
        id
      )
    })

    it('should subscribe on document changes', () => {
      expect(document.subscribe).toHaveBeenCalledWith(
        expect.any(Function)
      )
    })

    it('should notify about updates', () => {
      triggerUpdate(String(Math.random()))
      expect(callback).toHaveBeenCalledWith(null, {
        old: `serialized document ${document.data.id} ${title}`,
        new: `serialized document ${document.data.id} ${
          document.data.title
        }`
      })
    })

    it('should make new to be old on next update', () => {
      const firstTimeCallTitle = String(Math.random())
      triggerUpdate(firstTimeCallTitle)
      triggerUpdate(String(Math.random()))

      expect(callback).toHaveBeenCalledWith(null, {
        old: `serialized document ${
          document.data.id
        } ${firstTimeCallTitle}`,
        new: `serialized document ${document.data.id} ${
          document.data.title
        }`
      })
    })

    it('should not subscribe twice', () => {
      sut.subscribe(id, callback)
      expect(connection.get).toHaveBeenCalledTimes(1)
      expect(document.subscribe).toHaveBeenCalledTimes(1)
    })

    it('should notify all subscribed callbacks to the same id', () => {
      const secondCallback = jest.fn()
      sut.subscribe(id, secondCallback)

      triggerUpdate(String(Math.random()))

      expect(callback).toHaveBeenCalledWith(null, {
        old: `serialized document ${document.data.id} ${title}`,
        new: `serialized document ${document.data.id} ${
          document.data.title
        }`
      })

      expect(secondCallback).toHaveBeenCalledWith(null, {
        old: `serialized document ${document.data.id} ${title}`,
        new: `serialized document ${document.data.id} ${
          document.data.title
        }`
      })
    })

    describe('unsubscribe', () => {
      let secondCallback

      beforeEach(() => {
        secondCallback = jest.fn()
        sut.subscribe(id, secondCallback)
      })

      it('should not notify unsubscribed callback', () => {
        sut.unsubscribe(callback)
        triggerUpdate(String(Math.random()))
        expect(callback).not.toHaveBeenCalled()
      })

      it('should unsubscribe from documents changes if no callbacks left', () => {
        sut.unsubscribe(callback)
        sut.unsubscribe(secondCallback)
        expect(document.unsubscribe).toHaveBeenCalled()
      })
    })

    function triggerUpdate (title) {
      document.data.title = title
      document.subscribe.mock.calls[0][0]()
      document.on.mock.calls[0][1]() // triggering update
    }

  })
})
