import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actionCreators'

const Create = () => (
  <h1>Create</h1>
)

export default connect(null, actionCreators)(Create)
