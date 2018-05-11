import unsubscribe from '../../../src/server/subscriptions/unsubscribe'

describe('unsubscribe', () => {

  let sut

  let socket
  let repository
  let callbackRegisty
  let callback

  let id

  beforeEach(() => {
    socket = {
      leave: jest.fn()
    }
    repository = {
      unsubscribe: jest.fn()
    }

    callback = Symbol('callback')
    callbackRegisty = {
      get: jest.fn(() => callback)
    }

    sut = unsubscribe(socket, repository, callbackRegisty)
    id = String(Math.random())
    sut({ id })
  })

  it('should leave to document subscriptions room', () => {
    expect(socket.leave).toHaveBeenCalledWith(id)
  })

  it('should get a callback for subscription', () => {
    expect(callbackRegisty.get).toHaveBeenCalledWith(id)
  })

  it('should unsubscribe for changes', () => {
    expect(repository.unsubscribe).toHaveBeenCalledWith(callback)
  })

})
