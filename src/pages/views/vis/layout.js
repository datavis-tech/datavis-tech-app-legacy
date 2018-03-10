import React from 'react'
import Runner from '../../../components/runner/runner'
import ViewPageLayout from '../viewPageLayout'
import { createSlots } from '../slots'
import References from './references'

export default ({id, user, document, ownerProfile, referenceDocuments, forkedFrom, onFork}) => {

  const slots = createSlots(
    {id, user, document, ownerProfile, forkedFrom, onFork},
    {
      Content: (
        <Runner
          content={document.content}
          references={document.references}
          referenceDocuments={referenceDocuments}
        />
      ),
      References: <References documents={referenceDocuments} />
    }
  )

  return <ViewPageLayout {...slots} />
}
