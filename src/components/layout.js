import Head from 'next/head'
import Navbar from './navbar'
import Spacer from './spacer'
import { Container, Grid } from 'semantic-ui-react'

// This component provides the page layout common to most pages in the app,
// including content of the <head> of the document, the navigation bar, and the footer.

// Note that the `title` prop is absolutely required, otherwise you'll see errors like this:
// head-manager.js?0f2a390:75 Uncaught (in promise) TypeError: Cannot read property 'join' of undefined at HeadManager.updateTitle
export default ({ children, title, user, hideNav, includeCSS, hideFeedback }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' href='/static/semantic/dist/semantic.min.css' />
      {
        // CSS in Next.js is a shit show, see https://github.com/zeit/next.js/issues/544
        // This solution causes FOUC for CodeMirror on client navigation.
        includeCSS ? (
          <link rel='stylesheet' href={includeCSS} />
        ) : null
      }
      <link rel='shortcut icon' href='/static/images/favicon.ico' />
    </Head>
    <Container>
      { hideNav ? <Spacer /> : <Navbar user={user} /> }
      { children }
      {
        hideFeedback ? (
          null
        ) : (
          <Grid textAlign='center'>
            <Grid.Column>
              <a href='https://github.com/datavis-tech/community/blob/master/README.md'>Community</a>
            </Grid.Column>
          </Grid>
        )
      }
    </Container>
  </div>
)
