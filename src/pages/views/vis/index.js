import React from 'react'
import Page from '../../../components/page'
import Fork from '../../../components/fork'
import createViewPage from '../viewPageComponentFactory'
import VisViewPageContent from './content'

const VisViewPage = createViewPage(
  ({id, user, doc, onError}) => (
    <Fork user={user} doc={doc} onError={onError}>
      {
        ({onFork}) => <VisViewPageContent id={id} doc={doc} onFork={onFork} />
      }
    </Fork>
  )
)

class ViewPage extends React.Component {

  static async getInitialProps (pageContext) {

    const props = await VisViewPage.getInitialProps(pageContext)

    let unfurlMeta = null

    if (!process.browser) {

      require('isomorphic-fetch')

      // This request is to server itself, loopback
      /* global fetch:false */
      const response = await fetch(`http://localhost:3000/oembed?url=http://datavis.tech/vis/${props.id}`)
      const oembed = await response.json()

      unfurlMeta = {
        id: props.id,
        title: oembed.title,
        description: oembed.description,
        thumbnail: oembed.thumbnail_url
      }

    }

    return { ...props, unfurlMeta }
  }

  render () {
    return <VisViewPage {...this.props} />
  }

}

export default Page(ViewPage)
