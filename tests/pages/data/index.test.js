import React from 'react'
import { mount } from 'enzyme'

jest.mock('../../../src/components/page', () => args => args)
jest.mock('../../../src/components/viewPage/viewPageComponentFactory', () => DataViewPage => DataViewPage)

const mockOnFork = () => null
jest.mock('../../../src/components/fork', () => ({children}) => children({onFork: mockOnFork}))

import fakeUser from '../../utils/fakeUser'
import fakeDoc from '../../utils/fakeDoc'

import DataPageContent from '../../../src/pages/data/dataPageContent'
import DataViewPage from '../../../src/pages/data/index'

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
    expect(sut.find(DataPageContent).props()).toMatchObject({
      id, user, doc, onFork: mockOnFork
    })
  })

})
