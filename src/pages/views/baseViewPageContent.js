import React from 'react'
import Subscription from '../../components/subscription'
import { profile, id as getId } from '../../db/accessors'

export default ({id, doc, onFork, subscription, Layout}) => (
  <Subscription subscription={subscription}>
    {
      ({data}) => {
        const profileDoc = data ? data.profile : null
        const referenceDocs = data ? data.referenceDocs || [] : []
        const forkedFrom = data && getId(data.forkedFrom) !== '' ? data.forkedFrom : null

        return (
          <Layout
            id={id}
            doc={doc}
            onFork={onFork}
            ownerProfile={profile(profileDoc)}
            referenceDocs={referenceDocs}
            forkedFrom={forkedFrom}
          />
        )
      }
    }
  </Subscription>
)
