import React from 'react'
import Page from '../../../components/page'
import Fork from '../../../components/fork'
import createViewPage from '../viewPageComponentFactory'
import DataViewPageContent from './content'

class DataViewPage extends React.Component {

  render () {
    const {id, user, doc, onError} = this.props
    return (
      <Fork user={user} doc={doc} onError={onError}>
        {
          ({onFork}) => <DataViewPageContent id={id} user={user || {}} doc={doc} onFork={onFork} />
        }
      </Fork>
    )
  }
}

export default Page(createViewPage(DataViewPage))
