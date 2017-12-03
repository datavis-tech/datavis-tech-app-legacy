import React from 'react'
import DataViewer from '../../../components/dataViewer'
import ViewPageLayout from '../viewPageLayout'
import { createSlots, DocumentPreviewList } from '../slots'

export default ({id, doc, ownerProfile, referenceDocs, forkedFrom, onFork}) => {

  const slots = createSlots(
    {id, doc, ownerProfile, forkedFrom, onFork},
    {
      Content: <DataViewer doc={doc} />,
      References: <DocumentPreviewList title='Visualizations' documents={referenceDocs} />
    }
  )

  return <ViewPageLayout {...slots} />
}
