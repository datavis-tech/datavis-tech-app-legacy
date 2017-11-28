import React from 'react'
import { Form } from 'semantic-ui-react'
import { isPrivate } from '../../../db/accessors'
import { setDocumentPrivacy } from '../../../db/actions'

class DocPrivacyEditor extends React.Component {

  constructor (props) {
    super(props)
    const doc = this.props.doc

    this.state = {
      isPrivate: isPrivate(doc)
    }

    const updateState = () => {
      this.setState({
        isPrivate: isPrivate(doc)
      })
    }

    // TODO only call updateState if the op may have changed the "type" value.
    doc.on('op', updateState)

    this.handleChange = (_, { value }) => setDocumentPrivacy(this.props.doc, value === 'private')

  }

  render () {
    return (
      <Form.Group inline>
        <Form.Radio
          label='Public'
          name='docPrivacyEditorRadioGroup'
          value='public'
          checked={!this.state.isPrivate}
          onChange={this.handleChange}
        />
        <Form.Radio
          label='Private'
          name='docPrivacyEditorRadioGroup'
          value='private'
          checked={this.state.isPrivate}
          onChange={this.handleChange}
        />
      </Form.Group>
    )
  }
}

export default DocPrivacyEditor
