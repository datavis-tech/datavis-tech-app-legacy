import React from 'react'
import BaseViewPage from './baseViewPage'

export default (ContentComponent, {includeCSS} = {}) => (
  class ViewPage extends React.Component {

    static async getInitialProps ({query}) {
      return {
        id: query.id
      }
    }

    render () {
      const {id, user} = this.props

      return (
        <BaseViewPage
          id={id}
          user={user}
          includeCSS={includeCSS}
        >
          {({doc, metaDoc, onError}) => (
            <ContentComponent
              id={id}
              user={user}
              doc={doc}
              metaDoc={metaDoc}
              onError={onError}
            />
          )}
        </BaseViewPage>
      )
    }
  }

)
