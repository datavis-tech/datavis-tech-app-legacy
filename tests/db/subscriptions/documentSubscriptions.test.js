jest.mock('../../../src/db/subscriptions/documentSubscription')

import DocumentSubscription from '../../../src/db/subscriptions/documentSubscription'
import DocumentSubscriptions from '../../../src/db/subscriptions/documentSubscriptions'

describe('document subscriptions', () => {
  it('should subscribe to multiple documents', () => {
    const sut = DocumentSubscriptions()

    sut.init(
      {
        ids: ['a', 'b', 'c']
      },
      {
        onUpdate: () => null,
        onError: () => null
      }
    )

    expect(DocumentSubscription).toHaveBeenCalledTimes(3)
  })
})
