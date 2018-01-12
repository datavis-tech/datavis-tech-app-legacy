jest.mock('../../../src/db/subscriptions/baseSubscription')

import BaseSubscription from '../../../src/db/subscriptions/baseSubscription'
import { DB_DOCUMENTS_COLLECTION, DB_DOCUMENTS_PROJECTION } from '../../../src/constants'
import DocumentSubscription from '../../../src/db/subscriptions/documentSubscription'

describe('document subscription', () => {

  let sut
  let id
  let subscription

  beforeEach(() => {
    subscription = Symbol('subscription')
    BaseSubscription.mockReturnValue(subscription)
  })

  afterEach(() => {
    BaseSubscription.mockClear()
  })

  describe('full document', () => {

    beforeEach(() => {
      sut = DocumentSubscription({id})
    })

    it('should create base subscription', () => {
      expect(BaseSubscription).toHaveBeenCalledWith({id}, {collection: DB_DOCUMENTS_COLLECTION})
    })

    it('should return created base subscription', () => {
      expect(sut).toBe(subscription)
    })

  })

  describe('projection document', () => {
    beforeEach(() => {
      sut = DocumentSubscription({id}, {projection: true})
    })

    it('should create base subscription', () => {
      expect(BaseSubscription).toHaveBeenCalledWith({id}, {collection: DB_DOCUMENTS_PROJECTION})
    })

    it('should return created base subscription', () => {
      expect(sut).toBe(subscription)
    })

  })
})
