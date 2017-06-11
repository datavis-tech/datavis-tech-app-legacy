import {
  Card,
  Image,
  Grid
} from 'semantic-ui-react'

export default ({ profile }) => (
  <Card>
    <Image src={profile._json.avatar_url} />
    <Card.Content>
      <Card.Header>{profile.displayName}</Card.Header>
      <Card.Meta>{profile.username}</Card.Meta>
    </Card.Content>
  </Card>
)
