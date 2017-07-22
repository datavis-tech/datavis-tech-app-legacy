import React from 'react'
import {
  Button,
  Modal,
  Header,
  Icon,
  Form,
  Message
} from 'semantic-ui-react'
import createProfileQuery from '../../modules/db/createProfileQuery'

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
    this.addCollaborator = () => {
      const username = this.usernameInput.value
      this.setState({
        loading: true
      })
      setTimeout(() => {
        const profileQuery = createProfileQuery({ username }, (profile) => {
          if (profile) {
            this.setState({
              loading: false,
              notFound: false,
              show: false
            })
            this.props.addCollaborator(profile.id)
          } else {
            this.setState({
              loading: false,
              notFound: true
            })
          }
          profileQuery.destroy()
        })
      }, 1000)
    }
  }

  render () {
    const {
      open,
      close,
      deleteDocument,
      props: { title },
      state: { loading, show, notFound }
    } = this

    return (
      <div>
        <Button primary onClick={open}>
          Add Collaborator
        </Button>
        <Modal open={show} onClose={close} size='small'>
          <Header content='Add Collaborator' />
          <Modal.Content>
            <Form>
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
            <Button primary onClick={this.addCollaborator} disabled={loading} loading={loading} >
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
