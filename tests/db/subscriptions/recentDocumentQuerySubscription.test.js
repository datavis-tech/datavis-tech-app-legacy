import { DB_DOCUMENTS_PROJECTION } from '../../../src/constants'
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

    const type = String(Math.random())
    query = {'$or': [{'type': 'vis', 'viewCount': {'$gte': 20}}, {'type': 'data', 'viewCount': {'$gte': 3}}], '$sort': {'viewCount': -1}, 'isPrivate': {'$ne': true}}

    sut = RecentDocumentQuerySubscription({ type })
  })

  it('should create base query subscription instance', () => {
    expect(BaseQuerySubscription).toHaveBeenCalledWith(query, DB_DOCUMENTS_PROJECTION)
  })

  it('should be an instance of base subscription', () => {
    expect(sut).toBe(subscription)
  })

})
