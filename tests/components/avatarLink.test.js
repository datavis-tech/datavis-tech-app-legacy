import React from 'react'
import {shallow} from 'enzyme'

import {Link} from '../../src/routes'

import AvatarLink from '../../src/components/avatarLink'

import fakeUser from '../utils/fakeUser'

describe('avatar link', () => {

  let props
  let sut

  beforeEach(() => {
    props = {}
    sut = shallow(<AvatarLink {...props} />)
  })

  it('should render nothing if user was not provided', () => {
    expect(sut.get(0)).toBeNull()
  })

  describe('if user was provided', () => {
    let user

    beforeEach(() => {
      user = fakeUser().data
      sut.setProps({user})
    })

    it('should have a link', () => {
      expect(sut.find(Link).props()).toMatchObject({
        route: 'profile',
        params: {username: user.username}
      })
    })

    it('should display name', () => {
      expect(sut.find('a span').text()).toEqual(user.displayName)
    })
  })

})
