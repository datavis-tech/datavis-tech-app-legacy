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
    const { doc, path } = this.props
    doc.subscribe((err) => {
      if (err) throw err;
      this.binding = new ShareDBStringBinding(el, doc, path)
      this.binding.setup()
    });
  }

  componentWillUnmount() {
    if(this.binding){
      this.binding.destroy()
    }
  }

  render() {
    return React.createElement( this.props.type, { ref: 'el' });
  }
}
