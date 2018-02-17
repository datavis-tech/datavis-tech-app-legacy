import React from 'react'
import { Form, Grid, Button } from 'semantic-ui-react'
import { Link } from '../../routes'
import CodeMirrorBinding from '../../components/codeMirrorBinding'
import StringBinding from '../../components/stringBinding'
import { VIS_DOC_TYPE, DATA_DOC_TYPE, TECH_DOC_TYPE } from '../../constants'

const contentLabel = {
  [VIS_DOC_TYPE]: 'index.html',
  [DATA_DOC_TYPE]: 'Content',
  [TECH_DOC_TYPE]: 'Content'
}

// The Form in the body of the page.
export default (
  {document, __shareDbDoc, onPrivacyChange, ...slots}
) => (
  <Form>

    <Form.Field>
      <label>Title</label>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={12}>
            <StringBinding
              type='input'
              doc={__shareDbDoc}
              path={['title']}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Link route={document.type} params={{id: document.id}}>
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
        placeholder='Enter your description here (Markdown supported)'
        doc={__shareDbDoc}
        path={['description']}
      />
    </Form.Field>

    {
      // <Form.Field>
      //   <label>Document Privacy</label>
      //   <Form.Group inline>
      //     <Radio
      //       label='Public'
      //       name='docPrivacyEditorRadioGroup'
      //       value='public'
      //       checked={!document.isPrivate}
      //       onChange={() => onPrivacyChange(false)}
      //       data-test='privacy-public'
      //     />
      //     <Radio
      //       label='Private'
      //       name='docPrivacyEditorRadioGroup'
      //       value='private'
      //       checked={document.isPrivate}
      //       onChange={() => onPrivacyChange(true)}
      //       data-test='privacy-private'
      //     />
      //   </Form.Group>
      // </Form.Field>
    }

    {
      slots.Preview
        ? (
          <Form.Field>
            <label>Preview</label>
            { slots.Preview }
          </Form.Field>
        )
        : null
    }

    <Form.Field>
      <label>{contentLabel[document.type]}</label>
      <CodeMirrorBinding
        doc={__shareDbDoc}
        path={['content']}
      />
    </Form.Field>

    {
      slots.References
        ? (
          <Form.Field>
            <label>References</label>
            { slots.References }
          </Form.Field>
        )
        : null
    }

    <Form.Field inline>
      <label>Collaborators</label>
      { slots.Collaborators }
    </Form.Field>

  </Form>
)
