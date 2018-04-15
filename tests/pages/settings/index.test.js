import React from 'react'
import { mount } from 'enzyme'
import { Header } from 'semantic-ui-react'

jest.mock('react-stripe-checkout', () => () => null)
import StripeCheckout from 'react-stripe-checkout'

jest.mock('../../../src/db/subscriptions/profileSubscription')
import ProfileSubscription from '../../../src/db/subscriptions/profileSubscription'

jest.mock('../../../src/components/page', () => Page => Page)

jest.mock('../../../src/components/layout', () => ({children}) => children)
import Layout from '../../../src/components/layout'

import Loader from '../../../src/components/loader'

import fakeUser from '../../utils/fakeUser'
import fakeSubscription from '../../utils/fakeSubscription'
import nodeSelector from '../../utils/nodeSelector'

import { EARLY_ADOPTER } from '../../../src/server/stripe/plans'
import stripePublishableKey from '../../../src/config/stripePublishableKey'
import onStripeToken from '../../../src/pages/settings/onStripeToken'
import Settings from '../../../src/pages/settings'

describe('settings', () => {

  let sut
  let user
  let props
  let subscription
  let onUpdateCallback

  beforeAll(() => {
    process.browser = true
  })

  afterAll(() => {
    delete process.browser
  })

  beforeEach(() => {

    subscription = fakeSubscription(({ onUpdate }) => { onUpdateCallback = onUpdate })
    ProfileSubscription.mockReturnValue(subscription)

    user = {
      id: String(Math.random())
    }

    props = {
      user
    }

    sut = mount(<Settings {...props} />)
  })

  it('should have layout', () => {
    expect(sut.find(Layout).props()).toMatchObject({
      title: `Settings | Datavis.tech`,
      user
    })
  })

  it('should contain header', () => {
    expect(sut.find(Header).props()).toMatchObject({
      as: 'h1',
      children: 'Settings'
    })
  })

  it('should subscribe to profile using id', () => {
    expect(ProfileSubscription).toHaveBeenCalledWith({ id: user.id })
  })

  it('should init profile subscription', () => {
    expect(subscription.init).toHaveBeenCalled()
  })

  describe('after init', () => {

    it('should contain a loader', () => {
      expect(sut.find(Loader).prop('ready')).toBeFalsy()
    })

    describe('on update', () => {
      let profile

      beforeEach(() => {
        profile = fakeUser()
        onUpdateCallback(profile)
        sut.update()
      })

      it('should not contain a loader', () => {
        expect(sut.find(Loader).prop('ready')).toBeTruthy()
      })

      describe('free plan', () => {

        it('should display free plan', () => {
          expect(sut.find(nodeSelector('plan')).text()).toEqual('Free')
        })

        it('should have upgrade button', () => {
          expect(sut.find(StripeCheckout).props()).toMatchObject({
            label: 'Upgrade to the Early Adopter Plan',
            name: 'Datavis Tech INC.',
            description: 'Early Adopter Plan - $4.99/mo',
            image: '/static/images/logo/Logo_Icon_128px.png',
            amount: 499,
            currency: 'USD',
            token: onStripeToken,
            stripeKey: stripePublishableKey
          })
        })

      })

      describe('early adopter plan', () => {

        beforeEach(() => {
          profile = fakeUser({ subscriptionPlan: EARLY_ADOPTER })
          onUpdateCallback(profile)
          sut.update()
        })

        it('should display early adopter plan', () => {
          expect(sut.find(nodeSelector('plan')).text()).toEqual('Early Adopter')
        })

        it('should have downgrade button', () => {
          expect(sut.find('button').text()).toEqual('Downgrade')
        })

      })

    })
  })

  it('should asc user to login if user is not logged in', () => {
    sut.setProps({ user: null })
    expect(sut.find(nodeSelector('noUser')).exists()).toBeTruthy()
  })

})
