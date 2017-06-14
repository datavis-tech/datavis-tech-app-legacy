import { Button, Image } from 'semantic-ui-react'
import { Link } from '../routes'
import { AUTH_PATH_GITHUB, AUTH_PATH_LOGOUT } from '../modules/constants'

const LoginControl = ({ user }) => {
  if (user) {
    const username = user.username
    const avatarURL = user._json.avatar_url

    return (
      <div>
        <span style={{paddingRight: '8px'}}>
          <Link route='profile' params={{ username }}>
            <a>
              <Image height={36} src={avatarURL + '&size=72'} inline/>
              <span>
                {username}
              </span>
            </a>
          </Link>
        </span>
        <a href={AUTH_PATH_LOGOUT}>
          <Button>Sign out</Button>
        </a>
      </div>
    )
  }
  return (
    <a href={AUTH_PATH_GITHUB}>
      <Button>Sign in</Button>
    </a>
  )
}

    // <Link href='sign-in'>
    //   <Popup
    //     trigger={
    //       <Button>Sign in</Button>
    //     }
    //     content='Sign in with your GitHub account'
    //     position='bottom right'
    //   />
    // </Link>

export default LoginControl
