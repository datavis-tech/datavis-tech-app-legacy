import { Button } from 'semantic-ui-react'
import AvatarLink from './avatarLink'
import { AUTH_PATH_LOGOUT } from '../constants'
import LoginButton from './loginButton'

// This component provides a either button that users can click to log in
// or an avatar link next to a button the user can click to log out.
export default ({ user }) => {
  if (user) {
    return (
      <div>
        <span style={{paddingRight: '8px'}}>
          <AvatarLink user={user} />
        </span>
        <a href={AUTH_PATH_LOGOUT}>
          <Button>Sign out</Button>
        </a>
      </div>
    )
  }
  return <LoginButton />
}
