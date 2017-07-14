import React from 'react'
import { Form } from 'semantic-ui-react'

class DocTypeEditor extends React.Component {

  constructor (props) {
    super(props)
    const doc = this.props.doc

    this.state = {
      docType: doc.data.type || 'vis'
    }

    const updateState = () => {
      this.setState({
        docType: doc.data.type || 'vis'
      })
    }

    // TODO only call updateState if the op may have changed the "type" value.
    doc.on('op', updateState)

    this.handleChange = (event, { value }) => {
      const doc = this.props.doc
      doc.submitOp([{
        p: ['type'],
        oi: value,
        od: doc.data.type
      }])
    }

  }

  render () {
    return (
      <Form.Group inline>
        <Form.Radio
          label='Visualization'
          name='docTypeEditorRadioGroup'
          value='vis'
          checked={this.state.docType === 'vis'}
          onChange={this.handleChange}
        />
        <Form.Radio
          label='Dataset'
          name='docTypeEditorRadioGroup'
          value='data'
          checked={this.state.docType === 'data'}
          onChange={this.handleChange}
        />
      </Form.Group>
    )
  }
}

export default DocTypeEditor
