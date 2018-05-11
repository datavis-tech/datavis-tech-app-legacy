import CallbackRegistry from '../../../src/server/subscriptions/callbackRegistry'

describe('callback registry', () => {

  let sut
  let callbackFactory
  let callback
  let id

  beforeEach(() => {
    id = String(Math.random())
    callback = Symbol('callback')
    callbackFactory = jest.fn(() => callback)
    sut = CallbackRegistry(callbackFactory)
  })

  it('should create a callback and return it', () => {
    const result = sut.get(id)
    expect(result).toBe(callback)
    expect(callbackFactory).toHaveBeenCalledWith(id)
  })

  it('should return already reated callback on seccond call', () => {
    sut.get(id)
    const result = sut.get(id)
    expect(result).toBe(callback)
    expect(callbackFactory).toHaveBeenCalledTimes(1)
  })

})
