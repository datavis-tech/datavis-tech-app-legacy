import React from 'react'
import { shallow } from 'enzyme'

import { Button } from 'semantic-ui-react'
import { AUTH_PATH_GITHUB } from '../../modules/constants'

import LoginButton from '../../components/loginButton'

describe('login button', () => {
  let sut

  beforeEach(() => {
    sut = shallow(<LoginButton/>)
  })

  it('should have a link to github auth path', () => {
    expect(sut.find('a').prop('href')).toBe(AUTH_PATH_GITHUB)
  })

  it('should not be disabled by default', () => {
    expect(sut.find(Button).prop('disabled')).toBeFalsy()
  })

  it('should not be in loading state by default', () => {
    expect(sut.find(Button).prop('loading')).toBeFalsy()
  })

  describe('after click', () => {

    beforeEach(() => {
      sut.find(Button).simulate('click')
    })

    it('should become disabled', () => {
      expect(sut.find(Button).prop('disabled')).toBeTruthy()
    })

    it('should change to loading state', () => {
      expect(sut.find(Button).prop('loading')).toBeFalsy()
    })

  })

})