import React from 'react'
import {
  Form,
  Grid,
  Button,
  Container
} from 'semantic-ui-react'
import { Link, Router } from '../../routes'
import ShareDBStringBinding from 'sharedb-string-binding'
import Page from '../../components/page'
import Layout from '../../components/layout'
import { subscribeToDocument } from '../../modules/shareDBGateway'
import StringBinding from '../../components/stringBinding'
import DeleteConfirmModal from './deleteConfirmModal'
import References from './references'

class EditPage extends React.Component {
  static async getInitialProps ({ query }) {
    return { id: query.id }
  }

  constructor (props) {
    super(props)
    this.state = {
      docInitialized: false,
      deleting: false
    }
  }

  componentDidMount () {
    if (process.browser) {
      subscribeToDocument(this.props.id, (err, doc) => {
        if (err) throw err

        // Store a reference to the document for later use.
        this.doc = doc

        const updateState = () => {
          this.setState({
            docInitialized: true,
            title: doc.data.title
          })
        }

        updateState()
        doc.on('op', updateState)

        this.cleanupDoc = () => {
          doc.destroy()
          doc.removeListener('op', updateState)
        }

      })
    }
  }

  // This gets called after the user clicks through the delete confirm modal.
  deleteDocument () {
    if (this.doc) {
      this.setState({
        deleting: true
      })

      this.doc.del((err) => {
        if (err) {
          return console.error(err)
        }

        Router.pushRoute('profile', {
          username: this.props.user.username
        })
      })
    } else {
      console.error('Attempted delete before document was initialized. This should never happen.')
    }
  }

  componentWillUnmount () {
    if (this.cleanupDoc) {
      this.cleanupDoc()
    }
  }

  render () {
    const { id, user } = this.props
    const { title } = this.state
    const loading = !this.state.docInitialized

    return (
      <Layout title={(title || 'Loading...') + ' (editing) | Datavis.tech'} user={user}>
        <Container text>
        {
          loading ? (
            <span>Loading...</span>
          ) : (
            <Form>
              <Form.Field>
                <label>Title</label>
                <Grid columns={2} divided>
                  <Grid.Row>
                    <Grid.Column width={12}>
                      <StringBinding type='input' doc={this.doc} path={['title']} />
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Link route='view' params={{ id }}>
                        <a>
                          <Button fluid>View</Button>
                        </a>
                      </Link>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <StringBinding type='input' doc={this.doc} path={['description']} />
              </Form.Field>
              <Form.Field>
                <label>Content</label>
                <StringBinding type='textarea' doc={this.doc} path={['content']} />
              </Form.Field>
              <Form.Field>
                <label>References</label>
              </Form.Field>
              <Form.Field inline>
                <References/>
              </Form.Field>
              <Form.Field>
                <DeleteConfirmModal
                  deleteDocument={this.deleteDocument.bind(this)}
                  deleting={this.state.deleting}
                />
              </Form.Field>
            </Form>
          )
        }
        </Container>
      </Layout>
    )
  }
}

export default Page(EditPage)
