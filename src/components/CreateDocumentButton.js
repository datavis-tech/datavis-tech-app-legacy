import React, { Component } from 'react'

import { Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'

class CreateDocumentButton extends Component {

  constructor(){
    super()
    this.state = { showModal: false }
    this.open =  () => { this.setState({ showModal: true }) }
    this.close = () => { this.setState({ showModal: false }) }
  }

  render() {
    return (
      <div>

        <Button
          bsStyle="primary"
          bsSize="large" 
          className="center-block"
          onClick={this.open}
        >
          Create Document
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new Document</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form horizontal>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Title
                </Col>
                <Col sm={10}>
                  <FormControl type="text" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Description
                </Col>
                <Col sm={10}>
                  <FormControl type="text" />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">
                    Sign in
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

export default CreateDocumentButton
