import React from 'react'
import Page from '../../components/page'
import { createViewPage } from '../../components/viewPage'
import Fork from '../../components/fork'
import DataPageContent from './dataPageContent'

class DataViewPage extends React.Component {

  render () {
    const {id, user, doc} = this.props
    return (
      <Fork user={user} doc={doc}>
        {
          ({onFork}) => (
            <DataPageContent
              id={id}
              user={user}
              doc={doc}
              onFork={onFork}
            />
          )
        }
      </Fork>
    )
  }
}

export default Page(createViewPage(DataViewPage))
