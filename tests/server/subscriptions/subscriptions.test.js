jest.mock('../../../src/server/repositories')
import { DocumentRepository } from '../../../src/server/repositories'

jest.mock('../../../src/server/subscriptions/subscribe')
jest.mock('../../../src/server/subscriptions/unsubscribe')
import subscribe from '../../../src/server/subscriptions/subscribe'
import unsubscribe from '../../../src/server/subscriptions/unsubscribe'

jest.mock('../../../src/server/subscriptions/callbackFactory')
jest.mock('../../../src/server/subscriptions/callbackRegistry')
import createCallbackFactory from '../../../src/server/subscriptions/callbackFactory'
import CallbackRegistry from '../../../src/server/subscriptions/callbackRegistry'

import subscriptions from '../../../src/server/subscriptions/subscriptions'

describe('subscriptions', () => {
  let sut

  let io
  let connection

  let socket

  let repository
  let callbackFactory
  let callbackRegistry

  let subscribeHandler
  let unsubscribeHandler

  beforeEach(() => {
    repository = Symbol('repository')
    DocumentRepository.mockReturnValue(repository)

    callbackFactory = Symbol('callbackFactory')
    createCallbackFactory.mockReturnValue(callbackFactory)

    callbackRegistry = Symbol('callbackRegistry')
    CallbackRegistry.mockReturnValue(callbackRegistry)

    subscribeHandler = Symbol('subscribeHandler')
    unsubscribeHandler = Symbol('unsubscribeHandler')

    subscribe.mockReturnValue(subscribeHandler)
    unsubscribe.mockReturnValue(unsubscribeHandler)

    io = Symbol('io')
    connection = Symbol('connection')

    sut = subscriptions(io, connection)

    socket = {
      on: jest.fn()
    }

    sut(socket)
  })

  it('should create document repository', () => {
    expect(DocumentRepository).toHaveBeenCalledWith(connection)
  })

  it('should create callback factory', () => {
    expect(createCallbackFactory).toHaveBeenCalledWith(io)
  })

  it('should create callback registry', () => {
    expect(CallbackRegistry).toHaveBeenCalledWith(callbackFactory)
  })

  it('should create subscribe handler', () => {
    expect(subscribe).toHaveBeenCalledWith(socket, repository, callbackRegistry)
  })

  it('should create unsubscribe handler', () => {
    expect(unsubscribe).toHaveBeenCalledWith(socket, repository, callbackRegistry)
  })

  it('should subscribe on "subscribe" event', () => {
    expect(socket.on).toHaveBeenCalledWith('subscribe', subscribeHandler)
  })

  it('should subscribe on "unsubscribe" event', () => {
    expect(socket.on).toHaveBeenCalledWith('unsubscribe', unsubscribeHandler)
  })
})
