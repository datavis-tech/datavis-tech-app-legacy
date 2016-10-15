import React from 'react'

export default function withShare(Component) {
  const WithShare = (props, context) => (
    <Component {...props} {...context.share} />
  )
  WithShare.contextTypes = {
    share: React.PropTypes.object
  }
  return WithShare
}
