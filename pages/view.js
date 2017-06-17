import React from 'react'
import {
  Header,
  Grid,
  Button
} from 'semantic-ui-react'
import { Link } from '../routes'
import Page from '../components/page'
import Layout from '../components/layout'
import { subscribeToDocument } from '../modules/shareDBGateway'

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

        const updateState = () => {
          this.setState({
            docInitialized: true,
            title: doc.data.title,
            description: doc.data.description
          })
        }

        updateState()
        doc.on('op', updateState)
        this.doc = doc
      })
    }
  }

  componentWillUnmount () {
    if(this.doc){
      this.doc.destroy()
    }
  }

  render () {
    const { id, user } = this.props
    const { docInitialized, title, description } = this.state

    return (
      <Layout title={(title || 'Loading...') + ' | Datavis.tech'} user={user}>
        {docInitialized ? (
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
