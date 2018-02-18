// This defines the card element that contains the
// profile picture, display name, and username.
import { Image, Header } from 'semantic-ui-react'
import { avatarURL } from '../../db/accessors'

// TODO refactor to use accessors
export default ({ profile }) => (
  <div>
    <Image circular bordered size='small' src={avatarURL(profile)} />
    <div style={{marginTop: '0.5em'}}>
      <Header>
        <Header.Content>
          {profile.displayName}
          <Header.Subheader>
            {profile.username}
          </Header.Subheader>
        </Header.Content>
      </Header>
    </div>
  </div>
)
