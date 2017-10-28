// TODO bring back this test after refactor.

import React from 'react'
import {render, shallow} from 'enzyme'
import fakeDoc from '../utils/fakeDoc'
import fakeUser from '../utils/fakeUser'

const mockDoc = fakeDoc()
const mockOwnerProfile = fakeUser()

// Mock the ViewPage component with one that invokes children,
// passing render prop with `ownerProfile` and `doc`.
jest.mock('../../src/components/viewPage/viewPage', () => {
  return jest.fn(props => {
    return props.children({
      ownerProfile: mockOwnerProfile,
      doc: mockDoc
    })
  })
})

// Mock ViewPageLayout so we can test its props.
jest.mock('../../src/components/viewPage/viewPageLayout', () => jest.fn(() => <div>Test</div>))

import DataViewer from '../../src/components/dataViewer'
import ViewPageDescription from '../../src/components/viewPage/viewPageDescription'
import ViewPage from '../../src/components/viewPage/viewPage'
import ViewPageLayout from '../../src/components/viewPage/viewPageLayout'
import Data from '../../src/pages/data'

describe('data page', () => {

  let sut
  beforeEach(() => {
    render(<Data id='foo'/>)
    sut = ViewPageLayout.mock.calls[0][0]
  })

  it('should render layout with data viewer as content', () => {
    expect(sut.Content).toEqual(DataViewer)
  })

})
