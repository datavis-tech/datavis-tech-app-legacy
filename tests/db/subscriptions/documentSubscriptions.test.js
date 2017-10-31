import DocumentSubscriptions from '../../../src/db/subscriptions/documentSubscriptions'
import fakeDoc from '../../utils/fakeDoc'

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
    ids.forEach((id, i) => {
      expect(mockInit.mock.calls[i][0]).toMatchObject({ id: ids[i] })
    })
  })

  it('should listen to ops for all documents', () => {

    // calling subscribe callback
    const mockDocs = ids.map((id, i) => {
      const mockDoc = fakeDoc({id, data: {}})
      mockInit.mock.calls[i][1].onUpdate([mockDoc])
      return mockDoc
    })

    expect(onUpdate).toHaveBeenCalledTimes(1)
    expect(onUpdate).toHaveBeenCalledWith(mockDocs)
  })

  it('should tear down multiple document subscriptions', () => {
    expect(mockTearDown).toHaveBeenCalledTimes(0)
    sut.tearDown()
    expect(mockTearDown).toHaveBeenCalledTimes(ids.length)
  })
})
