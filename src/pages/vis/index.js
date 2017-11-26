import React from 'react'
import Page from '../../components/page'
import { createViewPage } from '../../components/viewPage'
import Fork from '../../components/fork'
import VisPageContent from './visPageContent'

class VisViewPage extends React.Component {

  render () {
    const {id, user, doc, onError} = this.props
    return (
      <Fork user={user} doc={doc} onError={onError}>
        {
          ({onFork}) => (
            <VisPageContent
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

export default Page(createViewPage(VisViewPage))
