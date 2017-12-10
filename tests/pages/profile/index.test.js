import React from 'react'
import { mount } from 'enzyme'

import fakeUser from '../../utils/fakeUser'
import fakeSubscription from '../../utils/fakeSubscription'
import CallbackTrigger from '../../utils/callbackTrigger'
import nodeSelector from '../../utils/nodeSelector'

jest.mock('../../../src/components/page', () => Page => Page)

jest.mock('../../../src/components/layout', () => ({children}) => children)
import Layout from '../../../src/components/layout'

jest.mock('../../../src/db/subscriptions/profileQuerySubscription')
import ProfileQuerySubscription from '../../../src/db/subscriptions/profileQuerySubscription'

import Loader from '../../../src/components/loader'

jest.mock('../../../src/pages/profile/profileBody', () => () => null)
import ProfileBody from '../../../src/pages/profile/profileBody'

jest.mock('../../../src/pages/profile/resolveDocumentsSubscription')
import resolveDocumentsSubscription from '../../../src/pages/profile/resolveDocumentsSubscription'

import ProfilePage from '../../../src/pages/profile'

describe('profile page', () => {

  let sut
  let props
  let user
  let username
  let profile
  let subscription
  let resolvedDocumentsSubscription
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

    resolvedDocumentsSubscription = Symbol('resolvedDocumentsSubscription')
    resolveDocumentsSubscription.mockReturnValue(resolvedDocumentsSubscription)

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

      describe('profile exists', () => {

        beforeEach(() => {
          updateTrigger.trigger()
          sut.update()
        })

        it('should not contain a loader', () => {
          expect(sut.find(Loader).prop('ready')).toBeTruthy()
        })

        it('should resolve documents subscription', () => {

          expect(resolveDocumentsSubscription).toHaveBeenCalledWith(user, profile)

        })

        it('should contain profile body', () => {
          expect(sut.find(ProfileBody).props()).toMatchObject({
            profile: profile.data,
            documentsSubscription: resolvedDocumentsSubscription
          })
        })

      })

      describe('profile does not exists', () => {

        beforeEach(() => {
          subscription = fakeSubscription(({onUpdate}) => updateTrigger.set(onUpdate, null, undefined))
          ProfileQuerySubscription.mockReturnValue(subscription)
          sut = mount(<ProfilePage {...props} />)
          updateTrigger.trigger()
          sut.update()
        })

        it('should show message that profile user not found', () => {
          expect(sut.find(nodeSelector('notFound')).text()).toEqual('User not found')
        })

      })

    })

  })

})
