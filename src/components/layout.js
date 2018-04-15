import Head from 'next/head'
import Navbar from './navbar'
import Spacer from './spacer'
import Footer from './footer'
import { Container } from 'semantic-ui-react'

// This component provides the page layout common to most pages in the app,
// including content of the <head> of the document, the navigation bar, and the footer.

// Note that the `title` prop is absolutely required, otherwise you'll see errors like this:
// head-manager.js?0f2a390:75 Uncaught (in promise) TypeError: Cannot read property 'join' of undefined at HeadManager.updateTitle

// Sticky footer technique inspired by:
// https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/
export default ({ children, title, user, hideNav }) => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' href='/static/semantic/dist/semantic.min.css' />
      <link rel='stylesheet' href='/static/codemirror/codemirror.min.css' />
      <link rel='stylesheet' href='/static/codemirror/inlet.css' />
      <link rel='shortcut icon' href='/static/images/favicon.ico' />
    </Head>
    <Container style={{ flex: 1 }}>
      { hideNav ? <Spacer /> : <Navbar user={user} /> }
      { children }
    </Container>
    <Footer />
  </div>
)
