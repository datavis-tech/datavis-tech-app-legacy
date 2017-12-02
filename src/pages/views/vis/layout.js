import React from 'react'
import Runner from '../../../components/runner/runner'
import ViewPageLayout from '../viewPageLayout'
import { createSlots, DocumentPreviewList } from '../slots'

export default ({id, doc, ownerProfile, referenceDocs, forkedFrom, onFork}) => {

  const slots = createSlots(
    {id, doc, ownerProfile, forkedFrom, onFork},
    {
      Content: <Runner doc={doc} referenceDocs={referenceDocs} />,
      References: <DocumentPreviewList title='Data' documents={referenceDocs} />
    }
  )

  return <ViewPageLayout {...slots} />
}
