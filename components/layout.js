import Head from 'next/head'
import { Container } from 'semantic-ui-react'
import Navbar from './navbar'

export default ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' href='/static/semantic/dist/semantic.min.css'/>
      <link rel='shortcut icon' href='/static/images/favicon.ico' />
    </Head>
    <Container text>
      <Navbar />
      { children }
    </Container>
  </div>
)
