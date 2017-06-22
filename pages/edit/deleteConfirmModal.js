import {
  Button,
  Modal,
  Header,
  Icon
} from 'semantic-ui-react'

export default class DeleteConfirmModal extends React.Component {
  constructor (props) {
    super(props)

    // Initialize the modal to not show.
    this.state = {
      show: false
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

    // Actually delete the document, after user clicks through modal.
    this.deleteDocument = () => {
      this.close()
      this.props.deleteDocument()
    }
  }

  render () {
    return (
      <div>
        <Button negative onClick={this.open}>Delete</Button>
        <Modal open={this.state.show} onClose={this.close} basic size='small'>
          <Header icon='trash' content='Are you sure?' />
          <Modal.Content>
            <p>Are you sure you want to delete this document? This cannot be undone.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic inverted onClick={this.close}>
              <Icon name='remove' /> No
            </Button>
            <Button color='red' onClick={this.deleteDocument} inverted>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
