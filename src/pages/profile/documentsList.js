import React from 'react'
import partition from 'lodash/partition'
import DocumentPreviewList from '../views/slots/documentPreviewList'

const DocumentsList = ({ documents }) => {

  if (!documents || !documents.length) {
    return null
  }

  const [dataDocuments, visDocuments] = partition(documents, doc => doc.type === 'data')

  return (
    <div>
      <DocumentPreviewList title='Datasets' documents={dataDocuments} dataTest='datasets' />
      <DocumentPreviewList title='Visualizations' documents={visDocuments} dataTest='visualizations' />
    </div>
  )
}

export default DocumentsList
