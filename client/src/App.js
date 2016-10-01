import React, { Component } from 'react';

import { Grid, Col, Alert } from 'react-bootstrap';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Grid>

        <Col xs={12}>
          <Alert bsStyle="warning">
            Test
          </Alert>
          <Alert bsStyle="warning">
            Home
          </Alert>
        </Col>

        <Col md={6}>
          <Alert bsStyle="warning">
            Left
          </Alert>
        </Col>

        <Col md={6}>
          <Alert bsStyle="warning">
            Right
          </Alert>
        </Col>

      </Grid>
    );
  }
}

export default App;
