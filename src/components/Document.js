import React from 'react'
import { withRouter } from 'react-router'

const Document = ({ params }) => (
  <div className="container-fluid">
    <h1>Document {params.id}</h1>
  </div>
)

export default withRouter(Document)
