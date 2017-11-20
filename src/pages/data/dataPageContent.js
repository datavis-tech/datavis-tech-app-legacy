import React from 'react'
import ProfileSubscription from '../../db/subscriptions/profileSubscription'
import ReferencedBySubscription from '../../db/subscriptions/referencedBySubscription'
import CompositeSubscription from '../../db/subscriptions/compositeSubscription'

import {id as docID, owner, profile} from '../../db/accessors'

import Subscription from '../../components/subscription'
import DataPageLayout from './dataPageLayout'

export default ({id, user, doc, onFork}) => {
  const subscription = CompositeSubscription({
    profile: ProfileSubscription({id: owner(doc)}),
    referenceDocs: ReferencedBySubscription({id: docID(doc)})
  })

  return (
    <Subscription subscription={subscription}>
      {
        ({data}) => {
          const profileDoc = data ? data.profile : null
          const referenceDocs = data ? data.referenceDocs || [] : []

          return (
            <DataPageLayout
              id={id}
              user={user}
              doc={doc}
              onFork={onFork}
              profile={profile(profileDoc)}
              referenceDocs={referenceDocs}
            />
          )
        }
      }
    </Subscription>
  )
}
