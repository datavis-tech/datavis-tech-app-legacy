import {
  Container,
  Header,
  Input,
  Button,
  Checkbox,
  Form,
  Menu
} from 'semantic-ui-react'
import { PublicPage } from 'next-github-auth'
import Link from 'next/link'
import Layout from '../components/layout'
import NavbarSecret from '../components/navbarSecret'

export default PublicPage(() => (
  <Layout NavbarComponent={NavbarSecret}>
    <Header as='h1'>Collaborative Data Visualization Platform</Header>
    <p>Free for open work, <Link href='/pricing'>paid plans</Link> for closed work.</p>
    <Link href='/create'>
      <Button>Create Something!</Button>
    </Link>
  </Layout>
))
