import React from 'react'
import { mount } from 'enzyme'

jest.mock('../../../src/components/page', () => args => args)
jest.mock('../../../src/components/viewPage/viewPageComponentFactory', () => VisViewPage => VisViewPage)

const mockOnFork = () => null
jest.mock('../../../src/components/fork', () => ({children}) => children({onFork: mockOnFork}))

import fakeUser from '../../utils/fakeUser'
import fakeDoc from '../../utils/fakeDoc'

import VisPageContent from '../../../src/pages/vis/visPageContent'
import VisViewPage from '../../../src/pages/vis/index'

describe('vis page', () => {

  let sut
  let id
  let user
  let doc
  let props

  beforeEach(() => {

    id = String(Math.random())
    user = fakeUser()
    doc = fakeDoc()

    props = {
      id,
      user,
      doc
    }

    sut = mount(<VisViewPage {...props} />)

  })

  it('should render vis page content', () => {
    expect(sut.find(VisPageContent).props()).toMatchObject({
      id, user, doc, onFork: mockOnFork
    })
  })

})
