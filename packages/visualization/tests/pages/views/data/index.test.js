import React from 'react'
import { mount } from 'enzyme'

jest.mock('../../../../src/components/page', () => args => args)
jest.mock('../../../../src/pages/views/viewPageComponentFactory', () => args => args)

const mockOnFork = () => null
jest.mock('../../../../src/components/fork', () => ({children}) => children({onFork: mockOnFork}))

import fakeUser from '../../../utils/fakeUser'
import fakeDoc from '../../../utils/fakeDoc'

jest.mock('../../../../src/pages/views/data/content', () => () => null)

import DataViewPageContent from '../../../../src/pages/views/data/content'
import DataViewPage from '../../../../src/pages/views/data/index'

describe('data page', () => {

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

    sut = mount(<DataViewPage {...props} />)

  })

  it('should render data page content', () => {
    expect(sut.find(DataViewPageContent).props()).toMatchObject({
      id, doc, onFork: mockOnFork
    })
  })

})
