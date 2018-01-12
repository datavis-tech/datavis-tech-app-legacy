import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'semantic-ui-react'

import ForkButton from '../../../../src/pages/views/slots/forkButton'

describe('fork button', () => {

  let sut
  let onFork

  beforeEach(() => {
    onFork = jest.fn()
    sut = shallow(<ForkButton onFork={onFork} />)
  })

  it('should contain button with on fork handler', () => {
    expect(sut.find(Button).prop('onClick')).toBe(onFork)
  })

})
