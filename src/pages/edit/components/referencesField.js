import { type } from '../../../db/accessors.js'
import { Form } from 'semantic-ui-react'
import References from './references'
import { VIS_DOC_TYPE } from '../../../constants'

// This component defines the field in the edit page form
// that contains the editable listing of references
// For example, this is where datasets can be referenced by visualizations.
export default ({doc}) => {
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
