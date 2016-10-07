import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actionCreators'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Form, FormGroup, Label, Input, Col } from 'reactstrap';

const Modals = ({isOpen, hideModal}) => (
  <Modal isOpen={isOpen} toggle={hideModal}>
    <ModalHeader toggle={hideModal}>Create Document</ModalHeader>
    <ModalBody>
      
      <Form>
        <FormGroup row>
          <Label for="title" sm={2}>Title</Label>
          <Col sm={10}>
            <Input type="text" name="title" id="title" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>Description</Label>
          <Col sm={10}>
            <Input type="textarea" name="description" id="description" />
          </Col>
        </FormGroup>
      </Form>

    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={hideModal}>Cancel</Button>
      <Button color="primary" onClick={hideModal}>Create</Button>
    </ModalFooter>
  </Modal>
)

const mapStateToProps = isOpen => ({ isOpen })

export default connect(mapStateToProps, actionCreators)(Modals)
