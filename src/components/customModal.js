import React from 'react'
import { Button, Modal, Header, Icon, Form, Message, Search, Label } from 'semantic-ui-react'

export default class CustomModal extends React.Component {

  constructor (props) {
    super(props)
  }
 
  //Initialize search filter with default as close
  componentWillMount() {
    this.setState({
      show: false,
      data: {},
      size: this.props.size || 'small'
    })
  }

  //open the modal
  open = (event) => {
    event.preventDefault() // Prevent form submission.
    this.setState({
      show: true
    })
  }

  // Close the modal
  close = () => {
    this.setState({
      show: false
    });
  }

  //Event to be attached with the childrens 
  //and will be called to update the selected records
  onSelect = ({field, result}) => {
    this.setState({
      data: Object.assign(this.state.data, {
        [field]: result
      })
    })
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.data);
  }

  render () {
    const {
      open,
      close,
      state: { show, size }
    } = this

    const { title, children } = this.props;
    
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        onSelect: this.onSelect
      })
    );

    return (
      <div>
        <Button primary onClick={open}>
          {title}
        </Button>
        <Modal open={show} onClose={close} size={size}>
          <Header content={title} />
          <Modal.Content>
            <Form>
              {childrenWithProps}
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={close}>
              <Icon name='remove' />Cancel
            </Button>
            <Button primary onClick={this.onSubmit} >
              <Icon name='checkmark' />{title}
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}