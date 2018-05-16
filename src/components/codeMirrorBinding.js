import React, { Component } from 'react'

// Use two spaces instead of tabs when indenting.
// From https://github.com/codemirror/CodeMirror/issues/988#issuecomment-14921785
function betterTab (cm) {
  if (cm.somethingSelected()) {
    cm.indentSelection('add')
  } else {
    cm.replaceSelection(
      cm.getOption('indentWithTabs')
        ? '\t'
        : Array(cm.getOption('indentUnit') + 1).join(' '),
      'end',
      '+input'
    )
  }
}

export default class CodeMirrorBinding extends Component {
  componentDidMount () {
    if (process.browser) {
      const {
        value,
        mode,
        inlet = true,
        height = 500
      } = this.props

      // Static import breaks the server, see https://github.com/codemirror/CodeMirror/issues/3701
      const CodeMirror = require('codemirror')
      require('codemirror/mode/javascript/javascript')
      require('codemirror/mode/jsx/jsx')
      require('codemirror/mode/xml/xml')
      require('codemirror/mode/css/css')
      require('codemirror/mode/htmlmixed/htmlmixed')
      require('codemirror/addon/comment/comment')

      this.codeMirror = CodeMirror(this.el, {
        value,
        mode,
        indentWithTabs: false,
        indentUnit: 2,
        lineNumbers: true,
        extraKeys: {
          Tab: betterTab,
          'Cmd-/': 'toggleComment',
          'Ctrl-/': 'toggleComment'
        }
      })
      this.codeMirror.setSize(null, height)

      if (inlet) {
        require('codemirror-inlet/index-browserify')(this.codeMirror)
      }
    }
  }

  componentDidUpdate () {
    this.codeMirror.setValue(this.props.value)
  }

  render () {
    return (
      <div
        ref={el => {
          this.el = el
        }}
      />
    )
  }
}
