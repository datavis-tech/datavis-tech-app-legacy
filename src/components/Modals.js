import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actionCreators'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const Modals = ({isOpen, hideModal}) => (
  <Modal isOpen={isOpen} toggle={hideModal}>
    <ModalHeader toggle={hideModal}>Modal title</ModalHeader>
    <ModalBody>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={hideModal}>Do Something</Button>
      <Button color="secondary" onClick={hideModal}>Cancel</Button>
    </ModalFooter>
  </Modal>
)

const mapStateToProps = isOpen => ({ isOpen })

export default connect(mapStateToProps, actionCreators)(Modals)
