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
import TitleEditField from '../components/formFieldTitle'
import DescriptionEditField from '../components/formFieldDescription'
import NavbarSecret from '../components/navbarSecret'

export default PublicPage(() => (
  <Layout NavbarComponent={NavbarSecret}>
    <Header as='h2'>Edit Visualization</Header>
    <Form>
      <TitleEditField />
      <DescriptionEditField />
      <Form.Field>
        <label>index.html</label>
        <textarea/>
      </Form.Field>
      <Form.Field>
        <label>Dependencies</label>
        <Input action='Add Dependency' placeholder='Search documents...' />
      </Form.Field>
      <Form.Field>
        <label>Collaborators</label>
        <Input action='Add Collaborator' placeholder='Search users...' />
      </Form.Field>
    </Form>
  </Layout>
))
