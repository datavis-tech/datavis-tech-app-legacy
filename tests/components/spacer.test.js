import React from 'react'
import { shallow } from 'enzyme'

import Spacer from '../../src/components/spacer'

describe('spacer', () => {
  let sut

  beforeEach(() => {
    sut = shallow(<Spacer />)
  })

  it(`should have default style 'paddingTop:50px'`, () => {
    expect(sut.find('div').get(0)).toMatchSnapshot()
  })

  describe('if space was provided', () => {
    let space = '100px'

    beforeEach(() => {
      sut.setProps({space})
    })

    it(`should have overriden style 'paddingTop:${space}'`, () => {
      expect(sut.find('div').get(0)).toMatchSnapshot()
    })

  })

})
