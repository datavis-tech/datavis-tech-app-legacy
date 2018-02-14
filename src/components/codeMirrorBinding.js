/**
 * This component encapsulates codemirror-binding as a React component.
 * Derived from the original ShareDB textarea example found at
 * https://github.com/share/sharedb/blob/master/examples/textarea/client.js
 */

import React, { Component } from 'react'

// https://github.com/curran/codemirror-binding
import ShareDBCodeMirrorBinding from 'codemirror-binding'

// Use two spaces instead of tabs when indenting.
// From https://github.com/codemirror/CodeMirror/issues/988#issuecomment-14921785
function betterTab (cm) {
  if (cm.somethingSelected()) {
    cm.indentSelection('add')
  } else {
    cm.replaceSelection(cm.getOption('indentWithTabs') ? '\t'
      : Array(cm.getOption('indentUnit') + 1).join(' '), 'end', '+input')
  }
}

export default class CodeMirrorBinding extends Component {

  componentDidMount () {
    if (process.browser) {
      const { doc, path } = this.props

      // Static import breaks the server, see https://github.com/codemirror/CodeMirror/issues/3701
      const CodeMirror = require('codemirror')
      require('codemirror/mode/javascript/javascript')
      require('codemirror/mode/xml/xml')
      require('codemirror/mode/css/css')
      require('codemirror/mode/htmlmixed/htmlmixed')
      require('codemirror/addon/comment/comment')

      const codeMirror = CodeMirror(this.el, {
        mode: 'htmlmixed',
        indentWithTabs: false,
        indentUnit: 2,
        extraKeys: {
          Tab: betterTab,
          'Cmd-/': 'toggleComment',
          'Ctrl-/': 'toggleComment'
        }
      })
      codeMirror.setSize(null, 500)

      this.binding = new ShareDBCodeMirrorBinding(codeMirror, doc, path)
      this.binding.setup()
    }
  }

  componentWillUnmount () {
    if (this.binding) {
      this.binding.destroy()
    }
  }

  render () {
    return <div ref={el => { this.el = el }} />
  }
}
