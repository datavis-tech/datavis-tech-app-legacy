import React from 'react'
import VisSubscription from '../db/subscriptions/visSubscription'
import Page from '../components/page'
import Subscription from '../components/subscription'
import {ViewPageLayout} from '../components/viewPage'
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

  constructor (props) {
    super(props)
    this.subscription = VisSubscription()
  }

  render () {

    const {id, user} = this.props

    return (
      <Subscription subscription={this.subscription} parameters={{id}}>
        {
          ({data, isReady}) => {
            const {doc, profile, references} = data || {} // data might be null so object destructuring is not possible
            return (
              <Loader ready={isReady}>
                <ViewPageLayout
                  id={id}
                  user={user}
                  ownerProfile={profile ? profile.data : null} // TODO need accessors to avoid access to sharedb specific data field
                  doc={doc}
                  referenceDocs={references}
                  Content={Runner}
                  References={({referenceDocs}) => <DocumentPreviewList title='Datasets' documents={referenceDocs} />}
                />
              </Loader>
            )
          }
        }
      </Subscription>
    )
  }
}

export default Page(VisViewPage)
