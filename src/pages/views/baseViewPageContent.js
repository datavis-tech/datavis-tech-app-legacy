import React from 'react'
import Subscription from '../../components/subscription'
import { profile, id as getId } from '../../db/accessors'
import { serializeDocument, serializeMetaDocument } from '../../db/serializers'

export default ({id, doc, metaDoc, onFork, subscription, Layout}) => (
  <Subscription subscription={subscription}>
    {
      ({data}) => {

        const profileDoc = data ? data.profile : null

        const document = serializeDocument(doc)
        const metaDocument = serializeMetaDocument(metaDoc)
        const referenceDocuments = data ? (data.referenceDocs || []).map(serializeDocument) : []
        const forkedFrom = data && getId(data.forkedFrom) !== '' ? serializeDocument(data.forkedFrom) : null

        return (
          <Layout
            id={id}
            document={document}
            metaDocument={metaDocument}
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
