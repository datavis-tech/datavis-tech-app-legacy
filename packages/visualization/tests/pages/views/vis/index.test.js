import React from 'react'
import { mount } from 'enzyme'

jest.mock('../../../../src/components/page', () => args => args)
jest.mock('../../../../src/pages/views/viewPageComponentFactory', () => args => args)

const mockOnFork = () => null
jest.mock('../../../../src/components/fork', () => ({children}) => children({onFork: mockOnFork}))

import fakeUser from '../../../utils/fakeUser'
import fakeDoc from '../../../utils/fakeDoc'

jest.mock('../../../../src/pages/views/vis/content', () => () => null)

import VisViewPageContent from '../../../../src/pages/views/vis/content'
import VisViewPage from '../../../../src/pages/views/vis/index'

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
    expect(sut.find(VisViewPageContent).props()).toMatchObject({
      id, doc, onFork: mockOnFork
    })
  })

})
