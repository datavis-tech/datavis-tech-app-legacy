import { Image } from 'semantic-ui-react'
import { Link } from '../routes'

// This component represents a user using their avatar image,
// as well as their display name, which is a link to their profile.
const AvatarLink = ({ user }) => {
  if (user) {
    const { username, displayName } = user
    const avatarURL = user._json.avatar_url + '&size=72'
    return (
      <Link route='profile' params={{ username }}>
        <a>
          <Image
            height={36}
            // This can be used for testing a full square avatar image
            //src='https://avatars2.githubusercontent.com/u/156229?v=4&size=72'
            src={avatarURL}
            inline
          />
          <span style={{marginLeft:'4px'}}>{displayName}</span>
        </a>
      </Link>
    )
  }
  return null
}
export default AvatarLink
