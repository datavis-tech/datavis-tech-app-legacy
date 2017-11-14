import React from 'react'
import { List } from 'semantic-ui-react'
import AddCollaboratorModal from './addCollaboratorModal'
import CollaboratorListItem from './collaboratorListItem'
import { collaborators, id } from '../../db/accessors'
import { removeCollaborator } from '../../db/actions'

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
    // TODO remove this listener on component unmount
    doc.on('op', updateState)
  }

  render () {
    const doc = this.props.doc
    return (
      <div>
        <List verticalAlign='middle'>
          {
            this.state.collaborators.map((collaborator, i) => (
              <CollaboratorListItem
                key={i}
                id={id(collaborator)}
                remove={() => removeCollaborator(doc, i)}
              />
            ))
          }
        </List>
        <AddCollaboratorModal doc={doc}/>
      </div>
    )
  }
}

export default Collaborators
