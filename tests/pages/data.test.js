// TODO bring back this test after refactor.

import React from 'react'
import {render, shallow} from 'enzyme'

jest.mock('../../src/components/viewPage/viewPage', () => {
  return jest.fn(props => {
    return props.children({
      ownerProfile: 'foo',
      doc: 'bar'
    })
  })
})

import DataViewer from '../../src/components/dataViewer'
import ViewPageDescription from '../../src/components/viewPage/viewPageDescription'
import ViewPage from '../../src/components/viewPage/viewPage'
import Data from '../../src/pages/data'

describe('data page', () => {

  let sut
  let DataPageLayout

  beforeEach(() => {
    render(<Data />)
    console.log(ViewPage.mock.calls)
    DataPageLayout = ViewPage.mock.calls[0][0]
    sut = shallow(<DataPageLayout />)
  })

  it('should render layout with data viewer as content and default description', () => {
    expect(sut.props()).toMatchObject({
      Description: ViewPageDescription
    })
    // children DataViewer,
  })

})
