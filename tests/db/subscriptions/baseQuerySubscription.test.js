import fakeQuery from '../../utils/fakeQuery'

const mockQuery = fakeQuery()

jest.mock('../../../src/db/connection', () => ({
  createSubscribeQuery: jest.fn(() => mockQuery)
}))

import CallbackTrigger from '../../utils/callbackTrigger'

import connection from '../../../src/db/connection'
import BaseQuerySubscription from '../../../src/db/subscriptions/baseQuerySubscription'

describe('base query subscription', () => {

  let sut

  let collectionName
  let mongoQuery

  let onUpdate
  let onError

  let readyCallbackTrigger
  let changeCallbackTrigger

  beforeEach(() => {

    collectionName = String(Math.random())
    mongoQuery = Symbol('mongoQuery')

    onUpdate = jest.fn()
    onError = jest.fn()

    readyCallbackTrigger = new CallbackTrigger()
    changeCallbackTrigger = new CallbackTrigger()

    mockQuery.on.mockImplementation((op, callback) => {

      if (op === 'ready') {
        readyCallbackTrigger.set(callback, null)
      }

      if (op === 'changed') {
        changeCallbackTrigger.set(callback, null)
      }

    })

    sut = BaseQuerySubscription(mongoQuery, collectionName)
    sut.init({onUpdate, onError})
  })

  describe('after init', () => {

    it('should subscribe on references', () => {
      expect(connection.createSubscribeQuery).toHaveBeenCalledWith(
        collectionName,
        mongoQuery
      )
    })

    describe('query results', () => {

      it('should react when query ready', () => {
        mockQuery.results = [Symbol('doc1')]
        readyCallbackTrigger.trigger()
        expect(onUpdate).toHaveBeenCalledWith(mockQuery.results)
        mockQuery.results = undefined
      })

      it('should react when query changed', () => {
        mockQuery.results = [Symbol('doc1'), Symbol('doc2')]
        changeCallbackTrigger.trigger()
        expect(onUpdate).toHaveBeenCalledWith(mockQuery.results)
        mockQuery.results = undefined
      })

    })

  })

  describe('on tear down', () => {
    it('should destroy query', () => {
      sut.tearDown()
      expect(mockQuery.destroy).toHaveBeenCalled()
    })
  })

})
