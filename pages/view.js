import React from 'react'
import {
  Header,
  Grid,
  Button
} from 'semantic-ui-react'
import { Link } from '../routes'
import { subscribeToDocument } from '../modules/shareDBGateway'
import Page from '../components/page'
import Layout from '../components/layout'
import Runner from '../components/runner'

class ViewPage extends React.Component {
  static async getInitialProps ({ query }) {
    return { id: query.id }
  }

  constructor (props) {
    super(props)
    this.state = {
      docInitialized: false
    }
    if (process.browser) {
      subscribeToDocument(this.props.id, (err, doc) => {
        if (err) throw err

        this.doc = doc

        const updateState = () => {
          this.setState({
            docInitialized: true,
            title: doc.data.title,
            description: doc.data.description
          })
        }

        updateState()

        // TODO only invoke updateState if changes affect title or description.
        doc.on('op', updateState)

        this.cleanupDoc = () => {
          doc.destroy()
          doc.removeListener('op', updateState)
        }
      })
    }
  }

  componentWillUnmount () {
    if (this.cleanupDoc) {
      this.cleanupDoc()
    }
  }

  render () {
    const { id, user } = this.props

    const {
      docInitialized,
      title,
      description
    } = this.state

    if (!docInitialized) {
      return <div>Loading...</div>
    }

    return (
      <Layout title={(title || 'Loading...') + ' | Datavis.tech'} user={user}>
        <div>
          <Header as='h1'>{title}</Header>
          <Runner doc={this.doc} />
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width={12}>
                <p>{description}</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <Link route='edit' params={{ id }}>
                  <a>
                    <Button fluid>Edit</Button>
                  </a>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Layout>
    )
  }
}

export default Page(ViewPage)
