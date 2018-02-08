import React from 'react'
import groupBy from 'lodash/groupBy'
import { VIS_DOC_TYPE, DATA_DOC_TYPE, TECH_DOC_TYPE } from '../../constants'
import DocumentPreviewList from '../views/slots/documentPreviewList'

const DocumentsList = ({ documents }) => {

  if (!documents || !documents.length) {
    return null
  }

  const documentsByType = groupBy(documents, 'type')

  return (
    <div>
      <DocumentPreviewList title='Visualizations' documents={documentsByType[VIS_DOC_TYPE]} dataTest='visualizations' />
      <DocumentPreviewList title='Datasets' documents={documentsByType[DATA_DOC_TYPE]} dataTest='datasets' />
      <DocumentPreviewList title='Techs' documents={documentsByType[TECH_DOC_TYPE]} dataTest='tehs' />
    </div>
  )
}

export default DocumentsList
