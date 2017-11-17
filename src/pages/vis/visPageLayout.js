import React from 'react'
import Runner from '../../components/runner/runner'
import DocumentPreviewList from '../../components/documentPreviewList'
import { ViewPageLayout } from '../../components/viewPage'

export default ({id, user, doc, profile, referenceDocs, onFork}) => (
  <ViewPageLayout
    id={id}
    user={user}
    ownerProfile={profile}
    doc={doc}
    referenceDocs={referenceDocs}
    Content={Runner}
    onFork={onFork}
    References={
      ({referenceDocs}) => (
        <DocumentPreviewList
          title='Data'
          documents={referenceDocs}
        />
      )
    }
  />
)
