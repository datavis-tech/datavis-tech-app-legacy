import React from 'react'
import { shallow } from 'enzyme'

import { List } from 'semantic-ui-react'
import { Link } from '../../../../src/routes'

import DocumentPreview from '../../../../src/pages/views/slots/documentPreview'

describe('document preview', () => {

  let sut
  let props
  let id
  let type
  let title
  let description

  beforeEach(() => {

    id = String(Math.random())
    type = String(Math.random())
    title = String(Math.random())
    description = String(Math.random())

    props = { id, type, title, description }
    sut = shallow(<DocumentPreview {...props} />)
  })

  it('should contain a link to document type view when type is set', () => {
    expect(sut.find(Link).props()).toMatchObject({
      route: type,
      params: {id}
    })
  })

  it('should contain header', () => {
    expect(sut.find(List.Header).children().text()).toEqual(title)
  })

  it('should use only first line of description', () => {
    expect(sut.find(List.Description).children().text()).toEqual(description)
  })

})
