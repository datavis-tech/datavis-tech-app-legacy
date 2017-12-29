jest.mock('../../../src/db/subscriptions/profileQuerySubscription')
import ProfileQuerySubscription from '../../../src/db/subscriptions/profileQuerySubscription' 

import fakeSubscription from '../../utils/fakeSubscription'

import sut from '../../../src/pages/edit/getProfileByUsername'

describe('get profile by username', () => {

    let subscription
    let username
    let result

    beforeEach(() => {
        username = String(Math.random())
    })

    describe('user exists', () => {

        let profile
        
        beforeEach(async (done) => {
            profile = Symbol('profile')
            subscription = fakeSubscription(({onUpdate}) => onUpdate(profile))
            ProfileQuerySubscription.mockReturnValue(subscription)
            result = await sut(username)
            done()
        })

        it('should init subscription', () => {
            expect(subscription.init).toHaveBeenCalled()
        })

        it('should tear down subscription', () => {
            expect(subscription.tearDown).toHaveBeenCalled()
        })

        it('should resolve to profile', () => {
            expect(result).toBe(profile)
        })

    })

    it('should reject if profile does not exist', () => {
        subscription = fakeSubscription(({onUpdate}) => onUpdate(null))
        ProfileQuerySubscription.mockReturnValue(subscription)
        return expect(sut(username)).rejects.toEqual(new Error('profile not found'))
    })


    it('should reject on subscription error', () => {
        subscription = fakeSubscription(({onError}) => onError())
        ProfileQuerySubscription.mockReturnValue(subscription)
        return expect(sut(username)).rejects.toEqual(new Error('error'))
    })

})