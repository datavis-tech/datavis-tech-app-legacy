import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal as BaseModal, Header, Icon } from 'semantic-ui-react'

export default class Modal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      show: false
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)

    this.submitHandler = this.submitHandler.bind(this)
  }

  // open the modal
  open (event) {
    this.setState({
      show: true
    })
  }

  // Close the modal
  close () {
    this.setState({
      show: false
    })
  }

  submitHandler () {
    const { onSubmit } = this.props

    if (onSubmit) {
      onSubmit()
    }

    // Closing the Modal Popup
    this.close()
  }

  render () {
    const {
      open,
      close,
      state: { show }
    } = this

    const { title, submitLabel, cancelLabel, children, onInput, size } = this.props

    return (
      <div>
        <Button primary onClick={open}>
          {title}
        </Button>
        <BaseModal open={show} onClose={close} size={size}>
          <Header content={title} />
          <BaseModal.Content>
            {children(onInput)}
          </BaseModal.Content>
          <BaseModal.Actions>
            <Button onClick={close}>
              <Icon name='remove' />{cancelLabel}
            </Button>
            <Button primary onClick={this.submitHandler} >
              <Icon name='checkmark' />{submitLabel || title}
            </Button>
          </BaseModal.Actions>
        </BaseModal>
      </div>
    )
  }
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  size: PropTypes.string,
  onSubmit: PropTypes.func,
  onInput: PropTypes.func,
  children: PropTypes.func
}

Modal.defaultProps = {
  size: 'small',
  cancelLabel: 'Cancel'
}
