import React from 'react'
import { List } from 'semantic-ui-react'
import CustomModal from './../../components/customModal'
import AutoCompleter from './../../components/autoCompleter'
import CollaboratorListItem from './collaboratorListItem'

import userRenderer from '../../components/autoCompleter/rendrer/userRenderer'
import createUsersQuery from '../../db/createUsersQuery'

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
  }

  // This gets invoked when the user clicks the "Add" button.
  addCollaborator (data) {
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
        <CustomModal title='Add Collaborator' onSubmit={this.addCollaborator} >
          <AutoCompleter field='collaborator' resultRendrer={userRenderer} resultSource={createUsersQuery} />
        </CustomModal>
      </div>
    )
  }
}

export default Collaborators
