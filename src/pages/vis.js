import React from 'react'
import Page from '../components/page'
import {ViewPage, ViewPageLayout} from '../components/viewPage'
import Runner from '../components/runner'

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
