import React from 'react'

import DocumentSubscription from '../../db/subscriptions/documentSubscription'

import Subscription from '../subscription'
import Loader from '../loader'

export default class VisViewPage extends React.Component {

  constructor (props) {
    super(props)
    this.subscription = DocumentSubscription({id: props.id})
  }

  render () {

    const {id, user, children} = this.props

    return (
      <Subscription subscription={this.subscription}>
        {
          ({data: doc, isReady}) => (
            <Loader ready={isReady}>
              {children({id, user, doc})}
            </Loader>
          )
        }
      </Subscription>
    )
  }

}
