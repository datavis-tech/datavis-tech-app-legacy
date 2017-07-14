import { Button } from 'semantic-ui-react'
import AvatarLink from './avatarLink'
import { AUTH_PATH_GITHUB, AUTH_PATH_LOGOUT } from '../modules/constants'

const LoginControl = ({ user }) => {
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
