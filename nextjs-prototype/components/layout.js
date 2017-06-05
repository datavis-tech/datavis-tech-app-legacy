import Head from 'next/head'
import {
  Container,
  Header,
  Input,
  Button,
  Checkbox,
  Form,
  Menu
} from 'semantic-ui-react'
import Navbar from '../components/navbar'

export default ({ children, NavbarComponent = Navbar }) => (
  <div>
    <Head>
      <title>Datavis.tech</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' href='/static/semantic/dist/semantic.min.css'></link>
      <link rel='shortcut icon' href='/static/images/favicon.ico' />
    </Head>
    <Container text>
      { NavbarComponent ? <NavbarComponent/> : null }
      { children }
    </Container>
  </div>
)
