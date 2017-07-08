import Link from 'next/link'
import { Image, Menu } from 'semantic-ui-react'
import LoginControl from './loginControl'

const Navbar = ({user}) => (
  <Menu secondary>
    <Link href='/'>
      <Menu.Item header fitted>
        <Image height='36px' verticalAlign='middle' src='/static/images/Logo_Nav.png' />
      </Menu.Item>
    </Link>
    <Link href='/create'>
      <Menu.Item position='right' name='create' />
    </Link>
    <Menu.Item position='right'>
      <LoginControl user={user} />
    </Menu.Item>
  </Menu>
)

export default Navbar
