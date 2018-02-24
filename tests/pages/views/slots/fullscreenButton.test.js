import React from 'react'
import { shallow } from 'enzyme'

import { Button } from 'semantic-ui-react'

jest.mock('../../../../src/routesUtils', () => ({
  getHrefForRoute: (_, params) => `embed of ${params.id}`
}))
import FullscreenButton from '../../../../src/pages/views/slots/fullscreenButton'

describe('fullscreen button', () => {

  let sut
  let id

  beforeEach(() => {
    id = String(Math.random())
    sut = shallow(<FullscreenButton id={id} />)
  })

  it('should render button with fullscreen label as link to export url and open in a new tab', () => {
    expect(sut.find(Button).props()).toMatchObject({
      as: 'a',
      href: `embed of ${id}`,
      target: '_blank',
      content: 'Fullscreen',
      style: {marginTop: '5px'}
    })
  })

})
