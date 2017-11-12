import React from 'react'
import DocumentSubscription from '../../db/subscriptions/documentSubscription'
import Subscription from '../subscription'
import Loader from '../loader'

// Subscribes to the document with the given id,
// and passes it as render prop to children.
export default ({id, children}) => (
  <Subscription subscription={DocumentSubscription({id})}>
    {
      ({data: doc, isReady}) => (
        <Loader ready={isReady}>
          {children(doc)}
        </Loader>
      )
    }
  </Subscription>
)
