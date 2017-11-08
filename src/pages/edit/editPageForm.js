import { Form, Grid, Button } from 'semantic-ui-react'
import { Link } from '../../routes'
import StringBinding from '../../components/stringBinding'
import CodeMirrorBinding from '../../components/codeMirrorBinding'
import DeleteConfirmModal from './deleteConfirmModal'
import Collaborators from './collaborators'
import DocTypeEditor from './docTypeEditor'
import PreviewField from './previewField'
import ReferencesField from './referencesField'
import { title, type, id } from '../../db/accessors.js'

// The Form in the body of the page.
export default ({doc, referenceDocs, deleteDocument}) => (
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
