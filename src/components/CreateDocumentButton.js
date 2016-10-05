import React from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import * as actionCreators from '../actionCreators'

const CreateDocumentButton = ({ showModal }) => (
  <Button onClick={ showModal }>
    Create Document
  </Button>
);
export default connect(null, actionCreators)(CreateDocumentButton)
