import React from 'react'
import { List, Button, Image } from 'semantic-ui-react'
import createProfileQuery from '../../modules/db/createProfileQuery'

class CollaboratorListItem extends React.Component {
  static async getInitialProps ({ query }) {
    return {
      username: query.username
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      profile: null
    }

    this.queries = []
  }

  componentDidMount () {
    const id = this.props.id
    this.profileQuery = createProfileQuery({ id }, (profile) => {
      this.setState({
        profile,
        loading: false
      })
    })
  }

  componentWillUnmount () {
    if (this.profileQuery) {
      this.profileQuery.destroy()
    }
  }

  render () {
    const { remove } = this.props
    const { loading, profile } = this.state
    return profile ? (
      <List.Item>
        <List.Content floated='right'>
          <Button onClick={remove}>Remove</Button>
        </List.Content>
        <Image avatar src={profile._json.avatar_url} />
        <List.Content>
          {profile.displayName}
        </List.Content>
      </List.Item>
    ) : null
  }
}

export default CollaboratorListItem
