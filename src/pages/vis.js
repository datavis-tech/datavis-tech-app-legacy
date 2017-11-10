import React from 'react'
import DocumentSubscription from '../db/subscriptions/documentSubscription'
import ReferencesSubscription from '../db/subscriptions/documentSubscriptions'
import ProfileSubscription from '../db/subscriptions/profileSubscription'
import CompositeSubscription from '../db/subscriptions/compositeSubscription'
import {referenceIds} from '../db/accessors'
import Page from '../components/page'
import Subscription from '../components/subscription'
import { ViewPageLayout } from '../components/viewPage'
import Loader from '../components/loader'
import Runner from '../components/runner/runner'
import DocumentPreviewList from '../components/documentPreviewList'

class VisViewPage extends React.Component {

  // TODO refactor this into a common thing.
  // and make this the test for it:
  // it('should be able retrieve id from query', async () => {
  //   const id = Symbol('id')
  //   const props = await Component.getInitialProps({query: {id}})
  //   expect(props).toEqual({id})
  // })
  //
  static async getInitialProps ({query}) {
    return {
      id: query.id
    }
  }

  render () {

    const {id, user} = this.props

    return (
      <Subscription subscription={DocumentSubscription({id})}>
        {
          ({data, isReady}) => {
            const {doc} = data || {} // data might be null so object destructuring is not possible
            return (
              <Loader ready={isReady}>

                <Subscription
                  subscription={
                    CompositeSubscription({
                      profile: ProfileSubscription({id: doc.data.owner}),
                      referenceDocs: ReferencesSubscription({ids: referenceIds(doc)})
                    })
                  }
                >
                  <ViewPageLayout
                    id={id}
                    user={user}
                    ownerProfile={profile ? profile.data : null} // TODO need accessors to avoid access to sharedb specific data field
                    doc={doc}
                    referenceDocs={referenceDocs}
                    Content={Runner}
                    References={({referenceDocs}) => <DocumentPreviewList title='Datasets' documents={referenceDocs} />}
                  />
                </Subscription>
              </Loader>
            )
          }
        }
      </Subscription>
    )
  }
}

export default Page(VisViewPage)
