import Head from 'next/head'
import Navbar from './navbar'
import Spacer from './spacer'

// `title` is absolutely required, otherwise you'll see errors like this:
// head-manager.js?0f2a390:75 Uncaught (in promise) TypeError: Cannot read property 'join' of undefined at HeadManager.updateTitle
export default ({ children, title, user, hideNav }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' href='/static/semantic/dist/semantic.min.css' />
      <link rel='shortcut icon' href='/static/images/favicon.ico' />
    </Head>
    <div style={{ width: '960px', margin: 'auto' }}>
      { hideNav ? <Spacer /> : <Navbar user={user} /> }
      { children }
    </div>
  </div>
)
