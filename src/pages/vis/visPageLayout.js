import React from 'react'
import Runner from '../../components/runner/runner'
import DocumentPreviewList from '../../components/documentPreviewList'
import { ViewPageLayout } from '../../components/viewPage'

export default ({id, user, doc, profile, referenceDocs}) => (
  <ViewPageLayout
    id={id}
    user={user}
    ownerProfile={profile}
    doc={doc}
    referenceDocs={referenceDocs}
    Content={Runner}
    References={
      ({referenceDocs}) => <DocumentPreviewList title='Datasets' documents={referenceDocs} />
    }
  />
)
