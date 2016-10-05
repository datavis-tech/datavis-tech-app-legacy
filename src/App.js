import React from 'react'
import CreateDocumentButton from './components/CreateDocumentButton'
import { Container, Row, Col } from 'reactstrap'
import '../public/bootstrap.min.css'

const App = () => (
  <Container>
    <Row>
      <Col>
        <CreateDocumentButton/>
      </Col>
    </Row>
  </Container>
)
export default App
