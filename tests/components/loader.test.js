import React from 'react'
import {shallow} from 'enzyme'
import {Loader as LoaderImpl} from 'semantic-ui-react'

import Loader from '../../src/components/loader'

describe('loader', () => {

  let sut
  let Children

  beforeEach(() => {
    Children = () => <div>test</div>
    sut = shallow(
      <Loader>
        <Children />
      </Loader>
    )
  })

  it('should render loader and don\'t render children when is not ready', () => {
    expect(sut.find(LoaderImpl).exists()).toBeTruthy()
    expect(sut.find(Children).exists()).toBeFalsy()
  })

  it('should render children and don\'t render loader when is ready', () => {
    sut.setProps({
      ready: true
    })
    expect(sut.find(Children).exists()).toBeTruthy()
    expect(sut.find(LoaderImpl).exists()).toBeFalsy()
  })

})
