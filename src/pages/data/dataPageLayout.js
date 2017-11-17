import React from 'react'
import DataViewer from '../../components/dataViewer'
import DocumentPreviewList from '../../components/documentPreviewList'
import { ViewPageLayout } from '../../components/viewPage'

export default ({id, user, doc, profile, referenceDocs, onFork}) => (
  <ViewPageLayout
    id={id}
    user={user}
    ownerProfile={profile}
    doc={doc}
    referenceDocs={referenceDocs}
    Content={DataViewer}
    onFork={onFork}
    References={
      ({referenceDocs}) => (
        <DocumentPreviewList
          title='Visualizations'
          documents={referenceDocs}
        />
      )
    }
  />
)
