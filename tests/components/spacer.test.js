import React from 'react'
import { shallow } from 'enzyme'

import Spacer from '../../components/spacer'

describe('spacer', () => {
  let sut

  beforeEach(() => {
    sut = shallow(<Spacer />)
  })

  it(`should have default style 'paddingTop:50px'`, () => {
    expect(sut.find('div').prop('style').paddingTop).toBe('50px')
  })

  describe('if space was provided', () => {
    let space = '100px'

    beforeEach(() => {
      sut.setProps({space})
    })

    it(`should have overriden style 'paddingTop:${space}'`, () => {
      expect(sut.find('div').prop('style').paddingTop).toBe(space)
    })

  })

})
