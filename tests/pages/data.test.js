import React from 'react'
import {shallow} from 'enzyme'

jest.mock('../../src/components/viewPage/viewPage', () => jest.fn(() => () => <div>test</div>))

import DataViewer from '../../src/components/dataViewer'
import ViewPageDescription from '../../src/components/viewPage/viewPageDescription'
import ViewPage from '../../src/components/viewPage/viewPage'
import Data from '../../src/pages/data'

describe('vis page', () => {

  let sut
  let DataPageLayout

  beforeEach(() => {
    shallow(<Data />)
    DataPageLayout = ViewPage.mock.calls[0][0]
    sut = shallow(<DataPageLayout />)
  })

  it('should render layout with data viewer as content and default description', () => {
    expect(sut.props()).toMatchObject({
      Content: DataViewer,
      Description: ViewPageDescription
    })
  })

})
