import React from 'react'
import groupBy from 'lodash/groupBy'
import { Grid } from 'semantic-ui-react'
import { VIS_DOC_TYPE, DATA_DOC_TYPE, TECH_DOC_TYPE } from '../../constants'
import DocumentPreviewList from '../views/slots/documentPreviewList'

const DocumentsList = ({ documents }) => {

  if (!documents || !documents.length) {
    return null
  }

  const documentsByType = groupBy(documents, 'type')

  return (
    <Grid stackable>
      <Grid.Column width={8}>
        <DocumentPreviewList title='Datasets' documents={documentsByType[DATA_DOC_TYPE]} dataTest='datasets' />
      </Grid.Column>
      <Grid.Column width={8}>
        <DocumentPreviewList title='Visualizations' documents={documentsByType[VIS_DOC_TYPE]} dataTest='visualizations' />
      </Grid.Column>
      <Grid.Column width={16}>
        <DocumentPreviewList title='Technologies' documents={documentsByType[TECH_DOC_TYPE]} dataTest='tech' />
      </Grid.Column>
    </Grid>
  )
}

export default DocumentsList
