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
import Subscription from '../../components/subscription'
import DeleteConfirmModal from './deleteConfirmModal'
import References from './references'
import Collaborators from './collaborators'
import DocTypeEditor from './docTypeEditor'
import Loader from '../../components/loader'
import Runner from '../../components/runner/runner'
import VisSubscription from '../../db/subscriptions/visSubscription'
import {title, type, id} from '../../db/accessors.js'

// TODO move this into src/constants, and do the same for DATA_DOC_TYPE
const VIS_DOC_TYPE = 'vis'

const PreviewField = ({doc, referenceDocs}) => {
  if (type(doc) === VIS_DOC_TYPE) {
    return (
      <Form.Field>
        <label>Preview</label>
        <Runner doc={doc} referenceDocs={referenceDocs} />
      </Form.Field>
    )
  }

  return null
}

const ReferencesField = ({doc}) => {
  if (type(doc) === VIS_DOC_TYPE) {
    return [
      <Form.Field key='references-label'>
        <label>References</label>
      </Form.Field>,
      <Form.Field key='references' inline>
        <References doc={doc} />
      </Form.Field>
    ]
  }

  return null
}

// The Form in the body of the page.
const Body = ({doc, referenceDocs, deleteDocument}) => (
  <Form>
    <Form.Field>
      <label>Title</label>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={12}>
            <StringBinding
              type='input'
              doc={doc}
              path={['title']}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Link route={type(doc)} params={{id: id(doc)}}>
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
        doc={doc}
        path={['description']}
      />
    </Form.Field>
    <Form.Field>
      <label>Document Type</label>
      <DocTypeEditor doc={doc} />
    </Form.Field>
    <PreviewField doc={doc} referenceDocs={referenceDocs} />
    <Form.Field>
      <label>Content</label>
      <CodeMirrorBinding
        doc={doc}
        path={['content']}
      />
    </Form.Field>
    <ReferencesField doc={doc} />
    <Form.Field>
      <label>Collaborators</label>
    </Form.Field>
    <Form.Field inline>
      <Collaborators doc={doc} />
    </Form.Field>
    <Form.Field>
      <DeleteConfirmModal
        deleteDocument={deleteDocument}
        title={title(doc)}
      />
    </Form.Field>
  </Form>
)

const ErrorMessage = ({error}) => {
  if (error) {
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
        <p>{error}</p>
      </Message>
    )
  }

  return null
}

class EditPage extends React.Component {
  static async getInitialProps ({query}) {
    return {
      id: query.id
    }
  }

  // This gets called after the user clicks through the delete confirm modal.
  deleteDocument (doc) {
    if (doc) {
      // TODO refactor this into an action under src/db/actions
      doc.del((err) => {
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

  render () {

    const {id, user} = this.props

    return (
      <Subscription subscription={VisSubscription()} parameters={{id}}>
        {
          ({data, isReady, error}) => {
            const {
              doc,
              // TODO refactor subscription to optionally omit profile - not necessary here!
              referenceDocs
            } = data || {} // data might be null

            return (
              <Loader ready={isReady}>
                <Layout
                  title={(title(doc) || 'Loading...') + ' (editing) | Datavis.tech'}
                  user={user}
                  includeCSS='/static/codemirror/codemirror.min.css'
                >
                  <Body
                    doc={doc}
                    referenceDocs={referenceDocs}
                    deleteDocument={() => this.deleteDocument(doc)}
                  />
                  <ErrorMessage error={error} />
                </Layout>
              </Loader>
            )
          }
        }
      </Subscription>
    )
  }
}

export default Page(EditPage)
