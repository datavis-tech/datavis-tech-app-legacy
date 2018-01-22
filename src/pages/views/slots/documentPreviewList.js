import React from 'react'
import {List, Divider} from 'semantic-ui-react'
import DocumentPreview from './documentPreview'

export default ({title, documents}) => {

  if (documents && documents.length) {
    return (
      <div>
        <Divider horizontal>{title}</Divider>
        <List verticalAlign='middle'>
          {
            documents.map(({id, ...documentAttributes}) => (
              <DocumentPreview key={id} id={id} {...documentAttributes} />
            ))
          }
        </List>
      </div>
    )
  }

  return null
}
