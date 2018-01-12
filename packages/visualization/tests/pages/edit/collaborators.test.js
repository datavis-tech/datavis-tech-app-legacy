import React from 'react'
import { mount } from 'enzyme'

jest.mock('../../../src/db/subscriptions/profileSubscriptions')

import ProfileSubscriptions from '../../../src/db/subscriptions/profileSubscriptions'

import fakeUser from '../../utils/fakeUser'
import fakeSubscription from '../../utils/fakeSubscription'
import CallbackTrigger from '../../utils/callbackTrigger'

import { Button } from 'semantic-ui-react'
import AvatarLink from '../../../src/components/avatarLink'

import Collaborators from '../../../src/pages/edit/collaborators'

describe('collaborators', () => {

  let sut
  let props

  let subscription
  let ids
  let profiles
  let onCollaboratorRemove
  let updateTrigger

  beforeAll(() => {
    process.browser = true
  })

  afterAll(() => {
    delete process.browser
  })

  beforeEach(() => {

    ids = [String(Math.random()), String(Math.random()), String(Math.random())]
    profiles = ids.map(id => fakeUser({id}))

    updateTrigger = new CallbackTrigger()

    subscription = fakeSubscription(
      ({onUpdate}) => {
        updateTrigger.set(onUpdate, null, profiles)
      }
    )
    ProfileSubscriptions.mockReturnValue(subscription)

    onCollaboratorRemove = jest.fn()

    props = {
      ids,
      onCollaboratorRemove
    }

    sut = mount(<Collaborators {...props} />)
  })

  it('should create profile subscription based on collaborators ids', () => {
    expect(ProfileSubscriptions).toHaveBeenCalledWith({ids})
  })

  describe('on update', () => {

    beforeEach(() => {
      updateTrigger.trigger()
      sut.update()
    })

    it('should contain avatar links', () => {
      profiles.forEach((profile, i) => {
        expect(sut.find(AvatarLink).at(i).prop('user')).toBe(profile.data)
      })
    })

    it('should allow to remove collaborator', () => {
      profiles.forEach((_, i) => {
        sut.find(Button).at(i).simulate('click')
        expect(onCollaboratorRemove).toHaveBeenCalledWith(i)
      })
    })

  })

})
