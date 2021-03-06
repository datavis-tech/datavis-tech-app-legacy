import fakeDoc from '../../utils/fakeDoc'

const mockDoc = fakeDoc()

jest.mock('../../../src/db/connection', () => ({
  get: jest.fn(() => mockDoc)
}))

import connection from '../../../src/db/connection'
import BaseSubscription from '../../../src/db/subscriptions/baseSubscription'

describe('base subscription', () => {

  let sut
  let id
  let collection
  let onUpdate
  let onError
  let onPermissionDenied

  beforeEach(() => {

    mockDoc.on.mockImplementation((event, callback) => {
      callback(event === 'error' ? new Error() : undefined)
    })

    id = String(Math.random())
    collection = String(Math.random())
    onUpdate = jest.fn()
    onError = jest.fn()
    onPermissionDenied = jest.fn()
    sut = BaseSubscription({id}, {collection})
    sut.init({onUpdate, onError, onPermissionDenied})
  })

  afterEach(() => {
    mockDoc.subscribe.mockClear()
  })

  describe('init', () => {

    it('should establish connection with document', () => {
      expect(connection.get).toHaveBeenCalledWith(collection, id)
    })

    it('should subscribe to doc updates', () => {
      expect(mockDoc.subscribe).toHaveBeenCalled()
    })

    describe('after unsuccessful subscribe', () => {

      let err

      it('should notify about error', () => {
        err = new Error()
        mockDoc.subscribe.mock.calls[0][0](err)
        expect(onError).toHaveBeenCalledWith(err)
      })

      it('should notify about permission denied', () => {
        err = new Error('403: Permission denied (read), collection')
        mockDoc.subscribe.mock.calls[0][0](err)
        expect(onPermissionDenied).toHaveBeenCalled()
      })

    })

    describe('after successful subscribe', () => {

      beforeEach(() => {
        // calling subscribe callback
        mockDoc.subscribe.mock.calls[0][0]()
      })

      it('should listen to ops', () => {
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

    it('should remove on update listener', () => {
      expect(mockDoc.removeListener).toHaveBeenCalled()
    })

    it('should destroy connection with document', () => {
      expect(mockDoc.destroy).toHaveBeenCalled()
    })

  })

})
