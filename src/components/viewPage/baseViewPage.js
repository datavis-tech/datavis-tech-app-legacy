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
    this.handleDocumentUpdate = ({data: document}) => this.setState({title: formatTitle(title(document))})
  }

  render () {

    const {id, children, ...layoutProps} = this.props
    const {title} = this.state

    return (
      <Layout title={title} {...layoutProps}>
        <Subscription subscription={DocumentSubscription({id})} onUpdate={this.handleDocumentUpdate}>
          {
            ({data, isReady, error}) => (
              error
                ? <ErrorMessage error={error} />
                : <Loader ready={isReady}>{children({doc: data, error})}</Loader>
            )
          }
        </Subscription>
      </Layout>
    )
  }

}

const formatTitle = prefix => `${prefix} | Datavis.tech`
