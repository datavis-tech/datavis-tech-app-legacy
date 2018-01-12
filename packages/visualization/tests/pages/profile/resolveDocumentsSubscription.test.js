jest.mock('../../../src/db/subscriptions/documentsForOwnerSubscription')
jest.mock('../../../src/db/subscriptions/documentsForUserSubscription')

import DocumentsForOwnerSubscription from '../../../src/db/subscriptions/documentsForOwnerSubscription'
import DocumentsForUserSubscription from '../../../src/db/subscriptions/documentsForUserSubscription'

import sut from '../../../src/pages/profile/resolveDocumentsSubscription'

describe('resolve documents subscription', () => {

  let user
  let profile
  let subscription

  beforeEach(() => {
    user = {}
    profile = {}
  })

  describe('if profile belongs to user', () => {

    let dfos

    beforeEach(() => {

      user.id = profile.id = String(Math.random())

      dfos = Symbol('dfos')
      DocumentsForOwnerSubscription.mockReturnValue(dfos)

      subscription = sut(user, profile)
    })

    it('should create documents for owner subscription', () => {
      expect(DocumentsForOwnerSubscription).toHaveBeenCalledWith({owner: profile.id})
    })

    it('should return documents for owner subscription', () => {
      expect(subscription).toBe(dfos)
    })

  })

  describe('if profile does not belong to user', () => {

    let dfus

    beforeEach(() => {

      user.id = String(Math.random())
      profile.id = String(Math.random())

      dfus = Symbol('dfus')
      DocumentsForUserSubscription.mockReturnValue(dfus)

      subscription = sut(user, profile)
    })

    it('should create documents for user subscription', () => {
      expect(DocumentsForUserSubscription).toHaveBeenCalledWith({owner: profile.id, id: user.id})
    })

    it('should return documents for user subscription', () => {
      expect(subscription).toBe(dfus)
    })
  })

})
