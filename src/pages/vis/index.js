import React from 'react'

import Page from '../../components/page'
import ViewPage from '../../components/viewPage/viewPage'
import VisPageContent from './visPageContent'
import { fork } from '../../db/actions'

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

  onFork (doc) {
    const forkedDoc = fork(doc)
    console.log('original id ' + doc.id)
    console.log('forked id ' + forkedDoc.id)
  }

  render () {
    const {id, user} = this.props
    return (
      <ViewPage id={id}>
        {doc => (
          <VisPageContent
            id={id}
            user={user}
            doc={doc}
            onFork={() => this.onFork(doc)}
          />
        )}
      </ViewPage>
    )
  }
}

export default Page(VisViewPage)
