import React from 'react'
import { mount } from 'enzyme'

jest.mock('../../../src/components/page', () => Page => Page)

jest.mock('../../../src/components/layout', () => ({children}) => children)
import Layout from '../../../src/components/layout'

jest.mock('../../../src/db/subscriptions/profileQuerySubscription')
import ProfileQuerySubscription from '../../../src/db/subscriptions/profileQuerySubscription'

import fakeUser from '../../utils/fakeUser'
import fakeSubscription from '../../utils/fakeSubscription'
import CallbackTrigger from '../../utils/callbackTrigger'

import Loader from '../../../src/components/loader'

jest.mock('../../../src/pages/profile/profileBody', () => () => null)
import ProfileBody from '../../../src/pages/profile/profileBody'
import ProfilePage from '../../../src/pages/profile'

describe('profile page', () => {

  let sut
  let props
  let user
  let username
  let profile
  let subscription
  let updateTrigger

  beforeAll(() => {
    process.browser = true
  })

  afterAll(() => {
    delete process.browser
  })

  beforeEach(() => {
    updateTrigger = new CallbackTrigger()
    profile = fakeUser()
    subscription = fakeSubscription(({onUpdate}) => updateTrigger.set(onUpdate, null, profile))
    ProfileQuerySubscription.mockReturnValue(subscription)

    user = fakeUser()
    username = String(Math.random())
    props = {username, user}
    sut = mount(<ProfilePage {...props} />)
  })

  it('should provide default username prop', async () => {
    const query = {
      username: String(Math.random())
    }
    expect(await ProfilePage.getInitialProps({query})).toEqual(query)
  })

  it('should have layout', () => {
    expect(sut.find(Layout).props()).toMatchObject({
      title: `${username} | Datavis.tech`,
      user
    })
  })

  it('should subscribe to profile', () => {
    expect(ProfileQuerySubscription).toHaveBeenCalledWith({username})
  })

  it('should init profile subscription', () => {
    expect(subscription.init).toHaveBeenCalled()
  })

  describe('after init', () => {

    it('should contain a loader', () => {
      expect(sut.find(Loader).prop('ready')).toBeFalsy()
    })

    it('should not contain profile body', () => {
      expect(sut.find(ProfileBody).exists()).toBeFalsy()
    })

    describe('on update', () => {

      beforeEach(() => {
        updateTrigger.trigger()
        sut.update()
      })

      it('should not contain a loader', () => {
        expect(sut.find(Loader).prop('ready')).toBeTruthy()
      })

      it('should contain profile body', () => {
        expect(sut.find(ProfileBody).props()).toMatchObject({
          profile: profile.data
        })
      })

    })

  })

})
