import { Link } from '../routes'
import { Image, Menu, Dropdown } from 'semantic-ui-react'
import LoginControl from './loginControl'
import { VIS_DOC_TYPE, DATA_DOC_TYPE } from '../constants'

const CreateMenu = ({user}) => {
  if (user) {
    return (
      <Dropdown item text='Create'>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link route='create' params={{type: VIS_DOC_TYPE}}>
              <a>Visualization</a>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link route='create' params={{type: DATA_DOC_TYPE}}>
              <a>Dataset</a>
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
  return null
}

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
