import React from 'react'
import { Button, Modal, Icon, Form } from 'semantic-ui-react'
import SearchReference from './searchReference'

export default class AddReferenceModal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      id: '',
      filename: ''
    }

    this.handleFilenameInput = ({target: {value}}) => this.setState({filename: value})
    this.handleReferenceSelect = id => this.setState({id})

    this.referenceSubmitted = () => this.props.onReferenceSubmit(this.state.filename, this.state.id)
  }

  componentWillReceiveProps ({show}) {
    if (show) {
      this.setState({
        id: '',
        filename: ''
      })
    }
  }

  render () {

    const { userId, show = false, onClose, ...rest } = this.props

    return (
      <Modal open={show} onClose={onClose} size='small' {...rest}>

        <Modal.Content>
          <Form onSubmit={this.referenceSubmitted}>
            <Form.Field>
              <label>Filename</label>
              <input
                placeholder='Type file name (local alias) here.'
                value={this.state.filename}
                onChange={this.handleFilenameInput}
              />
            </Form.Field>
            <Form.Field>
              <label>Document id</label>
              <SearchReference
                value={this.state.id}
                userId={userId}
                onReferenceSelect={this.handleReferenceSelect}
              />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button
            data-test='cancel'
            onClick={onClose}
          >
            <Icon name='remove' />Cancel
          </Button>
          <Button
            data-test='addReference'
            onClick={this.referenceSubmitted}
            primary
            disabled={this.isAddReferenceButtonDisabled}
          >
            <Icon name='checkmark' />Add Reference
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  get isAddReferenceButtonDisabled () {
    return !(this.state.id && this.state.filename)
  }
}
