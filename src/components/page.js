// This module injects user data from the session into page props.
// For this to work correctly, every Nextjs Page must be wrapped
// by this, even if that page does not require access to user data.

// If rendered on the server, the user data is extracted from the session,
// passed to the browser, and stored globally in the browser
// for later use by other pages after client-side nagivations.
//
// Draws from https://github.com/possibilities/next-github-auth/blob/60317b64f639cfd400ab8c932583341653cdb042/src/decorators/PageDecoratorInvariant.js

import React from 'react'
import DocumentStore from '../stores/documentStore'

// This is a singleton variable on the browser side
// used for storing the user data from the server.
let globalUserData

let store
if (process.browser) {

  const createSocket = require('../stores/socket').default
  const socket = createSocket()

  const onDocumentAdded = added => added.forEach(d => socket.emit('subscribe', { id: d.id }))
  const onDocumentRemoved = removed => removed.forEach(d => socket.emit('unsubscribe', { id: d.id }))
  const onDocumentDiff = (id, diff) => socket.emit('change', id, diff)

  store = DocumentStore({ onDocumentAdded, onDocumentRemoved, onDocumentDiff })

  socket.on('change', store.applyDiffToDocument)
} else {
  store = DocumentStore(() => {})
}

export default Page => {
  class WrappedPage extends React.Component {
    static async getInitialProps (pageContext) {
      // Get data about the currently logged in user.
      const user = process.browser
        ? globalUserData
        : pageContext.req.user

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
      return <Page {...this.props} store={store} />
    }
  }

  return WrappedPage
}
