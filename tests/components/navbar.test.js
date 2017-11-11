import React from 'react'
import { shallow } from 'enzyme'
import fakeUser from '../utils/fakeUser'

import Navbar from '../../src/components/spacer'

describe('spacer', () => {

  it(`should match snapshot without user`, () => {
    const sut = shallow(<Navbar />)
    expect(sut).toMatchSnapshot()
  })

  it(`should match snapshot with user`, () => {
    const sut = shallow(<Navbar user={fakeUser}/>)
    expect(sut).toMatchSnapshot()
  })

})
