import { Image } from 'semantic-ui-react'
import { Link } from '../routes'
const AvatarLink = ({ user }) => {
  if (user) {
    const { username, displayName } = user
    const avatarURL = user._json.avatar_url + '&size=72'
    return (
      <Link route='profile' params={{ username }}>
        <a>
          <Image height={36} src={avatarURL} inline />
          <span>{displayName}</span>
        </a>
      </Link>
    )
  }
  return null
}
export default AvatarLink
