import React from 'react'
import { shallow } from 'enzyme'
import { Header as SemanticUiHeader } from 'semantic-ui-react'

jest.mock('../../../../src/db/accessors')
import { title } from '../../../../src/db/accessors'

import Header from '../../../../src/pages/views/slots/header'

describe('header', () => {

  let sut
  let doc
  let docTitle

  beforeEach(() => {
    docTitle = String(Math.random())
    title.mockReturnValue(docTitle)
    doc = Symbol('doc')
    sut = shallow(<Header doc={doc} />)
  })

  it('should render as h1', () => {
    expect(sut.find(SemanticUiHeader).prop('as')).toEqual('h1')
  })

  it('should extract title from doc', () => {
    expect(title).toHaveBeenCalledWith(doc)
  })

  it('should', () => {
    expect(sut.find(SemanticUiHeader).children().text()).toEqual(docTitle)
  })

})
