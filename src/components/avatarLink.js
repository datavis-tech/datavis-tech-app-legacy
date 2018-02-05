import { Link } from '../routes'
import Avatar from './avatar'

// This component represents a user using their avatar image,
// as well as their display name, which is a link to their profile.
const AvatarLink = ({ user }) => {
  if (user) {
    const { username, displayName } = user
    return (
      <Link route='profile' params={{ username }}>
        <a>
          <Avatar user={user} />
          <span style={{marginLeft: '4px'}}>{displayName}</span>
        </a>
      </Link>
    )
  }
  return null
}
export default AvatarLink
