import Link from 'next/link'
import { Image, Menu } from 'semantic-ui-react'
import LoginControl from './loginControl'

const CreateButton = ({user}) => {
  if (user) {
    return (
      <Menu.Item position='right' name='create'>
        <Link href='/create'>
          <a>Create</a>
        </Link>
      </Menu.Item>
    )
  }
  return null
}

// This component provides the navigation bar on the top of most pages,
// which includes the logo, create button, and login control.
const Navbar = ({user}) => (
  <Menu secondary>
    <Link href='/'>
      <Menu.Item header fitted>
        <Image height='36px' verticalAlign='middle' src='/static/images/Logo_Nav.png' />
      </Menu.Item>
    </Link>
    <CreateButton user={user} />
    <Menu.Item position='right'>
      <LoginControl user={user} />
    </Menu.Item>
  </Menu>
)

export default Navbar
