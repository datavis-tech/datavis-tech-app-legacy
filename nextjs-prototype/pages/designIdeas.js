import {
  Container,
  Header,
  Input,
  List,
  Button,
  Checkbox,
  Form,
  Segment,
  Label,
  Icon,
  Grid,
  Card,
  Image,
  Menu
} from 'semantic-ui-react'
import { PublicPage } from 'next-github-auth'
import Link from 'next/link'
import Layout from '../components/layout'
import NavbarSecret from '../components/navbarSecret'

export default PublicPage(() => (
  <Layout NavbarComponent={NavbarSecret}>
    <Segment>
      <Grid>
        <Grid.Column width={4}>
          <Icon name='signal' size='massive' />
        </Grid.Column>
        <Grid.Column width={12}>
          <Header as='h3'>Visualization Title</Header>
          <p>Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </Grid.Column>
      </Grid>
    </Segment>

    <Card.Group>
      <Card>
        <Icon name='signal' size='massive' />
        <Card.Content>
          <Card.Header>
            Visualization Title
          </Card.Header>
          <Card.Description>
            Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Card.Description>
        </Card.Content>
      </Card>
      <Card>
        <Icon name='signal' size='massive' />
        <Card.Content>
          <Card.Header>
            Visualization Title
          </Card.Header>
          <Card.Description>
            Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  </Layout>
))
