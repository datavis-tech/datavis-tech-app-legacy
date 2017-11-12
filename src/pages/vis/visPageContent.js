import React from 'react'
import ProfileSubscription from '../../db/subscriptions/profileSubscription'
import ReferencesSubscription from '../../db/subscriptions/documentSubscriptions'
import CompositeSubscription from '../../db/subscriptions/compositeSubscription'

import {referenceIds, owner, profile} from '../../db/accessors'

import Subscription from '../../components/subscription'
import VisPageLayout from './visPageLayout'

export default ({id, user, doc}) => {
  const subscription = CompositeSubscription({
    profile: ProfileSubscription({id: owner(doc)}),
    referenceDocs: ReferencesSubscription({ids: referenceIds(doc)})
  })

  return (
    <Subscription subscription={subscription}>
      {
        ({data}) => {
          const profileDoc = data ? data.profile : null
          const referenceDocs = data ? data.referenceDocs || [] : []

          return (
            <VisPageLayout
              id={id}
              user={user}
              doc={doc}
              profile={profile(profileDoc)}
              referenceDocs={referenceDocs || []}
            />
          )
        }
      }
    </Subscription>
  )
}
