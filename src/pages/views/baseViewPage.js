import React from 'react'
import DocumentSubscription from '../../db/subscriptions/documentSubscription'
import MetaDocumentSubscription from '../../db/subscriptions/metaDocumentSubscription'
import { title } from '../../db/accessors'
import { incrementViewCount } from '../../db/actions'
import Layout from '../../components/layout'
import Subscription from '../../components/subscription'
import Loader from '../../components/loader'
import ErrorMessage from '../../components/errorMessage'
import { redirectTo404 } from '../../components/router'

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

    this.incrementViewCountOnPageView = shareDBMetaDoc => {
      if (shareDBMetaDoc && !this.pageViewed) {
        incrementViewCount(shareDBMetaDoc)
        this.pageViewed = true
      }
    }
  }

  render () {

    const {id, children, ...layoutProps} = this.props
    const {title} = this.state

    return (
      <Layout title={title} {...layoutProps}>
        <Subscription
          key={id} // Use key here to force lifecycle when ID changes.
          subscription={DocumentSubscription({id})}
          onUpdate={this.handleDocumentUpdate}
          onPermissionDenied={redirectTo404}
        >
          {
            subscription => {
              const shareDBDoc = subscription.data
              return (
                <Subscription subscription={MetaDocumentSubscription({id})} >
                  {
                    metaSubscription => {
                      const shareDBMetaDoc = metaSubscription.data
                      this.incrementViewCountOnPageView(shareDBMetaDoc)
                      return (
                        <div>
                          <Loader ready={subscription.isReady}>
                            {
                              children({
                                doc: shareDBDoc,
                                metaDoc: shareDBMetaDoc,
                                onError: this.onError
                              })
                            }
                          </Loader>
                          <ErrorMessage error={subscription.error || this.state.error} />
                        </div>
                      )
                    }
                  }
                </Subscription>
              )
            }
          }
        </Subscription>
      </Layout>
    )
  }

}

const formatTitle = prefix => `${prefix} | Datavis.tech`
