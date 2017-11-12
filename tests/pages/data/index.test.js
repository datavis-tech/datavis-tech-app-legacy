import React from 'react'
import {shallow} from 'enzyme'

import ViewPage from '../../../src/components/viewPage/viewPage'
jest.mock('../../../src/pages/data/dataPageContent')
import DataPageContent from '../../../src/pages/data/dataPageContent'
import DataViewPage from '../../../src/pages/data/index'

describe('data page', () => {

  let sut
  let props
  let id
  let user

  beforeEach(() => {
    id = Symbol('id')
    user = Symbol('user')
    props = {id, user}
    sut = shallow(<DataViewPage {...props} />).dive()
  })

  it('should render view page with id and user', () => {
    expect(sut.find(ViewPage).props()).toMatchObject({
      id,
      user
    })
  })

  it('should render view page with vis content', () => {
    expect(sut.prop('children')).toBe(DataPageContent)
  })

})
