import React from 'react'
import { List } from 'semantic-ui-react'
import AddCollaboratorModal from './addCollaboratorModal'
import CollaboratorListItem from './collaboratorListItem'

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
  addCollaborator (id) {
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
      li: { id }
    }])

  }

  // This gets invoked when the user clicks the "Remove" button.
  removeCollaborator (index) {
    const doc = this.props.doc

    // Remove the element from the array.
    doc.submitOp([{
      p: ['collaborators', index],
      ld: doc.data.collaborators[index]
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
        <AddCollaboratorModal addCollaborator={this.addCollaborator} />
      </div>
    )
  }
}

export default Collaborators
