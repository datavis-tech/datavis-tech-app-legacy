import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import nodeSelector from '../../utils/nodeSelector'

import { Modal, Form, Message } from 'semantic-ui-react'

import AddCollaboratorModal from '../../../src/pages/edit/addCollaboratorModal'

describe('add collaborator modal', () => {

  let sut
  let props
  let onClose
  let onCollaboratorSubmit

  beforeEach(() => {

    onClose = jest.fn()
    onCollaboratorSubmit = jest.fn()

    props = {
      onClose,
      onCollaboratorSubmit
    }
    sut = shallow(<AddCollaboratorModal {...props} />)
  })

  afterEach(() => {
    onClose.mockClear()
    onCollaboratorSubmit.mockClear()
  })

  it('should not show modal by default', () => {
    expect(sut.find(Modal).props()).toMatchObject({
      open: false,
      onClose,
      size: 'small'
    })
  })

  it('should have cancel button', () => {
    sut.find(nodeSelector('cancel')).simulate('click')
    expect(onClose).toHaveBeenCalled()
  })

  it('should close on close', () => {
    sut.find(Modal).simulate('close')
    expect(onClose).toHaveBeenCalled()
  })

  describe('when modal is open', () => {

    beforeEach(() => {
      sut.setProps({show: true})
    })

    it('should not have not found message', () => {
      expect(sut.find(Message).exists()).toBeFalsy()
    })

    it('should mark add button as not disabled and not loading', () => {
      expect(sut.find(nodeSelector('addCollaborator')).props()).toMatchObject({
        disabled: false,
        loading: false
      })
    })

    describe('when is loading', () => {

      beforeEach(() => {
        sut.setProps({loading: true})
      })

      it('should mark add button as not disabled and not loading', () => {
        expect(sut.find(nodeSelector('addCollaborator')).props()).toMatchObject({
          disabled: true,
          loading: true
        })
      })

    })

    describe('when not found', () => {

      beforeEach(() => {
        sut.setProps({notFound: true})
      })

      it('should have not found message', () => {
        expect(sut.find(Message).exists()).toBeTruthy()
      })

      it('should mark add button as not disabled and not loading', () => {
        expect(sut.find(nodeSelector('addCollaborator')).props()).toMatchObject({
          disabled: false,
          loading: false
        })
      })

    })

  })

  describe('document updates submission', () => {

    let username

    beforeEach(() => {
      username = String(Math.random())
      sut.setState({username})
    })

    it('should perform on form submit', () => {
      sut.find(Form).simulate('submit')
      expect(onCollaboratorSubmit).toHaveBeenCalledWith(username)
    })

    it('should perform when add collaborator button is clicked', () => {
      sut.find(nodeSelector('addCollaborator')).simulate('click')
      expect(onCollaboratorSubmit).toHaveBeenCalledWith(username)
    })

  })

  it('should render correct layout', () => {
    const tree = renderer
      .create(<AddCollaboratorModal show loading notFound />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

})
