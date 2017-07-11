/**
 * This component encapsulates codemirror-binding as a React component.
 * Derived from the original ShareDB textarea example found at
 * https://github.com/share/sharedb/blob/master/examples/textarea/client.js
 */

import React, { Component } from 'react'

// https://github.com/curran/codemirror-binding
import ShareDBCodeMirrorBinding from 'codemirror-binding'

export default class CodeMirrorBinding extends Component {

  componentDidMount () {
    if (process.browser) {
      const { doc, path } = this.props

      // Static import breaks the server, see https://github.com/codemirror/CodeMirror/issues/3701
      const CodeMirror = require('codemirror')

      const codeMirror = CodeMirror(this.el)
      this.binding = new ShareDBCodeMirrorBinding(codeMirror, doc, path)
      this.binding.setup()
    }
  }

  componentWillUnmount () {
    if (process.browser) {
      this.binding.destroy()
    }
  }

  render () {
    return <div ref={ el => this.el = el } />
  }
}
