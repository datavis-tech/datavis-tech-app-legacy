import React from 'react'
import Subscription from '../../components/subscription'
import ReferencesSubscription from '../../db/subscriptions/documentSubscriptions'
import {referenceIds} from '../../db/accessors'
import EditPageForm from './components/editPageForm'

export default ({id, user, doc, onDocumentDelete}) => (
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
)
