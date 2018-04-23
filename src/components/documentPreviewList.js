import React from 'react'
import { Card, Divider } from 'semantic-ui-react'
import DocumentPreview from './documentPreview'

export default ({title, documents}) => {

  if (documents && documents.length) {
    return (
      <React.Fragment>
        <Divider horizontal>{title}</Divider>
        <Card.Group>
          {
            documents.map(document => (
              <DocumentPreview key={document.id} document={document} />
            ))
          }
        </Card.Group>
      </React.Fragment>
    )
  }

  return null
}
