import React from 'react'
import {
  Form,
  Grid,
  Button,
  Message
} from 'semantic-ui-react'
import { Link, Router } from '../../routes'
import Page from '../../components/page'
import Layout from '../../components/layout'
import StringBinding from '../../components/stringBinding'
import CodeMirrorBinding from '../../components/codeMirrorBinding'
import subscribeToDocument from '../../modules/db/subscribeToDocument'
import DeleteConfirmModal from './deleteConfirmModal'
import References from './references'
import Collaborators from './collaborators'
import DocTypeEditor from './docTypeEditor'
import Loading from '../../components/loading'

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
      subscribeToDocument(this.props.id, (err, doc) => {
        if (err) throw err

        // Store a reference to the document for later use.
        this.doc = doc

        // Updates the state based on changes in the ShareDB document.
        const updateState = () => {
          this.setState({
            docInitialized: true,
            title: doc.data.title,

            // TODO create a separate accessor that implements this logic.
            // Treat undefined type as 'vis' type.
            docType: doc.data.type || 'vis'
          })
        }

        // Shows errors to the user that originate from the server.
        // For example, when attempting to violate access control rules.
        const showError = (error) => {
          this.setState({
            errorMessage: error.message
          })
        }

        updateState()
        doc.on('op', updateState)
        doc.on('error', showError)

        this.cleanupDoc = () => {

          // TODO Change the strategy here, maybe don't destroy the doc.
          //   Think about the case of navigating from view to edit.
          //   Should the data really be thrown away and fetched again?
          doc.destroy()

          doc.removeListener('op', updateState)
          doc.removeListener('error', showError)
        }

      })
    }
  }

  // This gets called after the user clicks through the delete confirm modal.
  deleteDocument () {
    if (this.doc) {
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

  renderBody () {
    const { id } = this.props
    const { docInitialized, docType } = this.state

    if (!docInitialized) {
      return <Loading />
    }

    return (
      <Form>
        <Form.Field>
          <label>Title</label>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width={12}>
                <StringBinding
                  type='input'
                  doc={this.doc}
                  path={['title']}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Link route={docType} params={{ id }}>
                  <a>
                    <Button type='button' fluid>View</Button>
                  </a>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <StringBinding
            type='textarea'
            doc={this.doc}
            path={['description']}
          />
        </Form.Field>
        <Form.Field>
          <label>Document Type</label>
          <DocTypeEditor doc={this.doc} />
        </Form.Field>
        <Form.Field>
          <label>Content</label>
          <CodeMirrorBinding
            doc={this.doc}
            path={['content']}
          />
        </Form.Field>
        <Form.Field>
          <label>References</label>
        </Form.Field>
        <Form.Field inline>
          <References doc={this.doc} />
        </Form.Field>
        <Form.Field>
          <label>Collaborators</label>
        </Form.Field>
        <Form.Field inline>
          <Collaborators doc={this.doc} />
        </Form.Field>
        <Form.Field>
          <DeleteConfirmModal
            deleteDocument={this.deleteDocument.bind(this)}
            title={this.state.title}
          />
        </Form.Field>
      </Form>
    )
  }

  renderErrorMessage () {
    if (this.state.errorMessage) {
      return (
        <Message
          error
          style={{
            position: 'fixed',
            bottom: '0px',
            zIndex: 6 // Make this appear above CodeMirror editor.
          }}
        >
          <Message.Header>Error</Message.Header>
          <p>{this.state.errorMessage}</p>
        </Message>
      )
    }
  }

  render () {
    const { user } = this.props
    const { title } = this.state
    return (
      <Layout
        title={(title || 'Loading...') + ' (editing) | Datavis.tech'}
        user={user}
        includeCSS='/static/codemirror/codemirror.min.css'
      >
        { this.renderBody() }
        { this.renderErrorMessage() }
      </Layout>
    )
  }
}

export default Page(EditPage)
