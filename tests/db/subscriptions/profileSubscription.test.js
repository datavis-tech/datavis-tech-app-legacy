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

  beforeEach(() => {

    mockSubscription = fakeSubsription()
    BaseQuerySubscription.mockReturnValue(mockSubscription)

    subscription = sut()
    args = BaseQuerySubscription.mock.calls
  })

  it('should use users collection', () => {
    expect(args[0][0]).toEqual(DB_USERS_COLLECTION)
  })

  it('should use query factory which just return id as is', () => {
    const id = Symbol('id')
    expect(args[0][1]({id})).toMatchObject({id})
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
      subscription.init({id: 1}, {onUpdate})
      updateTrigger.trigger()
      expect(onUpdate).toHaveBeenCalledWith(profiles[0])
    })

    it('should return none if profile was not found', () => {
      subscription.init({}, {onUpdate})
      updateTrigger.trigger()
      expect(onUpdate).toHaveBeenCalledWith(null)
    })

  })

  it('should use base  query subscription tear down', () => {
    expect(subscription.tearDown).toBe(mockSubscription.tearDown)
  })

})
