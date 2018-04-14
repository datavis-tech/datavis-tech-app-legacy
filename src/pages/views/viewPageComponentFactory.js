import React from 'react'
import BaseViewPage from './baseViewPage'

const Unfurl = ({ unfurlMeta }) => (
  <React.Fragment>

    <link rel='alternate'
      type='application/json+oembed'
      href={`http://datavis.tech/oembed?url=http://datavis.tech/vis/${unfurlMeta.id}`}
      title={unfurlMeta.title}
    />

    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:site' value='@datavis_tech' />
    <meta name='twitter:title' value={unfurlMeta.title} />
    <meta name='twitter:description' value={unfurlMeta.description} />
    <meta name='twitter:image' content={unfurlMeta.thumbnail} />
  </React.Fragment>
)

export default (ContentComponent) => (
  class ViewPage extends React.Component {

    static async getInitialProps ({query}) {
      return {
        id: query.id
      }
    }

    render () {
      const { id, user, unfurlMeta } = this.props

      return (
        <BaseViewPage
          id={id}
          user={user}
          unfurl={unfurlMeta ? <Unfurl unfurlMeta={unfurlMeta} /> : null}
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
