import Link from 'next/link'
import {
  Button,
  Image,
  Menu,
  Icon,
  Message
} from 'semantic-ui-react'
import LoginControl from '../components/loginControl'

const Navbar = () => (
  <div>
    <Menu secondary>
      <Link href='/'>
        <Menu.Item header fitted>
          <Image height='36px' verticalAlign='middle' src='/static/images/Logo_Nav.png'/>
        </Menu.Item>
      </Link>
      <Link href='/pricing'>
        <Menu.Item name='pricing'/>
      </Link>
      <Link href='/create'>
        <Menu.Item name='create'/>
      </Link>
      <Link href='/pad'>
        <Menu.Item name='Pad'/>
      </Link>
      <Link href='/profile'>
        <Menu.Item name='Profile'/>
      </Link>
      <Link href='/account'>
        <Menu.Item name='account'/>
      </Link>
      <Menu.Item position='right'>
        <LoginControl/>
      </Menu.Item>
    </Menu>

    <Message warning>
      <Icon name='warning' />
      You're viewing the alpha version of Datavis.tech. <a href='https://docs.google.com/forms/d/e/1FAIpQLSdO1wEo1Kj2ETfQMEhXGW6GIqtGFsfZ5UBwTnR-0QNvOYCEAw/viewform?usp=sf_link'>
        Get notified when we launch for real!
      </a>

    </Message>
  </div>
)

export default Navbar
