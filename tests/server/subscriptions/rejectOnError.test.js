import sut from '../../../src/server/subscriptions/rejectOnError'

describe('reject on error', () => {

  it('should throw an error if error is present', () => {
    const err = new Error(String(Math.random()))
    expect(() => sut(err)).toThrow(err)
  })

  it('should return document state if there is no error', () => {
    const documentState = Symbol('documentState')
    expect(sut(null, documentState)).toBe(documentState)
  })

})
