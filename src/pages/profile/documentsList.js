import React from 'react'
import partition from 'lodash/partition'
import Loader from '../../components/loader'
import DocumentPreviewList from '../../components/documentPreviewList'

const DocumentsList = ({ documents, documentsLoading }) => {

  if (!documents || !documents.length) {
    return null
  }

  const [dataDocuments, visDocuments] = partition(documents, d => d.data.type === 'data')

  return (
    <Loader ready={!documentsLoading}>
      <div>
        <DocumentPreviewList title='Datasets' documents={dataDocuments} dataTest='datasets' />
        <DocumentPreviewList title='Visualizations' documents={visDocuments} dataTest='visualizations' />
      </div>
    </Loader>
  )
}

export default DocumentsList
