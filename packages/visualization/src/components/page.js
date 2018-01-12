// This module injects user data from the session into page props.
// For this to work correctly, every Nextjs Page must be wrapped
// by this, even if that page does not require access to user data.

// If rendered on the server, the user data is extracted from the session,
// passed to the browser, and stored globally in the browser
// for later use by other pages after client-side nagivations.
//
// Draws from https://github.com/possibilities/next-github-auth/blob/60317b64f639cfd400ab8c932583341653cdb042/src/decorators/PageDecoratorInvariant.js

import React from 'react'

// This is a singleton variable on the browser side
// used for storing the user data from the server.
let globalUserData

export default (Page) => {
  class WrappedPage extends React.Component {
    static async getInitialProps (pageContext) {
      // Get data about the currently logged in user.
      const user = process.browser ? globalUserData : pageContext.req.user

      // Support getInitialProps on the wrapped page.
      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps(pageContext)
        : {}

      return { ...pageProps, user }
    }

    constructor (props) {
      super(props)

      // In the case that this page was server-rendered,
      if (process.browser) {
        // store the user data from the server into this singleton variable
        // for use by other pages rendered on the client after a navigation.
        globalUserData = props.user
      }
    }

    render () {
      // TODO subscribe to the user as a ShareDB document,
      // and pass the ShareDB document down through children.
      return <Page {...this.props} />
    }
  }

  return WrappedPage
}
