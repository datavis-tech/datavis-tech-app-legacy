import React from 'react'
import { shallow } from 'enzyme'
import fakeUser from '../utils/fakeUser'

jest.mock('../../src/components/loginControl')

import Navbar from '../../src/components/navbar'

describe('navbar', () => {

  it(`should match snapshot without user`, () => {
    const sut = shallow(<Navbar />)
    expect(sut).toMatchSnapshot()
  })

  it(`should match snapshot with user`, () => {
    const mockUserData = fakeUser().data
    const sut = shallow(<Navbar user={mockUserData}/>)
    expect(sut).toMatchSnapshot()
  })

})
