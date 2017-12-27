import React from 'react'
import { shallow } from 'enzyme'

import Description from '../../../../src/pages/views/slots/description'

describe('view page description', () => {

  let sut
  let description
  let tag

  beforeEach(() => {
    tag = String(Math.random())
    description = `<${tag}>${String(Math.random())}</${tag}>`
    sut = shallow(<Description description={description} />)
  })

  it('should contain doc description', () => {
    expect(sut.html().replace(/\s/g, '')).toEqual(`<div><p>${description}</p></div>`)
  })

})
