import React from 'react'
import { Button, Modal, Header, Icon } from 'semantic-ui-react'

// TODO test
export default ({ show, onClose, onConfirm }) => {
  return (
    <Modal open={show} onClose={onClose}>
      <Header content='Downgrade' />
      <Modal.Content>
        <p>Are you sure want to downgrade to the free plan?</p>
        <p>Your private documents will be deleted after 30 days.</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>
          <Icon name='remove' />Cancel
        </Button>
        <Button primary onClick={() => { onConfirm(); onClose() }}>
          <Icon name='checkmark' />Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
