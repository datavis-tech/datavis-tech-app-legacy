import subscribe from '../../../src/server/subscriptions/subscribe'

describe('subscribe', () => {

  let sut

  let socket
  let repository
  let callbackRegisty
  let callback

  let id

  beforeEach(() => {
    socket = {
      join: jest.fn()
    }
    repository = {
      subscribe: jest.fn()
    }

    callback = Symbol('callback')
    callbackRegisty = {
      get: jest.fn(() => callback)
    }

    sut = subscribe(socket, repository, callbackRegisty)
    id = String(Math.random())
    sut({ id })
  })

  it('should join to document subscriptions room', () => {
    expect(socket.join).toHaveBeenCalledWith(id)
  })

  it('should get a callback for subscription', () => {
    expect(callbackRegisty.get).toHaveBeenCalledWith(id)
  })

  it('should subscribe for changes', () => {
    expect(repository.subscribe).toHaveBeenCalledWith(id, callback)
  })

})
