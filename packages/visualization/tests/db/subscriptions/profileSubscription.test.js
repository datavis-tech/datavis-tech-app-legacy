jest.mock('../../../src/db/subscriptions/baseSubscription')

import BaseSubscription from '../../../src/db/subscriptions/baseSubscription'
import { DB_USERS_COLLECTION } from '../../../src/constants'
import ProfileSubscription from '../../../src/db/subscriptions/profileSubscription'

describe('document subscription', () => {

  let sut
  let id
  let subscription

  beforeEach(() => {
    subscription = Symbol('subscription')
    BaseSubscription.mockReturnValue(subscription)
    sut = ProfileSubscription({id})
  })

  afterEach(() => {
    BaseSubscription.mockClear()
  })

  it('should create base subscription', () => {
    expect(BaseSubscription).toHaveBeenCalledWith({id}, {collection: DB_USERS_COLLECTION})
  })

  it('should return created base subscription', () => {
    expect(sut).toBe(subscription)
  })

})
