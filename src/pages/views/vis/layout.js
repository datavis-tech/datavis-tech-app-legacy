import React from 'react'
import Runner from '../../../components/runner/runner'
import ViewPageLayout from '../viewPageLayout'
import { createSlots, DocumentPreviewList } from '../slots'

export default ({id, document, ownerProfile, referenceDocuments, forkedFrom, onFork}) => {

  const slots = createSlots(
    {id, document, ownerProfile, forkedFrom, onFork},
    {
      Content: (
        <Runner
          content={document.content}
          references={document.references}
          referenceDocuments={referenceDocuments}
        />
      ),
      References: (
        <DocumentPreviewList
          title='Data'
          documents={referenceDocuments}
        />
      )
    }
  )

  return <ViewPageLayout {...slots} />
}
