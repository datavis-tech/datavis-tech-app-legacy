// This component encapsulates sharedb-string-binding as a React component.
//
// Derived from the original ShareDB textarea example found at
// https://github.com/share/sharedb/blob/master/examples/textarea/client.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ShareDBStringBinding from 'sharedb-string-binding';

export default class StringBinding extends Component {

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this.refs.el)
    this.binding = new ShareDBStringBinding(el, this.props.doc, this.props.path)
    this.binding.setup()
  }

  componentWillUnmount() {
    this.binding.destroy()
  }

  render() {
    const props = Object.assign({ref: 'el'}, this.props)
    props.type = props.doc = props.path = undefined
    return React.createElement( this.props.type, props)
  }
}
