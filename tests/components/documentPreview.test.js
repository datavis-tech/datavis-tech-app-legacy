import React from 'react'
import {shallow} from 'enzyme'

import {List} from 'semantic-ui-react'
import {Link} from '../../routes'

import DocumentPreview from '../../components/documentPreview'

describe('document preview', () => {

  let sut
  let props
  let data
  let id
  let description

  beforeEach(() => {

    id = String(Math.random())
    description = String(Math.random())
    data = {
      title: String(Math.random()),
      description: `${description}\nnew line`,
      type: String(Math.random())
    }

    props = {
      id,
      data
    }

    sut = shallow(<DocumentPreview {...props} />)

  })

  it('should contain a link to document type view when type is set', () => {
    expect(sut.find(Link).props()).toMatchObject({
      route: data.type,
      params: {id}
    })
  })

  it('should contain a link to vis view when type is not set', () => {

    sut.setProps({
      data: Object.assign({}, data, {type: null})
    })

    expect(sut.find(Link).props()).toMatchObject({
      route: 'vis',
      params: {id}
    })
  })

  it('should contain header', () => {
    expect(sut.find(List.Header).children().text()).toEqual(data.title)
  })

  it('should use only first line of description', () => {
    expect(sut.find(List.Description).children().text()).toEqual(description)
  })

})
