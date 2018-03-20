import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import nodeSelector from '../utils/nodeSelector'
import { VIS_DOC_TYPE, DATA_DOC_TYPE } from '../../src/constants'
import { Form } from 'semantic-ui-react'
import fakeUser from '../utils/fakeUser'
import fakeDoc from '../utils/fakeDoc'

const mockUser = fakeUser()
const mockDoc = fakeDoc()
const mockTitle = 'This is a Title'

jest.mock('../../src/components/page', () => Page => Page)
jest.mock('../../src/components/layout', () => ({children}) => children)
jest.mock('../../src/routes', () => ({ Router: { pushRoute: jest.fn() } }))
jest.mock('../../src/db/actions/createDocument', () => ({ createDocument: jest.fn(() => mockDoc) }))

import CreatePage from '../../src/pages/create'
import { createDocument } from '../../src/db/actions/createDocument'
import { Router } from '../../src/routes'

describe('create page', () => {

  it('should invoke createDocument for vis type', async () => {
    const sut = mount(<CreatePage type={VIS_DOC_TYPE} user={mockUser} />)
    sut.find(nodeSelector('title-input')).instance().value = mockTitle

    createDocument.mockClear()
    expect(sut.find(Form).props().onSubmit(new Event('test')))
    expect(createDocument).toHaveBeenCalledWith({
      title: mockTitle,
      owner: mockUser.id,
      type: VIS_DOC_TYPE
    })
  })

  it('should invoke createDocument for data type', async () => {
    const sut = mount(<CreatePage type={DATA_DOC_TYPE} user={mockUser} />)
    sut.find(nodeSelector('title-input')).instance().value = mockTitle

    createDocument.mockClear()
    expect(sut.find(Form).props().onSubmit(new Event('test')))
    expect(createDocument).toHaveBeenCalledWith({
      title: mockTitle,
      owner: mockUser.id,
      type: DATA_DOC_TYPE
    })
  })

  it('should invoke pushRoute to edit page with new doc id', async () => {
    const sut = mount(<CreatePage type={VIS_DOC_TYPE} user={fakeUser()} />)
    Router.pushRoute.mockClear()
    expect(sut.find(Form).props().onSubmit(new Event('test')))
    expect(Router.pushRoute).toHaveBeenCalledWith('edit', { id: mockDoc.id })
  })

  it('should render correct layout', () => {
    const tree = renderer
      .create(<CreatePage type={DATA_DOC_TYPE} user={mockUser} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

})
