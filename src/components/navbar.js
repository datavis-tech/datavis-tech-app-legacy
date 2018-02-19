import { Link } from '../routes'
import { Image, Menu } from 'semantic-ui-react'
import LoginControl from './loginControl'
import { CreateMenu } from './createMenu'

// This component provides the navigation bar on the top of most pages,
// which includes the logo, create button, and login control.
const Navbar = ({user}) => (
  <Menu secondary>
    <Menu.Item>
      <Link route='/'>
        <a>
          <Image height='36px' src='/static/images/Logo_Nav.png' />
        </a>
      </Link>
    </Menu.Item>
    <Menu.Menu position='right'>
      <CreateMenu user={user} />
      <LoginControl user={user} />
    </Menu.Menu>
  </Menu>
)

export default Navbar
