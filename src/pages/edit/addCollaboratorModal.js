import React from 'react'
import { Button, Modal, Header, Icon, Form, Message } from 'semantic-ui-react'
import createProfileQuery from '../../db/createProfileQuery'
import { addCollaborator } from '../../db/actions'

// This component defines the modal dialog that pops up
// in the editor page when the user clicks "Add Collaborator".
export default class AddCollaboratorModal extends React.Component {
  constructor (props) {
    super(props)

    // Initialize the modal to not show.
    this.state = {
      show: false,
      loading: false
    }

    // Open the modal.
    this.open = (event) => {
      event.preventDefault() // Prevent form submission.
      this.setState({
        show: true
      })
    }

    // Close the modal
    this.close = () => {
      this.setState({
        show: false
      })
    }

    // Add the given user as a collaborator.
    // Called when the user clicks "add collaborator" button.
    this.collaboratorSubmitted = () => {
      const username = this.usernameInput.value

      this.setState({
        loading: true
      })

      const profileQuery = createProfileQuery({ username }, (profile) => {
        if (profile) {
          addCollaborator(this.props.doc, profile.id)
          this.setState({
            loading: false,
            notFound: false,
            show: false
          })
        } else {
          this.setState({
            loading: false,
            notFound: true
          })
        }
        profileQuery.destroy()
      })

    }
  }

  render () {
    const {
      open,
      close,
      state: { loading, show }
    } = this

    return (
      <div>
        <Button primary onClick={open}>
          Add Collaborator
        </Button>
        <Modal open={show} onClose={close} size='small'>
          <Header content='Add Collaborator' />
          <Modal.Content>
            <Form onSubmit={this.collaboratorSubmitted}>
              <Form.Field>
                <label>Username</label>
                <input
                  placeholder='Enter the user name of the collaborator.'
                  ref={(el) => { this.usernameInput = el }}
                />
              </Form.Field>
            </Form>
            <div>
              {this.state.notFound ? (
                <Message negative>
                  <Icon name='warning' />
                  User not found.
                </Message>
              ) : null }
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={close}>
              <Icon name='remove' />Cancel
            </Button>
            <Button primary onClick={this.collaboratorSubmitted} disabled={loading} loading={loading} >
              <Icon name='checkmark' />Add Collaborator
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
// TODO think about putting this somewhere:
// <p>Collaborators can:</p>
// <ul>
//   <li>Edit all parts of the document</li>
//   <li>Add and remove collaborators</li>
//   <li>Delete the document.</li>
// </ul>
