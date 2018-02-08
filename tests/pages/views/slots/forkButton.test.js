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

  it('should invoke onFork and indicate loading', () => {
    let button = sut.find(Button)

    expect(onFork).not.toHaveBeenCalled()
    expect(button.prop('disabled')).toEqual(false)
    expect(button.prop('loading')).toEqual(false)

    button.prop('onClick')()
    sut.update()
    button = sut.find(Button)

    expect(onFork).toHaveBeenCalled()
    expect(button.prop('disabled')).toEqual(true)
    expect(button.prop('loading')).toEqual(true)
  })

  it('should return to default state when fork completed', () => {
    onFork.mockImplementationOnce(done => done())
    let button = sut.find(Button)

    expect(button.prop('disabled')).toEqual(false)
    expect(button.prop('loading')).toEqual(false)

    button.prop('onClick')()
    sut.update()
    button = sut.find(Button)

    expect(button.prop('disabled')).toEqual(false)
    expect(button.prop('loading')).toEqual(false)
  })

})
