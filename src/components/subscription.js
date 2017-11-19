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

      const {subscription, onUpdate} = this.props
      subscription.init(
        {
          onUpdate: data => {

            if (onUpdate) {
              onUpdate({data})
            }

            // possibly we might need more sophisticated method to define readiness
            this.setState({
              data,
              isReady: true
            })
          },
          onError: error => {
            this.setState({ error })
          }
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
