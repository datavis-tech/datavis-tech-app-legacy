import React from 'react'
import {
  Form,
  Grid,
  Button
} from 'semantic-ui-react'
import { Link } from '../routes'
import StringBinding from 'sharedb-string-binding'
import Page from '../components/page'
import Layout from '../components/layout'
import { subscribeToDocument } from '../modules/shareDBGateway'

class EditPage extends React.Component {
  static async getInitialProps ({ query }) {
    return { id: query.id }
  }

  constructor (props) {
    super(props)
    this.state = {
      docInitialized: false
    }
  }

  componentDidMount () {
    if (process.browser) {
      // TODO cleanup on unmount
      subscribeToDocument(this.props.id, (err, doc) => {
        if (err) throw err

        new StringBinding(this.titleInput, doc, ['title']).setup()
        new StringBinding(this.descriptionInput, doc, ['description']).setup()
        new StringBinding(this.contentInput, doc, ['content']).setup()

        const updateState = () => {
          this.setState({
            docInitialized: true,
            title: doc.data.title
          })
        }
        updateState()
        doc.on('op', updateState)
      })
    }
  }

  render () {
    const { id, user } = this.props
    const { title } = this.state

    return (
      <Layout title={(title || 'Loading...') + ' (editing) | Datavis.tech'} user={user}>
        <Form>
          <Form.Field>
            <label>Title</label>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column width={12}>
                  <input
                    placeholder={this.state.docInitialized ? '' : 'Loading...'}
                    ref={(el) => { this.titleInput = el }}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Link route='view' params={{ id }}>
                    <Button fluid>View</Button>
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <textarea
              placeholder={this.state.docInitialized ? '' : 'Loading...'}
              ref={(el) => { this.descriptionInput = el }}
            />
          </Form.Field>
          <Form.Field>
            <label>Content</label>
            <textarea
              placeholder={this.state.docInitialized ? '' : 'Loading...'}
              ref={(el) => { this.contentInput = el }}
            />
          </Form.Field>
        </Form>
      </Layout>
    )
  }
}

export default Page(EditPage)
