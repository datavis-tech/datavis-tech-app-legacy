import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import nodeSelector from '../../utils/nodeSelector'
import ViewPageLayout from '../../../src/pages/views/viewPageLayout'

describe('view page layout', () => {

  let sut
  let props
  let Header
  let Content
  let Description
  let References
  let ForkedFrom
  let Avatar
  let EditButton
  let ForkButton

  beforeEach(() => {
    Header = <div data-test='Header' />
    Content = <div data-test='Content' />
    Description = <div data-test='Description' />
    References = <div data-test='References' />
    ForkedFrom = <div data-test='ForkedFrom' />
    Avatar = <div data-test='Avatar' />
    EditButton = <div data-test='EditButton' />
    ForkButton = <div data-test='ForkButton' />

    props = {
      Header,
      Content,
      Description,
      References,
      ForkedFrom,
      Avatar,
      EditButton,
      ForkButton
    }

    sut = mount(<ViewPageLayout {...props} />)
  })

  it('should render header', () => {
    expect(sut.find(nodeSelector('Header')).exists()).toBeTruthy()
  })

  it('should render content', () => {
    expect(sut.find(nodeSelector('Content')).exists()).toBeTruthy()
  })

  it('should render description', () => {
    expect(sut.find(nodeSelector('Description')).exists()).toBeTruthy()
  })

  it('should render references', () => {
    expect(sut.find(nodeSelector('References')).exists()).toBeTruthy()
  })

  it('should render forked from', () => {
    expect(sut.find(nodeSelector('ForkedFrom')).exists()).toBeTruthy()
  })

  it('should render avatar', () => {
    expect(sut.find(nodeSelector('Avatar')).exists()).toBeTruthy()
  })

  it('should render edit button', () => {
    expect(sut.find(nodeSelector('EditButton')).exists()).toBeTruthy()
  })

  it('should render fork button', () => {
    expect(sut.find(nodeSelector('ForkButton')).exists()).toBeTruthy()
  })

  it('should render correct layout', () => {
    const tree = renderer
      .create(<ViewPageLayout {...props} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

})
