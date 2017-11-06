import React from 'react'
import {shallow} from 'enzyme'

import {List} from 'semantic-ui-react'
import {Link} from '../../src/routes'

import DocumentPreview from '../../src/components/documentPreview'
import fakeDoc from '../utils/fakeDoc'
import {type, id, title, description} from '../../src/db/accessors'

describe('document preview', () => {

  let sut
  let props
  let doc

  beforeEach(() => {
    doc = fakeDoc()
    props = { doc }
    sut = shallow(<DocumentPreview {...props} />)
  })

  it('should contain a link to document type view when type is set', () => {
    expect(sut.find(Link).props()).toMatchObject({
      route: type(doc),
      params: {id: id(doc)}
    })
  })

  it('should contain header', () => {
    expect(sut.find(List.Header).children().text()).toEqual(title(doc))
  })

  it('should use only first line of description', () => {
    expect(sut.find(List.Description).children().text()).toEqual(description(doc))
  })

})
