import React, { Component } from 'react'

export default function withShare(Component) {
  const WithShare = (props) => (
    <Component ...props connection={this.context.connection} />
  )
  WithShare.contextTypes = {
    connection: React.PropTypes.object
  }
  return WithShare
}
