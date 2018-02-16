import React from 'react'
import { shallow } from 'enzyme'

import { Button } from 'semantic-ui-react'

jest.mock('../../../../src/routesUtils', () => ({
  getHrefForRoute: (_, params) => `export of ${params.id}`
}))
import ExportButton from '../../../../src/pages/views/slots/exportButton'

describe('export button', () => {

  let sut
  let id

  beforeEach(() => {
    id = String(Math.random())
    sut = shallow(<ExportButton id={id} />)
  })

  it('should render button with export label as link to export url', () => {
    expect(sut.find(Button).props()).toMatchObject({
      as: 'a',
      href: `export of ${id}`,
      content: 'Export',
      style: {marginTop: '5px'}
    })
  })

})
