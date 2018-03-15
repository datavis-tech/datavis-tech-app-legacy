/**
 * @jest-environment jsdom
 */

// TODO react-test-renderer does not work with portal so that we need to mock it
// Checkout https://github.com/Semantic-Org/Semantic-UI-React/issues/2454
// and https://github.com/facebook/react/issues/11565 for details
jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({ children }) => children)

import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import nodeSelector from '../../utils/nodeSelector'
import { Modal, Form } from 'semantic-ui-react'
import AddReferenceModal from '../../../src/pages/edit/addReferenceModal'

describe('add reference modal', () => {

  let sut
  let props
  let onClose
  let onReferenceSubmit

  beforeEach(() => {
    onClose = jest.fn()
    onReferenceSubmit = jest.fn()

    props = {
      onClose,
      onReferenceSubmit
    }

    sut = shallow(<AddReferenceModal {...props} />)
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

  it('should mark add button as disabled when modal is open', () => {
    sut.setProps({show: true})
    expect(sut.find(nodeSelector('addReference')).props()).toMatchObject({ disabled: true })
  })

  describe('reference addition', () => {

    let filename
    let id

    beforeEach(() => {
      id = String(Math.random())
      filename = String(Math.random())
      sut.setState({ id, filename })
    })

    it('should perform on form submit', () => {
      sut.find(Form).simulate('submit')
      expect(onReferenceSubmit).toHaveBeenCalledWith(filename, id)
    })

    it('should perform when add collaborator button is clicked', () => {
      sut.find(nodeSelector('addReference')).simulate('click')
      expect(onReferenceSubmit).toHaveBeenCalledWith(filename, id)
    })

    it('should mark add button as enabled when both id and filename are filled in', () => {
      expect(sut.find(nodeSelector('addReference')).props()).toMatchObject({
        disabled: false
      })
    })
  })

  it('should render correct layout', () => {

    const userId = String(Math.random())
    const tree = renderer
      .create(<AddReferenceModal userId={userId} show />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

})
