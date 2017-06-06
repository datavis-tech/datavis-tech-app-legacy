import { Button, Image } from 'semantic-ui-react'
import { AUTH_PATH_GITHUB, AUTH_PATH_LOGOUT } from '../server/authConstants'

const LoginControl = ({ user }) => {
  if (user) {
    return (
      <div>
        <span style={{paddingRight: '8px'}}>
          <Image src={user._json.avatar_url + '&size=36'} inline/>
          <span>{user.username}</span>
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
