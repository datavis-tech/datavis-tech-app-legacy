import React from 'react'

import DocumentSubscription from '../../db/subscriptions/documentSubscription'

import Page from '../../components/page'
import Subscription from '../../components/subscription'
import Loader from '../../components/loader'
import VisPageContent from './visPageContent'

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

  constructor(props) {
    super(props)

    this.subscription = DocumentSubscription({id: props.id})
  }

  render() {

    const {id, user} = this.props

    return (
      <Subscription subscription={this.subscription}>
        {
          ({data: doc, isReady}) => (
            <Loader ready={isReady}>
              <VisPageContent id={id} user={user} doc={doc}/>
            </Loader>
          )
        }
      </Subscription>
    )
  }

}

export default Page(VisViewPage)