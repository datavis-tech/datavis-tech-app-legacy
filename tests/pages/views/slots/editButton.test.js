import React from 'react'
import { shallow } from 'enzyme'

import { Button } from 'semantic-ui-react'
import { Link } from '../../../../src/routes'

import EditButton from '../../../../src/pages/views/slots/editButton'

describe('edit button', () => {

  let sut
  let props

  beforeEach(() => {
    props = {id: Symbol('id')}
    sut = shallow(<EditButton {...props} />)
  })

  it('should contain a link to edit page', () => {
    expect(sut.find(Link).props()).toMatchObject({
      route: 'edit',
      params: props
    })
  })

  it('should contain button', () => {
    expect(sut.find(Button).prop('fluid')).toBeTruthy()
    expect(sut.find(Button).children().text()).toEqual('Edit')
  })

})
