import React from 'react'
import DataViewerProvider from './dataViewerProvider'
import ViewPageLayout from '../viewPageLayout'
import { createSlots } from '../slots'
import DocumentPreviewList from '../../../components/documentPreviewList'

export default ({id, document, ownerProfile, referenceDocuments, forkedFrom, onFork}) => {

  const slots = createSlots(
    {id, document, ownerProfile, forkedFrom, onFork},
    {
      Content: <DataViewerProvider document={document} />,
      References: <DocumentPreviewList title='Visualizations' documents={referenceDocuments} />,
      EmbedButton: null,
      ExportButton: null,
      FullscreenButton: null
    }
  )

  return <ViewPageLayout {...slots} />
}
