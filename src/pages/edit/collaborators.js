import React from 'react'
import { List, Button } from 'semantic-ui-react'
import Subscription from '../../components/subscription'
import ProfileSubscriptions from '../../db/subscriptions/profileSubscriptions'
import AvatarLink from '../../components/avatarLink'
import { profile } from '../../db/accessors'

export default class Collaborators extends React.Component {

  constructor (props) {
    super(props)
    this.subscription = ProfileSubscriptions({ids: this.props.ids})
  }

  componentWillReceiveProps ({ids}) {
    this.subscription = ProfileSubscriptions({ids})
  }

  render () {
    return (
      <React.Fragment>
        <Subscription
          key={this.props.ids.join()}
          subscription={this.subscription}
        >
          {
            ({data: profiles, isReady}) => (
              <List verticalAlign='middle'>
                {
                  this.renderCollaborators(profiles || [])
                }
              </List>
            )
          }
        </Subscription>
        <Button primary onClick={this.props.onCollaboratorAdd}>
          Add Collaborator
        </Button>
      </React.Fragment>
    )
  }

  renderCollaborators (profiles) {
    return (
      profiles.map((p, i) => (
        <List.Item key={p.id}>
          <AvatarLink user={profile(p)} />
          <List.Content floated='right'>
            <Button onClick={() => this.props.onCollaboratorRemove(i)}>Remove</Button>
          </List.Content>
        </List.Item>
      ))
    )
  }
}
