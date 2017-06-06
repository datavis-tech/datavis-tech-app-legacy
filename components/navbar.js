import Link from 'next/link'
import { Image, Menu } from 'semantic-ui-react'

const LoginControl = <div>Login</div>

const Navbar = () => (
  <div>
    <Menu secondary>
      <Link href='/'>
        <Menu.Item header fitted>
          <Image height='36px' verticalAlign='middle' src='/static/images/Logo_Nav.png'/>
        </Menu.Item>
      </Link>
      <Menu.Item position='right'>
        {LoginControl}
      </Menu.Item>
    </Menu>
  </div>
)

export default Navbar
