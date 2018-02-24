import React from 'react'
import { Button, Modal, Header, Icon, Form, Message } from 'semantic-ui-react'

// This component defines the modal dialog that pops up
// in the editor page when the user clicks "Add Collaborator".
export default class AddCollaboratorModal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {username: ''}
    this.handleUsernameInput = ({target: {value}}) => this.setState({username: value})
    this.collaboratorSubmitted = () => this.props.onCollaboratorSubmit(this.state.username)
  }

  render () {
    const {show = false, loading = false, notFound = false, onClose} = this.props

    return (
      <Modal open={show} onClose={onClose} size='small'>

        <Header content='Add Collaborator' />

        <Modal.Content>
          <Form onSubmit={this.collaboratorSubmitted}>
            <Form.Field>
              <label>Username</label>
              <input
                placeholder='Enter the user name of the collaborator.'
                value={this.state.username}
                onChange={this.handleUsernameInput}
              />
            </Form.Field>
          </Form>
          <div>
            {
              notFound
                ? <Message negative><Icon name='warning' />User not found.</Message>
                : null
            }
          </div>
        </Modal.Content>

        <Modal.Actions>
          <Button data-test='cancel' onClick={onClose}>
            <Icon name='remove' />Cancel
          </Button>
          <Button data-test='addCollaborator' primary onClick={this.collaboratorSubmitted} disabled={loading} loading={loading} >
            <Icon name='checkmark' />Add Collaborator
          </Button>
        </Modal.Actions>

      </Modal>
    )
  }

}
