import React from 'react'
import {mount} from 'enzyme'

import fakeDoc from '../../utils/fakeDoc'

const mockDoc = fakeDoc()

jest.mock('../../../src/components/subscription', () => {
  return jest.fn(props => {
    return props.children({
      docs: [mockDoc]
    })
  })
})

import ViewPage from '../../../src/components/viewPage/viewPage'

describe('view page', () => {

  let children = jest.fn(() => null)

  beforeEach(() => {
    mount(
      <ViewPage>
        {children}
      </ViewPage>
    )
  })

  it('should subscribe to document and owner', () => {
    expect(children).toHaveBeenCalledWith({
      doc: mockDoc,
      ownerProfile: mockDoc.data
    })
  })

})
