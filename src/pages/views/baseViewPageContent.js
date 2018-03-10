import React from 'react'
import Subscription from '../../components/subscription'
import { profile, id as getId } from '../../db/accessors'
import { serializeDocument } from '../../db/serializers'

export default ({id, user, doc, onFork, subscription, Layout}) => (
  <Subscription subscription={subscription}>
    {
      ({data}) => {

        const profileDoc = data ? data.profile : null

        const document = serializeDocument(doc)
        const referenceDocuments = data ? (data.referenceDocs || []).map(serializeDocument) : []
        const forkedFrom = data && getId(data.forkedFrom) !== '' ? serializeDocument(data.forkedFrom) : null

        return (
          <Layout
            id={id}
            document={document}
            user={user}
            ownerProfile={profile(profileDoc)}
            referenceDocuments={referenceDocuments}
            forkedFrom={forkedFrom}
            onFork={onFork}
          />
        )
      }
    }
  </Subscription>
)
