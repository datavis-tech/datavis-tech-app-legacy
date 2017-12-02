import React from 'react'
import Page from '../../../components/page'
import Fork from '../../../components/fork'
import createViewPage from '../viewPageComponentFactory'
import VisViewPageContent from './content'

class VisViewPage extends React.Component {

  render () {
    const {id, user, doc} = this.props
    return (
      <Fork user={user} doc={doc}>
        {
          ({onFork}) => <VisViewPageContent id={id} doc={doc} onFork={onFork} />
        }
      </Fork>
    )
  }
}

export default Page(createViewPage(VisViewPage))
