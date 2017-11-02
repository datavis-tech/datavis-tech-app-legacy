import React from 'react'

export default class Subscription extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      data: null,
      isReady: false
    }
  }

  componentDidMount () {

    if (process.browser) {

      const {subscription, parameters} = this.props
      subscription.init(
        parameters,
        {
          onUpdate: (data) => this.setState({data, isReady: true}) // possibly we might need more sophisticated method to define readiness
        }
      )

    }
  }

  componentWillUnmount () {
    this.props.subscription.tearDown()
  }

  render () {
    return this.props.children(this.state)
  }
}
