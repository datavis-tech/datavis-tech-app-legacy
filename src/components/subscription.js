import React from 'react'

export default class Subscription extends React.Component {

  constructor (props) {
    super(props)
    this.state = {docs: []}
  }

  componentDidMount () {

    if (process.browser) {

      const {subscription, parameters} = this.props
      subscription.init(
        parameters,
        {
          onUpdate: (docs) => this.setState({docs})
        }
      )

    }
  }

  componentWillUnmount () {
    this.props.subscription.tearDown()
  }

  render () {
    return this.props.children({docs: this.state.docs})
  }
}
