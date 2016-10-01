import React, { Component } from 'react'

import { Button, Grid, Row, Col } from 'react-bootstrap'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} >
            <Button bsStyle="primary" bsSize="large" className="center-block">
              Create Document
            </Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App
