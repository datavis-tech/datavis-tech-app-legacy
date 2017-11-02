import React from 'react'
import {List, Divider} from 'semantic-ui-react'
import DocumentPreview from './documentPreview'

export default ({title, documents}) => {

  if (documents.length) {
    return (
      <div>
        <Divider horizontal>{title}</Divider>
        <List divided relaxed>
          { documents.map(d => <DocumentPreview key={d.id} {...d} />) }
        </List>
      </div>
    )
  }

  return null
}
