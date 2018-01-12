// This defines the card element that contains the
// profile picture, display name, and username.
import { Card, Image } from 'semantic-ui-react'

// TODO refactor to use accessors
export default ({ profile }) => (
  <Card>
    <Image src={profile._json.avatar_url} />
    <Card.Content>
      <Card.Header>{profile.displayName}</Card.Header>
      <Card.Meta>{profile.username}</Card.Meta>
    </Card.Content>
  </Card>
)
