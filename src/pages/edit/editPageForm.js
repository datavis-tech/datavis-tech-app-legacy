import React from 'react'
import { Observer } from 'mobx-react'
import { Form, Grid, Button, Radio, Input, TextArea } from 'semantic-ui-react'
import { Link } from '../../routes'
import { VIS_DOC_TYPE, DATA_DOC_TYPE, TECH_DOC_TYPE } from '../../constants'
import CodeMirror from './codeMirror'
import { ReferencesInfo } from './referencesInfo'
import { CollaboratorsInfo } from './collaboratorsInfo'

const contentLabel = {
  [DATA_DOC_TYPE]:
        'Data Content (drag & drop text-based data file here, e.g. .csv)',
  [TECH_DOC_TYPE]: 'JavaScript'
}

// The Form in the body of the page.
export default ({
  document,
  allowPrivacySwitching,
  onPrivacyChange,
  onTitleChange,
  onDescriptionChange,
  ...slots
}) => (
  <Observer>
    {() => (
      <Form>
        <Form.Field>
          <label>Title</label>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width={12}>
                <Input
                  value={document.title}
                  onChange={onTitleChange}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Link
                  route={document.type}
                  params={{ id: document.id }}
                >
                  <a>
                    <Button type='button' fluid>
                                            View
                    </Button>
                  </a>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <TextArea
            placeholder='Enter your description here (Markdown supported)'
            value={document.description}
            onChange={onDescriptionChange}
          />
        </Form.Field>

        {allowPrivacySwitching ? (
          <Form.Field>
            <label>Privacy</label>
            <Form.Group style={{ margin: 0 }}>
              <Radio
                label='Public'
                name='docPrivacyEditorRadioGroup'
                value='public'
                checked={!document.isPrivate}
                onChange={() => onPrivacyChange(false)}
                style={{ paddingRight: '1em' }}
                data-test='privacy-public'
              />
              <Radio
                label='Private'
                name='docPrivacyEditorRadioGroup'
                value='private'
                checked={document.isPrivate}
                onChange={() => onPrivacyChange(true)}
                data-test='privacy-private'
              />
            </Form.Group>
          </Form.Field>
        ) : null}

        {slots.Preview ? (
          <Form.Field
            style={
              document.type === VIS_DOC_TYPE
                ? { marginBottom: '0px' }
                : {}
            }
          >
            <label>Preview</label>
            {slots.Preview}
          </Form.Field>
        ) : null}

        <Form.Field>
          {document.type in contentLabel ? (
            <label>{contentLabel[document.type]}</label>
          ) : null}
          <CodeMirror
            content={document.content}
            type={document.type}
          />
        </Form.Field>

        {slots.References ? (
          <Form.Field>
            <label>
                            References <ReferencesInfo />
            </label>
            {slots.References}
          </Form.Field>
        ) : null}

        <Form.Field inline>
          <label>
                        Collaborators <CollaboratorsInfo type={document.type} />
          </label>
          {slots.Collaborators}
        </Form.Field>
      </Form>
    )}
  </Observer>
)
