import React from 'react'
import { Router } from '../../routes'
import Page from '../../components/page'
import { fork } from '../../db/actions'
import { id } from '../../db/accessors'
import { createViewPage } from '../../components/viewPage'
import DataPageContent from './dataPageContent'

class DataViewPage extends React.Component {

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
    return (
      <DataPageContent
        {...this.props}
        onFork={() => this.onFork(this.props.doc)}
      />
    )
  }
}

export default Page(createViewPage(DataViewPage))
