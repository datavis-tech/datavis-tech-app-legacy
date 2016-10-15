import React from 'react'
import { withRouter } from 'react-router'
import withShare from '../share/withShare'
import StringBinding from '../share/StringBinding'

const Document = ({ params, getDocument }) => (
  <div className="container-fluid">
    <StringBinding
      type="textarea"
      doc={getDocument(params.id)}
    />
  </div>
)

export default withShare(withRouter(Document))
