import {DB_DOCUMENTS_COLLECTION} from '../../../src/constants'
jest.mock('../../../src/db/subscriptions/baseQuerySubscription')
import BaseQuerySubscription from '../../../src/db/subscriptions/baseQuerySubscription'

import ReferencedBySubscription from '../../../src/db/subscriptions/referencedBySubscription'

describe('referenced by subscription', () => {

  let sut
  let id
  let userId
  let subscription
  let query

  beforeEach(() => {

    subscription = Symbol('subscription')
    BaseQuerySubscription.mockReturnValue(subscription)

    id = Symbol('id')
    userId = Symbol('userId')

    query = {
      $and: [
        { references: { $elemMatch: { id } } },
        {
          $or: [
            { isPrivate: {$ne: true} },
            { collaborators: { $elemMatch: { id: userId } } },
            { owner: userId }
          ]
        }
      ]
    }

    sut = ReferencedBySubscription({id, userId})
  })

  it('should create base query subscription instance', () => {
    expect(BaseQuerySubscription).toHaveBeenCalledWith(query, DB_DOCUMENTS_COLLECTION)
  })

  it('should be an instance of base subscription', () => {
    expect(sut).toBe(subscription)
  })

})
