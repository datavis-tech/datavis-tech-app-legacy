import React from 'react'
import { List, Button } from 'semantic-ui-react'
import createProfileQuery from '../../db/createProfileQuery'
import AvatarLink from '../../components/avatarLink'

// This component represents a single item that appears in the
// list of collaborators
class CollaboratorListItem extends React.Component {

  constructor (props) {
    super(props)
    this.state = { profile: null }
    this.queries = []
  }

  componentDidMount () {
    const id = this.props.id
    this.profileQuery = createProfileQuery({ id }, (profile) => {
      this.setState({ profile })
    })
  }

  componentWillUnmount () {
    if (this.profileQuery) {
      this.profileQuery.destroy()
    }
  }

  render () {
    return this.state.profile ? (
      <List.Item>
        <AvatarLink user={this.state.profile} />
        <List.Content floated='right'>
          <Button onClick={this.props.remove}>Remove</Button>
        </List.Content>
      </List.Item>
    ) : null
  }
}

export default CollaboratorListItem
