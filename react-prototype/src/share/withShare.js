/**
 * A higher order component that extracts the methods
 * provided by ShareProvider from the React context
 * and passes them down to the child component as props.
 *
 * Inspired by withRouter from react-router
 */
import React from 'react'

const withShare = (Component) => {
  const WithShare = (props, context) => (
    <Component {...props} {...context.share} />
  )
  WithShare.contextTypes = {
    share: React.PropTypes.object
  }
  return WithShare
}

export default withShare
