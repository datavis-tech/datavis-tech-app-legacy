import {DB_DOCUMENTS_COLLECTION} from '../../../src/constants'
jest.mock('../../../src/db/subscriptions/baseQuerySubscription')
import BaseQuerySubscription from '../../../src/db/subscriptions/baseQuerySubscription'

import ReferencedBySubscription from '../../../src/db/subscriptions/referencedBySubscription'

describe('referenced by subscription', () => {

  let sut
  let id
  let subscription

  beforeEach(() => {

    subscription = Symbol('subscription')
    BaseQuerySubscription.mockReturnValue(subscription)

    id = Symbol('id')
    sut = ReferencedBySubscription({id})
  })

  it('should create base query subscription instance', () => {
    expect(BaseQuerySubscription).toHaveBeenCalledWith({references: {$elemMatch: {id}}}, DB_DOCUMENTS_COLLECTION)
  })

  it('should be an instance of base subscription', () => {
    expect(sut).toBe(subscription)
  })

})
