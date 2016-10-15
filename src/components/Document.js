import React from 'react'
import { withRouter } from 'react-router'
import withShare from '../share/withShare'
import StringBinding from '../share/StringBinding'

const Document = ({ params, getDocument }) => {
  const doc = getDocument(params.id)
  return (
    <div className="container-fluid">
      <StringBinding type="input" doc={doc} path={["title"]} />
      <StringBinding type="textarea" doc={doc} path={["description"]} />
      <StringBinding type="textarea" doc={doc} path={["content"]} />
    </div>
  )
}

export default withShare(withRouter(Document))
