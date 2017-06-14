import React from 'react'
import {
  Header,
  Grid,
  Button
} from 'semantic-ui-react'
import { Link } from '../routes'
import Page from '../components/page'
import Layout from '../components/layout'
import connection from '../modules/shareDBConnection'
import { DB_DOCUMENTS_COLLECTION } from '../modules/constants'

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
      // TODO clean up this doc on unmount
      const doc = connection.get(DB_DOCUMENTS_COLLECTION, props.id)

      const updateState = () => {
        this.setState({
          docInitialized: true,
          id: doc.id,
          title: doc.data.title,
          description: doc.data.description
        })
      }

      doc.subscribe((err) => {
        if (err) {
          return console.error(err)
        }
        updateState()
        doc.on('op', updateState)
      })
    }
  }

  render () {
    const { user } = this.props
    const { id, title, description } = this.state

    return (
      <Layout title={(title || 'Loading...') + ' | Datavis.tech'} user={user}>
        {this.state.docInitialized ? (
          <div>
            <Header as='h1'>{title}</Header>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column width={12}>
                  <p>{description}</p>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Link route='edit' params={{ id }}>
                    <Button fluid>Edit</Button>
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Layout>
    )
  }
}

export default Page(ViewPage)
