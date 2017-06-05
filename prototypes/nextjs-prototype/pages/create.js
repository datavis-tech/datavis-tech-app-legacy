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
import Layout from '../components/layout'
import TitleEditField from '../components/formFieldTitle'
import DescriptionEditField from '../components/formFieldDescription'
import Link from 'next/link'
import NavbarSecret from '../components/navbarSecret'

const CreateForm = () => (
  <Form>
    <TitleEditField />
    <DescriptionEditField />
    <Link href='/edit'>
      <Button type='submit'>Create</Button>
    </Link>
  </Form>
)

export default PublicPage(() => (
  <Layout NavbarComponent={NavbarSecret}>
    <Header as='h2'>Create</Header>
    <CreateForm/>
  </Layout>
))
