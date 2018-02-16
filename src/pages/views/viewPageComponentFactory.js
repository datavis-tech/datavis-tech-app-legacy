import React from 'react'
import BaseViewPage from './baseViewPage'

export default (ContentComponent) => (
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
        >
          {({doc, onError}) => (
            <ContentComponent
              id={id}
              user={user}
              doc={doc}
              onError={onError}

            />
          )}
        </BaseViewPage>
      )
    }
  }

)
