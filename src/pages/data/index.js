import React from 'react'

import Page from '../../components/page'
import ViewPage from '../../components/viewPage/viewPage'
import DataPageContent from './dataPageContent'

class VisViewPage extends React.Component {

  // TODO refactor this into a common thing.
  // and make this the test for it:
  // it('should be able retrieve id from query', async () => {
  //   const id = Symbol('id')
  //   const props = await Component.getInitialProps({query: {id}})
  //   expect(props).toEqual({id})
  // })

  static async getInitialProps ({query}) {
    return {
      id: query.id
    }
  }

  render () {
    const {id, user} = this.props
    return <ViewPage id={id} user={user}>{DataPageContent}</ViewPage>
  }
}

export default Page(VisViewPage)
