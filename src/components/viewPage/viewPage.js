import React from 'react'
import {DocumentSubscription, ProfileSubscription} from '../../db/subscriptions'
import Subscription from '../subscription'
import Loading from '../loading'

/**
 * This component is a generalization of the ViewPage components family.
 * It contains common logic for such pages, like subscription to the document.
 * Also it has common visualization logic: if doc is not ready show loader else
 * show page content
 */

class ViewPage extends React.Component {

  render () {
    return (
      <Subscription subscription={DocumentSubscription()} parameters={{id: this.props.id}}>
        {
          ({docs: [doc]}) => (
            doc
              ? (
                <Subscription subscription={ProfileSubscription()} parameters={{id: doc.owner}}>
                  {
                    ({docs}) => {
                      const ownerProfile = docs[0] ? docs[0].data : null
                      return this.props.children({doc, ownerProfile})
                    }
                  }
                </Subscription>
              )
              : <Loading />
          )
        }
      </Subscription>
    )
  }
}

export default ViewPage
