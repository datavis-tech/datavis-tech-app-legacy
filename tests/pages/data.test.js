import React from 'react'
import {render} from 'enzyme'
import fakeDoc from '../utils/fakeDoc'
import fakeUser from '../utils/fakeUser'

const mockId = 'foo'
const mockDoc = fakeDoc()
const mockOwnerProfile = fakeUser()

// Mock the ViewPage component with one that invokes children,
// passing render prop with `ownerProfile` and `doc`.
// TODO refactor this out? Also in vis.test.js
jest.mock('../../src/components/viewPage/viewPage', () => {
  return jest.fn(props => {
    return props.children({
      ownerProfile: mockOwnerProfile,
      doc: mockDoc
    })
  })
})

// Mock ViewPageLayout so we can test its props.
jest.mock('../../src/components/viewPage/viewPageLayout', () => jest.fn(() => null))

import DataViewer from '../../src/components/dataViewer'
import ViewPageLayout from '../../src/components/viewPage/viewPageLayout'
import Data from '../../src/pages/data'

describe('data page', () => {

  let sut
  beforeEach(() => {
    render(<Data id={mockId} />)
    sut = ViewPageLayout.mock.calls[0][0]
  })

  it('should pass DataViewer as content to ViewPageLayout', () => {
    expect(sut.Content).toEqual(DataViewer)
  })

  it('should pass id to ViewPageLayout', () => {
    expect(sut.id).toEqual(mockId)
  })

  it('should pass ownerProfile to ViewPageLayout', () => {
    expect(sut.ownerProfile).toEqual(mockOwnerProfile)
  })

  it('should pass doc to ViewPageLayout', () => {
    expect(sut.doc).toEqual(mockDoc)
  })

})
