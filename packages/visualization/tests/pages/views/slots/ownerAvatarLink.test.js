import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

jest.mock('../../../../src/components/avatarLink', () => () => <span>avatar</span>)

import AvatarLink from '../../../../src/components/avatarLink'
import OwnerAvatarLink from '../../../../src/pages/views/slots/ownerAvatarLink'

describe('owner avatar link', () => {

  let sut
  let user

  beforeEach(() => {
    user = Symbol('user')
    sut = shallow(<OwnerAvatarLink user={user} />)
  })

  it('should contain avatar link', () => {
    expect(sut.find(AvatarLink).prop('user')).toBe(user)
  })

  it('should be properly styled and formatted', () => {
    const tree = renderer
      .create(<OwnerAvatarLink user={user} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

})
