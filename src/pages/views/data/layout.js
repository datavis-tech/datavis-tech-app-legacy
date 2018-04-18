import React from 'react'
import DataViewerProvider from './dataViewerProvider'
import ViewPageLayout from '../viewPageLayout'
import { createSlots, DocumentPreviewList } from '../slots'

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
