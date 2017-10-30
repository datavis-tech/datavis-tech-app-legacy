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

  let childrenProps

  beforeEach(() => {
    const Component = props => (
      <ViewPage {...props}>
        { props => {
          childrenProps = props
          return null
        }}
      </ViewPage>
    )
    mount(<Component />)
  })

  it('should subscribe to document and owner', () => {
    expect(childrenProps).toMatchObject({
      doc: mockDoc,
      ownerProfile: mockDoc.data
    })
  })

})
