import {
  Container,
  Header,
  Card,
  Image,
  Icon,
  Grid,
  List,
  Input,
  Button,
  Checkbox,
  Form,
  Menu
} from 'semantic-ui-react'
import { PrivatePage } from 'next-github-auth'
import Layout from '../components/layout'
import Link from 'next/link'
import NavbarSecret from '../components/navbarSecret'

export default PrivatePage(() => (
  <Layout NavbarComponent={NavbarSecret}>
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <Header as='h2'>Account</Header>
          <Form>
            <Form.Field>
              <label>Email</label>
              <input placeholder='Email' />
            </Form.Field>
            <Form.Field>
              <label>First Name</label>
              <input placeholder='First Name' />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder='Last Name' />
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <input placeholder='Username' />
            </Form.Field>
            <Button>Save Changes</Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Header as='h2'>Plan</Header>
          <p>Your plan is currently <strong>free</strong>.</p>
          <Link href='/pricing'>
            <Button primary>Upgrade to Paid Plan</Button>
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Layout>
))
