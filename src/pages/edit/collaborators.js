import React from 'react'
import { Form, List } from 'semantic-ui-react'
import Modal from './../../components/modal'
import AutoCompleter from './../../components/autoCompleter'
import CollaboratorListItem from './collaboratorListItem'

import userRenderer from '../../components/autoCompleter/renderer/userRenderer'
import createUsersQuery from '../../db/fetch/usersByUsername'

class Collaborators extends React.Component {

  constructor (props) {
    super(props)
    const doc = this.props.doc

    this.state = {
      collaborators: doc.data.collaborators || []
    }

    const updateState = () => {
      this.setState({
        collaborators: doc.data.collaborators || []
      })
    }

    // TODO only call updateState if the op may have changed the "collaborators" array.
    doc.on('op', updateState)

    this.addCollaborator = this.addCollaborator.bind(this)
    this.onInput = this.onInput.bind(this)
  }

  // This gets invoked when the user clicks the "Add" button.
  addCollaborator (data) {
    console.log('YEAH')
    if (!data.collaborator) {
      return
    }

    const doc = this.props.doc

    // If collaborators is undefined, then create an empty array.
    if (!doc.data.collaborators) {
      doc.submitOp([{
        p: ['collaborators'],
        oi: []
      }])
    }

    // Push an empty reference object onto the collaborators array.
    doc.submitOp([{
      p: ['collaborators', doc.data.collaborators.length],
      li: data.collaborator.id
    }])

  }

  // When the user clicks the "Remove" button,
  // remove the clicked element from the array.
  removeCollaborator (index) {
    this.props.doc.submitOp([{
      p: ['collaborators', index],
      ld: this.props.doc.data.collaborators[index]
    }])
  }

  onInput({field, result}) {
    console.log('DATA', field, result)
    /*this.setState({
      data: Object.assign(this.state.data, {
        [field]: result
      })
    })*/
  }

  render () {
    return (
      <div>
        <List verticalAlign='middle'>
          {
            this.state.collaborators.map((collaborator, i) => (
              <CollaboratorListItem
                key={i}
                id={collaborator.id}
                remove={() => this.removeCollaborator(i)}
              />
            ))
          }
        </List>
        <Modal title='Add Collaborator' onSubmit={this.addCollaborator} onInput={this.onInput} >
          {
            onInput => (
              <Form>
                <AutoCompleter 
                  field='collaborator' 
                  label='Username' 
                  resultRenderer={userRenderer} 
                  resultSource={createUsersQuery()} 
                  onInput={onInput}
                />
              </Form>
            )
          }
        </Modal>
      </div>
    )
  }
}

export default Collaborators
