import React, { Component } from 'react'

import { Button, Grid, Row, Col, Modal } from 'react-bootstrap'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class App extends Component {

  constructor(){
    super()
    this.state = { showModal: false }
    this.open =  () => { this.setState({ showModal: true }) }
    this.close = () => { this.setState({ showModal: false }) }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} >

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
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>

          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App
