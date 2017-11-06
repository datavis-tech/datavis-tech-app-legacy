import fakeDoc from '../../utils/fakeDoc'

const mockDoc = fakeDoc()

jest.mock('../../../src/db/connection', () => ({
  get: jest.fn(() => mockDoc)
}))

import connection from '../../../src/db/connection'
import {DB_DOCUMENTS_COLLECTION} from '../../../src/constants'
import DocumentSubscription from '../../../src/db/subscriptions/documentSubscription'

describe('document subscription', () => {

  let sut
  let id
  let onUpdate
  let onError

  beforeEach(() => {

    mockDoc.on.mockImplementation((_, callback) => callback())

    id = String(Math.random())
    onUpdate = jest.fn()
    onError = jest.fn()
    sut = DocumentSubscription()
    sut.init({id}, {onUpdate, onError})
  })

  afterEach(() => {
    mockDoc.subscribe.mockClear()
  })

  describe('init', () => {

    it('should establish connection with documents', () => {
      expect(connection.get).toHaveBeenCalledWith(DB_DOCUMENTS_COLLECTION, id)
    })

    it('should subscribe to doc updates', () => {
      expect(mockDoc.subscribe).toHaveBeenCalled()
    })

    describe('after unsuccessful subscribe', () => {

      it('should notify about error', () => {
        const err = new Error()
        mockDoc.subscribe.mock.calls[0][0](err)
        expect(onError).toHaveBeenCalledWith(err)
      })

    })

    describe('after successful subscribe', () => {

      beforeEach(() => {
        // calling subscribe callback
        mockDoc.subscribe.mock.calls[0][0]()
      })

      it.skip('should listen to ops', () => {
        expect(mockDoc.on.mock.calls[0][0]).toEqual('op')
        expect(onUpdate).toHaveBeenCalledWith(mockDoc)
      })

    })

  })

  describe('tear down', () => {

    beforeEach(() => {
      // calling subscribe callback
      mockDoc.subscribe.mock.calls[0][0]()
      sut.tearDown()
    })

    it.skip('should remove on update listener', () => {
      expect(mockDoc.removeListener).toHaveBeenCalled()
    })

    it.skip('should destroy connection with document', () => {
      expect(mockDoc.destroy).toHaveBeenCalled()
    })

  })
})