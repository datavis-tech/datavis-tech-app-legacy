import React from 'react'
import { shallow } from 'enzyme'

import Navbar from '../../src/components/spacer'

describe('spacer', () => {
  let sut

  beforeEach(() => {
    sut = shallow(<Navbar />)
  })

  it(`should match snapshot`, () => {
    expect(sut).toMatchSnapshot()
  })

})
