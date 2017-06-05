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
import { PublicPage } from 'next-github-auth'
import Layout from '../components/layout'
import NavbarSecret from '../components/navbarSecret'

const PreviewSmall = ({title, description, icon}) => (
  <List.Item>
    <List.Icon name={icon} size='large' verticalAlign='middle' />
    <List.Content>
      <List.Header as='a'>{title}</List.Header>
      <List.Description as='a'>{description}</List.Description>
    </List.Content>
  </List.Item>
)

export default PublicPage(() => (
  <Layout NavbarComponent={NavbarSecret}>
    <Grid>
      <Grid.Column width={6}>
        <Card>
          <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
          <Card.Content>
            <Card.Header>
              Full Name
            </Card.Header>
            <Card.Meta>
              username
            </Card.Meta>
          </Card.Content>
        </Card>
      </Grid.Column>
      <Grid.Column width={10}>
        <Header as='h3'>Visualizations</Header>
          <List divided relaxed>
            {
              [1, 3, 4, 5]
                .map(() => ({
                  title: 'Visualization Title',
                  description: 'Truncated description of the visualization...',
                  icon: 'bar chart'
                }))
                .map(PreviewSmall)
            }
          </List>
        <Header as='h3'>Datasets</Header>
          <List divided relaxed>
            {
              [1, 3, 4, 5]
                .map(() => ({
                  title: 'Dataset Title',
                  description: 'Truncated description of the dataset...',
                  icon: 'table'
                }))
                .map(PreviewSmall)
            }
          </List>
      </Grid.Column>
    </Grid>
  </Layout>
))
