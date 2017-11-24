import { DB_DOCUMENTS_PROJECTION } from '../../../src/constants'
jest.mock('../../../src/db/subscriptions/baseQuerySubscription')
import BaseQuerySubscription from '../../../src/db/subscriptions/baseQuerySubscription'

import DocumentsForOwnerSubscription from '../../../src/db/subscriptions/documentsForOwnerSubscription'

describe('documents for owner subscription', () => {

  let sut
  let owner
  let subscription

  beforeEach(() => {

    subscription = Symbol('subscription')
    BaseQuerySubscription.mockReturnValue(subscription)

    owner = Symbol('owner')
    sut = DocumentsForOwnerSubscription({owner})
  })

  it('should create base query subscription instance', () => {
    expect(BaseQuerySubscription).toHaveBeenCalledWith({owner}, DB_DOCUMENTS_PROJECTION)
  })

  it('should be an instance of base subscription', () => {
    expect(sut).toBe(subscription)
  })

})
