import React from 'react'
import Page from '../components/page'
import Subscription from '../components/subscription'
import { ViewPageLayout } from '../components/viewPage'
import DataViewer from '../components/dataViewer'
import VisSubscription from '../db/subscriptions/visSubscription'
import Loader from '../components/loader'

class DataViewPage extends React.Component {

  // TODO refactor this into a common thing.
  static async getInitialProps ({query}) {
    return {
      id: query.id
    }
  }

  render () {

    const {id, user} = this.props

    return (
      <Subscription subscription={VisSubscription()} parameters={{id}}>
        {
          ({data, isReady}) => {
            const {doc, profile, referenceDocs} = data || {} // data might be null so object destructuring is not possible
            return (
              <Loader ready={isReady}>
                <ViewPageLayout
                  id={id}
                  user={user}
                  ownerProfile={profile ? profile.data : null} // TODO need accessors to avoid access to sharedb specific data field
                  doc={doc}
                  referenceDocs={referenceDocs}
                  Content={DataViewer}
                />
              </Loader>
            )
          }
        }
      </Subscription>
    )
  }
}

export default Page(DataViewPage)
