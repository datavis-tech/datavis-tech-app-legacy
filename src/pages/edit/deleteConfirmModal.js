import React from 'react'
import { Button, Modal, Header, Icon } from 'semantic-ui-react'

export default ({show, title, onClose, onDelete}) => (
  <Modal open={show} onClose={onClose} basic size='small'>
    <Header icon='trash' content='Are you sure?' />
    <Modal.Content>
      <p>Are you sure you want to permanently delete "{title}"?</p>
      <p>This action cannot be undone.</p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic inverted onClick={onClose}>
        <Icon name='remove' /> No, don't delete it
      </Button>
      <Button color='red' onClick={onDelete} inverted>
        <Icon name='checkmark' /> Yes, delete it
      </Button>
    </Modal.Actions>
  </Modal>
)
