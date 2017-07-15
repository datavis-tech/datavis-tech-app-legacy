import { Button } from 'semantic-ui-react'
import { AUTH_PATH_GITHUB } from '../modules/constants'
const LoginButton = () => (
  <a href={AUTH_PATH_GITHUB}>
    <Button>Sign in</Button>
  </a>
)
export default LoginButton
