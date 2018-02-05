import React from 'react'
import {shallow} from 'enzyme'

import {Image} from 'semantic-ui-react'

import AvatarLink from '../../src/components/avatar'

import fakeUser from '../utils/fakeUser'

describe('avatar link', () => {

  let props
  let sut

  beforeEach(() => {
    props = {}
    sut = shallow(<AvatarLink {...props} />)
  })

  describe('if user was provided', () => {
    let user

    beforeEach(() => {
      user = fakeUser().data
      sut.setProps({user})
    })

    it('should have an image', () => {
      expect(sut.find(Image).props()).toMatchObject({
        height: 36,
        src: `${user._json.avatar_url}&size=72`,
        inline: true
      })
    })
  })
})
