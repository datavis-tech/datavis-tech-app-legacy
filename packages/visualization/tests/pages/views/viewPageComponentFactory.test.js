import React from 'react'
import {mount} from 'enzyme'

import fakeUser from '../../utils/fakeUser'
import fakeDoc from '../../utils/fakeDoc'

jest.mock('../../../src/pages/views/baseViewPage')
import BaseViewPage from '../../../src/pages/views/baseViewPage'

import createViewPage from '../../../src/pages/views/viewPageComponentFactory'

// TODO fix test
xdescribe('view page component factory', () => {

  let sut
  let ViewPage
  let ContentComponent
  let includeCSS
  let props
  let id
  let user
  let doc
  let error

  beforeEach(() => {
    ContentComponent = () => null
    includeCSS = String(Math.random())

    id = String(Math.random())
    user = fakeUser()
    doc = fakeDoc()
    error = Symbol('error')

    BaseViewPage.mockImplementation(({children}) => children({doc, error}))

    ViewPage = createViewPage(ContentComponent, {includeCSS})

    props = {id, user}
    sut = mount(<ViewPage {...props} />)
  })

  it('should provide default id prop', async () => {
    const query = {
      id: Symbol('id')
    }
    expect(await ViewPage.getInitialProps({query})).toEqual(query)
  })

  it('should contain base view page', () => {
    expect(sut.find(BaseViewPage).props()).toMatchObject({
      id,
      user,
      includeCSS
    })
  })

  it('should render content', () => {

    expect(sut.find(ContentComponent).props()).toMatchObject({
      id,
      user,
      doc,
      error
    })
  })

})
