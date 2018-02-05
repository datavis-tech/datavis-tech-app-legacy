import { Link } from '../routes'
import { Dropdown, Menu } from 'semantic-ui-react'
import Avatar from './avatar'
import { AUTH_PATH_LOGOUT } from '../constants'
import LoginButton from './loginButton'

// Wrapping the avatar in a div with text class
// causes the correct size of highlighted area in the menu on hover.
const trigger = user => (
  <div className='text'>
    <Avatar user={user} />
  </div>
)

// This component provides a either button that users can click to log in
// or an avatar link next to a button the user can click to log out.
export default ({ user }) => (
  user
    ? (
      <Dropdown item trigger={trigger(user)} >
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link route='profile' params={{username: user.username}}>
              <a>Profile</a>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link route='settings'>
              <a>Settings</a>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <a href={AUTH_PATH_LOGOUT}>Sign out</a>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
    : (
      <Menu.Item>
        <LoginButton />
      </Menu.Item>
    )
)
