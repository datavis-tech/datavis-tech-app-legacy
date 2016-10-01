import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import CreateDocumentButton from './components/CreateDocumentButton'

import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class App extends Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} >
            <CreateDocumentButton/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App
