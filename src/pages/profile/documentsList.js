import React from 'react'
import partition from 'lodash/partition'
import DocumentPreviewList from '../../components/documentPreviewList'
import { type } from '../../db/accessors'

const DocumentsList = ({ documents }) => {

  if (!documents || !documents.length) {
    return null
  }

  const [dataDocuments, visDocuments] = partition(documents, doc => type(doc) === 'data')

  return (
    <div>
      <DocumentPreviewList title='Datasets' documents={dataDocuments} dataTest='datasets' />
      <DocumentPreviewList title='Visualizations' documents={visDocuments} dataTest='visualizations' />
    </div>
  )
}

export default DocumentsList
