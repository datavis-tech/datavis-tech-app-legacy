import React from 'react'
import Page from '../../../components/page'
import Fork from '../../../components/fork'
import createViewPage from '../viewPageComponentFactory'
import VisViewPageContent from './content'

class VisViewPage extends React.Component {

  render () {
    const {id, user, doc, metaDoc} = this.props
    return (
      <Fork user={user} doc={doc}>
        {
          ({onFork}) => <VisViewPageContent id={id} doc={doc} metaDoc={metaDoc} onFork={onFork} />
        }
      </Fork>
    )
  }
}

export default Page(createViewPage(VisViewPage))
