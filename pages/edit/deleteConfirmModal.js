import React from 'react'
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
    const {
      open,
      close,
      deleteDocument,
      props: { deleting, title },
      state: { show }
    } = this

    return (
      <div>
        <Button negative onClick={open} disabled={deleting} loading={deleting} >
          Delete
        </Button>
        <Modal open={show} onClose={close} basic size='small'>
          <Header icon='trash' content='Are you sure?' />
          <Modal.Content>
            <p>Are you sure you want to permanently delete "{title}"?</p>
            <p>This action cannot be undone.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic inverted onClick={close}>
              <Icon name='remove' /> No, don't delete it
            </Button>
            <Button color='red' onClick={deleteDocument} inverted>
              <Icon name='checkmark' /> Yes, delete it
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
