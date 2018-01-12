import React from 'react'
import { shallow } from 'enzyme'
import { Header as SemanticUiHeader } from 'semantic-ui-react'

import Header from '../../../../src/pages/views/slots/header'

describe('header', () => {

  let sut
  let title

  beforeEach(() => {
    title = String(Math.random())
    sut = shallow(<Header title={title} />)
  })

  it('should render as h1', () => {
    expect(sut.find(SemanticUiHeader).prop('as')).toEqual('h1')
  })

  it('should render title', () => {
    expect(sut.find(SemanticUiHeader).children().text()).toEqual(title)
  })

})
