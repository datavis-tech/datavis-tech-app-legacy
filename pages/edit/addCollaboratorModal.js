import React from 'react'
import {
  Button,
  Modal,
  Header,
  Icon,
  Form
} from 'semantic-ui-react'

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
    this.addCollaborator = () => {
      this.setState({
        loading: true // Signals the button to show as disabled with spinner.
      })
      this.close()
      this.props.addCollaborator(this.usernameInput.value)
    }
  }

  render () {
    const {
      open,
      close,
      deleteDocument,
      props: { title },
      state: { loading, show }
    } = this

    return (
      <div>
        <Button primary onClick={open} disabled={loading} loading={loading} >
          Add Collaborator
        </Button>
        <Modal open={show} onClose={close} size='small'>
          <Header content='Add Collaborator' />
          <Modal.Content>
            <p>Collaborators can edit the document.</p>
            <Form>
              <Form.Field>
                <label>Collaborator Username</label>
                <input
                  placeholder='Enter the user name of the collaborator.'
                  ref={(el) => { this.usernameInput = el }}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={close}>
              <Icon name='remove' />Cancel
            </Button>
            <Button primary onClick={this.addCollaborator}>
              <Icon name='checkmark' />Add Collaborator
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
