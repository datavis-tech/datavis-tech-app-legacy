import React from 'react'
import Layout from '../../components/layout'
import Subscription from '../../components/subscription'
import ReferencesSubscription from '../../db/subscriptions/documentSubscriptions'
import {referenceIds, title} from '../../db/accessors'
import EditPageForm from './components/editPageForm'
import ErrorMessage from '../../components/errorMessage'

export default ({id, user, doc, onDocumentDelete, error}) => (
  <Layout
    title={`${(title(doc) || 'Loading...')} (editing) | Datavis.tech`}
    user={user}
    includeCSS='/static/codemirror/codemirror.min.css'
  >
    <Subscription subscription={ReferencesSubscription({ids: referenceIds(doc)})}>
      {({data: referenceDocs}) => {
        return (
          <EditPageForm
            doc={doc}
            referenceDocs={referenceDocs || []}
            onDocumentDelete={onDocumentDelete}
          />
        )
      }}
    </Subscription>
    <ErrorMessage error={error} />
  </Layout>
)
