/**
 * This component encapsulates sharedb-string-binding as a React component.
 * Derived from the original ShareDB textarea example found at
 * https://github.com/share/sharedb/blob/master/examples/textarea/client.js
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// https://github.com/share/sharedb-string-binding
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

    // Pass down all props to the child element
    // except the following properties.
    // These cause React errors when applied to native elements.
    delete props.type
    delete props.doc
    delete props.path

    return React.createElement( this.props.type, props)
  }
}
