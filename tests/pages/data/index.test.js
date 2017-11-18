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

  it('should render view page with id', () => {
    expect(sut.find(ViewPage).props()).toMatchObject({
      id
    })
  })

  it('should render view page with data content', () => {
    const doc = Symbol('doc')
    const Children = sut.prop('children')
    expect(shallow(<Children doc={doc} />).find(DataPageContent).props()).toMatchObject({
      id,
      user,
      doc
    })
  })

})
