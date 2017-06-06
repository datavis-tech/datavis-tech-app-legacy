// This module injects user data from the session into page props.
// If server-rendered, the user data is stored globally
// for later use by other pages afer client-side nagivation.
//
// Draws from https://github.com/possibilities/next-github-auth/blob/60317b64f639cfd400ab8c932583341653cdb042/src/decorators/PageDecoratorInvariant.js

import React from 'react'
import GlobalClientStore from '../modules/globalClientStore'

export default (Page) => {
  class WrappedPage extends React.Component {

    static async getInitialProps (pageContext) {
      const user = process.browser ? GlobalClientStore.user : pageContext.req.user

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps(pageContext)
        : {}

      return { ...pageProps, user }
    }

    constructor (props) {
      super(props)
      if (process.browser) {
        GlobalClientStore.user = props.user
      }
    }

    render () {
      return <Page {...this.props} />
    }
  }

  return WrappedPage
}
