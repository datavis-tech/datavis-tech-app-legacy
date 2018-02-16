import Head from 'next/head'
import Navbar from './navbar'
import Spacer from './spacer'
import { Container, Grid } from 'semantic-ui-react'
import { Link } from '../routes'

// This component provides the page layout common to most pages in the app,
// including content of the <head> of the document, the navigation bar, and the footer.

// Note that the `title` prop is absolutely required, otherwise you'll see errors like this:
// head-manager.js?0f2a390:75 Uncaught (in promise) TypeError: Cannot read property 'join' of undefined at HeadManager.updateTitle
export default ({ children, title, user, hideNav, hideFeedback }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' href='/static/semantic/dist/semantic.min.css' />
      <link rel='stylesheet' href='/static/codemirror/codemirror.min.css' />
      <link rel='shortcut icon' href='/static/images/favicon.ico' />
      <link rel='stylesheet' href='/static/codemirror/inlet.css' />
    </Head>
    <Container>
      { hideNav ? <Spacer /> : <Navbar user={user} /> }
      { children }
    </Container>
    {
      hideFeedback ? (
        null
      ) : (
        <div data-test='footer'>
          <Grid textAlign='center' style={{paddingTop: '40px'}}>
            <Grid.Column>
              <a href='https://github.com/datavis-tech/community/blob/master/README.md'>Community</a>
            </Grid.Column>
            <Grid.Column>
              <Link route='about'>
                <a>About</a>
              </Link>
            </Grid.Column>
          </Grid>
        </div>
      )
    }
  </div>
)
