import Link from 'next/link'
import { Button, Popup } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const LoginControl = (props, { github: { user } }) => {
  if(user){
    return (
      <Link href='sign-out'>
        <Button>Sign out</Button>
      </Link>
    )
  }
  return (
    <Link href='sign-in'>
      <Button>Sign in</Button>
    </Link>
  )
}

    //<Link href='sign-in'>
    //  <Popup
    //    trigger={
    //      <Button>Sign in</Button>
    //    }
    //    content='Sign in with your GitHub account'
    //    position='bottom right'
    //  />
    //</Link>

LoginControl.contextTypes = {
  github: PropTypes.shape({
    user: PropTypes.shape({
      login: PropTypes.string
    })
  })
}

export default LoginControl
