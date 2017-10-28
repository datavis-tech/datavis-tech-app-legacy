import React from 'react'
import Page from '../components/page'
import {ViewPage, ViewPageLayout} from '../components/viewPage'
import DataViewer from '../components/dataViewer'

class DataViewPage extends React.Component {

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
            Content={DataViewer}
          />
        )}
      </ViewPage>
    )
  }
}

export default Page(DataViewPage)
