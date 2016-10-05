import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actionCreators'

const CreateDocumentButton = ({ showModalCreateDocument }) => (
  <div className="m-x-auto m-t-1">
    <button 
      type="button"
      className="btn btn-primary btn-lg btn-block"
      onClick={ showModalCreateDocument }
    >
      Create Document
    </button>
  </div>
);
export default connect(null, actionCreators)(CreateDocumentButton)

//        <Modal show={this.state.showModal} onHide={this.close}>
//          <Modal.Header closeButton>
//            <Modal.Title>Create a new Document</Modal.Title>
//          </Modal.Header>
//          <Modal.Body>
//
//            <Form horizontal>
//
//              <FormGroup controlId="formHorizontalEmail">
//                <Col componentClass={ControlLabel} sm={2}>
//                  Title
//                </Col>
//                <Col sm={10}>
//                  <FormControl type="text" />
//                </Col>
//              </FormGroup>
//
//              <FormGroup controlId="formHorizontalEmail">
//                <Col componentClass={ControlLabel} sm={2}>
//                  Description
//                </Col>
//                <Col sm={10}>
//                  <FormControl type="text" />
//                </Col>
//              </FormGroup>
//
//              <FormGroup>
//                <Col smOffset={2} sm={10}>
//                  <Button type="submit">
//                    Sign in
//                  </Button>
//                </Col>
//              </FormGroup>
//            </Form>
//          </Modal.Body>
//          <Modal.Footer>
//            <Button onClick={this.close}>Close</Button>
//          </Modal.Footer>
//        </Modal>
