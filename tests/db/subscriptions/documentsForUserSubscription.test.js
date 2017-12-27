import { DB_DOCUMENTS_PROJECTION } from '../../../src/constants'
jest.mock('../../../src/db/subscriptions/baseQuerySubscription')
import BaseQuerySubscription from '../../../src/db/subscriptions/baseQuerySubscription'

import DocumentsForUserSubscription from '../../../src/db/subscriptions/documentsForUserSubscription'

describe('documents for user subscription', () => {

  let sut
  let owner
  let id
  let subscription

  beforeEach(() => {

    subscription = Symbol('subscription')
    BaseQuerySubscription.mockReturnValue(subscription)

    owner = Symbol('owner')
    id = Symbol('id')
    sut = DocumentsForUserSubscription({owner, id})
  })

  it('should create base query subscription instance', () => {
    const query = {
      $and: [
        {owner},
        {
          $or: [
            {isPrivate: {$ne: true}},
            {collaborators: {$elemMatch: {id}}}
          ]
        }
      ]
    }
    expect(BaseQuerySubscription).toHaveBeenCalledWith(query, DB_DOCUMENTS_PROJECTION)
  })

  it('should be an instance of base subscription', () => {
    expect(sut).toBe(subscription)
  })

})
