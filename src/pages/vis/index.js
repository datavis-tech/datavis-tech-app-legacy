import React from 'react'

import Page from '../../components/page'
import ViewPage from '../../components/viewPage/viewPage'
import VisPageContent from './visPageContent'
import { fork } from '../../db/actions'
import { id } from '../../db/accessors'
import { Router } from '../../routes'

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
    // Fork the document to the current user's account.
    const owner = this.props.user.id
    const forkedDoc = fork(doc, owner)

    // Redirect to the edit page after creation.
    Router.pushRoute('edit', {
      id: id(forkedDoc)
    })
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
