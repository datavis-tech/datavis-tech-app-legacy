import React from 'react'
import Page from '../components/page'
import {ViewPage, ViewPageLayout} from '../components/viewPage'
import Runner from '../components/runner'

class VisViewPage extends React.Component {

  // TODO refactor this into a common thing.
  static async getInitialProps ({query}) {
    return {
      id: query.id
    }
  }

  render () {
    return (
      <ViewPage id={this.props.id}>
        { ({ownerProfile, doc}) => (
          <ViewPageLayout
            id={this.props.id}
            user={this.props.user}
            ownerProfile={ownerProfile}
            doc={doc}
            Content={Runner}
          />
        )}
      </ViewPage>
    )
  }
}

export default Page(VisViewPage)
