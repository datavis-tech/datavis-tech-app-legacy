import React from 'react'
import { shallow } from 'enzyme'

import { AUTH_PATH_LOGOUT } from '../../src/constants'

import LoginControl from '../../src/components/loginControl'

import fakeUser from '../utils/fakeUser'

describe('login control', () => {
  let sut
  let props

  beforeEach(() => {
    props = {}
    sut = shallow(<LoginControl {...props} />)
  })

  it('should have a LoginButton if no user provided', () => {
    expect(sut.find('LoginButton')).toHaveLength(1)
  })

  describe('if user was provided', () => {
    let user

    beforeEach(() => {
      user = fakeUser()
      sut.setProps({user})
    })

    it('should not have a LoginButton', () => {
      expect(sut.find('LoginButton')).toHaveLength(0)
    })

    it('should have an AvatarLink with user prop', () => {
      expect(sut.find('AvatarLink').prop('user')).toMatchObject(user)
    })

    it(`should have an anchor tag with href ${AUTH_PATH_LOGOUT}`, () => {
      expect(sut.find(`a[href='${AUTH_PATH_LOGOUT}']`)).toHaveLength(1)
    })

    it(`should have an button with text 'Sign out'`, () => {
      expect(sut.find('Button').contains('Sign out')).toBeTruthy()
    })

  })

})
