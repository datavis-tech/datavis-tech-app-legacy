jest.mock('../../../src/db/subscriptions/baseQuerySubscription')

import {DB_USERS_COLLECTION} from '../../../src/constants'
import BaseQuerySubscription from '../../../src/db/subscriptions/baseQuerySubscription'
import fakeSubsription from '../../utils/fakeSubscription'
import CallbackTrigger from '../../utils/callbackTrigger'
import sut from '../../../src/db/subscriptions/profileSubscription'

describe('profile subscription', () => {

  let subscription
  let args
  let mockSubscription
  let id

  beforeEach(() => {
    id = Symbol('id')
    mockSubscription = fakeSubsription()
    BaseQuerySubscription.mockReturnValue(mockSubscription)
    args = BaseQuerySubscription.mock.calls
    subscription = sut({id}, {})
  })

  it('should use query factory which just return id as is', () => {
    expect(args[0][0]).toMatchObject({id})
  })

  it('should use users collection', () => {
    expect(args[0][1]).toEqual(DB_USERS_COLLECTION)
  })

  describe('init', () => {

    let onUpdate
    let updateTrigger
    let profiles

    beforeEach(() => {

      profiles = [Symbol('profile1'), Symbol('profile2'), Symbol('profile3')]

      updateTrigger = new CallbackTrigger()
      mockSubscription.init.mockImplementation(({id}, callbacks) => {
        updateTrigger.set(callbacks.onUpdate, null, id ? profiles : [])
      })

      onUpdate = jest.fn()
    })

    it('should return only first available profile', () => {
      subscription = sut({id: 1})
      subscription.init({onUpdate})
      updateTrigger.trigger()
      expect(onUpdate).toHaveBeenCalledWith(profiles[0])
    })

    it('should return none if profile was not found', () => {
      subscription = sut({})
      subscription.init({onUpdate})
      updateTrigger.trigger()
      expect(onUpdate).toHaveBeenCalledWith(null)
    })

  })

  it('should use base  query subscription tear down', () => {
    subscription = sut({})
    expect(subscription.tearDown).toBe(mockSubscription.tearDown)
  })

})
