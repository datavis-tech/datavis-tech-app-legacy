import React from 'react'
import DocumentSubscription from '../../db/subscriptions/documentSubscription'
import {title} from '../../db/accessors'
import Layout from '../layout'
import Subscription from '../subscription'
import Loader from '../loader'
import ErrorMessage from '../errorMessage'

export default class BaseViewPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      title: formatTitle('Loading...')
    }

    this.handleDocumentUpdate = ({data: document}) => {
      this.setState({
        title: formatTitle(title(document))
      })
    }

    // Displays an error message to the user.
    // The argument `error` here is expected to be a String.
    this.onError = error => {
      this.setState({error})
    }
  }

  render () {

    const {id, children, ...layoutProps} = this.props
    const {title} = this.state

    return (
      <Layout title={title} {...layoutProps}>
        <Subscription subscription={DocumentSubscription({id})} onUpdate={this.handleDocumentUpdate}>
          {
            subscription => (
              <div>
                <Loader ready={subscription.isReady}>
                  {
                    children({
                      doc: subscription.data,
                      onError: this.onError
                    })
                  }
                </Loader>
                <ErrorMessage error={subscription.error || this.state.error} />
              </div>
            )
          }
        </Subscription>
      </Layout>
    )
  }

}

const formatTitle = prefix => `${prefix} | Datavis.tech`
