import React from 'react'
import { Button } from 'semantic-ui-react'

export default class ForkButton extends React.Component {

  constructor (props) {
    super(props)
    this.state = { forking: false }

    this.onForkFailed = () => {
      this.setState({ forking: false })
    }

    this.onClick = () => {
      this.setState({ forking: true })
      this.props.onFork(this.onForkFailed)
    }
  }

  render () {
    return (
      <Button
        onClick={this.onClick}
        style={{marginTop: '5px'}}
        fluid
        disabled={this.state.forking}
        loading={this.state.forking}
      >
        Fork
      </Button>
    )
  }
}
