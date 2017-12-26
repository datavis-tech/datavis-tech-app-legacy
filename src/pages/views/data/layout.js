import React from 'react'
import DataViewer from '../../../components/dataViewer'
import ViewPageLayout from '../viewPageLayout'
import { createSlots, DocumentPreviewList } from '../slots'

export default ({id, document, ownerProfile, referenceDocuments, forkedFrom, onFork}) => {

  const slots = createSlots(
    {id, document, ownerProfile, forkedFrom, onFork},
    {
      Content: <DataViewer content={document.content} />,
      References: <DocumentPreviewList title='Visualizations' documents={referenceDocuments} />
    }
  )

  return <ViewPageLayout {...slots} />
}