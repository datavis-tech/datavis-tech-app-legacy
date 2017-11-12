jest.mock('../../../src/db/subscriptions/baseQuerySubscription')

import {DB_USERS_COLLECTION} from '../../../src/constants'
import BaseQuerySubscription from '../../../src/db/subscriptions/baseQuerySubscription'
import fakeSubscription from '../../utils/fakeSubscription'
import sut from '../../../src/db/subscriptions/profileSubscription'

describe('profile subscription', () => {

  let subscription
  let mockSubscription
  let id
  let args

  beforeEach(() => {
    id = Symbol('id')
    mockSubscription = fakeSubscription()
    BaseQuerySubscription.mockReturnValue(mockSubscription)
    args = BaseQuerySubscription.mock.calls
    subscription = sut({id}, {})
  })

  it('should use query which just return id as is', () => {
    expect(args[0][0]).toMatchObject({id})
  })

  it('should use users collection', () => {
    expect(args[0][1]).toEqual(DB_USERS_COLLECTION)
  })

  describe('init', () => {

    let onUpdate
    let profiles

    beforeEach(() => {
      profiles = [Symbol('profile1'), Symbol('profile2'), Symbol('profile3')]
      onUpdate = jest.fn()
    })

    it('should return only first available profile', () => {
      mockSubscription.init.mockImplementationOnce(({onUpdate}) => onUpdate(profiles))
      subscription.init({onUpdate})
      expect(onUpdate).toHaveBeenCalledWith(profiles[0])
    })

    it('should return none if profile was not found', () => {
      mockSubscription.init.mockImplementationOnce(({onUpdate}) => onUpdate([]))
      subscription.init({onUpdate})
      expect(onUpdate).toHaveBeenCalledWith(null)
    })

  })

  it('should use base query subscription tear down', () => {
    subscription = sut({})
    expect(subscription.tearDown).toBe(mockSubscription.tearDown)
  })

})
