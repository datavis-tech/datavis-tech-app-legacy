import React from 'react'
import { List } from 'semantic-ui-react'
import AddCollaboratorModal from './addCollaboratorModal'
import CollaboratorListItem from './collaboratorListItem'
import { collaborators, id } from '../../db/accessors'

class Collaborators extends React.Component {

  constructor (props) {
    super(props)
    const doc = this.props.doc

    this.state = {
      collaborators: collaborators(doc)
    }

    const updateState = () => {
      this.setState({
        collaborators: collaborators(doc)
      })
    }

    // TODO only call updateState if the op may have changed the "collaborators" array.
    doc.on('op', updateState)
  }


  // When the user clicks the "Remove" button,
  // remove the clicked element from the array.
  // TODO refactor this into an "action"
  removeCollaborator (index) {
    const doc = this.props.doc
    doc.submitOp([{
      p: ['collaborators', index],
      ld: collaborators(doc)[index]
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
                id={id(collaborator)}
                remove={() => this.removeCollaborator(i)}
              />
            ))
          }
        </List>
        <AddCollaboratorModal doc={this.props.doc}/>
      </div>
    )
  }
}

export default Collaborators
