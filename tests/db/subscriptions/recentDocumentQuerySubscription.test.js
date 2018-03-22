import { DB_DOCUMENTS_COLLECTION, VIS_DOC_TYPE } from '../../../src/constants'
jest.mock('../../../src/db/subscriptions/baseQuerySubscription')
import BaseQuerySubscription from '../../../src/db/subscriptions/baseQuerySubscription'

import RecentDocumentQuerySubscription from '../../../src/db/subscriptions/recentDocumentQuerySubscription'

describe('recent document query subscription', () => {

  let sut
  let subscription
  let query

  beforeEach(() => {

    subscription = Symbol('subscription')
    BaseQuerySubscription.mockReturnValue(subscription)

    query = {
      type: VIS_DOC_TYPE,
      viewCount: { $gte: 10 },
      isPrivate: { $ne: true },
      $sort: { '_m.ctime': -1 }
    }

    sut = RecentDocumentQuerySubscription()
  })

  it('should create base query subscription instance', () => {
    expect(BaseQuerySubscription).toHaveBeenCalledWith(query, DB_DOCUMENTS_COLLECTION)
  })

  it('should be an instance of base subscription', () => {
    expect(sut).toBe(subscription)
  })

})
