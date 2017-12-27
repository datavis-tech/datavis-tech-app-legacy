import { Form } from 'semantic-ui-react'
import { type, content, references } from '../../../db/accessors.js'
import { serializeDocument } from '../../../db/serializers'
import { VIS_DOC_TYPE } from '../../../constants'
import Runner from '../../../components/runner/runner'

// This component defines the form field in the edit page
// where the running preview of a visualization is shown.
// TODO  lift accessors and serialization
export default ({doc, referenceDocs}) => {
  if (type(doc) === VIS_DOC_TYPE) {
    return (
      <Form.Field>
        <label>Preview</label>
        <Runner content={content(doc)} references={references(doc)} referenceDocuments={referenceDocs.map(serializeDocument)} />
      </Form.Field>
    )
  }

  return null
}
