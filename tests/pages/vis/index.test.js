import React from 'react'
import {shallow} from 'enzyme'

import ViewPage from '../../../src/components/viewPage/viewPage'
jest.mock('../../../src/pages/vis/visPageContent')
import VisPageContent from '../../../src/pages/vis/visPageContent'
import VisViewPage from '../../../src/pages/vis/index'

describe('vis page', () => {

  let sut
  let props
  let id
  let user

  beforeEach(() => {
    id = Symbol('id')
    user = Symbol('user')
    props = {id, user}
    sut = shallow(<VisViewPage {...props} />).dive()
  })

  it('should render view page with id and user', () => {
    expect(sut.find(ViewPage).props()).toMatchObject({
      id
    })
  })

  it('should render view page with vis content', () => {
    const doc = Symbol('doc')
    const Children = sut.prop('children')
    expect(shallow(<Children doc={doc} />).find(VisPageContent).props()).toMatchObject({
      id,
      user,
      doc
    })
  })

})
