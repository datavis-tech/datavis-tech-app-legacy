import DocumentSubscriptions from '../../../src/db/subscriptions/documentSubscriptions'
import fakeDoc from '../../utils/fakeDoc'
import fakeSubscription from '../../utils/fakeSubscription'

const mockSubscription = fakeSubscription()
jest.mock('../../../src/db/subscriptions/documentSubscription', () => {
  return jest.fn(() => mockSubscription)
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
    sut = DocumentSubscriptions({ids})
    sut.init({onUpdate, onError})
  })

  it('should create multiple document subscriptions', () => {
    expect(DocumentSubscription).toHaveBeenCalledTimes(ids.length)
    ids.forEach((id, i) => {
      expect(DocumentSubscription.mock.calls[i][0]).toMatchObject({ id: ids[i] })
    })
  })

  it('should init multiple document subscriptions', () => {
    expect(mockSubscription.init).toHaveBeenCalledTimes(ids.length)
  })

  it('should listen to ops for all documents', () => {

    // calling subscribe callback
    const mockDocs = ids.map((id, i) => {
      const mockDoc = fakeDoc({id, data: {}})
      mockSubscription.init.mock.calls[i][0].onUpdate(mockDoc)
      return mockDoc
    })

    expect(onUpdate).toHaveBeenCalledTimes(1)
    expect(onUpdate).toHaveBeenCalledWith(mockDocs)
  })

  it('should tear down multiple document subscriptions', () => {
    expect(mockSubscription.tearDown).toHaveBeenCalledTimes(0)
    sut.tearDown()
    expect(mockSubscription.tearDown).toHaveBeenCalledTimes(ids.length)
  })

})
