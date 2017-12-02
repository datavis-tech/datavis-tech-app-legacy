import React from 'react'
import {List, Divider} from 'semantic-ui-react'
import DocumentPreview from './documentPreview'
import {id} from '../../../db/accessors'

export default ({title, documents}) => {

  if (documents && documents.length) {
    return (
      <div>
        <Divider horizontal>{title}</Divider>
        <List divided relaxed>
          {
            documents.map(doc => (
              <DocumentPreview key={id(doc)} doc={doc} />
            ))
          }
        </List>
      </div>
    )
  }

  return null
}
