import React from 'react'
import { Button } from 'semantic-ui-react'
import { AUTH_PATH_GITHUB } from '../modules/constants'

// This component provides a button that users can click to log in.
class LoginButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { loading: false }
    this.handleClick = () => {
      this.setState({ loading: true })
    }
  }

  render () {
    const { loading } = this.state
    return (
      <a href={AUTH_PATH_GITHUB}>
        <Button onClick={this.handleClick} disabled={loading} loading={loading}>
          Sign in
        </Button>
      </a>
    )
  }
}
export default LoginButton
