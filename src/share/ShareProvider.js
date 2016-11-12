import React, { Component } from 'react'
import connect from './connect'
import methods from './methods'

const CONNECTING = 'CONNECTING'
const CONNECTED = 'CONNECTED'
const ERROR = 'ERROR'

const Error = ({url}) => (
  <div className="container">
    <div className="alert alert-danger m-t-1" role="alert">
      <div><strong>Error</strong></div>
      <div>There was an error connecting to the WebSocket server.</div>
      <div>Attempting to connect to <code>{url}</code></div>
      <span>Did you forget to start the WebSocket server using <code>npm run serve</code>?</span>
    </div>
  </div>
)

const Connecting = () => (
  <div className="container">
    <div className="alert alert-info m-t-1" role="alert">
      Connecting...
    </div>
  </div>
)

export default class ShareProvider extends Component {

  constructor() {
    super()

    this.state = {
      status: null
    }

    // Avoid rendering the Connecting screen if the connection happens quickly.
    setTimeout(() => {
      if(this.state.status === null){
        this.setState({
          status: CONNECTING
        })
      }
    }, 500)

    connect()
      .then((connection) => {
        this.share = methods(connection)
        this.setState({
          status: CONNECTED
        })
      }, (error) => {
        this.setState({
          status: ERROR,
          url: error.target.url
        })
      })

  }

  getChildContext() {
    return {
      share: this.share
    }
  }

  render (){
    switch(this.state.status){
      case CONNECTED:
        return this.props.children
      case CONNECTING:
        return <Connecting/>
      case ERROR:
        return <Error url={this.state.url}/>
      default:
        return null
    }
  }
}

ShareProvider.childContextTypes = {
  share: React.PropTypes.object
}
