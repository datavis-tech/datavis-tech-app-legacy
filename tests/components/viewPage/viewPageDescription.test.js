import React from 'react'
import {shallow} from 'enzyme'

import fakeDoc from '../../utils/fakeDoc'

import ViewPageDescription from '../../../components/viewPage/viewPageDescription'

describe('view page description', () => {

  let sut
  let doc
  let description
  let tag

  beforeEach(() => {
    tag = String(Math.random())
    description = `<${tag}>${String(Math.random())}</${tag}>`
    doc = fakeDoc({data: {description}})
    sut = shallow(<ViewPageDescription doc={doc} />)
  })

  it('should contain doc description', () => {
    expect(sut.html().replace(/\s/g, '')).toEqual(`<div><p>${description}</p></div>`)
  })

})
