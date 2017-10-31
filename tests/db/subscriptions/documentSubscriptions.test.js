import DocumentSubscriptions from '../../../src/db/subscriptions/documentSubscriptions'

const mockInit = jest.fn()
const mockTearDown = jest.fn()
jest.mock('../../../src/db/subscriptions/documentSubscription', () => {
  return jest.fn(() => ({
    init: mockInit,
    tearDown: mockTearDown
  }))
})

import DocumentSubscription from '../../../src/db/subscriptions/documentSubscription'

describe('document subscriptions', () => {
  const ids = ['a', 'b', 'c']
  let sut
  let onUpdate
  let onError

  beforeAll(() => {
    onUpdate = jest.fn()
    onError = jest.fn()
    sut = DocumentSubscriptions()
    sut.init({ids}, {onUpdate, onError})
  })

  it('should create multiple document subscriptions', () => {
    expect(DocumentSubscription).toHaveBeenCalledTimes(ids.length)
  })

  it('should init multiple document subscriptions', () => {
    expect(mockInit).toHaveBeenCalledTimes(ids.length)
  })

  it('should tear down multiple document subscriptions', () => {
    expect(mockTearDown).toHaveBeenCalledTimes(0)
    sut.tearDown()
    expect(mockTearDown).toHaveBeenCalledTimes(ids.length)
  })
})
