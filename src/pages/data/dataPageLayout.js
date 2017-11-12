import React from 'react'
import DataViewer from '../../components/dataViewer'
import { ViewPageLayout } from '../../components/viewPage'

export default ({id, user, doc, profile, referenceDocs}) => (
  <ViewPageLayout
    id={id}
    user={user}
    ownerProfile={profile}
    doc={doc}
    referenceDocs={referenceDocs}
    Content={DataViewer}
  />
)
