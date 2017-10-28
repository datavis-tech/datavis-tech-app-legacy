import React from 'react'
import {shallow} from 'enzyme'

jest.mock('../../src/components/viewPage/viewPage', () => jest.fn(() => () => <div>test</div>))

import Runner from '../../src/components/runner'
import ViewPageDescription from '../../src/components/viewPage/viewPageDescription'
import ViewPage from '../../src/components/viewPage/viewPage'
import Vis from '../../src/pages/vis'

describe('vis page', () => {

  let sut
  let VisPageLayout

  beforeEach(() => {
    shallow(<Vis />)
    VisPageLayout = ViewPage.mock.calls[0][0]
    sut = shallow(<VisPageLayout />)
  })

  it('should render layout with runner as content and default description', () => {
    expect(sut.props()).toMatchObject({
      Description: ViewPageDescription
    })
  })

})
